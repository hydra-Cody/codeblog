import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../App';

function Header() {
    const { user, setUser } = useContext(UserContext);
    const { userid, setUserid } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in on component mount
        const checkLoginStatus = async () => {
            try {
                const email = document.cookie.replace(/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/, "$1");
                const password = document.cookie.replace(/(?:(?:^|.*;\s*)password\s*=\s*([^;]*).*$)|^.*$/, "$1");

                if (!email || !password) {
                    console.error('Email or password not found in cookies.');
                    return;
                }

                // Use the stored email and password for login
                const credentials = {
                    email: email,
                    password: password,
                };

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
                } else {
                    setUser('');
                    setUserid(null);
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8888/api/users/logout', {
                method: 'GET',
            });
            const data = response;
            if (response.ok) {
                const cookiesToDelete = ['token', 'email', 'password'];

                cookiesToDelete.forEach(cookie => {
                    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
                });
                setUser(null);
                navigate("/");
            } else {
                console.error('Error during logout:', data);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Logo</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/blogs" className="nav-link active" aria-current="page">Blogs</Link>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">Welcome, {user}</span>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header