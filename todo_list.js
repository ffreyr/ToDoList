// GEREKLİ DEĞİŞKEN ATAMALARI
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

const filterAllBtn = document.getElementById("filter-all");
const filterCompletedBtn = document.getElementById("filter-completed");
const filterUncompletedBtn = document.getElementById("filter-uncompleted");

// All butonuna tıklandığında bütün görevleri gösterme
filterAllBtn.addEventListener("click", function () {
  showTasks("all");
});

// Completed butonuna tıklandığında tamamlanan görevleri gösterme
filterCompletedBtn.addEventListener("click", function () {
  showTasks("completed");
});

// Uncompleted butonuna tıklandığında tamamlanmayan görevleri gösterme
filterUncompletedBtn.addEventListener("click", function () {
  showTasks("uncompleted");
});

// Filtreleme fonskiyonu
function showTasks(filterType) {
  const tasks = document.querySelectorAll("li"); // li elementlerini görev olarak algılar

  tasks.forEach(task => {
    task.style.display = "block"; // Önce tüm görevleri göster

    if (filterType === "completed" && !task.classList.contains("completed")) 
    {
      task.style.display = "none"; // Tamamlanmamış görevleri gizle
    } 
    else if (filterType === "uncompleted" && task.classList.contains("completed")) 
    {
      task.style.display = "none"; // Tamamlanan görevleri gizle
    }
  });
}

// Görev ekleme fonksiyonu
function addTask() {
  const task = inputBox.value.trim();

  // Input kutusuna herhangi bir şeyin girilip girilmediğini kontrol eder
  if (!task) {
    alert("Please write a task!"); 
    console.log("No task added!");
    return;
  }

  // Listeye yeni element ekleme
  const li = document.createElement("li");
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
    `;
  listContainer.appendChild(li);

  // Girilen görev listeye eklendikten sonra text area'yı temizleme
  inputBox.value = " ";

  // Yeni göreve butonları ekleme
  const checkbox = li.querySelector("input"); 
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector("span");
  const deleteBtn = li.querySelector(".delete-btn");

  // Tamamlanan görevin üstünü çizme
  checkbox.addEventListener("click", function () 
  {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
  });

  // Görevi düzenleme 
  editBtn.addEventListener("click", function () 
  {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null) {
      taskSpan.textContent = update;
      li.classList.remove("completed");
      checkbox.checked = false;
      updateCounters();
    }
  });

  // Görevi silme
  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });
  updateCounters();
}

// Enter tuşu ile görev ekleme
inputBox.addEventListener("keyup", function (event) 
{
  if (event.key === "Enter") 
  {
    addTask();
  }
});
