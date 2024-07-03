import React, {useEffect, useState} from 'react';
import ProfileCard from "../components/ProfileCard";
import {Button, Col} from "react-bootstrap";
import {IoMdPersonAdd} from "react-icons/io";
import {FaUserEdit} from "react-icons/fa";
import ProfileInfoModal from "../modals/ProfileInfoModal";
import axios from "axios";
import {baseURL, fetchStudent, handlesError} from "../services/Utils";
import {getItem} from "../services/LocalStorageService";

const UserProfile = () => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSaveProfile = (profileData) => {
        const data = {
            firstname: profileData?.firstName,
            lastname: profileData?.lastName,
            country: profileData?.country,
            university: profileData?.university
        }
        addStudentInfo(data).then(response => {
            setProfile({...profile, ...profileData});
        }).catch(error => {
            handlesError(error?.response)
        })
    };
    const [username, setUsername] = useState(getItem('connectedUser')?.username);
    useEffect(() => {
        fetchStudent(username).then(
            response => {
                setProfile({
                    username: username,
                    firstName: response?.firstname ? response.firstname : 'ADD FIRSTNAME',
                    lastName: response?.lastname ? response.lastname : 'ADD LASTNAME',
                    country: response?.country ? response.country : 'ADD COUNTRY',
                    university: response?.university ? response.university : 'ADD UNIVERSITY'
                });
            }
        ).catch(error => {
            handlesError(error.response);
        })
    }, []);

    const addStudentInfo = async (data) => {
        try {
            await axios.post(baseURL + '/students', data, {
                headers: {
                    'Authorization': `Bearer ${getItem('access_token')}`
                }
            });
        } catch (error) {
            handlesError(error?.response);
        }
    }

    const [profile, setProfile] = useState({
        username: username,
        firstName: 'ADD FIRSTNAME',
        lastName: 'ADD LASTNAME',
        country: 'ADD COUNTRY',
        university: 'ADD UNIVERSITY'
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
                            <span>Add infos </span> <IoMdPersonAdd size={20}/>
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