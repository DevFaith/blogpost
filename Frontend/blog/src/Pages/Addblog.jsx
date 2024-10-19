import React, { useState } from 'react';
import { db, storage } from '../Firebase/Config'; // Import Firestore and Storage
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddBlog() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !image) {
      setError('All fields are required');
      return;
    }

    setLoading(true);

    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `blogImages/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // Save blog details to Firestore
      await addDoc(collection(db, 'blogs'), {
        name,
        description,
        imageUrl,
        createdAt: new Date(),
      });

      setLoading(false);
      setName('');
      setDescription('');
      setImage(null);
      setError('');
      alert('Blog added successfully');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" mx-auto p-6 bg-white shadow-md rounded-lg"> {/* Increased max-w to 4xl */}
        <h1 className="text-2xl font-bold mb-4">Add a New Blog</h1>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-gray-700">Image</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
          >
            {loading ? 'Adding...' : 'Add Blog'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;
