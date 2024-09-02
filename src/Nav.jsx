import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ searchItem, setSearchItem, handleSubmit }) => {
  return (
    <nav>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoFocus
          placeholder="Search data"
          value={searchItem}
          onChange={(e)=>setSearchItem(e.target.value)}

        />
      </form>
      <Link to="/">Home</Link>
      <Link to="/post">Post</Link>
      <Link to="/about">About</Link>
    </nav>
  );
};

export default Nav;
