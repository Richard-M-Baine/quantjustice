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
  HUN: "Hunterdon",
  MER: "Mercer",
  MID: "Middlesex",
  MON: "Monmouth",
  MOR: "Morris",
  OCE: "Ocean",
  PAS: "Passaic",
  SAL: "Salem",
  SOM: "Somerset",
  SUS: "Sussex",
  UNI: "Union",
  WAR: "Warren"
};


router.get('/landing', async (req, res) => {
  try {
    // Step 1: Find one random Offense
    const randomOffenseResult = await CountyCrime.findOne({
      attributes: ['Offense'],
      order: sequelize.literal('RANDOM()'),
      limit: 1,
    });

    if (!randomOffenseResult) {
      return res.status(404).json({ message: 'No offenses found.' });
    }

    const randomOffense = randomOffenseResult.Offense;

    // Step 2: Find three distinct counties with that offense
    const countyLanding = await CountyCrime.findAll({
      where: { Offense: randomOffense },
      group: ['County', 'Offense'],
      order: sequelize.literal('RANDOM()'),
      limit: 3,
    });

    if (countyLanding.length < 3) {
      return res.status(404).json({ message: 'Could not find 3 distinct counties for the selected offense.' });
    }

    // Step 3: Map results with full county names
    const response = countyLanding.map(item => {
      const json = item.toJSON();
      return {
        ...json,
        County: countyMap[json.County] || json.County, // fallback to original if not found
      };
    });

    return res.json(response);

  } catch (error) {
    console.error("Error fetching county data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;