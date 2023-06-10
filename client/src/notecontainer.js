/*global chrome*/
import React from 'react'
import Note from './note.js'
import {useState} from 'react'
import {useEffect} from 'react'

function NoteContainer(){
  
  const[notes, setNotes] = useState([])
  const[url, setUrl] = useState('')
  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const tabUrl = tabs[0].url;
      const urlObj = new URL(tabUrl);
      const originUrl = urlObj.origin;
      console.log(originUrl);
      setUrl(originUrl);
    });
  }, []);

  useEffect(() => {
    async function fetchNote(){
      const res = await fetch('https://post-it-api.onrender.com/note',{
        method:"GET",
      })
      const data = await res.json()
      const filtered = data.notes.filter((res) => res.webaddress === url)
      console.log("GET SUCCESS")
      setNotes(filtered)
    }
    if(url !== '')
      fetchNote()
  },[url])

  async function handleSubmit(e){
    e.preventDefault()
    const note = {
      title: e.target.elements.title.value,
      note: e.target.elements.note.value,
      webaddress: url
    }
    try {
      const res = await fetch('https://post-it-api.onrender.com/note' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
      })
      const resJson = await res.json ();
      note._id = resJson._id
      console.log("POST SUCCESS")
      setNotes([...notes, note])
      e.target.reset()
    } catch (error) {
      console.log(error)
    }
  }
  
  async function handleDelete(e,id){
    try {
      e.stopPropagation();
      await fetch(`https://post-it-api.onrender.com/note/${id}`, {
      method: "DELETE"
      })
      console.log("DELETE SUCCESS")
      setNotes(notes.filter(note => note._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdate(e,id){
    try {
      e.preventDefault()
      await fetch(`https://post-it-api.onrender.com/note/${id}`, {
      method: "PATCH",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: e.target.elements.title.value,
        note: e.target.elements.note.value
      })
      })
      console.log("PACTCH SUCCESS")
      setNotes(
        notes.map((note) => {
          if (note._id === id) {
            return {
              ...note,
              title: e.target.elements.title.value,
              note: e.target.elements.note.value,
            };
          } else {
            return note;
          }
        })
      );
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdateWrapper(e,id){
    handleUpdate(e,id)
  }
  const generateNote = () => notes.map((note) => {
      return(
        <div className='note-history-display' key={note._id}>
            <Note key = {note._id} _id={note._id} title={note.title} content={note.note} handleDelete={(e,id) => handleDelete(e,id)} handleUpdate= {(e,id) => handleUpdateWrapper(e,id)}/>
        </div>
      )
  })

  return(
    <>
      <div id="note-taking-area">
            <form id="noteInfo" onSubmit={handleSubmit}>
                <input id="title" placeholder="name of the note" type="text" name="title" />
                <textarea id="text-area" name="note" placeholder="notes..." ></textarea>
                <button type="submit" className="save-btn">Save</button>
            </form>
      </div>
      <div className='note-history-display-container'> 
        {generateNote()}
      </div>
    </>
  )
}
 export default NoteContainer