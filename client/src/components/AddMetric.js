import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const AddMetric = (props) => {
    const {metric, setMetric} = props;
    const [name, setName] = useState("");
    const [greenDef, setGreenDef] = useState("");
    const [yellowDef, setYellowDef] = useState("");
    const [redDef, setRedDef] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/metrics`, {
            name, greenDef, yellowDef, redDef, status
        })
        .then ((res) => {
            console.log(res);
            console.log(res.data);
            setName("");
            setGreenDef("");
            setYellowDef("");
            setRedDef("");
            setStatus("");
            navigate("/metrics");
        })
        .catch((err) => {
            console.log(err.response.data.err.errors);
            setErrors(err.response.data.err.errors);
        })
    };

    useEffect(() => {
        setErrors("");
    }, [name]);

    return(
        <div>
            <Link to="/metrics" id="BackB">back</Link>
            <h1>Add Metric</h1>
            <form onSubmit = {submitHandler}>
                <div>
                    <h4>Metric: </h4>
                    {errors.name ? <p id="Validations">{errors.name.message}</p> : null}
                    <input type = "text" id = "name" value ={name} name = "name" onChange={(e) => {
                        setName(e.target.value);
                    }} />
                </div>
                <div>
                    <h4>Current Status: </h4>
                    {errors.status ? <p id="Validations">{errors.status.message}</p> : null}
                    <select id="Dropdown" name ="status" value = {status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value ="">Select Status</option>
                        <option value ="green">Green</option>
                        <option value ="yellow">Yellow</option>
                        <option value = "red">Red</option>
                    </select>
                </div>
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
                        <h5 id="yheader">Yellow: </h5>
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
                    <input id = "AddButton" type ="submit" value = "Add Metric" />
                </div>
            </form>
        </div>
    );

};

export default AddMetric;