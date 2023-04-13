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
                <div className = "text-center">
                    <h1>Key Performance Tracker</h1>
                    <button id="AlphButton" onClick={sortByAlph}>
                        Sort by Alphabetical Order
                    </button>
                    <table className = "table mx-auto">
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
                                            {/* {m.status} */}
                                        <div
                                            style={{
                                                backgroundColor: m.status,
                                                width: '70px',
                                                height: '70px',
                                                display: 'inline-block',
                                                margin: '10px',
                                                borderRadius: '50%',
                                            }}
                                        />
                                        </td>
                                        <td>
                                            <button id="DeleteButton" onClick ={(e) => {deleteMetric(m._id)}}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Link to ="/metrics/new">
                        <button id="AddButton">Add Metric</button>
                    </Link>
                </div>
            </div>
        </div>
    );

};

export default MetricWall;