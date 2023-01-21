import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import NoteContainer from './notecontainer'


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