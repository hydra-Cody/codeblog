import React, { useState } from "react";
import CommentModal from './ComponentModel'

function Editcomment({ comment, comments, setComments }) {
    const [showModal, setShowModal] = useState(false);

    const canEditComment = (commentEdit) => {
        const commentCreationTime = new Date(commentEdit.timestamp).getTime();
        const currentTime = new Date().getTime();
        const timeDifference = Math.round((currentTime - commentCreationTime) / (1000 * 60) * 100) / 100; // Round to 2 decimal places

        // console.log('Comment ID:', commentEdit.comment_id);
        // console.log('commentCreationTime:', commentCreationTime);
        // console.log('currentTime:', currentTime);
        // console.log('timeDifference:', timeDifference);

        const canEdit = timeDifference <= 500;
        // console.log('Can edit?', canEdit);

        return canEdit;
    };

    const handleLinkClick = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleCommentSubmit = async (updatedcontent) => {
        try {
            const response = await fetch(`http://localhost:8888/api/comments/edit/${comment.comment_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: updatedcontent,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                // Update the comments state after editing
                const updatedComments = comments.map((com) =>
                    com.comment_id === comment.comment_id ? { ...com, content: updatedcontent } : com
                );
                setComments(updatedComments);
            } else {
                console.error('Error updating comment:', data);
                // Handle error as needed
            }
        } catch (error) {
            console.error('Error updating comment:', error);
            // Handle error as needed
        }

    }

    return (
        <>
            {canEditComment(comment) && (
                <button className="btn btn-primary m-2" onClick={handleLinkClick}>Edit</button>
            )}
            {showModal && (
                <CommentModal onSubmit={handleCommentSubmit} onClose={handleCloseModal} value={comment.content} >
                </CommentModal >
            )
            }
        </>
    )
}

export default Editcomment;