import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProfileInfoModal = ({ show, handleClose, handleSave }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [university, setUniversity] = useState('');

    const handleSaveProfile = () => {
        const profileData = { firstName, lastName, country, university };
        handleSave(profileData);
        // Clear form fields
        setFirstName('');
        setLastName('');
        setCountry('');
        setUniversity('');
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Profile Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formUniversity">
                        <Form.Label>University</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter university"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveProfile}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileInfoModal;
