
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

//Function component takes props in parameter
class Note extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title : this.props.title,
      note : this.props.note
    }
  }

  handleDelete = async(e) => {
    e.preventDefault()
    await fetch(`http://localhost:5500/note/${this.props._id}`, {
      method: "DELETE"
    })
    window.location.reload()
  }

  handleEdit = async (e) =>{
    e.preventDefault()
    console.log("EDIT")
  }

  render(){
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
  }
}


class NoteContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      notes: []
    }
  }

  async componentDidMount() {
    const res = await fetch('http://localhost:5500/note',{
            method:"GET",
        })
    const data = await res.json()
    this.setState({
      notes : data.notes
    })
  }

  render(){
    const noteFetch = this.state.notes.map((note) => {
      return(
        <div className='note-history-display' key={note._id}>
          <form>
            <Note _id={note._id} title={note.title} content ={note.note}/>
          </form>
        </div>
      )
    })
    return (
      <div className='note-history-display-container'>
        {noteFetch}
      </div>
    )
  }
}

class Form extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title : '',
      note : ''
    }
  }
      
  setTitle = (e)=> {
    this.setState({title:e.target.value})
  }

  setNote = (e) => {
    this.setState({note:e.target.value})
  }

  handleSubmit = async (e) => {
    const note = {
      title: this.state.title,
      note: this.state.note
    }
    fetch('http://localhost:5500/note' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note)
    })
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
}

class Base extends React.Component{


  render(){
    return(
      <>
      <Form/>
      <NoteContainer/>
    </>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Base />)