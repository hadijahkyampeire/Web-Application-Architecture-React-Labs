import React, { useEffect, useRef } from 'react'; // Once you un comment out the useState implementation, put back useState
import { Modal, Box, TextField, Button } from "@mui/material";
import { addPost, updatePost } from '../api/posts';

function AddPostModal({ open, handleClose, fetchPosts, postToEdit }) {
  // const [postInput, setPostInput] = useState({ title: "", author: "", content: "" });
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if(postToEdit) {
      // setPostInput({ title: postToEdit.title, author: postToEdit.author, content: postToEdit.content });
      if (titleRef.current) titleRef.current.value = postToEdit.title || "";
      if (authorRef.current) authorRef.current.value = postToEdit.author || "";
      if (contentRef.current) contentRef.current.value = postToEdit.content || "";

    } else {
      // setPostInput({ title: "", author: "", content: "" });
      if (titleRef.current) titleRef.current.value = "";
      if (authorRef.current) authorRef.current.value = "";
      if (contentRef.current) contentRef.current.value = "";
    }
  }, [postToEdit]);

  // const handleChange = (e) => {
  //   setPostInput({ ...postInput, [e.target.name]: e.target.value });
  // };

  console.log(titleRef.current, 'ddd')

  const handleSubmit = async () => {
    const title = titleRef.current.value;
    const author = authorRef.current.value;
    const content = contentRef.current.value;

    const data = { title, author, content };
    
    try {
      if(postToEdit) {
        await updatePost(postToEdit.id, data)
      } else {
        await addPost(data);
      }
      
      fetchPosts();
      handleClose();
      // setPostInput({ title: "", author: "", content: "" });
    } catch(e) {
      console.error(e.message || "Error add new post");
    }
  };

  // const { title, author, content } = postInput;
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width: 400, p: 4, backgroundColor: "white", margin: "auto", mt: 10 }}>
        <h2>{postToEdit ? `Edit Post ${postToEdit.title}` : "Add a New Post"}</h2>
        <form>
          <TextField
            fullWidth
            label="Title"
            name="title"
            variant="outlined"
            inputRef={titleRef}
            // value={title}
            // onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Author"
            name="author"
            variant="outlined"
            inputRef={authorRef}
            // value={author}
            // onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Content"
            name="content"
            variant="outlined"
            inputRef={contentRef}
            // value={content}
            // onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />
          <Button onClick={handleSubmit} variant="contained" color="success" fullWidth>
            {postToEdit ? "Update Post" : "Create Post"}
          </Button>
        </form>
      </Box>
  </Modal>
  )
}

export default AddPostModal
