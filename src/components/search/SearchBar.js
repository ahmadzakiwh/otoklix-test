import React from 'react'
import "./styles.css"

function SearchBar(props) {
  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <form className="d-flex">
          <input className="form-control" type="search" placeholder="Search" value={props.value} onChange={props.onChange}/>
        </form>
      </div>
    </div>
  )
}

export default SearchBar