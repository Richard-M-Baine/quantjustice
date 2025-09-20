const express = require('express');
const router = express.Router();

const { Judge, JudgeCrimes } = require('../../models');

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
const blah = req.query

console.log(blah)
console.log('i am here in search')

res.json(blah)
});


module.exports = router