/*global chrome*/
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Note from './note.js'
var url = ""
chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        url = tabs[0].url;
        const urlobj = new URL(url)
        url = urlobj.origin
        console.log(url)
});


class NoteContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      notes: [],
      title : '',
      note : '',
      webaddress: url
    }
    this.fetchData = this.fetchData.bind(this)
  }

  setTitle = (e)=> {
    this.setState({title:e.target.value})
  }

  setNote = (e) => {
    this.setState({note:e.target.value})
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const note = {
      title: this.state.title,
      note: this.state.note,
      webaddress: url
    }
    try {
      await fetch('https://post-it-api.onrender.com/note' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
      })
      console.log("POST SUCCESS")
      this.setState({
        title:'',
        note: ''
      })
      this.componentDidMount()
    } catch (error) {
      console.log(error)
    }
  }

  async fetchData(){
    try {
      const res = await fetch('https://post-it-api.onrender.com/note',{
        method: 'GET',
      })
      const data = await res.json()
      const filtered = data.notes.filter((res) => {
        if(res.webaddress === url){
          return res
        }
      })
      this.setState({
        notes: filtered
      })
    } catch (error) {
      console.log(error)
    }
  }

  async componentDidMount() {
    try {
      this.fetchData()
      console.log("GET SUCCESS")
    } catch (error) {
      console.log(error)
    }
  }

  render(){
    const noteFetch = this.state.notes.map((note) => {
      return(
        <div className='note-history-display' key={note._id}>
          <form>
            <Note _id={note._id} title={note.title} content={note.note} refetch={this.fetchData}/>
          </form>
        </div>
      )
    })
    return (
      <>
        <div id="note-taking-area">
          <form id="noteInfo" onSubmit={this.handleSubmit}>
              <input id="title" placeholder="name of the note" type="text" name="title" value={this.state.title} onChange ={this.setTitle}/>
              <textarea id="text-area" name="note" placeholder="notes..." value={this.state.note} onChange={this.setNote}></textarea>
              <button type="submit" className="save-btn">Save</button>
          </form>
        </div>  
        <div className='note-history-display-container'>
          {noteFetch}
        </div>
      </>
    )
  }
}

class Base extends React.Component{
  render(){
    return(
      <>
      <NoteContainer/>
      </>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Base/>)