import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/Config';
import { collection, getDocs } from "firebase/firestore";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogCollection = collection(db, 'blogs');
      const blogSnapshot = await getDocs(blogCollection);
      const blogList = blogSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div className="space-y-4">
          {blogs.map(blog => (
            <div key={blog.id} className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-bold">{blog.name}</h2>
              <p className="text-gray-700">{blog.description}</p>
              {blog.imageUrl && <img src={blog.imageUrl} alt={blog.name} className="mt-4" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blogs;
