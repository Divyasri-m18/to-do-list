let tasks = [];

window.addEventListener("DOMContentLoaded", () => {
  tasks = getTasks();
  renderTasks();
});
document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const text = document.getElementById("taskInput").value.trim();
  const date = document.getElementById("dateInput").value;
  if (text && date) {
    tasks.push({
      id: Date.now(),
      text,
      date,
      completed: false
    });
    setTasks(tasks);
    renderTasks();
    this.reset();
  }
});
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
function setTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    if (task.completed) li.classList.add("completed");

    const doneLabel = task.completed ? "Undo" : "Done";
  li.innerHTML = `
   <div>
    <strong>${task.text}</strong><br>
    <small>📅 ${task.date}</small>
   </div>
   <div>
    <button class="btn btn-success btn-sm me-2">${doneLabel}</button>
    <button class="btn btn-danger btn-sm">Delete</button>
   </div>
  `;
    const [doneBtn, deleteBtn] = li.querySelectorAll("button");

    doneBtn.addEventListener("click", () => {
      task.completed = !task.completed;
      setTasks(tasks);
      renderTasks();
    });

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      setTasks(tasks);
      renderTasks();
    });

    taskList.appendChild(li);
  });
}
