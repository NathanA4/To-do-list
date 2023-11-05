const boxInput = document.getElementById("input-text");
const boxInputDate = document.getElementById("input-date");
const listInput = document.getElementById("container-list");
const priorityInput = document.getElementById("priority")
let li;

function addTask() {
  if (boxInput.value !== "" && boxInputDate.value !== "" && priorityInput.value !== "") {
    li = document.createElement("li");
    li.innerHTML = boxInput.value + "\u00A0\u00A0\u00A0" + boxInputDate.value;

    const span = document.createElement("span");
    span.innerHTML = "delete";
    li.appendChild(span);

    li.classList.add('priority-' + priorityInput.value);

    listInput.appendChild(li);
    reorderTasks();
  } else {
    alert("Enter All The Elements!");
  }
  priorityInput.value = "";
  boxInput.value = "";
  boxInputDate.value = "";
  saveLocal();
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

function reorderTasks() {
  const tasks = Array.from(listInput.children);
  tasks.sort((a, b) => {
    const priorityValues = { 'priority-HIGH': 3, 'priority-MEDIUM': 2, 'priority-LOW': 1 };
    const priorityA = priorityValues[a.classList[1]] || 0;
    const priorityB = priorityValues[b.classList[1]] || 0;
    return priorityB - priorityA;
  });

  listInput.innerHTML = "";

  tasks.forEach(task => listInput.appendChild(task));
}
reorderTasks();

function showTask() {
  listInput.innerHTML = localStorage.getItem("data");
  reorderTasks(); 
}
showTask();

function saveLocal() {
  localStorage.setItem("data", listInput.innerHTML);
}