import React, {useEffect, useState} from 'react';
import UserBlogCard from "../components/UserBlogCard";
import {Button} from "react-bootstrap";
import AddBlogModal from "../modals/AddBlogModal";
import {baseURL, getFormData, handlesError} from "../services/Utils";
import axios from "axios";
import {getItem} from "../services/LocalStorageService";

const UserBlog = () => {
    const [showModal, setShowModal] = useState(false);

    const [blogs, setBlogs] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [canRefresh, setCanRefresh] = useState(false);

    useEffect(() => {
        setIsLoad(true);
        fetchBlogs().then(data => {
            setBlogs(data);
            setIsLoad(false);
        }).catch(error => {
            handlesError(error?.response);
        })
    }, [canRefresh]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(baseURL + `/blogs/by-author/${getItem('connectedUser')?.username}`, {
                headers: {
                    'Authorization': `Bearer ${getItem('access_token')}`
                }
            });

            return response?.data;
        } catch (error) {
            handlesError(error?.response);
        }
    }

    const refresh = () => {
        setCanRefresh(!canRefresh);
    }
    const handleCloseModal = () => setShowModal(false);

    const handleShowModal = () => setShowModal(true);

    const handleSaveBlog = (image, content) => {
        const formData = getFormData(image, content);
        addBlog(formData).then(response => {
            alert('blog added');
            refresh();
        }).catch(error => {
            handlesError(error?.response);
        })
        console.log("Image:", image);
        console.log("Content:", content);
    };
    const addBlog = async (data) => {
        try {
            await axios.post(baseURL + '/blogs', data, {
                headers: {
                    'Authorization': `Bearer ${getItem('access_token')}`
                }
            });
        } catch (error) {
            handlesError(error?.response);
        }
    }

    return (
        <div className={"container"}>
            <h4 className={"text-center"}>My blogs</h4>
            <br/>
            <div className={"row"}>
                <div className={"col "}>
                    <Button
                        variant="primary"
                        style={{marginTop: '5px'}}
                        onClick={handleShowModal}
                    >
                        Add Blog
                    </Button>
                </div>
            </div>
            <AddBlogModal
                show={showModal}
                handleClose={handleCloseModal}
                handleSave={handleSaveBlog}
            />
            <br/>
            {blogs?.length > 0 ? (blogs.map((blog, index) => <UserBlogCard key={index}
                                                                           comments={blog?.blogDto?.comments}
                                                                           author={blog?.blogDto?.author}
                                                                           timePosted={blog?.blogDto?.createdAt}
                                                                           blogId={blog?.blogDto?.id}
                                                                           blogText={blog?.blogDto?.blogText}
                                                                           refresh={refresh}/>)) : isLoad ? (
                <h4 className={'text-center'}>Loading...</h4>) : (
                <h4 className={'text-center'}>No blogs</h4>)}
        </div>
    )
};

export default UserBlog;