import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import "../blogPage/blogPage.css"
import logo from '../../assets/images/Linkedin.png'
import BGIMAGE from "../../assets/images/bg1.jpg"
import facebookIcon from '../../assets/images/facebook.png';
import twitterIcon from '../../assets/images/twitter1.png';
import instagramIcon from '../../assets/images/instagram.png';

const BlogPage = () => {

  const [blog, setBlog] = useState({});
  let { id } = useParams();
  console.log(id)
  const getBlogs = async () => {
    try{
      const res = await fetch(`http://localhost:5000/blogById/${id}` , {
        method:"GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

       const  data = await res.json();
       setBlog(data);
       console.log(data)
      
      if (!res.status === 200){
        
        const error = new Error(res.error);
        console.log(error)
        throw error;  
      }

    }catch(err){
      console.log(err);
    }
  }
  
  useEffect(() => {
    getBlogs();
    
  }, [])


  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  }

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`, '_blank');
  }

  const shareOnInstagram = () => {
    const caption = encodeURIComponent(`Check out this blog: ${blog.title} ${window.location.href}`);
    window.open(`https://www.instagram.com/?url=${caption}`, '_blank');
  }

  return (
  
    < div className='' style={{ backgroundImage: `url(${BGIMAGE})` ,backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', }}>
    <div className='main-container'>
    <div className='title' >{blog.title}</div>
    <div className='image'>
      <img
          className="blogImg"
          src={blog.image}
          alt=""
          />
    </div>

    <hr></hr>
    <div className='authorInfo'>
      <div className='author-name'>
        {" Author :  "+ blog.author}
      </div>
      <div className='author-link'>
       <a href={blog.authorLink}>
       <img
          className="linkedin-img"
          src={logo}
          alt=""
          />
       </a>
      </div>
    </div>
    <hr></hr>
    <div className='conent'>
      <div  className='conent-info' ><ReactMarkdown children={blog.content} /></div>
    </div>
   
    <div className='social-share'>
          <button className='social-button' onClick={shareOnFacebook}>
            <img src={facebookIcon} alt="Facebook" />
          </button>
          <button className='social-button' onClick={shareOnInstagram}>
            <img src={instagramIcon} alt="Instagram" />
          </button>
          <button className='social-button' onClick={shareOnTwitter}>
            <img src={twitterIcon} alt="Twitter" />
          </button>
    </div>
  </div>
  </div>
  )
}

export default BlogPage