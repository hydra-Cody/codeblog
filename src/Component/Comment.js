import React, { useContext, useEffect } from 'react'
import { UserContext } from '../App';

import Replycomment from './Replycomment'
import Addcomment from './Addcomment'
import Deletecomment from './Deletecomment'
import Votes from './Votes'
import Editcomment from './Editcomment'


function Comment({ comment, comments, setComments, blogPostId }) {
    const { user, setUser } = useContext(UserContext);
    const { userid, setUserid } = useContext(UserContext);


    return <li id={comment.comment_id} className="mb-3 comment-item list-group-item border">
        <Replycomment comment={comment} blogPostId={blogPostId} />
        <strong>User: {comment.user_name}</strong>
        <p>{comment.content}</p>
        <p>Timestamp: {comment.timestamp}</p>
        <p>Votes:{comment.total_votes} </p>

        {user && comment.depth_reply < 6 &&
            <Addcomment comments={comments} setComments={setComments}
                parent_id={comment.comment_id} blogPostId={blogPostId} depth={comment.depth_reply} />
        }

        {user && user === comment.user_name && comment.content !== "Message deleted" && (
            <>
                <Deletecomment comment={comment} comments={comments} setComments={setComments} />
                <Editcomment comment={comment} comments={comments} setComments={setComments} />
            </>
        )}
        {user && user !== comment.user_name && (
            <Votes comment={comment} comments={comments} setComments={setComments} />
        )}
    </li>
}

export default Comment;