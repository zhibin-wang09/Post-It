const noteDisplay = document.getElementById("note-history-display-container")
const form = document.getElementById('noteInfo')
const title = document.getElementById('title')
const noteContent = document.getElementById('text-area')
async function showNotes(){
    try {
        const res = await fetch('http://localhost:5500/note')
        const data = await res.json()
        const notes = data.notes
        //Using note.forEach() is not as good as notes.map() because 
            let acc = "";
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
            deleteBtn.setAttribute('class','delete-btn')
            deleteBtn.setAttribute('data-id', writtenNote._id)
            deleteBtn.innerHTML = "Delete Note"
            //Create edit button
            const editBtn = document.createElement('button')
            editBtn.setAttribute('class','edit-btn')
            editBtn.setAttribute('data-id' , writtenNote._id)
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
            acc += note.outerHTML;
        });
        noteDisplay.innerHTML = acc;

    } catch (error) {
        noteDisplay.innerHTML = "<h3>There was a error...</h3>"
        console.log(error)
    }
}

showNotes()

const test = form.addEventListener('submit', async (e) => {
    try {
        e.preventDefault()
        const note = {
            title: title.value,
            note: noteContent.value
        }
        const res = await fetch('http://localhost:5500/note' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        })
        noteContent.value =''
        title.value = ''
        showNotes()
    } catch (error) {
        console.log(error)
    }
})

noteDisplay.addEventListener('click' , async (e) => {
    //e.preventDefault()
    try {
        const id = e.target.dataset.id
        if(e.target.className === "delete-btn"){
            const res = await fetch(`http://localhost:5500/note/${id}`, {
                method: "DELETE"
            })
            const header = e.target.parentElement.parentElement
            header.remove()
            showNotes()
        }
        
        if(e.target.className === "edit-btn"){
            const container = e.target.parentElement.parentElement
            if(container.children[1].tagName != "FORM"){
                let updateForm = document.createElement('form')
                updateForm.setAttribute('id','updateInfo')
                let textarea = document.createElement('textarea')
                textarea.setAttribute('class','edit-text-area')
                const previousContent = container.children[1].innerHTML
                textarea.innerHTML = previousContent
                const saveBtn = document.createElement('button')
                saveBtn.setAttribute('type','submit')
                saveBtn.setAttribute('class','save-btn')
                saveBtn.innerHTML = "Update"
                updateForm.appendChild(textarea)
                updateForm.appendChild(saveBtn)
                updateForm.addEventListener('submit', async (e)=>{
                    e.preventDefault()
                    try {
                        await fetch(`http://localhost:5500/note/${id}`, {
                            method: "PATCH",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                note: textarea.value
                            })
                        })
                    showNotes() 
                    } catch (error) {
                        console.log(error)
                    }
                })
                container.replaceChild(updateForm,container.children[1])
            }
        }
    } catch (error) {
        console.log(error)
    }
})
