import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function Login() {
    const { setUser } = useContext(UserContext);
    const { setUserid } = useContext(UserContext);
    const [error, seterror] = useState('');
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        seterror('');
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8888/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user_name);
                setUserid(data.user_id);
                document.cookie = `email=${data.email};`;
                document.cookie = `password=${data.password};`;
                console.log(data);
                navigate('/blogs');
            } else {
                seterror(data.msg);
                setCredentials({
                    email: "",
                    password: ""
                });
                console.error('Error during login:', data);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3>Login</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                            {
                                error && <p className="alert alert-danger">{error}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
