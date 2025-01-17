import React, {useEffect, useState} from 'react';
import {Button, Card, Collapse} from "react-bootstrap";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import axios from "axios";
import {baseURL, creatImageBlob, fetchStudent, handlesError, timeAgo} from "../services/Utils";
import {getItem} from "../services/LocalStorageService";

const BlogCardShort = ({contents, comments, setOpen, open, author, timePosted, isUserBlog, blogId, refresh}) => {
    const [showModal, setShowModal] = useState(false);
    const [student, setStudent] = useState();
    const [image, setImage] = useState('');
    useEffect(() => {
        fetchStudent(author).then(response => {
            setStudent(response);
        }).catch(error => {
            handlesError(error?.response);
        })
        if (blogId) {
            fetchBlogImage(blogId).then(response => {
                const size = response?.size;
                if (size !== 0) {
                    setImage(URL.createObjectURL(creatImageBlob(response)));
                } else {
                    setImage('');
                }
            }).catch(error => {
                setImage('');
                handlesError(error?.response);
            })
        }

    }, []);


    const fetchBlogImage = async (id) => {
        try {
            const response = await axios({
                method: 'get',
                url: `${baseURL}/images/by-blog/${id}`,
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${getItem('access_token')}`
                },
            });
            return response.data;
        } catch (error) {
            handlesError(error?.response)
        }
    };

    const handleCloseModal = () => setShowModal(false);

    const handleShowModal = () => setShowModal(true);

    const handleDeleteItem = () => {
        deleteBlog(blogId).then(response => {
            handleCloseModal();
            refresh();
        }).catch(error => {
            handleCloseModal();
            handlesError(error?.response);
        })
    };

    const deleteBlog = async (blogId) => {
        try {
            await axios.delete(`${baseURL}/blogs/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${getItem('access_token')}`, // Assuming you have a function to get access token
                },
            });
        } catch (error) {
            console.error('Error deleting resource:', error);
        }
    };

    return (
        <>
            <div className="card-header">
                <img
                    src={image !== '' ? image : "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg"}
                    alt="rover"/>
            </div>
            <div className="card-body">
                <span
                    className="tag tag-teal">{student ? (student?.country + ", " + student?.university) : ('Unknown')}</span>
                <p>
                    {contents}
                </p>
                <Card.Text className="text-muted">
                    Posted by <span
                    className={'text-primary'}>@{author}</span><small>{`,  ${timeAgo(timePosted)}`}</small>
                </Card.Text>
                <br/>
                {comments?.length !== 0 && <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    variant="primary"
                >
                    {open ? 'Hide Comments' : 'Show Comments'}
                </Button>}

                <Collapse in={open}>
                    <div id="example-collapse-text">
                        {comments.map((comment, index) => (
                            <p key={index}><span className={'text-primary'}>@{comment?.author}</span> {comment?.comment}
                            </p>
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