import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal } from "react-bootstrap"

function Edit(props) {
  const [editPosts, setEditPosts] = useState({
    title: "",
    content: "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault()
    // axios
    //   .put("https://limitless-forest-49003.herokuapp.com/posts", {
    //     title: editPosts.title,
    //     content: editPosts.content
    //   })
    //   .then(() => {
    //     props.onHide()
    //     props.getAllPosts()
    //   })
  }

  useEffect(() => {
    getDataById()
  }, [])

  const getDataById = async () => {
    axios
      .get(`https://limitless-forest-49003.herokuapp.com/posts/`)
      .then((res) => {
        const results = res.data
        setEditPosts(results)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Modal
      {...props}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Posts
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleUpdate}>
        <Modal.Body>
          <label>Title :</label>
          <input
            className='form-control mb-2'
            type="text"
            value={editPosts.title}
            name="title"
            onChange={(e) => setEditPosts({...editPosts, title: e.target.value})}
          />
          <label>Content :</label>
          <textarea
            className='form-control'
            rows="5"
            value={editPosts.content}
            name="content"
            onChange={(e) => setEditPosts({...editPosts, content: e.target.value})}
          />
        </Modal.Body>
        <Modal.Footer>
            <button type='button' className="btn btn-outline-secondary" onClick={props.onHide}>Close</button>
            <button type="submit" className="btn btn-outline-primary">Update</button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default Edit