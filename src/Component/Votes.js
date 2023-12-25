import React, { Component, useContext, useState } from "react";
import { UserContext } from '../App';

function Votes({ comment, comments, setComments }) {
    const { user, setUser } = useContext(UserContext);
    const { userid, setUserid } = useContext(UserContext);
    const [curvote, setcurvote] = useState(0);
    const handlevote = async (vote) => {
        try {
            const response = await fetch('http://localhost:8888/api/votes/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment_id: comment.comment_id,
                    user_id: userid,
                    vote_type: String(vote),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const updatedComments = comments.map((com) =>
                    com.comment_id === comment.comment_id ? {
                        ...com, "total_votes": (parseInt(com.total_votes) - curvote + vote).toString()
                    } : com
                );

                setComments(updatedComments);
                setcurvote(vote);
            } else {
                console.error('Error during login:', data);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    const getVote = async () => {
        try {
            const response = await fetch(`http://localhost:8888/api/votes/${comment.comment_id}/${userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                setcurvote(parseInt(data['vote_type'], 10));
            } else {
                console.error('Error adding vote:', data);
            }
        } catch (error) {
            console.error('Error adding vote:', error);
        }
    };
    if (user) getVote();


    return (
        <>
            {user && comment.user_id !== userid && (
                <button disabled={curvote === 1} onClick={() => handlevote(1)}>💓</button>
            )}
            {user && comment.user_id !== userid && (
                <button disabled={curvote === -1} onClick={() => handlevote(-1)}>👎</button>
            )}
            {user && comment.user_id !== userid && curvote !== 0 && (
                <button onClick={() => handlevote(0)}>Remove</button>
            )}
        </>
    )
}

export default Votes;