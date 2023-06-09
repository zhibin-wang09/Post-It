/**
 * This a part of the view component of the MVC model. This file construct the note
 * component where obtians the model data and display it to the view component.
 */
import React from 'react'
import {useState} from 'react'

function Note({_id, title, content, handleDelete}){
  const[editMode, setEditMode] = useState(false)
  const[titleState, setTitle] = useState(title)
  const[contentState, setContent] = useState(content)

  function handleEdit(e){
    e.stopPropagation()
    setEditMode(!editMode)
  }

  if(!editMode){
    return (
      <>
        <div className='header'>
          <h3 className='note-title'>{title}</h3>
          <button className='delete-btn' type='button' data-id={_id} onClick={handleDelete}>Delete Note</button>
          <button className='edit-btn' type='button' data-id={_id} onClick={handleEdit}>Edit Note</button>
        </div>
        <p>{content}</p>
      </>
      )
  }else{
    return (
      <>
        <div className='header'>
          <input name='title' className='update-title' value={titleState} onChange={(e) => setTitle(e.target.value)}/>
          <button className='delete-btn' type='button' data-id={_id} onClick={handleDelete}>Delete Note</button>
          <button className='edit-btn' type='button' data-id={_id} onClick={handleEdit}>Edit Note</button>
        </div>
        <textarea name='note' className='edit-text-area' value={contentState}  onChange={(e) => setContent(e.target.value)}></textarea>
        <button type="submit" className='save-btn' >Update</button>
      </>
      )
  }
}

export default Note