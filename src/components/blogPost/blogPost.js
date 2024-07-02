import React from 'react';
import { Link } from 'react-router-dom';
import "../blogPost/blogPost.css";

const BlogPosts = ({ data }) => {
    return (
        <div className="main">
            {data.map(blog => (
                <Link to={`/blogInfo/${blog._id}`}   key={blog.title} className="blog-post-link">
                    <button className="blogs">
                        <div className='image-sec'>
                            <img
                                className="blogImage"
                                src={blog.image}
                                alt=""
                            />
                        </div>
                        <div className="info-sec">
                            <div className='blogTitle'>
                                {blog.title}
                            </div>
                            <div className='blogSnippet'>
                                {blog.snippet}
                            </div>
                        </div>
                    </button>
                </Link>
            ))}
        </div>
    );
}

export default BlogPosts;