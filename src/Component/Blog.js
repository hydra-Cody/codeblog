import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments'

function Blog() {
    const { blogPostId } = useParams();
    const [blogContent, setBlogContent] = useState(null);
    const fetchBlogContent = async () => {
        try {
            const response = await fetch(`http://localhost:8888/api/blogs/${blogPostId}`);
            const data = await response.json();
            setBlogContent({ "content": data.content, "title": data.title });
        } catch (error) {
            console.error('Error fetching blog content:', error);
        }
    };
    useEffect(() => {
        fetchBlogContent();
    }, [blogPostId]);


    return (
        <div className="container mt-5">
            {blogContent && <h4 id="0"> {blogContent.title}</h4>}
            {blogContent && <p className="container text-center">{blogContent.content}</p>}
            <Comments blogPostId={blogPostId} />
        </div >
    );
}

export default Blog;
