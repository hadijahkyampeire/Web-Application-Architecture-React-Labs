import React, { useState, useEffect } from 'react';
import Posts from '../components/Posts';
import './dashboard.css';
import { fetchAllPosts } from '../api/posts';

function Dashboard() {
  const [title, setTitle] = useState('');
  const [postData, setPostsData] = useState([]);
  
  const handleChangeFirstPostTitle = () => {
    const updatePosts = postData.map((p, i) => i === 0 ? {...p, title }: p);
    setPostsData(updatePosts);
  }

  const getAllPosts = () => {
    fetchAllPosts()
      .then((res) => setPostsData(res.data))
      .catch((e) => console.error(e.message || "Error fetching posts"));
  }

  useEffect(() => {
    getAllPosts();
  }, []);


  return (
    <div className='dashboard'>
      <div className='form'>
        <input type="text" name="post-title" value={title} onChange={e => setTitle(e.target.value)}/>
        <button 
          onClick={handleChangeFirstPostTitle} 
          disabled={title.trim() === ''}>
            Change Name
        </button>
      </div>
      <Posts posts={postData} />

    </div>
  )
}

export default Dashboard