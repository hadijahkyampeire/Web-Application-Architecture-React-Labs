import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button } from "@mui/material";
import { addPost, updatePost } from '../api/posts';

function AddPostModal({ open, handleClose, fetchPosts, postToEdit }) {
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

  const handleSubmit = async () => {
    try {
      if(postToEdit) {
        await updatePost(postToEdit.id, postInput)
      } else {
        await addPost(postInput);
      }
      
      fetchPosts();
      handleClose();
      setPostInput({ title: "", content: "" });
    } catch(e) {
      console.error(e.message || "Error add new post");
    }
  };

  const { title, author, content } = postInput;
  return (
    <Modal open={open} onClose={handleClose}>
    <Box sx={{ width: 400, p: 4, backgroundColor: "white", margin: "auto", mt: 10 }}>
      <h2>Add a New Post</h2>
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
        {postToEdit ? "Update Post" : "Create Post"}
      </Button>
    </Box>
  </Modal>
  )
}

export default AddPostModal