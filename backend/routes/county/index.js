const express = require('express');
const router = express.Router();
const { CountyCrime, JudgeCrime, Kettlehundes, nationOne, TwoNation, TotalCrime } = require('../../models');

const sequelize = require('sequelize'); // Import sequelize to use its functions
const { Op } = require('sequelize'); // Import Sequelize operators

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



router.get('/crimesearch', async (req, res) => {
  try {
    const { county, crime, sentence, probation } = req.query;

    const countyKey = Object.keys(countyMap).find(key => 
      countyMap[key].toLowerCase() === county.toLowerCase()
    );

    

    let countyCrimeSearchClean = {
      County: countyKey,
      Offense: crime,
      AverageIncarcerationLength: sentence,
      AverageProbation: probation,
    };

   
    countyCrimeSearchClean = clean(countyCrimeSearchClean);

    // Build where clauses with Op.like for partial matching
 
    const countyCrimeWhere = {};

     if (countyCrimeSearchClean.County) {
      console.log('i am the county ',countyCrimeSearchClean.County)
      countyCrimeWhere.County = countyCrimeSearchClean.County
    }
   
    if (countyCrimeSearchClean.Offense) {
      countyCrimeWhere.Offense = { [Op.like]: `%${countyCrimeSearchClean.Offense}%` };
    }
    if (countyCrimeSearchClean.AverageIncarcerationLength) {
      countyCrimeWhere.AverageIncarcerationLength = { [Op.gte]: countyCrimeSearchClean.AverageIncarcerationLength };
    }
    if (countyCrimeSearchClean.AverageProbation) {
      countyCrimeWhere.AverageProbation = { [Op.gte]: countyCrimeSearchClean.AverageProbation };
    }

    // Execute queries
    const countyCrimeSearchResults = await (

      CountyCrime.findAll({ where: countyCrimeWhere })

  )



    if (countyCrimeSearchResults.length === 0) {
      console.log('Warning: No CountyCrime results found for query:', countyCrimeWhere);
    }

    // Return all data including the unique offenses array
    const returnArray = [
    
      {countyCrimeResults: [...countyCrimeSearchResults]},

    ];
    

    res.json(returnArray);
  } catch (err) {
    console.error('Error in crimesearch:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
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


    res.json(allResults);

  } catch (err) {
    console.error("Error fetching misconduct search:", err);
    res.status(500).json({ error: "Server error while searching misconduct" });
  }
});


router.get('/individual/:county', async (req, res) => {
  try {
    const countyName = req.params.county;
    
    // Convert county name to database key (reverse lookup in countyMap)
    const countyKey = Object.keys(countyMap).find(key => 
      countyMap[key].toLowerCase() === countyName.toLowerCase()
    );
    
    if (!countyKey) {
      return res.status(404).json({ message: 'County not found' });
    }

    const MAX_ATTEMPTS = 10; // prevent infinite loops
    let attempt = 0;
    let countyData = [];
    let randomOffense = null;

    while (attempt < MAX_ATTEMPTS) {
      attempt++;

      // Step 1: Pick random offense from JudgeCrimes
      const randomOffenseResult = await JudgeCrime.findOne({
        attributes: ['Offense'],
        order: sequelize.literal('RANDOM()'),
        limit: 1,
      });

      if (!randomOffenseResult) continue; // try again

      randomOffense = randomOffenseResult.Offense;

      // Step 2: Get 3 instances for this county and offense
      countyData = await JudgeCrime.findAll({
        where: { 
          County: countyKey,
          Offense: randomOffense 
        },
        order: sequelize.literal('RANDOM()'),
        limit: 3,
      });

      if (countyData.length >= 3) {
        // Found a good result → stop retrying
        break;
      }
    }

    if (countyData.length < 3) {
      return res.status(404).json({ 
        message: `Could not find 3 instances for ${countyName} after multiple attempts.` 
      });
    }

    // Step 3: Format county result
    const formattedCountyData = countyData.map(item => {
      const json = item.toJSON();
      return {
        ...json,
        County: countyMap[json.County] || json.County,
      };
    });

    // Step 4: Get total state-level data for same offense
    const totalStates = await TotalCrime.findOne({
      where: { Offense: randomOffense }
    });

    // Step 5: Merge and return
 return res.json([
  { countyData: formattedCountyData },
  { totalCrime: totalStates ? totalStates.toJSON() : null }
]);


  } catch (error) {
    console.error("Error fetching individual county data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


// get all county results based on an offense crimeId of one county
// also returns all judges in the county that sentenced someone for that offense
router.get('/all/county/crimeId', async (req, res) => {
  try {
    const { county, crime } = req.query;

    // find in CountyCrime
    const countyCrimes = await CountyCrime.findAll({
      where: { Offense: crime }
    });

    // find in JudgeCrime
    const judgeCrimes = await JudgeCrime.findAll({
      where: {
        County: county,
        Offense: crime
      }
    });

    // send both back
    res.json({
      countyCrimes,
      judgeCrimes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ugh! Server break.' });
  }
});




module.exports = router;