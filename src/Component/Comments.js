import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App';
import Addcomment from './Addcomment'
import Comment from './Comment'


function Comments({ blogPostId }) {
    const { user } = useContext(UserContext);
    const { userid } = useContext(UserContext);
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:8888/api/comments/${blogPostId}`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
            // Handle error as needed
        }
    };
    useEffect(() => {
        fetchComments();
    }, [blogPostId]);
    return <div>
        <Addcomment comments={comments} setComments={setComments} parent_id="0" blogPostId={blogPostId} depth={0} />
        <div>
            <h3>Comments</h3>
            <ul className="list-unstyled list-group">
                {comments.map((comment) => (
                    <Comment key={comment.comment_id} comment={comment} comments={comments} setComments={setComments}
                        blogPostId={blogPostId} />
                ))}
            </ul>
        </div>
    </div>
}

export default Comments;