import React from 'react';
import BlogCard from "../components/BlogCard";

const UserHome = () => {
    return (
        <div className="row ">
            <h4 className={"text-center"}>Blogs</h4>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
        </div>
    )
};

export default UserHome;