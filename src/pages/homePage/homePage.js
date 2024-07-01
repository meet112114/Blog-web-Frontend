import React, { useEffect, useState } from 'react';
import '../homePage/homePage.css'
import BlogPosts from '../../components/blogPost/blogPost';
import BGIMAGE from "../../assets/images/bg.jpg" 

const HomePage = () => {

  const [blog, setBlog] = useState([]);

  const getBlogs = async () => {
    try{
      const res = await fetch('http://localhost:5000/blogs' , {
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

  return (
    < div className='' style={{ backgroundImage: `url(${BGIMAGE})` ,backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', }}>
    <div className='main-title'>
      {" Latest Tech Blogs "}
    </div>
     <BlogPosts data={blog}/>
    </div>
   
   
    
  )
}

export default HomePage