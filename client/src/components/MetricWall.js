import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const MetricWall = () => {
    // const {id} = useParams();
    const [metric, setMetric] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/metrics`)
        .then(res => {
            console.log(res.data.metric);
            setMetric(res.data.metric);
        })
        .catch(err => console.log(err));
    }, []);

    const deleteMetric = (metricId) => {
        axios.delete(`http://localhost:8000/api/metrics/${metricId}`)
            .then(res => {
                console.log(res.data.metrics);
                setMetric(metric.filter((metric, index) => metric._id !== metricId))
            })
            .catch(err => console.log(err))
    }

    function sortByAlph() {
        const sortedMetrics = [...metric].sort((a,b) => a.name.localeCompare(b.name));
        setMetric(sortedMetrics);
    }

    return(
        <div className = "container">
            <div className = "row">
                <div className = "col">
                    <h1>METRIC WALL</h1>
                    <button onClick={sortByAlph}>Sort by Alphabetical Order</button>
                    <table className = "table">
                        <thead>
                            <tr>
                                <th>Metric</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {metric.map((m, index) => {
                                return(
                                    <tr key = {index}>
                                        <td><Link to ={`/metrics/${m._id}`}>{m.name}</Link></td>
                                        <td>
                                            {m.status}
                                        {/* <div
                                            style={{
                                                backgroundColor: metric.color,
                                                width: '50px',
                                                height: '50px',
                                                display: 'inline-block',
                                                margin: '10px',
                                                borderRadius: '50%',
                                            }}
                                        /> */}
                                        </td>
                                        <td>
                                            <button onClick ={(e) => {deleteMetric(m._id)}}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Link to ="/metrics/new">
                        <button>Add Metric</button>
                    </Link>
                </div>
            </div>
        </div>
    );

};

export default MetricWall;