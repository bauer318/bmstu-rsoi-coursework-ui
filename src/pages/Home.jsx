import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import {Navigate, useNavigate} from "react-router-dom";
import {getItem, removeItem, saveItem} from "../services/LocalStorageService";
import {refreshP} from "../App";
import axios from "axios";
import {clientId, clientSecret, grantType, oidcToken, userInfosEndpoint} from "../services/Utils";


const Home = () => {
        const [formData, setFormData] = useState({});
        const [error, setError] = useState(null);
        const user = getItem('connectedUser');
        const [isLoading, setIsLoading] = useState(false);
        const navigate = useNavigate();
        const [isBlockedUser, setIsBlockedUser] = useState(false);
        const [firstTime, setFirstTime] = useState(false);

        useEffect(() => {
            if (getItem("successMessage")) {
                setFirstTime(true);
                removeItem("successMessage");
            } else {
                setFirstTime(false);
            }
        }, []);

        const redirectTo = userRole => {
            switch (userRole) {
                case 'admin':
                    navigate('/admin/users');
                    break;
                case 'user':
                    navigate('/user/home');
                    break;
            }
        }

        const handleSubmit = async event => {
            event.preventDefault();
            setIsLoading(true);
            const longedUser = {
                email: formData["email"],
                password: formData["password"]
            };
            const params = new URLSearchParams();
            params.append('username', formData["email"]);
            params.append('password', formData["password"]);
            params.append('grant_type', grantType);
            params.append('client_id', clientId);
            params.append('client_secret', clientSecret);
            params.append('scope', 'openid');
            try {
                const response = await axios.post(oidcToken, params, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                let data = response.data;
                saveItem('access_token', data.access_token);
                await fetchUserInfo(getItem('access_token'));
            } catch (error) {
                let errorResponse = error.response;
                console.error('Error:', error);
                setIsLoading(false);
                if (errorResponse?.status === 400 || errorResponse?.status === 401) {
                    setError("Bad credential");
                } else if (errorResponse?.status === 403) {
                    setError("Forbidden");
                }
            }
        }

        const fetchUserInfo = async (token) => {
            try {
                const response = await axios.get(userInfosEndpoint, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                let userRole = response?.data?.resource_access[clientId]['roles'];
                const connectedUser = {
                    username: formData['email'],
                    userRole: userRole[0]
                };
                saveItem('connectedUser', connectedUser);
                redirectTo(userRole[0]);
                refreshP();
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        const handleChange = event => {
            const {name, value} = event.target;
            setFormData({...formData, [name]: value});
            if (error) {
                setError(null);
            }
        }
        return (
            <>
                {
                    user && (
                        <Navigate to={'/admin/users'} replace={true}/>
                    )}
                <div className={"container row"}>
                    <div className={"text-center mt-5"}>
                        <h3>Login</h3>
                    </div>
                    {firstTime &&
                        <div className={"text-center"}><h4 className={"text-info"}>The account has been successfully
                            created!</h4></div>}
                    <div className={"col-md-8 mx-auto d-flex justify-content-center"}>
                        <Form onSubmit={handleSubmit} className={"login-form"}>
                            <Form.Group controlId="formBasicEmail" className={"form-outline mb-4"}>
                                <Form.Label className="required">Email address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="example_123@email.com"
                                    name="email"
                                    required={true}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="required">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    required={true}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {isLoading && <h4 className={"text-center text-secondary"}>Wait please...</h4>}
                            <div className={"mt-3 d-flex justify-content-around"}>
                                <button disabled={isLoading || isBlockedUser} className={"btn btn-primary w-100"}
                                        type={"submit"}>
                                    Login
                                </button>
                            </div>
                            {
                                error &&
                                <p className={"text-danger text-center"}>{error}</p>
                            }
                        </Form>
                    </div>
                </div>

            </>

        );
    }
;

export default Home;