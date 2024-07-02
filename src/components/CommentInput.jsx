import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';

const CommentInput = ({onAddComment}) => {
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            onAddComment(newComment);
            setNewComment('');
        }
    };

    return (
        <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={handleCommentChange}
                />
            </Form.Group>
            <Button
                variant="primary"
                style={{marginTop: '5px'}}
                onClick={handleAddComment}
            >
                Add Comment
            </Button>
        </Form>
    );
};

export default CommentInput;
