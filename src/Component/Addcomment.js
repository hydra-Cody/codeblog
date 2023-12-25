import react, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App';
import CommentModal from './ComponentModel';


function Addcomment({ comments, setComments, parent_id, blogPostId, depth }) {
    const { user, setUser } = useContext(UserContext);
    const { userid, setUserid } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);

    const handleCommentSubmit = async (comment) => {
        try {
            const response = await fetch(`http://localhost:8888/api/comments/add/${blogPostId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userid,
                    content: comment,
                    parent_id: parent_id,
                    depth_reply: depth + 1,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setComments([...comments, data]);
            } else {
                console.error('Error adding comment:', data);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };
    const handleLinkClick = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <>
            {user && (
                <div>
                    <a href="#" onClick={handleLinkClick}>
                        {parent_id == "0" ? <>Add Comment</> : <>Add reply</>}
                    </a>
                    {showModal && (
                        <CommentModal onSubmit={handleCommentSubmit} onClose={handleCloseModal}>
                        </CommentModal>
                    )}
                </div>
            )}
        </>
    )

}



export default Addcomment;
