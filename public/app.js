const noteDisplay = document.getElementById("note-history-display-container")
const form = document.getElementById('noteInfo')
const title = document.getElementById('title')
const noteContent = document.getElementById('text-area')

async function showNotes(){
    try {
        const res = await fetch('http://localhost:5500/note')
        const data = await res.json()
        const notes = data.notes
        const acc = ""
        notes.forEach(writtenNote => {
            const note = document.createElement('div')
            const header = document.createElement('div')
            header.setAttribute('class','header')
            //Creat title
            const title = document.createElement('h3')
            title.setAttribute('class','noteTitle')
            title.innerHTML = writtenNote.title
            //Create delete button
            const deleteBtn = document.createElement('button')
            deleteBtn.setAttribute('class','deleteBtn')
            deleteBtn.innerHTML = "Delete Note"
            //Create edit button
            const editBtn = document.createElement('button')
            editBtn.setAttribute('class','editBtn')
            editBtn.innerHTML = "Edit Note"
            //Insert to header
            header.appendChild(title)
            header.appendChild(deleteBtn)
            header.appendChild(editBtn)
            //Create note content
            const content = document.createElement('p')
            content.innerHTML = writtenNote.note

            note.appendChild(header)
            note.appendChild(content)
            note.setAttribute('class', 'note-history-display')
            noteDisplay.appendChild(note)
        });

        } catch (error) {
            console.log(error)
        }
}

showNotes()

form.addEventListener('submit', async (e) => {
    try {
        e.preventDefault()
        console.log(title.value)
        console.log(noteContent.value)
        const note = {
            title: title.value,
            note: noteContent.value
        }
        console.log(note)
        const res = await fetch('http://localhost:5500/note' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        })
        console.log(res)
        showNotes()
    } catch (error) {
        console.log(error)
    }
})
