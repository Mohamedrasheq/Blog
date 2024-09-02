import { useEffect, useState } from 'react'
import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import Post from './Post'
import About from './About'
import Footer from './Footer'
import { Route, Routes } from 'react-router-dom'
import api from '../api/posts'
import { useNavigate } from 'react-router-dom';
import Posts_val from './Posts_val'
import Editform from './Editform'


function App() {
const navigate = useNavigate();
const [display,setDisplay]=useState([])  
const [searchItem,setSearchItem]=useState("");
const [name,setName]=useState("")
const [id,setId]=useState("")
const [year,setYear]=useState("")
const [body,setBody]=useState("")
const disp=display

  const handleSubmit = (e) =>
  {
    console.log(searchItem);
    console.log(disp);
    e.preventDefault();
    if(searchItem=="")
    {
      setDisplay(disp);
    }
    else{
      const val=display.filter((item)=>((item.body).toLowerCase()).includes(searchItem.toLowerCase()) || ((item.title).toLowerCase()).includes(searchItem.toLowerCase()))
      setDisplay(val);
    }
  }
const handleEdit = async (e) => {
  e.preventDefault();
  
  const val = { id, title: name, date: year,body };

  try {
    console.log(id); // For debugging purposes

    // Make PUT request to the server
    const response = await api.put(`/posts/${id}`, val);
    
    // Update state with the new data
    setDisplay(display.map((item) =>
      item.id === id ? { ...item, ...response.data } : item
    ));
    
    setName("")
    setBody("")
    setId("")
    setYear("")
    navigate('/') // Redirect after successful edit (if necessary)
  } catch (err) {
    console.error(err.stack || err.message); // Corrected error logging
  }
};

const handleDelete = async (e,id) => {
  e.preventDefault();
  console.log(`Deleting post with id: ${id}`); // Debug statement
  try {
    await api.delete(`/posts/${id}`);
    console.log('Delete successful'); // Debug statement
    setDisplay(display.filter((item) => item.id !== id));
    navigate("/");
  } catch (err) {
    console.error(`Delete failed: ${err.message || err}`); // Debug statement
  }
};


const userDataSubmit = async (e) => {
  e.preventDefault();
  
  // Ensure `id`, `name`, `year`, and `body` are defined and in scope
  const val = { "id":id, "title":name, "date":year, "body":body };

  try {
    // Make the API request
    const response = await api.post('/posts', val);
    // Update the display with the new data
    const dataVal = [...display, response.data];
    setDisplay(dataVal);
    setName("")
    setBody("")
    setId("")
    setYear("")
    navigate('/')
  } catch (err) {
    // Correct error logging
    console.error(err.message || err); // Use `err.message` for a descriptive error message
  }
};


useEffect(()=>{
  const fun = async ()=>{
    try{
      const response= await api.get("/posts");
      setDisplay(response.data)
    }
    catch(err)
    {
      console.log(err.stalk)
    }

  }
  fun();
},[]
)
  return (
    <>
        <Header />
        <Nav searchItem={searchItem} setSearchItem={setSearchItem} handleSubmit={handleSubmit} />
        <Routes>
          <Route path="/" element={<Home display={display} />}/>
          <Route path="/post" element={<Post id={id} setId={setId} name={name} setName={setName} year={year} setYear={setYear} userDataSubmit={userDataSubmit} body={body} setBody={setBody} />} />
          <Route path="/about" element={ <About />} />
          <Route path="/posts_val/:id" element ={<Posts_val display={display} handleDelete={handleDelete} name={name} setName={setName} year={year} setYear={setYear} userDataSubmit={userDataSubmit} body={body} setBody={setBody}/>} />
          <Route path="/edit_form/:id" element={<Editform handleEdit={handleEdit} id={id} setId={setId} name={name} setName={setName} year={year} setYear={setYear} userDataSubmit={userDataSubmit} body={body} setBody={setBody}/>}/>
        </Routes>
        <Footer />
    </>
  )
}

export default App
