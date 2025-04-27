// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0znd0vyl2J67QjUhT9F4DKDHG1LVGhQQ",
  authDomain: "fire-store-d298e.firebaseapp.com",
  databaseURL: "https://fire-store-d298e-default-rtdb.firebaseio.com",
  projectId: "fire-store-d298e",
  storageBucket: "fire-store-d298e.firebasestorage.app",
  messagingSenderId: "193778002733",
  appId: "1:193778002733:web:4bcc69f6e5bbc32356c1a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Select Elements
const createBtn = document.getElementById('create-task-btn');
const closeBtn = document.getElementById('close-modal-btn');
const saveBtn = document.getElementById('save-task-btn');
const modal = document.getElementById('task-modal');

const todoColumn = document.getElementById('todo-tasks');
const progressColumn = document.getElementById('in-progress-tasks');
const doneColumn = document.getElementById('done-tasks');

let editTaskId = null;

// Open Modal
createBtn.addEventListener('click', () => {
  openModal();
});

// Close Modal
closeBtn.addEventListener('click', () => {
  closeModal();
});

// Save Button
saveBtn.addEventListener('click', () => {
  if (editTaskId) {
    updateTask(editTaskId);
  } else {
    createTask();
  }
});

// Open Modal Helper
function openModal(task = {}) {
  modal.style.display = 'flex';
  document.getElementById('task-title').value = task.title || '';
  document.getElementById('task-description').value = task.description || '';
  document.getElementById('task-assigned').value = task.assignedTo || '';
}

// Close Modal Helper
function closeModal() {
  modal.style.display = 'none';
  clearModalFields();
  editTaskId = null;
}

// Clear Inputs
function clearModalFields() {
  document.getElementById('task-title').value = '';
  document.getElementById('task-description').value = '';
  document.getElementById('task-assigned').value = '';
}

// Create Task
async function createTask() {
  const title = document.getElementById('task-title').value.trim();
  const description = document.getElementById('task-description').value.trim();
  const assignedTo = document.getElementById('task-assigned').value.trim();

  if (title === '') {
    alert('Title is required');
    return;
  }

  try {
    await addDoc(collection(db, "tasks"), {
      title,
      description,
      assignedTo,
      status: 'To Do'
    });
    closeModal();
    loadTasks();
  } catch (error) {
    console.error("Error creating task:", error);
  }
}

// Load Tasks
async function loadTasks() {
  todoColumn.innerHTML = '';
  progressColumn.innerHTML = '';
  doneColumn.innerHTML = '';

  const querySnapshot = await getDocs(collection(db, "tasks"));
  querySnapshot.forEach((docSnap) => {
    const task = docSnap.data();
    const taskId = docSnap.id;
    renderTask(task, taskId);
  });
}

// Render Task Cards
function renderTask(task, id) {
  const card = document.createElement('div');
  card.classList.add('task-card');
  card.innerHTML = `
    <h4>${task.title}</h4>
    <p>${task.description}</p>
    <p><strong>Assigned:</strong> ${task.assignedTo || 'N/A'}</p>
    <div class="task-actions">
      <button class="move-btn">Move</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  // Move Button
  card.querySelector('.move-btn').addEventListener('click', () => moveTask(id, task.status));

  // Edit Button
  card.querySelector('.edit-btn').addEventListener('click', () => {
    editTaskId = id;
    openModal(task);
  });

  // Delete Button
  card.querySelector('.delete-btn').addEventListener('click', () => deleteTask(id));

  // Append to correct column
  if (task.status === 'To Do') {
    todoColumn.appendChild(card);
  } else if (task.status === 'In Progress') {
    progressColumn.appendChild(card);
  } else if (task.status === 'Done') {
    doneColumn.appendChild(card);
  }
}

// Update Task
async function updateTask(id) {
  const title = document.getElementById('task-title').value.trim();
  const description = document.getElementById('task-description').value.trim();
  const assignedTo = document.getElementById('task-assigned').value.trim();

  if (title === '') {
    alert('Title is required');
    return;
  }

  try {
    await updateDoc(doc(db, "tasks", id), {
      title,
      description,
      assignedTo
    });
    closeModal();
    loadTasks();
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

// Delete Task
async function deleteTask(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    try {
      await deleteDoc(doc(db, "tasks", id));
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
}

// Move Task (Change Status)
async function moveTask(id, currentStatus) {
  let newStatus = '';
  if (currentStatus === 'To Do') newStatus = 'In Progress';
  else if (currentStatus === 'In Progress') newStatus = 'Done';
  else if (currentStatus === 'Done') newStatus = 'To Do'; // loop back to start

  try {
    await updateDoc(doc(db, "tasks", id), {
      status: newStatus
    });
    loadTasks();
  } catch (error) {
    console.error("Error moving task:", error);
  }
}

// First Load
loadTasks();



// // Import Firebase SDKs
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
// import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";

// // Firebase config (your config)
// const firebaseConfig = {
//   apiKey: "AIzaSyA0znd0vyl2J67QjUhT9F4DKDHG1LVGhQQ",
//   authDomain: "fire-store-d298e.firebaseapp.com",
//   databaseURL: "https://fire-store-d298e-default-rtdb.firebaseio.com",
//   projectId: "fire-store-d298e",
//   storageBucket: "fire-store-d298e.firebasestorage.app",
//   messagingSenderId: "193778002733",
//   appId: "1:193778002733:web:4bcc69f6e5bbc32356c1a4",
//   measurementId: "G-0JK1QRX1C7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const analytics = getAnalytics(app);

// // User ID for local session
// let userId = localStorage.getItem('userId');
// if (!userId) {
//   userId = Date.now().toString();
//   localStorage.setItem('userId', userId);
// }

// // DOM Elements
// const createBtn = document.getElementById('create-task-btn');
// const modal = document.getElementById('task-modal');
// const closeBtn = document.getElementById('close-modal-btn');
// const saveBtn = document.getElementById('save-task-btn');
// const todoTasks = document.getElementById('todo-tasks');
// const progressTasks = document.getElementById('in-progress-tasks');
// const doneTasks = document.getElementById('done-tasks');

// let editingId = null;

// // Open Modal
// createBtn.addEventListener('click', () => {
//   editingId = null;
//   clearInputs();
//   modal.style.display = 'flex';
// });

// // Close Modal
// closeBtn.addEventListener('click', () => {
//   modal.style.display = 'none';
// });

// // Save Task (Create or Update)
// saveBtn.addEventListener('click', async () => {
//   const title = document.getElementById('task-title').value.trim();
//   const description = document.getElementById('task-description').value.trim();
//   const assigned = document.getElementById('task-assigned').value.trim();
//   const dueDate = document.getElementById('task-due-date').value; // New due date input

//   if (!title) {
//     alert('Task title is required!');
//     return;
//   }

//   try {
//     if (editingId) {
//       const taskRef = doc(db, "tasks", editingId);
//       await updateDoc(taskRef, { title, description, assignedTo: assigned, dueDate });
//     } else {
//       await addDoc(collection(db, "tasks"), {
//         title,
//         description,
//         assignedTo: assigned,
//         dueDate,
//         status: "To Do",
//         creatorId: userId
//       });
//     }
//     modal.style.display = 'none';
//     loadTasks();
//   } catch (error) {
//     console.error("Error saving task:", error);
//     alert("Error saving task. See console for details.");
//   }
// });

// // Load Tasks from Firestore
// async function loadTasks() {
//   const querySnapshot = await getDocs(collection(db, "tasks"));
//   todoTasks.innerHTML = '';
//   progressTasks.innerHTML = '';
//   doneTasks.innerHTML = '';

//   querySnapshot.forEach(docSnap => {
//     const task = docSnap.data();
//     const card = createTaskCard(task, docSnap.id);
//     if (task.status === "To Do") todoTasks.appendChild(card);
//     else if (task.status === "In Progress") progressTasks.appendChild(card);
//     else if (task.status === "Done") doneTasks.appendChild(card);
//   });
// }

// // Create a Task Card
// function createTaskCard(task, id) {
//   const card = document.createElement('div');
//   card.className = 'task-card';

//   card.innerHTML = `
//     <h4>${task.title}</h4>
//     <p>${task.description}</p>
//     <p><strong>Assigned:</strong> ${task.assignedTo || 'N/A'}</p>
//     <p><strong>Due:</strong> ${task.dueDate || 'No Date'}</p>
//   `;

//   const moveBtn = document.createElement('button');
//   moveBtn.textContent = "Move";
//   moveBtn.className = 'move-btn';
//   moveBtn.onclick = () => moveTask(id, task.status);

//   const editBtn = document.createElement('button');
//   editBtn.textContent = "Edit";
//   editBtn.className = 'edit-btn';
//   editBtn.onclick = () => openEdit(id, task);

//   card.appendChild(moveBtn);
//   card.appendChild(editBtn);

//   if (task.creatorId === userId) {
//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = "Delete";
//     deleteBtn.className = 'delete-btn';
//     deleteBtn.onclick = () => deleteTask(id);
//     card.appendChild(deleteBtn);
//   }

//   return card;
// }

// // Move Task between columns
// async function moveTask(id, currentStatus) {
//   let nextStatus = "Done";
//   if (currentStatus === "To Do") nextStatus = "In Progress";
//   else if (currentStatus === "In Progress") nextStatus = "Done";

//   try {
//     await updateDoc(doc(db, "tasks", id), { status: nextStatus });
//     loadTasks();
//   } catch (error) {
//     console.error("Error moving task:", error);
//   }
// }

// // Delete Task
// async function deleteTask(id) {
//   if (confirm("Are you sure you want to delete this task?")) {
//     try {
//       await deleteDoc(doc(db, "tasks", id));
//       loadTasks();
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   }
// }

// // Open Edit Modal
// function openEdit(id, task) {
//   editingId = id;
//   document.getElementById('task-title').value = task.title;
//   document.getElementById('task-description').value = task.description;
//   document.getElementById('task-assigned').value = task.assignedTo;
//   document.getElementById('task-due-date').value = task.dueDate || '';
//   modal.style.display = 'flex';
// }

// // Clear Form Inputs
// function clearInputs() {
//   document.getElementById('task-title').value = '';
//   document.getElementById('task-description').value = '';
//   document.getElementById('task-assigned').value = '';
//   document.getElementById('task-due-date').value = '';
// }

// // Load tasks initially
// loadTasks();




// // Import Firebase functions
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
// import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// // Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyA0znd0vyl2J67QjUhT9F4DKDHG1LVGhQQ",
//   authDomain: "fire-store-d298e.firebaseapp.com",
//   databaseURL: "https://fire-store-d298e-default-rtdb.firebaseio.com",
//   projectId: "fire-store-d298e",
//   storageBucket: "fire-store-d298e.appspot.com",
//   messagingSenderId: "193778002733",
//   appId: "1:193778002733:web:4bcc69f6e5bbc32356c1a4",
//   measurementId: "G-0JK1QRX1C7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // User ID
// let userId = localStorage.getItem('userId');
// if (!userId) {
//   userId = Date.now().toString();
//   localStorage.setItem('userId', userId);
// }

// // DOM elements
// const createBtn = document.getElementById('create-task-btn');
// const modal = document.getElementById('task-modal');
// const closeBtn = document.getElementById('close-modal-btn');
// const saveBtn = document.getElementById('save-task-btn');
// const todoTasks = document.getElementById('todo-tasks');
// const progressTasks = document.getElementById('in-progress-tasks');
// const doneTasks = document.getElementById('done-tasks');

// let editingId = null;

// // Open modal
// createBtn.addEventListener('click', () => {
//   editingId = null;
//   clearInputs();
//   modal.style.display = 'flex';
// });

// // Close modal
// closeBtn.addEventListener('click', () => {
//   modal.style.display = 'none';
// });

// // Save task
// saveBtn.addEventListener('click', async () => {
//   const title = document.getElementById('task-title').value.trim();
//   const description = document.getElementById('task-description').value.trim();
//   const assigned = document.getElementById('task-assigned').value.trim();
//   const dueDate = document.getElementById('task-due-date').value;

//   if (!title) {
//     alert('Task title is required');
//     return;
//   }

//   try {
//     if (editingId) {
//       const taskRef = doc(db, "tasks", editingId);
//       await updateDoc(taskRef, { title, description, assignedTo: assigned, dueDate });
//     } else {
//       await addDoc(collection(db, "tasks"), {
//         title,
//         description,
//         assignedTo: assigned,
//         dueDate,
//         status: "To Do",
//         creatorId: userId
//       });
//     }
//     modal.style.display = 'none';
//     loadTasks();
//   } catch (error) {
//     console.error("Error saving task:", error);
//     alert("Failed to save task. Check console.");
//   }
// });

// // Load tasks
// async function loadTasks() {
//   const querySnapshot = await getDocs(collection(db, "tasks"));
//   todoTasks.innerHTML = '';
//   progressTasks.innerHTML = '';
//   doneTasks.innerHTML = '';

//   querySnapshot.forEach(docSnap => {
//     const task = docSnap.data();
//     const card = createTaskCard(task, docSnap.id);
//     if (task.status === "To Do") todoTasks.appendChild(card);
//     else if (task.status === "In Progress") progressTasks.appendChild(card);
//     else if (task.status === "Done") doneTasks.appendChild(card);
//   });
// }

// // Create task card
// function createTaskCard(task, id) {
//   const card = document.createElement('div');
//   card.className = 'task-card';

//   card.innerHTML = `
//     <h4>${task.title}</h4>
//     <p>${task.description}</p>
//     <p><strong>Assigned:</strong> ${task.assignedTo}</p>
//     <p><strong>Due:</strong> ${task.dueDate ? task.dueDate : 'No date'}</p>
//   `;

//   const moveBtn = document.createElement('button');
//   moveBtn.textContent = "Move";
//   moveBtn.className = 'move-btn';
//   moveBtn.onclick = () => moveTask(id, task.status);

//   const editBtn = document.createElement('button');
//   editBtn.textContent = "Edit";
//   editBtn.className = 'edit-btn';
//   editBtn.onclick = () => openEdit(id, task);

//   card.appendChild(moveBtn);
//   card.appendChild(editBtn);

//   if (task.creatorId === userId) {
//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = "Delete";
//     deleteBtn.className = 'delete-btn';
//     deleteBtn.onclick = () => deleteTask(id);
//     card.appendChild(deleteBtn);
//   }

//   return card;
// }

// // Move task status
// async function moveTask(id, currentStatus) {
//   let nextStatus = "Done";
//   if (currentStatus === 'To Do') nextStatus = 'In Progress';
//   else if (currentStatus === 'In Progress') nextStatus = 'Done';

//   try {
//     await updateDoc(doc(db, "tasks", id), { status: nextStatus });
//     loadTasks();
//   } catch (error) {
//     console.error("Error moving task:", error);
//   }
// }

// // Delete task
// async function deleteTask(id) {
//   if (confirm("Delete this task?")) {
//     try {
//       await deleteDoc(doc(db, "tasks", id));
//       loadTasks();
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   }
// }

// // Edit task
// function openEdit(id, task) {
//   editingId = id;
//   document.getElementById('task-title').value = task.title;
//   document.getElementById('task-description').value = task.description;
//   document.getElementById('task-assigned').value = task.assignedTo;
//   document.getElementById('task-due-date').value = task.dueDate || '';
//   modal.style.display = 'flex';
// }

// // Clear inputs
// function clearInputs() {
//   document.getElementById('task-title').value = '';
//   document.getElementById('task-description').value = '';
//   document.getElementById('task-assigned').value = '';
//   document.getElementById('task-due-date').value = '';
// }

// // Initial load
// loadTasks();
