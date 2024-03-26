document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const tasksList = document.getElementById('tasksList');
    const taskModal = document.getElementById('taskModal');
    const closeModal = document.querySelector('.close');
    const taskForm = document.getElementById('taskForm');
    const addTaskFormBtn = document.getElementById('addTaskFormBtn');
    const deleteTaskFormBtn = document.getElementById('deleteTaskFormBtn');

    // Define the tasks object
    const tasks = {};

    addTaskBtn.addEventListener('click', () => {
        taskModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        taskModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === taskModal) {
            taskModal.style.display = 'none';
        }
    });

    deleteTaskFormBtn.addEventListener('click', () => {
        taskForm.reset();
    });

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('taskTitle').value;
        const date = document.getElementById('taskDate').value;
        const description = document.getElementById('taskDescription').value;

        if (name && date) {
            // Check if we're editing an existing task or adding a new one
            const taskId = taskForm.getAttribute('data-task-id');
            if (taskId) {
                // Update existing task
                const task = tasks[taskId];
                task.querySelector('.taskName').textContent = name;
                task.querySelector('.dueDate').textContent = `Due: ${date}`;
                task.querySelector('.taskDescription').textContent = description;
                taskModal.style.display = 'none';
            } else {
                // Add new task
                addTask(name, date, description);
                taskModal.style.display = 'none';
            }
        }
    });
    let listoftasks = document.getElementById("listoftasks")
    function addTask(name, date, description) {
        const task = document.createElement('p');
        task.classList.add('task');

        const taskName = document.createElement('span');
        taskName.classList.add('taskName');
        taskName.textContent = name;
        task.appendChild(taskName);
        taskName.style.fontWeight = "bolder"

        const dueDate = document.createElement('span');
        dueDate.classList.add('dueDate');
        dueDate.textContent = `${date}`;
        task.appendChild(dueDate);

        // Create and append the description
        const btndiv = document.createElement('div')
        const taskDescription = document.createElement('span');
        taskDescription.classList.add('taskDescription');
        taskDescription.textContent = description;
        task.appendChild(taskDescription);
        taskDescription.style.fontWeight = "bolder"

        // Create edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = '📝';
        editBtn.addEventListener('click', () => {
            // Fill the modal form with the current task details
            document.getElementById('taskTitle').value = name;
            document.getElementById('taskDate').value = date;
            document.getElementById('taskDescription').value = description;
            // Set the task ID so we know which task to edit
            taskForm.setAttribute('data-task-id', task.id);
            taskModal.style.display = 'block';
        });

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🚮';
        deleteBtn.addEventListener('click', () => {
            tasksList.removeChild(task);
            // Remove the task from the tasks object
            delete tasks[task.id];
        });
        btndiv.append(editBtn, deleteBtn);
        task.appendChild(btndiv);


        // Assign a unique ID to the task
        task.id = Date.now(); // Simple unique ID
        tasks[task.id] = task; // Store the task in the tasks object

        listoftasks.appendChild(task);
    }
});
