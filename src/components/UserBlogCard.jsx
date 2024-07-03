import React, {useState} from 'react';
import BlogCardShort from "./BlogCardShort";

const UserBlogCard = ({comments, timePosted, author, blogText, blogId,refresh}) => {
    const [open, setOpen] = useState(false);

    return (
        <BlogCardShort contents={blogText} blogId={blogId} comments={comments} open={open} setOpen={setOpen}
                       timePosted={timePosted} author={author}
                       isUserBlog={true} refresh={refresh}/>
    );
};

export default UserBlogCard;