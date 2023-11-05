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

function showTask() {
  listInput.innerHTML = localStorage.getItem("data");
}
showTask();

function saveLocal() {
  localStorage.setItem("data", listInput.innerHTML);
}

