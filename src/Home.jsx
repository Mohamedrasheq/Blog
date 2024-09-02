import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({display}) => {
  
  return (
    <>
    <div className="container">
    {display.map((item)=>(
      
        <div key={item.id}>
           <Link to={`posts_val/${item.id}`}><h1>{item.title}</h1></Link> 
            <p>{item.date}</p>
            <p>{item.body}</p>
        </div>
    ))}
    </div>
    </>
  )
}

export default Home
