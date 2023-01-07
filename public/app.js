const noteDisplay = document.getElementById("note-history-display-container")
const form = document.getElementById('noteInfo')
const title = document.getElementById('title')
const noteContent = document.getElementById('text-area')
var url = ""
chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    url = tabs[0].url;
});

async function showNotes(){
    try {
        const res = await fetch('http://localhost:5500/note',{
            method:"GET",
        })
        const data = await res.json()
        const notes = data.notes.filter(res => {
            if(res.webaddress == url){
                return res.webaddress
            }
        } )
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
            const deleteBtn = document.createElement('input')
            deleteBtn.setAttribute('class','delete-btn')
            deleteBtn.setAttribute('data-id', writtenNote._id)
            deleteBtn.setAttribute('type','button')
            deleteBtn.setAttribute('value','Delete Note')
            //Create edit button
            const editBtn = document.createElement('input')
            editBtn.setAttribute('class','edit-btn')
            editBtn.setAttribute('data-id' , writtenNote._id)
            editBtn.setAttribute('type','button')
            editBtn.setAttribute('value', 'Edit Note')
            //Insert to header
            header.appendChild(title)
            header.appendChild(deleteBtn)
            header.appendChild(editBtn)
            //Create note content
            const content = document.createElement('p')
            content.innerHTML = writtenNote.note
            const createdForm = document.createElement('form')
            createdForm.appendChild(header)
            createdForm.appendChild(content)
            note.appendChild(createdForm)
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
            note: noteContent.value,
            webaddress : url
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
            const containerForm = e.target.parentElement.parentElement
            const header = e.target.parentElement
            if(!containerForm.children[2]){
                const updateTextArea = document.createElement('textarea')
                updateTextArea.innerHTML = containerForm.children[1].innerHTML //Transfer over the text
                updateTextArea.setAttribute('class','edit-text-area')
                
                const updateBtn = document.createElement('input')
                updateBtn.setAttribute('type','submit')
                updateBtn.setAttribute('class','save-btn')
                updateBtn.setAttribute('value',"Update")
                containerForm.appendChild(updateBtn)

                const updateTitle = document.createElement('input')
                updateTitle.setAttribute('type','text')
                updateTitle.setAttribute('class','update-title')
                updateTitle.setAttribute('value', header.children[0].innerHTML)

                header.replaceChild(updateTitle,header.children[0])
                containerForm.replaceChild(updateTextArea,containerForm.children[1]) //Replace text with textarea
                containerForm.addEventListener('submit', async (e) => {
                    e.preventDefault()
                    try {
                        
                        await fetch(`http://localhost:5500/note/${id}`, {
                            method: "PATCH",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                title: updateTitle.value,
                                note: updateTextArea.value
                            })
                        })
                        showNotes()
                    } catch (error) {
                        console.log(error)
                    }
                }) 
            }
        }
    } catch (error) {
        console.log(error)
    }
})