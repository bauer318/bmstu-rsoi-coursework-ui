import React, {useState} from 'react';
import {Button, Card, Collapse} from "react-bootstrap";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";

const BlogCardShort = ({comments, setOpen, open, author, timePosted, isUserBlog}) => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);

    const handleShowModal = () => setShowModal(true);

    const handleDeleteItem = () => {
        // Implement delete logic here
        console.log("Deleting item...");
        // Example: make API call to delete item
        handleCloseModal(); // Close modal after delete
    };

    return (
        <>
            <div className="card-header">
                <img src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg" alt="rover"/>
            </div>
            <div className="card-body">
                <span className="tag tag-teal">Technology</span>
                <h4>
                    Why is the Tesla Cybertruck designed the way it
                    is?
                </h4>
                <p>
                    An exploration into the truck's polarising design
                </p>
                <Card.Text className="text-muted">
                    <small>{`Posted by ${author} at ${timePosted}`}</small>
                </Card.Text>
                <br/>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    variant="primary"
                >
                    {open ? 'Hide Comments' : 'Show Comments'}
                </Button>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        {comments.map((comment, index) => (
                            <p key={index}>{comment}</p>
                        ))}
                    </div>
                </Collapse>
                {isUserBlog &&
                    (<>
                            <Button
                                variant="danger"
                                style={{marginTop: '5px'}}
                                onClick={handleShowModal}
                            >
                                Delete blog
                            </Button>
                            <DeleteConfirmationModal
                                show={showModal}
                                handleClose={handleCloseModal}
                                handleConfirm={handleDeleteItem}
                            /></>
                    )
                }
            </div>
        </>
    )
        ;
};

export default BlogCardShort;