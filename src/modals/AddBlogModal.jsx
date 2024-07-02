import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

const AddBlogModal = ({show, handleClose, handleSave}) => {
    const [image, setImage] = useState(null);
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const extension = file.name.split('.').pop().toLowerCase();

        if (!allowedExtensions.includes(extension)) {
            setErrorMessage(`Invalid file type. Allowed types are: ${allowedExtensions.join(', ')}`);
            setImage(null);
        } else {
            setErrorMessage('');
            setImage(file);
        }
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSaveBlog = () => {
        if (image && content.trim() !== '') {
            handleSave(image, content);
            setImage(null);
            setContent('');
            handleClose();
        } else {
            setErrorMessage('Please select a valid image and enter content.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Blog Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Upload Image</Form.Label>
                    <input
                        type="file"
                        className="form-control-file"
                        onChange={handleImageChange}
                        accept={".jpg, .jpeg, .png, .gif"}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Blog Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter your blog content..."
                        value={content}
                        onChange={handleContentChange}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveBlog}>
                    Save Blog
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddBlogModal;