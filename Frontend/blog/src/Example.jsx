import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Example() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await axios.get ("http://localhost:4000/blogs")  
        //  console.log(response.data.blogs);
             setBlogs(response.data.blogs);
        } catch (error) {
               console.log(error);
                
            }
        }
        fetchData()
    }, [])
    
  return (
    <div>
        {
            blogs.map( blog =>(
                // console.log(blog)
                
                <div key={blog.id}>
                    <h1>{blog.title}</h1>
                    <p>{blog.content}</p>
                    <img src={blog.imageurl} alt="" />
                </div>
            )) 
        }
    </div>
  )
}

export default Example
// Installing Axios module for making HTTP requests
// import axios 
// useEffect hook 
// Defining Axios "http request method" e.g. GET, POST, PUT, DELETE
// Axios performs asynchronous HTTP requests. 