import React, { useState, useEffect } from 'react'
import axios from "axios";
import "./styles.css"
import SearchBar from '../../components/search/SearchBar';
import Create from '../../components/create/Create';
import Edit from '../../components/edit/Edit';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchterm, setSearchTerm] = useState("")
  const [showCreate, setShowCreate] = useState(false)
  const handleCloseCreate = () => setShowCreate(false)
  const handleShowCreate = () => setShowCreate(true)
  const [showEdit, setShowEdit] = useState(false)
  
  const [selectId, setSelectId] = useState([])
  const handleShowEdit = (id) => {
    setSelectId(id)
    setShowEdit(true)
  }
  const handleCloseEdit = () => setShowEdit(false)
  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    axios
      .get("https://limitless-forest-49003.herokuapp.com/posts")
      .then((res) => {
        const results = res.data;
        setPosts(results)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(true))
  }

  function handleDelete(id, e) {
    e.preventDefault()
    axios
      .delete(`https://limitless-forest-49003.herokuapp.com/posts/${id}`)
      .then(() => {
        getAllPosts()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (loading) {
    return (
      <div className='container'>
        <div className='d-flex justify-content-between'>
          <SearchBar onChange={(event) => {setSearchTerm(event.target.value)}}/>
          <button className='btn btn-add ms-3' type='button' onClick={() => handleShowCreate()}>ADD+</button>
          <Create 
            show={showCreate}
            onHide={handleCloseCreate}
            getAllPosts={getAllPosts}
          />
        </div>
        {posts.filter((val) => {
          if (searchterm === "") {
            return val
          } else if (val.title.toLowerCase().includes(searchterm.toLowerCase())) {
            return val
          }
        }).sort((a, b) => {
          return a.id - b.id
        }).map((item) => {
          return (
            <div className='postsCard p-4 mt-3' key={item.id}>
              <h3>{item.title}</h3>
              <small>{item.content}</small>
              <div className='d-flex justify-content-end mt-3'>
                <button onClick={() => handleShowEdit(item.id)} className='btn btn-outline-primary me-2' type='button'>Edit</button>
                <button onClick={(e) => handleDelete(item.id, e)} className='btn btn-outline-danger' type='button'>Delete</button>
              </div>
            </div>
          )
        })}
        <Edit
          show={showEdit}
          onHide={handleCloseEdit}
          selectId={selectId}
          getAllPosts={getAllPosts}
        />
      </div>
    )
  } else {
    return (
      <div className='container mt-5'>
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
      </div>
      </div>
    )
  }
}

export default AllPosts