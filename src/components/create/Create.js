import React, { useState } from 'react'
import "./styles.css"
import axios from 'axios'

function Create() {
  const [addPosts, setAddPosts] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("https://limitless-forest-49003.herokuapp.com/posts", {
        title: addPosts.title,
        content: addPosts.content
      });
      clear()
  }
  const clear = () => {
    setAddPosts({title: "", content: ""})
  }
  
  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Create Posts</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
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
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Create