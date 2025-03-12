import React from 'react'

function Comments({ comments }) {
  return (
    <div>{comments.length > 0 
      ? <ul className='comments-list'>
        {comments.map(comment => <li key={comment.id}>{comment.name}</li>)}
        </ul>
      : <div>No comments on the post</div>}</div>
  )
}

export default Comments;
