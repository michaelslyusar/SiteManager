const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const System = require('../../models/System');
const config = require('config');

// @route   POST api
// @desc    UPDATE a single inspection
// @access  Public
router.post('/update/:id',[
    check('description', 'description is required').not().isEmpty(),
    check('performedAt', 'performedAt is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log("passed")
    try {
        const {
            description,
            performedAt
        } = req.body;

        console.log(req.body);
        console.log(req.params.id)
        const system = System.find({'systemName':req.params.id})
        
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


