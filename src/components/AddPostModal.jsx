import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, Box, TextField, Button } from "@mui/material";
import { addPost, updatePost, fetchAllPosts } from '../api/posts';

function AddPostPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const postToEdit = location?.state?.post;
  const [postInput, setPostInput] = useState({ title: "", author: "", content: "" });

  useEffect(() => {
    if(postToEdit) {
      setPostInput({ title: postToEdit.title, author: postToEdit.author, content: postToEdit.content });
    } else {
      setPostInput({ title: "", author: "", content: "" });
    }
  }, [postToEdit]);

  const handleChange = (e) => {
    setPostInput({ ...postInput, [e.target.name]: e.target.value });
  };

  const fetchPosts = async () => await fetchAllPosts();
  const handleSubmit = async () => {
    try {
      if(postToEdit) {
        await updatePost(postToEdit.id, postInput)
      } else {
        await addPost(postInput);
      }
      
      fetchPosts();
      setPostInput({ title: "", content: "" });
      navigate("/posts")
    } catch(e) {
      console.error(e.message || "Error add new post");
    }
  };

  const { title, author, content } = postInput;
  return (
    <Box sx={{ width: 400, p: 4, backgroundColor: "white", margin: "auto", mt: 6 }}>
      <h2>{postToEdit ? `Edit Post "${postToEdit.title}"` : "Add a New Post"}</h2>
      <TextField
        fullWidth
        label="Title"
        name="title"
        variant="outlined"
        value={title}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Author"
        name="author"
        variant="outlined"
        value={author}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Content"
        name="content"
        variant="outlined"
        value={content}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={4}
      />
      <Button onClick={handleSubmit} variant="contained" color="success" fullWidth>
        {postToEdit ? "Edit Post" : "Create Post"}
      </Button>
    </Box>
  )
}

export default AddPostPage
