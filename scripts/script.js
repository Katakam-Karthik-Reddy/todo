

const todos = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");
let draggableTodo = null;


todos.forEach((todo) =>{
    todo.addEventListener("dragstart", dragstart);
    todo.addEventListener("dragend", dragend);
});


function dragstart(){
    draggableTodo = this;
    setTimeout(() => {
        this.style.display = "none";
    }, 0);
}
function dragend(){
    draggableTodo = null;
    setTimeout(() => {
        this.style.display = "flex";
    }, 0);
}


containers.forEach((container) => {
    container.addEventListener("dragover",dragover);
    container.addEventListener("dragenter",dragenter);
    container.addEventListener("dragleave",dragleave);
    container.addEventListener("drop",dragdrop);
})

function dragover(e) {
    e.preventDefault();
    // console.log("dragover");
}
function dragenter(){
    // console.log("dragenter");
}
function dragleave(){
    // console.log("dragleave");
}   
function dragdrop(e){    
    this.appendChild(draggableTodo);
    const afterElement = getDragAfterElement(this,e.clientY)

    const draggable = document.querySelector('.dragging')
        if(afterElement == null){
            this.appendChild(draggableTodo)
        } else{
            this.insertBefore(draggableTodo,afterElement)
        }
}

function getDragAfterElement(container ,y){
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) =>{
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        // console.log(offset)
        if(offset < 0 && offset > closest.offset){
           return { offset: offset, element: child }
        } else{
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}


/* --------modal------*/

const btns = document.querySelectorAll("[data-target]");
const closebtn = document.querySelectorAll(".close_button");
const overlay = document.getElementById("overlay");


btns.forEach(btn => {
    btn.addEventListener("click",()=>{
        document.querySelector(btn.dataset.target).classList.add("active");
        overlay.classList.add("active");
    });
});

closebtn.forEach(btn => {
    btn.addEventListener("click",()=>{
        document.querySelector(btn.dataset.target).classList.remove("active");
        overlay.classList.remove("active");
    });
});


window.onclick = (e) =>{
    if(e.target == overlay){
        const modals = document.querySelectorAll(".modal");
        modals.forEach(modal =>modal.classList.remove("active"));
        overlay.classList.remove("active");
    }
}


// create todo and add it to list

const todosubmit = document.getElementById("addbutton");

todosubmit.addEventListener("click", createtodo);



// var input = document.getElementById("addbutton");
// input.addEventListener("keyup", (e) => {
//     if(modal1.classList.container("active") && e.key=== 'Enter'){
//         e.preventDefault();
//         document.getElementById(todosubmit).click();
//     }
// });
function createtodo(){
    const todo_div = document.createElement("div");
    const intput_val = document.getElementById("todo_intput").value;
    const txt = document.createTextNode(intput_val);

    if(txt.length!==0){
        todo_div.appendChild(txt);
        todo_div.classList.add("draggable");
        todo_div.setAttribute("draggable", "true");

        //appending span
        const  span = document.createElement("spam");
        const span_txt = document.createTextNode("\u00D7");
        span.classList.add("close");
        span.appendChild(span_txt);
        todo_div.appendChild(span);

        pending_container.prepend(todo_div);
        
        todo_div.addEventListener("dragstart", dragstart);
        todo_div.addEventListener("dragend", dragend);
        span.addEventListener("click", ()=> span.parentNode.remove(todo_div));
        
        document.getElementById("todo_intput").value = "";
    }
    //closing modal

    modal1.classList.remove("active");
    overlay.classList.remove("active");

}   

const deletediv = document.querySelectorAll(".close");

deletediv.forEach(div =>{
    div.addEventListener("click", ()=>{
        div.parentNode.remove(div); 
    });
});





