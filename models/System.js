const mongoose = require('mongoose');

const InspectionSchema = new mongoose.Schema(
    {
        description: { type: String, required: true },
        lastPerformed: { type: String },
        toBePerformed: { type: String }

    }
)

const WaiverSchema = new mongoose.Schema(
    {
        description: { type: String, required: true },
        validUntill: { type: String },
        authorizedBy: { type: String }
    }
)

const PermitSchema = new mongoose.Schema(
    {
        description: { type: String, required: true },
        validUntill: { type: String },
        authorizedBy: { type: String }
    }
)

const SystemSchema = new mongoose.Schema(
    {
        systemName: { type: String, unique: true },
        inspections: [InspectionSchema],
        waivers: [WaiverSchema],
        permits: [PermitSchema]

    }
);


module.exports = System = mongoose.model('system', SystemSchema);

