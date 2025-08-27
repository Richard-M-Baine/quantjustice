const express = require('express');
const router = express.Router();
const { CountyCrime } = require('../../models');

const sequelize = require('sequelize'); // Import sequelize to use its functions

router.get('/landing', async (req, res) => {
    try {
        // Step 1: Find one random Offense from the database
        const randomOffenseResult = await CountyCrime.findOne({
            attributes: ['Offense'],
            order: sequelize.literal('RANDOM()'), 
            limit: 1,
        });

        if (!randomOffenseResult) {
            return res.status(404).json({ message: 'No offenses found.' });
        }

        const randomOffense = randomOffenseResult.Offense;

        // Step 2: Find three distinct counties with the random offense
        const countyLanding = await CountyCrime.findAll({
            where: {
                Offense: randomOffense,
            },
            group: ['County', 'Offense'], // Group by to ensure distinctness of the County
            limit: 3,
        });

        if (countyLanding.length < 3) {
            return res.status(404).json({ message: 'Could not find 3 distinct counties for the selected offense.' });
        }

        // Convert to JSON-friendly format
        const response = { countyCrimes: countyLanding.map(item => item.toJSON()) };

        return res.status(200).json(response);

    } catch (error) {
        console.error("Error fetching county data:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;