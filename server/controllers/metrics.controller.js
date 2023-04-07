const { response } = require('express');
const Metric = require('../models/metrics.model');

module.exports.createMetric = (req, res) => {
    Metric.create(req.body)
        .then(newMetric => {
            res.json({metric: newMetric})
        })
        .catch((err) => {
            res.status(400).json({err});
        });
}

module.exports.getAllMetrics = (req, res) => {
    Metric.find()
        .then((allMetrics) => {
            res.json({metric: allMetrics})
        })
        .catch((err) => {
            res.status(400).json({err});
        })
}

module.exports.getOneMetric = (req, res) => {
    Metric.findOne({_id: req.params.id})
        .then(metric => {
            res.json({metric: metric})
            console.log('metric', req.params)
        })
        .catch((err) => {
            res.status(400).json({err});
        });
}

module.exports.updateMetric = (req, res) => {
    Metric.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true})
        .then(updatedMetric => res.json(updatedMetric))
        .catch((err) => {
            res.status(400).json({err});
        })
}

module.exports.deleteMetric = (req, res) => {
    Metric.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch((err) => {
            res.status(400).json({err});
        })
}