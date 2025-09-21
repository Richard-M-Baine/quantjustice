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

// Example route
router.get('/judge', async (req, res) => {
  const {offense } = req.query

  const searchObject = {}
 
      
         searchObject.Offense = { [Op.like]: `%${offense}%` };
      



      searchTotalCrimes = await TotalCrime.findAll({ where: searchObject });

      res.json(searchTotalCrimes)
    
});

// Add more routes as needed
router.post('/', (req, res) => {
  // Handle POST request
});

module.exports = router;