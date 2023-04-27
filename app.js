let submitBtn = document.getElementById("sub");

let inputText = document.getElementById("task-inp");

let taskContainer = document.getElementsByClassName("task-cont")[0];

let container = document.getElementsByClassName("container")[0];

let clearBtn = document.createElement("button");

let taskArray = [];

if (localStorage.getItem("tasks")) {
  taskArray = JSON.parse(localStorage.getItem("tasks"));
}
checkEmptyTask();

clearBtn.addEventListener("click", (e) => {
  let answer = confirm("Are you Sure you want to delete?");
  if (answer == true) {
    localStorage.clear();
    taskArray = [];
    let taskCont = document.getElementsByClassName("task-cont")[0];
    taskCont.innerHTML = "";
    checkEmptyTask();
  } else {
    return;
  }
});

getDataFromStorage();

taskContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskWithId(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
    checkEmptyTask();
  } else if (e.target.classList.contains("task")) {
    toggleCompletedStatus(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

submitBtn.onclick = function (e) {
  if (inputText.value === "") return;
  addTaskToArray(inputText.value);
  inputText.value = "";
  checkEmptyTask();
};

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  taskArray.push(task);

  addElementsToPage(taskArray);
  addToLocalStorage(taskArray);
}

function addElementsToPage(taskArray) {
  taskContainer.innerHTML = "";

  taskArray.forEach((task) => {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    if (task.completed) {
      taskDiv.className = "task done";
    }
    taskDiv.setAttribute("data-id", task.id);
    let parag = document.createElement("p");
    parag.textContent = task.title;
    let removeBtn = document.createElement("button");
    removeBtn.className = "del";
    removeBtn.textContent = "Remove";
    taskDiv.appendChild(parag);
    taskDiv.appendChild(removeBtn);
    taskContainer.appendChild(taskDiv);
  });
}

function addToLocalStorage(taskArray) {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

function getDataFromStorage() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPage(tasks);
  }
}

function deleteTaskWithId(taskID) {
  // taskArray = taskArray.filter((ele, index) => {
  //   return ele.id != taskID;
  // });
  taskArray.forEach(function (ele, index) {
    if (ele.id == taskID) {
      taskArray.splice(index, 1);
    }
  });
  addToLocalStorage(taskArray);
}

function toggleCompletedStatus(taskID) {
  taskArray.forEach(function (ele) {
    if (ele.id == taskID) {
      ele.completed == true ? (ele.completed = false) : (ele.completed = true);
    }
  });
  addToLocalStorage(taskArray);
}

function checkEmptyTask() {
  if (
    localStorage.getItem("tasks") !== "[]" &&
    localStorage.getItem("tasks") != null
  ) {
    clearBtn.className = "clear";
    clearBtn.textContent = "Clear All";
    container.appendChild(clearBtn);
  } else {
    clearBtn.remove();
  }
}

inputText.addEventListener("keydown", (e) => {
  console.log(e);
  if (e.key === "Enter") {
    submitBtn.click();
  }
});
