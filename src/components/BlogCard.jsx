import React, {useState} from 'react';
import '../blog-card.css';
import {Button, Card, Collapse} from "react-bootstrap";
import CommentInput from "./CommentInput";

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
            </div>
            <div className={"card-footer"}>
                <CommentInput onAddComment={handleAddComment}/>
            </div>
        </div>
    );
};

export default BlogCard;