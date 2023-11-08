const boxInput = document.getElementById("input-text");
const boxInputDate = document.getElementById("input-date");
const listInput = document.getElementById("container-list");
const priorityInput = document.getElementById("priority");
let li;

function addTask() {
  if (boxInput.value !== "" && boxInputDate.value !== "" && priorityInput.value !== "") {
    li = document.createElement("li");
    li.innerHTML = boxInput.value + "\u00A0\u00A0\u00A0" + boxInputDate.value + "\u00A0\u00A0\u00A0" + priorityInput.value;

    const span = document.createElement("span");
    span.innerHTML = "delete";
    li.appendChild(span);

    li.classList.add('priority-' + priorityInput.value);

    listInput.appendChild(li);


  } else {
    alert("Enter All The Elements!");
  }
  priorityInput.value = "";
  boxInput.value = "";
  boxInputDate.value = "";
  saveLocal();
  reorderTasks(li);
}

listInput.addEventListener(
  "click",
  function (event) {
    if (event.target.tagName === "SPAN") {
      event.target.closest("li").remove();
      saveLocal();
    } else if (event.target.tagName === "LI") {
      event.target.classList.toggle("checked");
      saveLocal();
    }
  },
  false
);

function reorderTasks(newTask) {
  const tasks = Array.from(listInput.getElementsByTagName("li"));
  tasks.push(newTask);

  const priorityValues = { High: 1, Medium: 2, Low: 3 };
  tasks.sort((a, b) => {
    const priorityA = priorityValues[a.classList[0].split('-')[1]];
    const priorityB = priorityValues[b.classList[0].split('-')[1]];
    return priorityA - priorityB;
  });

  listInput.innerHTML = "";

  tasks.forEach(task => listInput.appendChild(task));
}


function showTask() {
  listInput.innerHTML = localStorage.getItem("data");
}
showTask();

function saveLocal() {
  localStorage.setItem("data", listInput.innerHTML);
}
reorderTasks();
