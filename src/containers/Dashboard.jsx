import React, { useState } from 'react';
import Posts from '../components/Posts';
import './dashboard.css';
import PostDetails from '../components/PostDetails';

const posts = [
  { id: 111, title: "Happiness", author: "John", content: "This is content for post one" },
  { id: 112, title: "MIU", author: "Dean", content: "This is content for post two" },
  { id: 113, title: "Enjoy Life", author: "Jasmine", content: "This is content for post three" }
];

function Dashboard() {
  const [title, setTitle] = useState('');
  const [postData, setPostsData] = useState(posts);

  const [clickedPostId, setClickedPostId] = useState(null);
  console.log(clickedPostId, 'clicked')
  
  const handleChangeFirstPostTitle = () => {
    const updatePosts = postData.map((p, i) => i === 0 ? {...p, title }: p);
    setPostsData(updatePosts);
  }

  const postToDisplay = postData.find(p => p.id === clickedPostId) || null;

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
      <Posts posts={postData} setClickedPostId={setClickedPostId} />
      <h2>Post Details</h2>
      {postToDisplay !== null
        ? <PostDetails post={postToDisplay} /> 
        : <div>No clicked post, please click a post to display its details</div>}
    </div>
  )
}

export default Dashboard