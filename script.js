const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("addTask");
const incompleteTaskList = document.getElementById("items");
const completeTaskList = document.querySelector(".complete-list ul");

let editingTask = null;

function createTaskElement(taskText){
    const li = document.createElement("li");
    console.log(li);
    li.classList.add("item");
     
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change",completeTask);


    const label = document.createElement("label");
    label.textContent = taskText;

    const editButton = document.createElement("button");
    editButton.textContent ="Edit";
    editButton.classList.add("edit");

    editButton.addEventListener("click",editTask);
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(editButton);

    return li;

}

function addOrUpdateTask(event){
    event.preventDefault();

    const taskText = newTaskInput.value.trim();
    if(taskText === "") return;

    if(editingTask) {

        editingTask.querySelector("label").textContent= taskText;
        addTaskButton.value = "Add Task";
        editingTask = null;
    }else{
        const listItem = createTaskElement(taskText);
        incompleteTaskList.appendChild(listItem);
    }
    newTaskInput.value = "";
}

addTaskButton.addEventListener("click",addOrUpdateTask);

function editTask() {
    const listItem = this.parentElement;
    const label = listItem.querySelector("label");

    newTaskInput.value = label.textContent;

    addTaskButton.value = "Update Task";
    editingTask = listItem;
}

function completeTask() {
    const listItem = this.parentElement;
    this.remove();
    listItem.querySelector(".edit").remove();

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click",deleteTask);

    listItem.appendChild(deleteButton);
    completeTaskList.appendChild(listItem);

}

function deleteTask(){
    
    const listItem = this.parentElement;
    listItem.remove();
}