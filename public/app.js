const noteDisplay = document.getElementById("note-history-display-container")

async function showNotes(){
    const {data} = await axios.get('http://localhost:5500/note')
    const notes = data.notes
    notes.forEach(writtenNote => {
        const note = document.createElement('div')
        //Created title
        const title = document.createElement('h3')
        title.setAttribute('class','title')
        title.innerHTML = writtenNote.title

        //Create note content
        const content = document.createElement('p')
        content.innerHTML = writtenNote.note

        note.appendChild(title)
        note.appendChild(content)
        note.setAttribute('class', 'note-history-display')
        noteDisplay.appendChild(note)
    });
}

async function post(){
    
}


showNotes()

