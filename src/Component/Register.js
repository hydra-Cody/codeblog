import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate();
    const [userdata, setuserdata] = useState({
        user_name: "",
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setuserdata({ ...userdata, [e.target.name]: e.target.value });
    }
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8888/api/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userdata),
            });
            const data = await response.json();
            console.log(data);
            navigate("/login")
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };
    return (
        <div className="wrapper">
            <div className="row">
                <div className="col-md-12 text-center" ><h1>Register</h1></div>
            </div>
            <form onSubmit={submitForm}>
                <div className="row">
                    <div className="col-md-6">User Name</div>
                    <div className="col-md-6">
                        <input type="text" name="user_name" className="form-control"
                            onChange={handleChange} value={userdata.user_name} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">Email</div>
                    <div className="col-md-6">
                        <input type="email" name="email" className="form-control"
                            onChange={handleChange} value={userdata.email} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">Password</div>
                    <div className="col-md-6">
                        <input type="password" name="password" className="form-control"
                            onChange={handleChange} value={userdata.password} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 text-center">
                        <input type="submit" name="submit" value="Register" className="btn btn-success" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register