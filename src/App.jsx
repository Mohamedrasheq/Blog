import { useEffect, useState } from 'react';
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import Post from './Post';
import About from './About';
import Footer from './Footer';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Posts_val from './Posts_val';
import Editform from './Editform';

function App() {
  const navigate = useNavigate();
  const [display, setDisplay] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [year, setYear] = useState("");
  const [body, setBody] = useState("");
  const disp = display;

  const handleSubmit = (e) => {
    console.log(searchItem);
    console.log(disp);
    e.preventDefault();
    if (searchItem === "") {
      setDisplay(disp);
    } else {
      const val = display.filter(
        (item) =>
          item.body.toLowerCase().includes(searchItem.toLowerCase()) ||
          item.title.toLowerCase().includes(searchItem.toLowerCase())
      );
      setDisplay(val);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const val = { id, title: name, date: year, body };

    try {
      console.log(id); // For debugging purposes
      // Update state with the new data
      setDisplay(display.map((item) => (item.id === id ? { ...item, ...val } : item)));

      setName("");
      setBody("");
      setId("");
      setYear("");
      navigate('/'); // Redirect after successful edit (if necessary)
    } catch (err) {
      console.error(err.stack || err.message); // Corrected error logging
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    console.log(`Deleting post with id: ${id}`); // Debug statement
    try {
      setDisplay(display.filter((item) => item.id !== id));
      navigate("/");
    } catch (err) {
      console.error(`Delete failed: ${err.message || err}`); // Debug statement
    }
  };

  const userDataSubmit = async (e) => {
    e.preventDefault();
    const val = { id, title: name, date: year, body };

    try {
      // Update the display with the new data
      const dataVal = [...display, val];
      setDisplay(dataVal);
      setName("");
      setBody("");
      setId("");
      setYear("");
      navigate('/');
    } catch (err) {
      console.error(err.message || err); // Use `err.message` for a descriptive error message
    }
  };

  useEffect(() => {
    const defaultPosts = [
      {
        id: 1,
        title: "Introduction to React",
        date: "2024-08-01",
        body: "React is a JavaScript library for building user interfaces. It allows developers to create single-page applications with a component-based architecture.",
      },
      {
        id: 2,
        title: "Understanding JavaScript Closures",
        date: "2024-08-15",
        body: "Closures are a fundamental concept in JavaScript. They allow a function to retain access to its lexical scope even after the function has finished executing.",
      },
      {
        id: 3,
        title: "Getting Started with Node.js",
        date: "2024-09-01",
        body: "Node.js is a runtime environment that allows you to execute JavaScript code on the server side. It's built on the V8 JavaScript engine and is designed for building scalable network applications.",
      },
      {
        id: 4,
        title: "CSS Grid Layout Basics",
        date: "2024-09-10",
        body: "CSS Grid Layout is a powerful tool for creating complex web layouts. It allows for precise placement of elements in a grid format, simplifying the design of responsive layouts.",
      },
      {
        id: 5,
        title: "Introduction to REST APIs",
        date: "2024-09-15",
        body: "REST APIs allow communication between different software systems over HTTP. They use standard HTTP methods and status codes to perform operations like CRUD (Create, Read, Update, Delete).",
      },
      {
        id: 6,
        title: "Building a Responsive Navbar",
        date: "2024-09-20",
        body: "Creating a responsive navbar involves using CSS techniques to ensure the navigation menu adapts to different screen sizes. Media queries and flexible layouts are key to achieving a responsive design.",
      },
      {
        id: 7,
        title: "Exploring TypeScript",
        date: "2024-09-25",
        body: "TypeScript is a superset of JavaScript that adds static types. It helps catch errors early through type checking and offers improved code readability and maintainability.",
      },
      {
        id: 8,
        title: "Async/Await in JavaScript",
        date: "2024-10-01",
        body: "Async/Await is a feature in JavaScript that simplifies working with asynchronous code. It allows you to write asynchronous code that looks and behaves like synchronous code.",
      },
      {
        id: 9,
        title: "Introduction to GraphQL",
        date: "2024-10-05",
        body: "GraphQL is a query language for APIs that allows clients to request only the data they need. It provides a more efficient, flexible, and powerful alternative to REST.",
      },
      {
        id: 10,
        title: "Designing with Flexbox",
        date: "2024-10-10",
        body: "Flexbox is a CSS layout module that makes it easier to design flexible and responsive layout structures. It allows you to align and distribute space among items in a container.",
      },
      {
        id: 11,
        title: "Introduction to Server-Side Rendering",
        date: "2024-10-15",
        body: "Server-Side Rendering (SSR) is a technique where the HTML of a web page is generated on the server and sent to the client. This can improve performance and SEO compared to client-side rendering.",
      },
      {
        id: 12,
        title: "Understanding WebSockets",
        date: "2024-10-20",
        body: "WebSockets provide a full-duplex communication channel over a single TCP connection. They enable real-time interaction between clients and servers, making them ideal for applications like chat and live updates.",
      },
    ];

    setDisplay(defaultPosts);
  }, []);

  return (
    <>
      <Header />
      <Nav searchItem={searchItem} setSearchItem={setSearchItem} handleSubmit={handleSubmit} />
      <Routes>
        <Route path="/" element={<Home display={display} />} />
        <Route path="/post" element={<Post id={id} setId={setId} name={name} setName={setName} year={year} setYear={setYear} userDataSubmit={userDataSubmit} body={body} setBody={setBody} />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts_val/:id" element={<Posts_val display={display} handleDelete={handleDelete} name={name} setName={setName} year={year} setYear={setYear} userDataSubmit={userDataSubmit} body={body} setBody={setBody} />} />
        <Route path="/edit_form/:id" element={<Editform handleEdit={handleEdit} id={id} setId={setId} name={name} setName={setName} year={year} setYear={setYear} userDataSubmit={userDataSubmit} body={body} setBody={setBody} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
