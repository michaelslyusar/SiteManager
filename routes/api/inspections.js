const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const System = require('../../models/System');
const config = require('config');

// @route   POST api
// @desc    UPDATE a single inspection
// @access  Public
router.post('/update/:id', [
    check('description', 'description is required').not().isEmpty(),
    check('lastPerformed', 'performedAt is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log("passed")
    try {
        const {
            description,
            lastPerformed
        } = req.body;

        const system = await System.findOne({ "systemName": req.params.id })

        system['inspections'].forEach(inspection => {
            if (description == 'weekly' && inspection.description == description) {
                console.log('found and changed');
                inspection.lastPerformed = lastPerformed;
                inspection.toBePerformed = "add 7 days"
            } else if (description == 'monthly' && inspection.description == description) {
                console.log('found and changed');
                inspection.lastPerformed = lastPerformed;
                inspection.toBePerformed = "add 1 month"
            } else if (description == 'quarterly' && inspection.description == description) {
                console.log('found and changed');
                inspection.lastPerformed = lastPerformed;
                inspection.toBePerformed = "add 3 months"
            }
            else if (description == 'semi-annual' && inspection.description == description) {
                console.log('found and changed');
                inspection.lastPerformed = lastPerformed;
                inspection.toBePerformed = "add 6 months"
            }
            else if (description == 'annual' && inspection.description == description) {
                console.log('found and changed');
                inspection.lastPerformed = lastPerformed;
                inspection.toBePerformed = "add 1 year"
            }
        }
        );
        await System.replaceOne({ _id: system._id },system);
        res.status(200).send(system)
    } catch (err) {
    console.log(err);
    res.status(500).send("server error: ", err);
}
})



// @route   GET api/inspections
// @desc    Get all inspections
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



module.exports = router;


