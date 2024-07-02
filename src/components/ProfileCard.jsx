import React from 'react';
import { Card } from 'react-bootstrap';

const ProfileCard = ({ username, firstName, lastName, country, university }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Profile Information</Card.Title>
                <Card.Text>
                    <strong>Username:</strong> {username}
                    <br />
                    <strong>Name:</strong> {firstName} {lastName}
                    <br />
                    <strong>Country:</strong> {country}
                    <br />
                    <strong>University:</strong> {university}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ProfileCard;
