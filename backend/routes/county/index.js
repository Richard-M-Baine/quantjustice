const express = require('express');
const router = express.Router();
const { CountyCrime } = require('../../models');

const sequelize = require('sequelize'); // Import sequelize to use its functions

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
  OCE: "Ocean",
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




module.exports = router;