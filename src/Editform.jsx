import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Editform = ({ setId, handleEdit, name, setName, body, setBody, year, setYear }) => {
  const { id } = useParams();

  useEffect(() => {
    setId(id);
  }, [id, setId]);  // Run this effect when the `id` changes

  return (
    <div className="form-container">
      <form onSubmit={handleEdit}>
        <label>Title:</label>
        <input
          type="text"
          autoFocus
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Date:</label>
        <input
          type="text"
          placeholder="Date"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <label>Body:</label>
        <input
          type="text"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Editform;
