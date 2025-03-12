import React, { useState } from 'react';
import Posts from '../components/Posts';
import './dashboard.css';
import PostDetails from '../components/PostDetails';

function Dashboard() {
  const [title, setTitle] = useState('');
  const [postData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postDetails, setPostDetails] = useState(null);
  const [postToEdit, setPostToEdit] = useState(null);

  const [clickedPostId, setClickedPostId] = useState(null);
  console.log(clickedPostId, 'clicked')
  
  const handleChangeFirstPostTitle = () => {
    const updatePosts = postData.map((p, i) => i === 0 ? {...p, title }: p);
    setPostsData(updatePosts);
  }

  const postToDisplay = postData.find(p => p.id === clickedPostId) || null;
  const handlePostDelete = async (postId) => {
    await deletePost(postId);
    setPostDetails(null);
    getAllPosts();
  };

  const handleEditPost = (post) => {
    setPostToEdit(post);
    setPostDetails(post);
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
      <Posts posts={postData} setClickedPostId={setClickedPostId} />
      <h2>Post Details</h2>
      {postToDisplay !== null
        ? <PostDetails post={postToDisplay} /> 
        : <div>No clicked post, please click a post to display its details</div>}
      {loading && <div>Loading post details...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && postDetails ? (
        <PostDetails 
          post={postDetails} 
          fetchPosts={getAllPosts} 
          handleEditPost={handleEditPost}
          handleDeletePost={handlePostDelete} />
      ) : (
        <div>No clicked post, please click a post to display its details</div>
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