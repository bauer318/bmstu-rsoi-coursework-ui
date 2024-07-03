import React, {useState} from 'react';
import '../blog-card.css';
import CommentInput from "./CommentInput";
import BlogCardShort from "./BlogCardShort";
import axios from "axios";
import {baseURL, handlesError} from "../services/Utils";
import {getItem} from "../services/LocalStorageService";

const BlogCard = ({blogText, author, timePosted, blogComments, blogId}) => {
        const [open, setOpen] = useState(false);
        const [comments, setComments] = useState(blogComments);
        const handleAddComment = (newComment) => {
            addComment(blogId, newComment).then(
                response => {
                    fetchCommentsByBlog(blogId).then(data => {
                        setComments(data);
                    }).catch(error => {
                        handlesError(error?.response);
                    })
                }
            ).catch(error => {
                handlesError(error?.response);
            })
        };
        const addComment = async (blogId, newComment) => {
            const data = {
                blogDto: {
                    id: blogId
                },
                blogCommentsDto: [{
                    comment: newComment
                }]
            }
            try {
                await axios.post(baseURL + '/blogs/comments/add', data, {
                    headers: {
                        'Authorization': `Bearer ${getItem('access_token')}`
                    }
                });
            } catch (error) {
                handlesError(error?.response);
            }
        }

        const fetchCommentsByBlog = async (blogId) => {
            try {
                const response = await axios.get(baseURL + `/blogs/comments/by-blog/${blogId}`, {
                    headers: {
                        'Authorization': `Bearer ${getItem('access_token')}`
                    }
                });
                return response?.data;
            } catch (error) {
                handlesError(error?.response);
            }
        }
        return (
            <div className="card col-md-4 col-sm-6 col-12">
                <BlogCardShort contents={blogText} comments={comments} author={author} timePosted={timePosted} open={open}
                               setOpen={setOpen} blogId={blogId}/>
                <div className={"card-footer"}>
                    <CommentInput onAddComment={handleAddComment}/>
                </div>
            </div>
        );
    }
;

export default BlogCard;