let tasks = [];

const listForm = document.getElementById('listForm');
const taskList = document.getElementById('taskList');

listForm.onsubmit = function (event) {
    event.preventDefault(); // Prevent page reload

    const taskName = document.getElementById('taskName').value;
    const taskLevel = document.getElementById('taskLevel').value;
    const taskStatus = document.querySelector('input[name="status"]:checked').value;

    const task = {
        title: taskName,
        priority: taskLevel,
        status: taskStatus,
        isCompleted: taskStatus === 'Completed'
    };

    tasks.push(task);

    appendTask(task, tasks.length - 1);

    listForm.reset();
};

function appendTask(task, index) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.setAttribute('data-index', index);
    if (task.isCompleted) {
        li.classList.add('completed-task');
    }

    li.innerHTML = `
        <span>
            ${task.title} - ${task.priority} - ${task.status}
        </span>
        <div>
            <button class="btn btn-success btn-sm mark-complete">Mark as Complete</button>
            <button class="btn btn-danger btn-sm remove-task">Remove</button>
        </div>
    `;

    taskList.appendChild(li);

    li.querySelector('.remove-task').onclick = function () {
        removeTask(index, li);  
    };

    li.querySelector('.mark-complete').onclick = function () {
        markTaskAsComplete(index, li);
    };
}

function removeTask(index, taskElement) {
    tasks.splice(index, 1); 
    taskElement.remove();    
}

function markTaskAsComplete(index, taskElement) {
    tasks[index].isCompleted = true;
    taskElement.classList.add('completed-task');
}


