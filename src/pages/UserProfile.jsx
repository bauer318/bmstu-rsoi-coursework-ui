import React, {useState} from 'react';
import ProfileCard from "../components/ProfileCard";
import {Button, Col} from "react-bootstrap";
import {IoMdPersonAdd} from "react-icons/io";
import {FaUserEdit} from "react-icons/fa";
import ProfileInfoModal from "../modals/ProfileInfoModal";

const UserProfile = () => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSaveProfile = (profileData) => {
        setProfile({...profile, ...profileData});
    };
    const [profile, setProfile] = useState({
        username: 'johndoe123',
        firstName: 'John',
        lastName: 'Doe',
        country: 'United States',
        university: 'Example University'
    });
    return (
        <div className={"row justify-content-center mt-5"}>
            <h4 className={"text-center mb-4"}>Profile</h4>
            <Col md={12} className="d-flex flex-column align-items-center">
                <ProfileCard
                    username={profile.username}
                    firstName={profile.firstName}
                    lastName={profile.lastName}
                    country={profile.country}
                    university={profile.university}
                />
            </Col>
            <div className="d-flex flex-column align-items-center">
                <div className={"row"}>
                    <div className={"col"}>
                        <Button
                            variant="primary"
                            style={{marginTop: '5px'}}
                            onClick={handleShowModal}
                        >
                            <IoMdPersonAdd/>
                        </Button>
                    </div>
                    <div className={"col"}>
                        <Button
                            variant="secondary"
                            style={{marginTop: '5px'}}
                        >
                            <FaUserEdit/>
                        </Button>
                    </div>
                    <ProfileInfoModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        handleSave={handleSaveProfile}
                    />
                </div>
            </div>
        </div>
    )
};

export default UserProfile;