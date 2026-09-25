// ---------- Select elements ----------
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");

let taskCount = 0;

function updateCounter() {
  counter.textContent = taskCount; // update DOM text
}

function removeTask(li) {
  li.remove();          // remove element from the DOM
  taskCount--;
  updateCounter();
}

function toggleDone(li) {
  li.classList.toggle("done"); // toggle a class in response to interaction
}

function createTaskElement(text) {
  const li = document.createElement("li"); // create element

  const label = document.createElement("span");
  label.textContent = text;
  label.addEventListener("click", () => toggleDone(li));

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => removeTask(li));

  li.appendChild(label);
  li.appendChild(removeBtn);
  return li;
}

// ---------- Handle form submission ----------
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading

  const text = input.value.trim();
  if (text === "") return;

  list.appendChild(createTaskElement(text));

  taskCount++;
  updateCounter();

  input.value = "";
  input.focus();
});