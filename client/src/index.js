/*global chrome*/
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import NoteContainer from './notecontainer'

var url = ""
chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        url = tabs[0].url;
        const urlobj = new URL(url)
        url = urlobj.origin
        console.log(url)
});

class Base extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      note: '',
      webaddress: url
    }
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
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  
  render(){
    return(
      <>
      <div id="note-taking-area">
            <form id="noteInfo" onSubmit={this.handleSubmit}>
                <input id="title" placeholder="name of the note" type="text" name="title" value={this.state.title} onChange ={this.setTitle}/>
                <textarea id="text-area" name="note" placeholder="notes..." value={this.state.note} onChange={this.setNote}></textarea>
                <button type="submit" className="save-btn">Save</button>
            </form>
      </div>  
      <NoteContainer/>
      </>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Base/>)