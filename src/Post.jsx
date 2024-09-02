import React from 'react'

const Post = ({name,setName,year,setYear,id,setId,body,setBody,userDataSubmit}) => {
  return (
    <>
      <div className="form-container">
        <form onSubmit={userDataSubmit}>
          <label>id :</label>
          <input type="text"
          autoFocus
          placeholder="id" 
          value={id} 
          onChange={(e)=>setId(e.target.value)}/>
          <label>Title :</label>
          <input type="text"
          autoFocus
          placeholder="Title" 
          value={name} 
          onChange={(e)=>setName(e.target.value)}/>
          <label>Date :</label>
          <input type="text"
          autoFocus
          placeholder="Date" 
          value={year} 
          onChange={(e)=>setYear(e.target.value)}/>
          <label>Body :</label>
          <input type="text"
          autoFocus
          placeholder="Body" 
          value={body} 
          onChange={(e)=>setBody(e.target.value)}/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    </>
  )
}

export default Post
