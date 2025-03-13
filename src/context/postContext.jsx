import React, { createContext, useState } from 'react'

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [clickedPostId, setClickedPostId] = useState(null);
  return (
    <PostContext.Provider value={{ clickedPostId, setClickedPostId }}>
      {children}
    </PostContext.Provider>
  )
}

