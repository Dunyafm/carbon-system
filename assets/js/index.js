function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.currentTarget.appendChild(document.getElementById(data));
}

function createTask(){
  var x = document.getElementById("inprogress");
  var y = document.getElementById("done");
  var z = document.getElementById("create-new-task-block");
  if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "block";
      z.style.display = "none";
  } else {
      x.style.display = "none";
      y.style.display = "none";
      z.style.display = "flex";
  }
}
const searchInput = document.getElementById("searchInput");
const taskList = document.getElementById("taskList");

searchInput.addEventListener("input", function() {
  const searchTerm = searchInput.value.toLowerCase();
  const tasks = taskList.getElementsByTagName("li");

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskText = task.textContent.toLowerCase();

    if (taskText.includes(searchTerm)) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  }
});
function uploadMember(event) {
  event.preventDefault(); // Formun varsayılan davranışını engelle
  
  var name = document.getElementById("name").value;
  var photo = document.getElementById("photo").files[0];
  
  // Adı kaydet veya başka bir işlem yap
  
  // Fotoğrafı önizleme div'ine yükle
  var reader = new FileReader();
  reader.onload = function(e) {
    var imagePreview = document.getElementById("imagePreview");
    imagePreview.innerHTML = "<img src='" + e.target.result + "' alt='Üzv şəkili'>";
  };
  reader.readAsDataURL(photo);
}


function saveTask(){
  // var saveButton = document.getElementById("save-button");
  // var editButton = document.getElementById("edit-button");
  // if (saveButton.style.display === "none") {
  //     saveButton.style.display = "block";
  //     editButton.style.display = "none";
  // } else{
  //     saveButton.style.display = "none";
  //     editButton.style.display = "block";
  // }

  var todo = document.getElementById("todo");
  var taskName = document.getElementById("task-name").value;
  todo.innerHTML += `
  <div class="task" id="${taskName.toLowerCase().split(" ").join("")}" draggable="true" ondragstart="drag(event)">
      <span>${taskName}</span>
  </div>
  `
}

function editTask(){
  var saveButton = document.getElementById("save-button");
  var editButton = document.getElementById("edit-button");
  if (saveButton.style.display === "none") {
      saveButton.style.display = "block";
      editButton.style.display = "none";
  } else{
      saveButton.style.display = "none";
      editButton.style.display = "block";
  }
}



document.addEventListener('DOMContentLoaded', (event) => {

  var dragSrcEl = null;
  
  function handleDragStart(e) {
    this.style.opacity = '0.1';
    this.style.border = '3px dashed #c4cad3';
    
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';
    
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('task-hover');
  }

  function handleDragLeave(e) {
    this.classList.remove('task-hover');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    
    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    
    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    this.style.border = 0;
    
    items.forEach(function (item) {
      item.classList.remove('task-hover');
    });
  }
  
  
  let items = document.querySelectorAll('.task'); 
  items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
});