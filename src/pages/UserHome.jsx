import React, {useEffect, useState} from 'react';
import BlogCard from "../components/BlogCard";
import axios from "axios";
import {baseURL, handlesError} from "../services/Utils";
import {getItem} from "../services/LocalStorageService";

const UserHome = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        setIsLoad(true);
        fetchBlogs().then(data => {
            setBlogs(data);
            setIsLoad(false);
        }).catch(error => {
            handlesError(error?.response);
        })
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(baseURL + '/blogs', {
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
        <div className="row ">

            <h4 className={"text-center"}>Blogs</h4>
            {blogs?.length > 0 ? (blogs.map((blog, index) => <BlogCard key={index}
                                                                       blogComments={blog?.blogDto?.comments}
                                                                       author={blog?.blogDto?.author}
                                                                       timePosted={blog?.blogDto?.createdAt}
                                                                       blogId={blog?.blogDto?.id}
                                                                       blogText={blog?.blogDto?.blogText}/>)) : isLoad ? (
                <h4 className={'text-center'}>Loading...</h4>) : (
                <h4 className={'text-center'}>No blogs</h4>)}

        </div>

    )
};

export default UserHome;