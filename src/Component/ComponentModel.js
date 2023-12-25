import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';


function CommentModal({ onSubmit, onClose, value = '' }) {
    const [comment, setComment] = useState(value);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(comment);
        setComment('');
        onClose();
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Enter Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter your comment"
                    value={comment}
                    onChange={handleCommentChange}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CommentModal;