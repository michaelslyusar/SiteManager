const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const System = require('../../models/System');
const config = require('config');

// @route   POST api/systems
// @desc    Insert a system
// @access  Public
router.post('/insert', [
    check('systemName', 'Date is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const systemName = req.body['systemName'];
    console.log(req.body);

    try {
        system = new System({
            systemName,
            inspections: [{
                'description': 'weekly',
                'lastPerformed': '',
                'toBePerformed': ''
            },
            {
                'description': 'monthly',
                'lastPerformed': '',
                'toBePerformed': ''
            },
            {
                'description': 'quarterly',
                'lastPerformed': '',
                'toBePerformed': ''
            },
            {
                'description': 'semi-annual',
                'lastPerformed': '',
                'toBePerformed': ''
            },
            {
                'description': 'annual',
                'lastPerformed': '',
                'toBePerformed': ''
            }],
            waivers: [],
            permits: []

        });
        console.log('system: ' + system);
        await system.save();

        const payload = {
            system: {
                systemName: system.systemName,
                id: system.id
            }
        };
        res.status(200).send("System Added successfully");

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});




// @route   POST api
// @desc    UPDATE a single entry
// @access  Public
router.post('/update/:id', async (req, res) => {
    try {
        const {
            id,
            date,
            flightRole,
            platform,
            tailNo,
            dn,
            flightNo,
            startTime,
            stopTime,
            remarks,
            flightActivity,
            picTime,
            flightTime
        } = req.body;

        console.log(req.body);

    } catch (err) {
        console.log(err);
        res.status(500).send("server error: ", err);
    }
})





// @route   GET api/users
// @desc    Get all entries
// @access  Public
router.get('/all', async (req, res) => {
    try {
        const systems = await System.find().all();

        res.status(200).send(systems);
    } catch (err) {
        console.log(err);
        res.status(500).send("server error: ", err);
    }
});

// @route   POST api/users
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Test route'))

module.exports = router;