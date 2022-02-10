import React, { useState } from 'react'
import "./styles.css"
import axios from 'axios'
import { Modal } from "react-bootstrap"

function Create(props) {
  const [addPosts, setAddPosts] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    axios
      .post("https://limitless-forest-49003.herokuapp.com/posts", {
        title: addPosts.title,
        content: addPosts.content
      });
      clear()
      props.onHide()
      props.getAllPosts()
      e.preventDefault();
  }
  const clear = () => {
    setAddPosts({title: "", content: ""})
  }
  
  return (
    <Modal
      {...props}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Posts</Modal.Title>
      </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <input
              className='form-control mb-2'
              type="text"
              placeholder='Title...'
              value={addPosts.title}
              name="title"
              onChange={(e) => setAddPosts({...addPosts, title: e.target.value})}
            />
            <textarea
              className='form-control'
              placeholder='Contents...'
              rows="5"
              value={addPosts.content}
              name="content"
              onChange={(e) => setAddPosts({...addPosts, content: e.target.value})}
            />
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-primary">Submit</button>
          </Modal.Footer>
        </form>
    </Modal>
  )
}

export default Create