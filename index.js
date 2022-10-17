chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    let myBookmarks = []
    let myNotes = []

    const inputNoteField = document.querySelector("#input-note")
    const thisPageBtn = document.querySelector("#this-page-btn")
    const ulEl = document.querySelector("#ul-el")
    const deleteBtn=document.querySelector("#delete-btn")

    const myBookmarksLocalStorage = JSON.parse(localStorage.getItem("myBookmarks"))
    const myNotesLocalStorage = JSON.parse(localStorage.getItem("myNotes"))

    if(myBookmarksLocalStorage || myNotesLocalStorage){
        myNotes=myNotesLocalStorage
        myBookmarks=myBookmarksLocalStorage
        render(myBookmarks,myNotes)
    }

    function render(bookmarks, notes) {
        let listItems = ""
        for (let i = 0; i < bookmarks.length; i++) {
            if(notes[i]==""){
                listItems += `
                <li>
                    <a href="${bookmarks[i]}" target="_blank">${bookmarks[i]}</a> 
                </li>
                `
            }
            else{
                listItems += `
                <li>
                    <a href="${bookmarks[i]}" target="_blank">${bookmarks[i]}</a> - ${notes[i]}
                </li>
                `
            }
        }

        ulEl.innerHTML = listItems
    }

    thisPageBtn.addEventListener("click", function () {
        if (!myBookmarks.includes(url))
            myBookmarks.push(url)
        myNotes.push(inputNoteField.value)
        inputNoteField.value = ""

        localStorage.setItem("myBookmarks", JSON.stringify(myBookmarks));
        localStorage.setItem("myNotes", JSON.stringify(myNotes));

        render(myBookmarks,myNotes)
    })

    deleteBtn.addEventListener("dblclick", function () {
        localStorage.clear()
        url = tabs[0].url;
        myBookmarks = []
        myNotes = []
        render(myBookmarks,myNotes)
    })
})