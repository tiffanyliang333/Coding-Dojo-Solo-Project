const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema({
    name: {type: String, 
        required: [true, "Metric name is required."],
        minLength: [2, "Metric name must have at least 2 characters."]},
    greenDef: {type: String,
        required: [true, "Definition is required."],
        minLength: [2, "Definition must have at least 2 characters."]},
    yellowDef: {type: String,
        required: [true, "Definition is required."],
        minLength: [2, "Definition must have at least 2 characters."]},
    redDef: {type: String,
        required: [true, "Definition is required."],
        minLength: [2, "Definition must have at least 2 characters."]},
    status: {type: String,
        required:[true, "Status is required."],
        // enum: ["green", "yellow", "red"]
    },
},
    { timestamp: true }
);

module.exports = mongoose.model('Metric', MetricSchema);