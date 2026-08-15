function updateTime() {
    var currentTime = new Date().toLocaleString()
    var timeText = document.querySelector("#timeElement")
    timeText.innerHTML = currentTime
}
setInterval(updateTime, 1000)

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("notes"))

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
    // Step 2: Set up variables to keep track of the element's position.
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    // Step 3: Check if there is a special header element associated with the draggable element.
    if (document.getElementById(element.id + "header")) {
        // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
        // This allows you to drag the window around by its header.
        document.getElementById(element.id + "header").onmousedown = startDragging;
    } else {
        // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
        // This allows you to drag the window by holding down anywhere on the window.
        element.onmousedown = startDragging;
    }

    // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        // Don't drag when the user clicks a title-bar control button.
        if (e.target.closest && e.target.closest("button")) return;
        // Step 7: Get the mouse cursor position at startup.
        initialX = e.clientX;
        initialY = e.clientY;
        // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;
    }

    // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
    function dragElement(e) {
        e = e || window.event;
        e.preventDefault();
        // Step 10: Calculate the new cursor position.
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function closeWindow(element) {
    element.style.display = "none"
}

function openWindow(element) {
    element.style.display = "flex"
}

function selectIcon(element) {
    element.classList.add("selected");
    openWindow(document.querySelector("#" + element.id.replace("Logo", "")))
    var dot = document.getElementById(element.id.replace("Logo", "") + "Dot");
    if (dot) dot.classList.add("visible");
}

function deselectIcon(element) {
    element.classList.remove("selected");
    closeWindow(document.querySelector("#" + element.id.replace("Logo", "")))
    var dot = document.getElementById(element.id.replace("Logo", "") + "Dot");
    if (dot) dot.classList.remove("visible");
}

function handleIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element)
    } else {
        selectIcon(element)
    }
    handleWindowTap(document.querySelector("#" + element.id.replace("Logo", "")))
}

var biggestZIndex = 1

function handleWindowTap(element) {
    biggestZIndex++
    element.style.zIndex = biggestZIndex
}

function initWindow(appname) {
    var app = document.getElementById(appname)
    var closeButton = document.getElementById(appname + "close")
    var appLogo = document.getElementById(appname + "Logo")

    closeButton.addEventListener("click", function() {
        closeWindow(app)
        deselectIcon(appLogo)
    })

    appLogo.addEventListener("click", function() {
        handleIconTap(this)
    })

    app.addEventListener("mousedown", function() {
        handleWindowTap(this)
    })
}

initWindow("welcome")
initWindow("notes")

var content = [
    //    {
    //        "title": `Mickey's pass`,
    //        "content": `The password to Mickey's phone is 999999`
    //    },
    //    {
    //        "title": "Grocery list",
    //        "content": `Bread, Milk, Snackbar, Meat`
    //    },
    //    {
    //        "title": "Learn Coding",
    //        "content": `Learn HTML, CSS and JavaScript`
    //    },
    //    {
    //        "title": "Long Note",
    //        "content": "This is a really looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong note"
    //    }
]

function addToSideBar(index) {
    var sidebar = document.getElementById("sidebar")
    var note = content[index]

    var newDiv = document.createElement("div")
    newDiv.classList.add("sidebarElement")
    newDiv.innerHTML = `<div class="notesElementDot"></div>
<p class="sidebarElementParagraph">${note.title}</p>`
    newDiv.addEventListener("click", function() {
        setNotesContent(index)
    })
    sidebar.appendChild(newDiv)
}

function updateNoteTitle() {
    let i = 0
    for (child of document.getElementById("sidebar").children) {
        if (i == notesIndexInFocus) {
            child.children[1].textContent = content[notesIndexInFocus].title
        }
        i++
    }
}

function setNotesContent(index) {
    notesIndexInFocus = index
    var sidebar = document.getElementById("sidebar")
    let i = 0
    for (const child of sidebar.children) {
        var dot = child.firstElementChild
        if (i == index) {
            dot.style.display = "block"
        } else {
            dot.style.display = "none"
        }
        i++
    }

    document.getElementById("notescontentwrapper").style.display = "flex"
    let note = content[index]
    document.getElementById("notecontent").innerHTML = `
<p id="notecontentTitle">${note.title}</h1>
<p id="notecontentContent">${note.content}</p>`
}

for (let i = 0; i < content.length; i++) {
    addToSideBar(i)
}

var notesEditButtonState = "done"
var notesIndexInFocus
document.getElementById("notesEditButton").addEventListener("click", function() {
    var note = document.getElementById("notecontent")
    if (notesEditButtonState == "done") {
        for (const child of note.children) {
            child.contentEditable = "true"
        }
        note.lastChild.focus()
        notesEditButtonState = "edit"
        this.textContent = "Done"
    } else {
        content[notesIndexInFocus].title = document.getElementById("notecontentTitle").textContent
        content[notesIndexInFocus].content = document.getElementById("notecontentContent").textContent
        updateNoteTitle()

        for (const child of note.children) {
            child.contentEditable = "false"
        }
        notesEditButtonState = "done"
        this.textContent = "Edit"
    }
})

document.getElementById("notesNewButton").addEventListener("click", function() {
    content.push({ title: "Untitled", content: "(empty)" })
    var index = content.length - 1
    updateSidebar()

    var newDiv = document.createElement("div")
    newDiv.classList.add("sidebarElement")
    newDiv.innerHTML = `<div class="notesElementDot"></div>
<p class="sidebarElementParagraph">${content[content.length - 1].title}</p>`
    newDiv.addEventListener("click", function() {
        setNotesContent(index)
    })
    sidebar.appendChild(newDiv)
    updateNoteTitle()
    setNotesContent(index)

    var note = document.getElementById("notecontent")
    for (const child of note.children) {
        child.contentEditable = "true"
    }
    note.lastChild.focus()
    notesEditButtonState = "edit"
    document.getElementById("notesEditButton").textContent = "Done"
})

function updateSidebar() {
    if (content.length == 0) {
        document.getElementById("sidebar").style.display = "none"
    } else {
        document.getElementById("sidebar").style.display = "flex"
    }
}
updateSidebar()
