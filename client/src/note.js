import React from 'react'

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