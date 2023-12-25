import React from "react";

function Deletecomment({ comment, comments, setComments }) {
    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:8888/api/comments/delete/${commentId}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (response.ok) {
                const updatedComments = comments.map((comment) => comment.comment_id !== commentId
                    ? comment : { ...comment, "content": "Message deleted" });
                setComments(updatedComments);
            } else {
                console.error('Error deleting comment:', data);
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <button className="btn btn-outline-danger m-2"
            onClick={() => handleDeleteComment(comment.comment_id)}>
            Delete
        </button>
    )
}

export default Deletecomment;