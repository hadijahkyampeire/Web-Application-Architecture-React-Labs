import React, { useState, useEffect, useContext } from 'react';
import Posts from '../components/Posts';
import './dashboard.css';
import PostDetails from '../components/PostDetails';
import { fetchAllPosts, fetchPost, deletePost } from '../api/posts';
import AddPostModal from '../components/AddPostModal';
import { PostContext } from '../context/postContext';

function Dashboard() {
  const {clickedPostId, setClickedPostId } = useContext(PostContext);
  console.log(clickedPostId, 'select')
  const [title, setTitle] = useState('');
  const [postData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postDetails, setPostDetails] = useState(null);
  const [postToEdit, setPostToEdit] = useState(null);

  // const [clickedPostId, setClickedPostId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleChangeFirstPostTitle = () => {
    const updatePosts = postData.map((p, i) => i === 0 ? {...p, title }: p);
    setPostsData(updatePosts);
  }

  const handlePostDelete = async (postId) => {
    await deletePost(postId);
    setPostDetails(null);
    getAllPosts();
  };

  const handleEditPost = (post) => {
    setPostToEdit(post);
    handleOpen();
  }

  const getAllPosts = () => {
    fetchAllPosts()
      .then((res) => setPostsData(res.data))
      .catch((e) => console.error(e.message || "Error fetching posts"));
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    if (!clickedPostId) return;

    setLoading(true);
    setError(null);

    fetchPost(clickedPostId)
      .then((res) => setPostDetails(res.data.data))
      .catch((e) => setError(e.message || "Error fetching post details"))
      .finally(() => setLoading(false));
  }, [clickedPostId]);

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
        <button className='new-post-btn' onClick={handleOpen}>Add New Post</button>
        <Posts posts={postData} setClickedPostId={setClickedPostId} />
        {loading && <div>Loading post details...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {!loading && !error && postDetails ? (
          <PostDetails 
            post={postDetails} 
            handleEditPost={handleEditPost}
            handleDeletePost={handlePostDelete} />
        ) : (
          <div>No selected post, please click a post to display its details</div>
        )}
        <AddPostModal 
          open={open} 
          handleClose={handleClose} 
          postToEdit={postToEdit}
          fetchPosts={getAllPosts} />
      </div>
  )
}

export default Dashboard