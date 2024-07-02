import React, {useState} from 'react';
import BlogCardShort from "./BlogCardShort";
import {Button} from "react-bootstrap";

const UserBlogCard = () => {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState(['First comments for this user', 'Second comment long but not long and so long long long',
        'Second comment long but not long and so long long long']);
    const author = 'Bauer Jack';
    const timePosted = '23h38';

    return (
        <BlogCardShort comments={comments} open={open} setOpen={setOpen} timePosted={timePosted} author={author}
                       isUserBlog={true}/>
    );
};

export default UserBlogCard;