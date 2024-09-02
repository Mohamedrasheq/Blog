import React from 'react'
import { Link, useParams } from 'react-router-dom'
 // Import the CSS file

const Posts_val = ({display,handleDelete}) => {
    const {id} = useParams();
    return (
        <>
        <div className="post-container">
            {display.map((item) => item.id == id ? (
                <div key={item.id}>
                    <h1>{item.title}</h1> 
                    <p>{item.date}</p>
                    <p>{item.body}</p>
                </div>
            ) : null)}
            <div className="button-container">
                <button><Link to={`/edit_form/${id}`}>Edit</Link></button>
                <button onClick={(e)=>handleDelete(e,id)}>Delete</button>
            </div>
        </div>
        </>
    )
}

export default Posts_val;

