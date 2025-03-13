import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function NavBar({ loggedInUser, isAuthenticated }) {
  const { firstname, lastname } = loggedInUser;
  return (
    <div className='nav-bar'>
      <div className='left-side'>
        <Link to="/posts">Posts</Link>
        <Link to="/create-post">Add Post</Link>
      </div>

      <div className='right-side'>
        {isAuthenticated ? <div>
            <Link to="#">Profile</Link>
            <div>Welcome, {firstname} {lastname}</div>
          </div>
          : <Link to="/login">Signin</Link>}
      </div>
      
    </div>
  )
}

export default NavBar