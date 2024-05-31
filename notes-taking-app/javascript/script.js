const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

addBtn.addEventListener(
    "click",
    function () {
        addNote();
    }
)

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="tool">
            <i class="save fas fa-save"></i>
            <i class="trash fas fa-trash"></i>
        </div>
        <textarea>${text}</textarea>
    `;
   
    note.querySelector(".trash").addEventListener(
        "click",
        function() {
            note.remove();
            saveNote();
        }
    )

    note.querySelector(".save").addEventListener(
        "click",
        function() {
            saveNote();
        }
    )

    note.querySelector("textarea").addEventListener(
        "focusout",
        function() {
            saveNote();
        }
    )
    main.appendChild(note);
    saveNote();
}

const saveNote = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(notes => {
        data.push(notes.value);
    });

    if(data.length == 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes",JSON.stringify(data));
    }
}

(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if(lsNotes === null) {
            addNote();
        } else {
            lsNotes.forEach(
                (lsNotes) => {
                    addNote(lsNotes);
                }
            )
        }
    }
)()