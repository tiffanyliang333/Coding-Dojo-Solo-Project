import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';

const ViewMetric = (props) => {
    const {id} = useParams();
    const [metricDetail, setMetricDetail] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/metrics/${id}`)
            .then((res) => {
                console.log(res.data.metric);
                setMetricDetail(res.data.product);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return(
        <div>
            <Link to="/metrics">back</Link>
            <h1>{metricDetail.name}</h1>
            <h3>Current Status: {metricDetail.status}</h3>
            <h4>Change Status?</h4>
            <p>________________________________________</p>
            <h4>Color Definitions: </h4>
            <h5>Green: {metricDetail.greenDef}</h5>
            <h5>Yellow: {metricDetail.yellowDef}</h5>
            <h5>Red: {metricDetail.redDef}</h5>
        </div>
    );

};

export default ViewMetric;