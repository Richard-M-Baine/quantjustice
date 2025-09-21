const express = require('express');
const router = express.Router();

const { Judge, JudgeCrime } = require('../../models');

const sequelize = require('sequelize'); // Import sequelize to use its functions
const { Op } = require('sequelize'); // Import Sequelize operators

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

const clean = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== "")
  );
}
// Example route
router.get('/all/:county', async (req, res) => {
  const countyName = req.params.county;

  // Find the county key based on the county name
  const countyKey = Object.keys(countyMap).find(key => countyMap[key] === countyName);

  // If a key is found, perform the search
  if (countyKey) {
    try {
      const judgeList = await Judge.findAll({
        where: { County: countyKey },
      });
      // Respond with the list of judges
      res.json(judgeList);
    } catch (error) {
      // Handle potential errors
      console.error(error);
      res.status(500).send('An error occurred while fetching judges.');
    }
  } else {
    // Handle the case where the county is not found in the map
    res.status(404).send('County not found.');
  }
});

router.get('/search', async (req, res) => {
  try {
    const { lastName, county, offense } = req.query;

    // Judge search conditions
    const judgeWhere = {};
    if (lastName) {
      judgeWhere.Judge = { [Op.like]: `%${lastName}%` };
    }
    if (county) {
      judgeWhere.County = county;
    }

    // Always search judges
    const searchJudges = await Judge.findAll({ where: judgeWhere });

    // Only search JudgeCrime if offense is provided
    let searchJudgeCrimes = [];
    if (offense) {
      const judgeCrimeWhere = {
        Offense: offense // exact match
      };



      searchJudgeCrimes = await JudgeCrime.findAll({ where: judgeCrimeWhere });
    }

    // If no results at all
    if (searchJudges.length === 0 && searchJudgeCrimes.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    res.json([
      searchJudges,
      searchJudgeCrimes
    ]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});






module.exports = router