import React from "react";


function Replycomment({ comment, blogPostId }) {
    const handleParentCommentLinkClick = (parentCommentId) => {
        const allComments = document.querySelectorAll('.comment-item');
        allComments.forEach((comment) => {
            comment.classList.remove('bg-warning', 'text-dark');
        });

        // Use JavaScript to scroll to the comment with the specified parentCommentId
        const parentCommentElement = document.getElementById(parentCommentId);
        if (parentCommentElement) {
            parentCommentElement.scrollIntoView({ behavior: 'smooth' });

            // add a visual highlight to the comment
            parentCommentElement.classList.add('bg-warning', 'text-dark');
        }
    };
    return <>
        {comment.parent_id && (
            <a href={`/blogs/blog/${blogPostId}#${comment.parent_id}`}
                onClick={(e) => {
                    e.preventDefault();
                    handleParentCommentLinkClick(comment.parent_id);
                }}
            >
                🔂
            </a>
        )}
    </>
}

export default Replycomment;