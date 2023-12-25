import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Blogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:8888/api/blogs');
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="container mt-5 ">
            <h2 className="mb-4">All Blogs</h2>
            <ul className="list-group">
                {blogs.map(blog => (
                    <li key={blog.page_id} className="list-group-item">
                        <Link to={`/blogs/blog/${blog.page_id}`} className="text-decoration-none text-dark">
                            <h5 className="mb-1">{blog.title}</h5>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Blogs;
