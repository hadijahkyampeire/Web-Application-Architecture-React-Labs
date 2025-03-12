import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from "@mui/material";
import { addPost } from '../api/posts';

function AddPostModal({ open, handleClose, fetchPosts }) {
  const [newPost, setNewPost] = useState({ title: "", author: "", content: "" });

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await addPost(newPost);
      fetchPosts();
      handleClose();
      setNewPost({ title: "", content: "" });
    } catch(e) {
      console.error(e.message || "Error add new post");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
    <Box sx={{ width: 400, p: 4, backgroundColor: "white", margin: "auto", mt: 10 }}>
      <h2>Add a New Post</h2>
      <TextField
        fullWidth
        label="Title"
        name="title"
        variant="outlined"
        value={newPost.title}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Author"
        name="author"
        variant="outlined"
        value={newPost.author}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Content"
        name="content"
        variant="outlined"
        value={newPost.content}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={4}
      />
      <Button onClick={handleSubmit} variant="contained" color="success" fullWidth>
        Submit
      </Button>
    </Box>
  </Modal>
  )
}

export default AddPostModal