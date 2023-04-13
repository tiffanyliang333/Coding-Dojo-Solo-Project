import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';

const ViewMetric = (props) => {
    const {id} = useParams();
    console.log(id);
    const [metricDetails, setMetricDetails] = useState({});
    const [selectedColor, setSelectedColor] = useState('');
    const [status, setStatus] = useState('');
    const selector = 'Status selector:';
    const navigate = useNavigate();

    const colorOptions = ['green', 'yellow', 'red'];

    useEffect(() => {
        axios.get(`http://localhost:8000/api/metrics/${id}`)
            .then((res) => {
                console.log(res.data);
                setMetricDetails(res.data.metric);
                // setSelectedColor({
                //     green: res.data.metric.greenDef,
                //     yellow: res.data.metric.yellowDef,
                //     red: res.data.metric.redDef,
                // });
                setSelectedColor(res.data.metric.status);
            })
            .catch((err) => console.log(err.res));
    }, [id]);

    // const handleColorClick = (color) => {
    //     setMetricDetails({...metricDetails, status:color});
    // };

    const submitHandler = (e) => {
        e.preventDefault();
        // const updatedMetric = {
        //     color: selectedColor
        // };
        // setMetricDetails({...metricDetails, color: selectedColor});
        axios.put(`http://localhost:8000/api/metrics/edit/${id}`, {status: selectedColor})
            .then((res) => {
                console.log(res.data);
                // setStatus(res.data.metric.status);
                navigate("/metrics");
            })
            .catch((err) => console.log(err.res));
    };

    return (
        <div>
            <Link to="/metrics" id="BackB">back</Link>
            <h1>{metricDetails.name}</h1>
            <h4>Current Status: </h4>
            {/* <p>{metricDetails.status}</p> */}
            <div
                style={{
                    backgroundColor: metricDetails.status ? metricDetails.status: null,
                    // backgroundColor: selectedColor == metricDetails.status ? selectedColor: metricDetails.status,
                    width: '100px',
                    height: '100px',
                    display: 'inline-block',
                    margin: '10px',
                    borderRadius: '50%',
                }}
            />
            <div>{selector}</div>
            {/* <form onSubmit = {handleColorClick}> */}
            <form onSubmit = {submitHandler}>
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
                            border: selectedColor === color ? '3px solid black' : 'none',
                            borderRadius: '50%',
                        }}
                        // onClick={() => handleColorClick(color)}
                        onClick={() => setSelectedColor(color)}
                    />
                    ))}
                </div>
                <button type ="submit" id ="UpdateButton">Update Status</button>
            </form>
            <div>
                <p>__________________________________________________</p>
                <h4>Color Definitions: </h4>
                <p style = {{color: "green"}}>Green: {metricDetails.greenDef}</p>
                <p style = {{color: "orange"}}>Yellow: {metricDetails.yellowDef}</p>
                <p style = {{color: "red"}}>Red: {metricDetails.redDef}</p>
            </div>
            <Link to = {`/metrics/edit/${metricDetails._id}`}>
                <button id="UpdateButton">Edit Color Definitions</button>
            </Link>
        </div>
    );
};

export default ViewMetric;