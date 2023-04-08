import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';

const ViewMetric = (props) => {
    const {id} = useParams();
    const [metricDetails, setMetricDetails] = useState({});
    const [selectedColor, setSelectedColor] = useState('');
    const selector = 'Status selector:';

    const colorOptions = ['green', 'yellow', 'red'];

    useEffect(() => {
        axios.get(`http://localhost:8000/api/metrics/${id}`)
            .then((res) => {
                console.log(res.data.metrics);
                setMetricDetails(res.data.metrics);
            })
            .catch((err) => console.log(err.res));
    }, [id]);

    useEffect(() => {
        localStorage.setItem('selectedColor', selectedColor);
    }, [selectedColor]);

    useEffect(() => {
        const prevSelectedColor = localStorage.getItem('selectedColor');
        if (prevSelectedColor) {
            setSelectedColor(prevSelectedColor);
        }
    }, []);

    return (
        <div>
            <Link to="/metrics">back</Link>
            <h1>View {metricDetails.name}</h1>
            <h4>Current Status: </h4>
            <div
                style={{
                    backgroundColor: selectedColor,
                    width: '50px',
                    height: '50px',
                    display: 'inline-block',
                    margin: '10px',
                }}
            />
            <div>{selector}</div>
            <div>
                {colorOptions.map((color) => (
                <div
                    key={color}
                    style={{
                        backgroundColor: color,
                        width: '30px',
                        height: '30px',
                        display: 'inline-block',
                        margin: '10px',
                        border: selectedColor === color ? '3px solid black' : 'none'
                    }}
                    onClick={() => setSelectedColor(color)}
                />
                ))}
            </div>
            <div>
                <p>__________________________________________________</p>
                <h4>Color Definitions: </h4>
                <p>Green: {metricDetails.greenDef}</p>
                <p>Yellow: {metricDetails.yellowDef}</p>
                <p>Red: {metricDetails.redDef}</p>
            </div>
        </div>
    );
};

export default ViewMetric;