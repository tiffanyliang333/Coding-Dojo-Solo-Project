const MetricCtrlr = require('../controllers/metrics.controller');

module.exports = app => {
    app.get('/api/metrics', MetricCtrlr.getAllMetrics);
    app.post('/api/metrics', MetricCtrlr.createMetric);
    app.get('/api/metrics/:id', MetricCtrlr.getOneMetric);
    app.put('/api/metrics/edit/:id', MetricCtrlr.updateMetric);
    app.delete('/api/metrics/:id', MetricCtrlr.deleteMetric);

};