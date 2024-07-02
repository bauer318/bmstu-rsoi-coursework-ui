import React, {useState} from 'react';
import BlogCardShort from "../components/BlogCardShort";
import UserBlogCard from "../components/UserBlogCard";
import {Button} from "react-bootstrap";
import AddBlogModal from "../modals/AddBlogModal";

const UserBlog = () => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);

    const handleShowModal = () => setShowModal(true);

    const handleSaveBlog = (image, content) => {
        // Implement saving logic here (e.g., API call, state update)
        console.log("Image:", image);
        console.log("Content:", content);
        // For demonstration, just logging the image and content
    };
    const handleAddComment = () => {

    };
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
            <UserBlogCard/>
            <UserBlogCard/>

        </div>
    )
};

export default UserBlog;