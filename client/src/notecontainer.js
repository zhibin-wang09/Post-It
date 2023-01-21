/*global chrome*/
import React from 'react'
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
      }
      this.componentDidMount = this.componentDidMount.bind(this)
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
          <div className='note-history-display-container'>
            {noteFetch}
          </div>
      )
    }
}

export default NoteContainer