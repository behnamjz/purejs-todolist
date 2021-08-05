// Variables //
var tasks = [];
var SelectedForEdit = null;

// Remove Task //
var RemoveTask = function(event) {
    var selectedForDelete = event.target.parentNode;
    var selectedElementText = selectedForDelete.getElementsByClassName('text');
    var index = tasks.indexOf(selectedElementText[0].innerText);
    if (index > -1) {
        tasks.splice(index, 1);
        localStorage['tasks'] = JSON.stringify(tasks);
    }
    selectedForDelete.style.display = "none";
};

// Edit Task //
var EditTask = function(event) {
    // edit Button //
    var editInput = document.getElementById("new-task-field");

    // get edit element //
    SelectedForEdit = event.target.parentNode;
    var selectedElementText = SelectedForEdit.getElementsByClassName('text');
    editInput.value = selectedElementText[0].innerText;

    // call change button //
    changeButton('edit');
};

// change add to edit button //
var changeButton = function(value) {
      var editButton = document.getElementById("add");
      if (value === 'edit') {
        editButton.innerText = 'Edit';
        editButton.setAttribute("onclick","changeText()");
    } else if (value === 'add') {
        editButton.innerText = 'Add';
        editButton.setAttribute("onclick","addNewTask()");
    }
};

// Edit Text //
var changeText = function() {
    // add Edit text to item //
    var editInput = document.getElementById("new-task-field").value;
    var selectedItemForEdit = SelectedForEdit.getElementsByClassName('text');

    // get from task array and edit //
    var index = tasks.indexOf(selectedItemForEdit[0].innerText);
    if (index > -1) {
        tasks[index] = editInput;
        localStorage["tasks"] = JSON.stringify(tasks);
    }

    selectedItemForEdit[0].innerText = editInput;

    // clear Text //
    document.getElementById("new-task-field").value = "";
    changeButton('add');
};

// show Task From LocalStorage //
var showTasks = function(value) {
    // create li //
    var li = document.createElement("li");
    document.getElementById("task-list").appendChild(li);

    // append text span //
    var span = document.createElement("SPAN");
    var valuetext = document.createTextNode(value);
    span.className = "text";
    span.appendChild(valuetext);
    li.appendChild(span);
    
    // append Close Button //
    var DeleteButton = document.createElement("button");
    var DeleteButtonText = document.createTextNode("\u00D7");
    DeleteButton.className = "delete";
    DeleteButton.setAttribute("onclick","RemoveTask(event)");
    DeleteButton.appendChild(DeleteButtonText);
    li.appendChild(DeleteButton);

    // append Edit Button //
    var EditButton = document.createElement("button");
    var EditButtontext = document.createTextNode("\u270E");
    EditButton.className = "edit";
    EditButton.setAttribute("onclick","EditTask(event)");
    EditButton.appendChild(EditButtontext);
    li.appendChild(EditButton);
    
};

// Get Data From LcoalStorage //
var GetDataFromLocal = function () {
    var i;
    for (i=0; i < tasks.length; i++) {
        showTasks(tasks[i]);
    }
};

// Add New Task //
var addNewTask = function() {
    var inputValue = document.getElementById("new-task-field").value;
    
     // check Input Value //
     if (inputValue === '') {
        alert("Please Define Task");
        } else {
        
        // add to tasks and save on localstorage //
        tasks.push(inputValue);
        localStorage["tasks"] = JSON.stringify(tasks);

        // call Show Task //
        showTasks(inputValue);

        // getMostView();
        if ((tasks.length % 5) === 0) {
            showModel();
        }

        // clear input text //
        document.getElementById("new-task-field").value = "";
    }
};

var showModel = function() {
    alert('video');
};

// Check Local Storage //
if (localStorage["tasks"]) {
    tasks = JSON.parse(localStorage["tasks"]);
    GetDataFromLocal();
} else {
    tasks = [];
}