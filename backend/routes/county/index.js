const express = require('express');
const router = express.Router();
const { CountyCrime, Kettlehundes, nationOne, TwoNation } = require('../../models');

const sequelize = require('sequelize'); // Import sequelize to use its functions

// Utility to strip out undefined/empty filters
const clean = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== "")
  );
};

const countyMap = {
  ATL: "Atlantic",
  BER: "Bergen",
  BUR: "Burlington",
  CAM: "Camden",
  CPM: "Cape May",
  CUM: "Cumberland",
  ESS: "Essex",
  GLO: "Gloucester",
  HUD: "Hudson",
  HNT: "Hunterdon",
  MER: "Mercer",
  MID: "Middlesex",
  MON: "Monmouth",
  MRS: "Morris",
  OCN: "Ocean",
  PAS: "Passaic",
  SLM: "Salem",
  SOM: "Somerset",
  SSX: "Sussex",
  UNI: "Union",
  WAR: "Warren"
};


router.get('/landing', async (req, res) => {
  try {
    const MAX_ATTEMPTS = 10; // prevent infinite loops
    let attempt = 0;
    let countyLanding = [];

    while (attempt < MAX_ATTEMPTS) {
      attempt++;

      // Step 1: Pick random offense
      const randomOffenseResult = await CountyCrime.findOne({
        attributes: ['Offense'],
        order: sequelize.literal('RANDOM()'),
        limit: 1,
      });

      if (!randomOffenseResult) continue; // try again

      const randomOffense = randomOffenseResult.Offense;

      // Step 2: Get 3 distinct counties for that offense
      countyLanding = await CountyCrime.findAll({
        where: { Offense: randomOffense },
        group: ['County', 'Offense'],
        order: sequelize.literal('RANDOM()'),
        limit: 3,
      });

      if (countyLanding.length >= 3) {
        // Found a good result → stop retrying
        break;
      }
    }

    if (countyLanding.length < 3) {
      // after MAX_ATTEMPTS still nothing
      return res.status(404).json({ message: 'Could not find 3 distinct counties after multiple attempts.' });
    }

    // Step 3: Format result
    const response = countyLanding.map(item => {
      const json = item.toJSON();
      return {
        ...json,
        County: countyMap[json.County] || json.County,
      };
    });

    return res.json(response);

  } catch (error) {
    console.error("Error fetching county data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});




router.get('/misconduct', async (req, res) => {
  try {
    
    const { dienstgrad, ersteName, zweiteName, land, Amtstelle } = req.query;

    // Build where clauses
    const kettleWhere = clean({
      Rank: dienstgrad,      
      FirstName: ersteName,
      LastName: zweiteName,
      AgencyName: Amtstelle
    });

    const nationOneWhere = clean({
      rank: dienstgrad,
      FirstName: ersteName,
      LastName: zweiteName,
      State: land,
      Agency: Amtstelle
    });

    const nationTwoWhere = clean({
      FirstName: ersteName,
      LastName: zweiteName,
      State: land,
      Agency: Amtstelle
    });

    // Run queries in parallel
    const [kettleResults, nationOneResults, nationTwoResults] = await Promise.all([
      Kettlehundes.findAll({ where: kettleWhere }),
      nationOne.findAll({ where: nationOneWhere }),
      TwoNation.findAll({ where: nationTwoWhere })
    ]);

    // Normalize + tag results
    const normalizedKettle = kettleResults.map(r => ({
      rank: r.Rank,
      firstName: r.FirstName,
      lastName: r.LastName,
      country: r.County,
      office: r.AgencyName,
      dataSet: "Kettlehundes",
      ...r.toJSON()

    }));

    const normalizedNationOne = nationOneResults.map(r => ({
      rank: null, // doesn’t exist in NationOne
      firstName: r.FirstName,
      lastName: r.LastName,
      country: r.State,
      office: r.agency,
      dataSet: "NationOne",
      ...r.toJSON()
    }));

    const normalizedTwoNation = nationTwoResults.map(r => ({
      rank: null, // doesn’t exist in TwoNation either
      firstName: r.FirstName,
      lastName: r.LastName,
      country: r.State,
      office: r.Agency,
      dataSet: "TwoNation",
      ...r.toJSON()
    }));

    const allResults = [
      ...normalizedKettle,
      ...normalizedNationOne,
      ...normalizedTwoNation
    ];

    console.log('i am all results ', allResults);
    res.json(allResults);

  } catch (err) {
    console.error("Error fetching misconduct search:", err);
    res.status(500).json({ error: "Server error while searching misconduct" });
  }
});


router.get('/individual/:county', async (req, res) => {
  const county = req.params

  return res.json(county)


});



module.exports = router;