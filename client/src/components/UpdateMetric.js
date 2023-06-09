import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams, Link} from 'react-router-dom';

const UpdateMetric = (props) => {
    const {id} = useParams();
    const [metric, setMetric] = useState([]);
    const [name, setName] = useState("");
    const [greenDef, setGreenDef] = useState("");
    const [yellowDef, setYellowDef] = useState("");
    const [redDef, setRedDef] = useState("");
    // const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/metrics/${id}`)
            .then(res => {
                console.log(res.data.metric);
                setName(res.data.metric.name);
                setGreenDef(res.data.metric.greenDef);
                setYellowDef(res.data.metric.yellowDef);
                setRedDef(res.data.metric.redDef);
            })
            .catch((err) => {
                console.log(err.res);
            })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/metrics/edit/${id}`, {
            name, greenDef, yellowDef, redDef, 
            // status
        })
            .then(res => {
                console.log(res);
                console.log(res.data.metric);
                navigate("/metrics");
            })
            .catch((err) => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors);
            });
    };

    return(
        <div>
            <Link to="/metrics" id="BackB">home</Link>
            <h1>Edit Metric</h1>
            <form onSubmit = {submitHandler}>
                <div>
                    <h4>Metric: </h4>
                    {errors.name ? <p id="Validations">{errors.name.message}</p> : null}
                    <input type = "text" id = "name" value ={name} name = "name" onChange={(e) => {
                        setName(e.target.value);
                    }} />
                </div>
                {/* <div>
                    <h4>Current Status: </h4>
                    {errors.status ? <p>{errors.status.message}</p> : null}
                    <select name ="status" value = {status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value ="">Select Status</option>
                        <option value ="green">Green</option>
                        <option value ="yellow">Yellow</option>
                        <option value = "red">Red</option>
                    </select>
                </div> */}
                <div>
                    <h4>Color Definitions: </h4>
                    <div>
                        <h5 id="gheader">Green: </h5>
                        {errors.greenDef ? <p id="Validations">{errors.greenDef.message}</p> : null}
                        <input type = "text" id = "greenDef" value ={greenDef} name = "greenDef" onChange={(e) => {
                            setGreenDef(e.target.value);
                        }} />
                    </div>
                    <div>
                        <h5 id ="yheader">Yellow: </h5>
                        {errors.yellowDef ? <p id="Validations">{errors.yellowDef.message}</p> : null}
                        <input type = "text" id = "yellowDef" value ={yellowDef} name = "yellowDef" onChange={(e) => {
                            setYellowDef(e.target.value);
                        }} />
                    </div>
                    <div>
                        <h5 id="rheader">Red: </h5>
                        {errors.redDef ? <p id="Validations">{errors.redDef.message}</p> : null}
                        <input type = "text" id = "redDef" value ={redDef} name = "redDef" onChange={(e) => {
                            setRedDef(e.target.value);
                        }} />
                    </div>
                </div>
                <div>
                    <input id = "AddButton" type ="submit" value = "Edit Metric" />
                </div>
            </form>
        </div>
    );

};

export default UpdateMetric;