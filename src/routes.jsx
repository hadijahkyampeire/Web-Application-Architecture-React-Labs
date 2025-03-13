import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import PostDetails from "./components/PostDetails"
import Login from "./components/Login";
import AddPostPage from "./components/AddPostModal"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace />}/>
      <Route path="posts" element={<Dashboard />} />
      <Route path="posts/:id" element={<PostDetails />} />
      <Route path="create-post" element={<AddPostPage />} />
      <Route path="login" element={<Login />} />
    </Routes>
  )
}

export default AppRoutes