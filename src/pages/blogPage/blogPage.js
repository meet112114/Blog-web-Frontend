import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import "../blogPage/blogPage.css"
import logo from '../../assets/images/Linkedin.png'
import BGIMAGE from "../../assets/images/bg1.jpg"
import facebookIcon from '../../assets/images/facebook.png';
import twitterIcon from '../../assets/images/twitter1.png';
import emailIcon from "../../assets/images/email1.png"
// import { Helmet } from 'react-helmet';
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";



const BlogPage = () => {
  const isProduction = process.env.NODE_ENV === 'production';
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

  const URL = `http://localhost:3000/blogInfo/${id}`
  console.log(URL)

  return (
  
    < div className='' style={{ backgroundImage: `url(${BGIMAGE})` ,backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', }}>
      {/* <Helmet>
        <title>{blog.title}</title>
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.content} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="article" />
      </Helmet> */}
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

    <FacebookShareButton
            url={isProduction ? "https://your-production-url.com" : "https://www.example.com"}
            quote={`${blog.title}\n\n${blog.content}`}
            hashtag="#techBlogs"
          >
            <button className='social-button'>
              <img src={facebookIcon} alt="Facebook" />
            </button>
          </FacebookShareButton>   


        <EmailShareButton
          url={URL}
          subject={blog.title}
          body={blog.content}
        >
          <button className='social-button' >
            <img src={emailIcon} alt="Facebook" />
          </button>
        </EmailShareButton>    
          


          <TwitterShareButton
          url={URL}
          title={blog.title}
        >
          <button className='social-button'>
            <img src={twitterIcon} alt="Twitter" />
          </button>
          </TwitterShareButton>
    </div>      
  
  </div>
  </div>
  )
}

export default BlogPage