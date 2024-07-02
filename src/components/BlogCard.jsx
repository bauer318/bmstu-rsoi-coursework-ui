import React, {useState} from 'react';
import '../blog-card.css';
import {Button, Card, Collapse} from "react-bootstrap";
import CommentInput from "./CommentInput";
import BlogCardShort from "./BlogCardShort";

const BlogCard = () => {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState(['First comments for this user', 'Second comment long but not long and so long long long',
        'Second comment long but not long and so long long long']);
    const handleAddComment = (newComment) => {
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
    };
    const author = 'Bauer Jack';
    const timePosted = '23h38';
    return (
        <div className="card col-md-4 col-sm-6 col-12">
            <BlogCardShort comments={comments} author={author} timePosted={timePosted} open={open} setOpen={setOpen}/>
            <div className={"card-footer"}>
                <CommentInput onAddComment={handleAddComment}/>
            </div>
        </div>
    );
};

export default BlogCard;