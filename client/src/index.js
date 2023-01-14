
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function Note(props){
  return(
    <p>{props.content}</p>
  )
}

//Function component takes props in parameter
function Header(props){
  return (
    <div className='header'>
      <h3 className='note-title'>{props.title}</h3>
      <button className='delete-btn' type='button' data-id={props._id} onClick={() => ({})}>Delete Note</button>
      <button className='edit-btn' type='button' data-id={props._id} onClick={() => ({})}>Edit Note</button>
    </div>
  )
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
            <Header _id={note._id} title={note.title}/>
            <Note content={note.note}/>
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

class Base extends React.Component{


  render(){
    return(
      <>
        <div id="note-taking-area">
          <form id="noteInfo">
              <input id="title" placeholder="name of the note" type="text" name="title"/>
              <textarea id="text-area" name="note" placeholder="notes..."></textarea>
              <button type="submit" className="save-btn" onClick={() => ({})}>Save</button>
          </form>
      </div>  
      <NoteContainer/>
    </>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Base />)