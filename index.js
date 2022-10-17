chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    let myBookmarks = []
    let myNotes = []

    const inputNoteField = document.querySelector("#input-note")
    const thisPageBtn = document.querySelector("#this-page-btn")
    const ulEl = document.querySelector("#ul-el")

    let myBookmarksLocalStorage = JSON.parse(localStorage.getItem("myBookmarks"))
    let myNotesLocalStorage = JSON.parse(localStorage.getItem("myNotes"))

    
    if(myBookmarksLocalStorage || myNotesLocalStorage){
        myNotes=myNotesLocalStorage
        myBookmarks=myBookmarksLocalStorage
        renderBookmarks()
    }

    thisPageBtn.addEventListener("click", function () {
        if (!myBookmarks.includes(url))
            myBookmarks.push(url)
        myNotes.push(inputNoteField.value)
        inputNoteField.value = ""

        localStorage.setItem("myBookmarks", JSON.stringify(myBookmarks));
        localStorage.setItem("myNotes", JSON.stringify(myNotes));

        renderBookmarks()
    })

    function renderBookmarks() {
        let listItems = ""
        for (let i = 0; i < myBookmarks.length; i++) {
            listItems += `
    <li>
        <a href="${myBookmarks[i]}" target="_blank">${myBookmarks[i]}</a> - ${myNotes[i]}
    </li>
    `
        }
        ulEl.innerHTML = listItems
    }
})