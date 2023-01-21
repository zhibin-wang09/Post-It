/*global chrome*/
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
var url = ""
chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        url = tabs[0].url;
        const urlobj = new URL(url)
        url = urlobj.origin
        console.log(url)
});

//Function component takes props in parameter
class Note extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title : this.props.title,
      note : this.props.note,
      editMode : false
    }
  }

  handleDelete = async(e) => {
    e.preventDefault()
    try {
      const res = await fetch(`https://post-it-api.onrender.com/note/${this.props._id}`, {
      method: "DELETE"
      })
      console.log("DELETE SUCCESS")
    } catch (error) {
      console.log(error)
    }
    await this.props.refetch()
  }

  handleEdit = (e) =>{
    e.preventDefault()
    this.setState({editMode : true, title: this.props.title, note: this.props.content})
  }

  handleSave = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`https://post-it-api.onrender.com/note/${this.props._id}`, {
      method: "PATCH",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          title: this.state.title,
          note: this.state.note
      })
      })
      console.log("PACTCH SUCCESS")
    } catch (error) {
      console.log(error)
    }
    await this.props.refetch()
    this.setState({editMode: false})
  }

  setTitle = (e)=> {
    this.setState({title:e.target.value})
  }

  setNote = (e) => {
    this.setState({note:e.target.value})
  }


  render(){
    if(!this.state.editMode){
      return (
        <>
          <div className='header'>
            <h3 className='note-title'>{this.props.title}</h3>
            <button className='delete-btn' type='button' data-id={this.props._id} onClick={this.handleDelete}>Delete Note</button>
            <button className='edit-btn' type='button' data-id={this.props._id} onClick={this.handleEdit}>Edit Note</button>
          </div>
          <p>{this.props.content}</p>
        </>
        )
    }else{
      return (
        <>
          <div className='header'>
            <input className='update-title' value={this.state.title} onChange={this.setTitle}/>
            <button className='delete-btn' type='button' data-id={this.props._id} onClick={this.handleDelete}>Delete Note</button>
            <button className='edit-btn' type='button' data-id={this.props._id} onClick={this.handleEdit}>Edit Note</button>
          </div>
          <textarea className='edit-text-area' value={this.state.note} onChange={this.setNote}></textarea>
          <button className='save-btn' onClick={this.handleSave}>Update</button>
        </>
        )
    }
  }
}


class NoteContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      notes: [],
      title : '',
      note : '',
      webaddress: url
    }
    this.componentDidMount = this.componentDidMount.bind(this)
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

  async componentDidMount() {
    try {
      const res = await fetch('https://post-it-api.onrender.com/note',{
            method:"GET",
      })
      const data = await res.json()
      const filtered = data.notes.filter((res) => {
        if(res.webaddress === url){
          return res
        }
      })
      this.setState({
        notes : filtered
      })
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
            <Note _id={note._id} title={note.title} content={note.note} refetch={this.componentDidMount}/>
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

/* class Form extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title : '',
      note : '',
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
    } catch (error) {
      console.log(error)
    }
  }
  render(){
    return (
      <div id="note-taking-area">
          <form id="noteInfo" onSubmit={this.handleSubmit}>
              <input id="title" placeholder="name of the note" type="text" name="title" value={this.state.title} onChange ={this.setTitle}/>
              <textarea id="text-area" name="note" placeholder="notes..." value={this.state.note} onChange={this.setNote}></textarea>
              <button type="submit" className="save-btn">Save</button>
          </form>
      </div>  
    )
  }
} */

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