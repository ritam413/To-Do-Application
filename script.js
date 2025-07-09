
const taskInput = document.getElementById('taskInput')
const addTaskBtn = document.getElementById('addTaskBtn')
const taskList = document.getElementById('taskList')
const completed = document.getElementById('Completed')
let count = 1

const task = []

function addingInTextArea(text) {
    const li = document.createElement('li')
    const span = document.createElement('span')

    span.textContent = text;
    span.className = ('line-through  text-green-500 ')


    li.appendChild(span)
    li.className = "flex justify-between items-center px-4 py-2 bg-slate-100 rounded-md shadow-sm  "
    taskList.appendChild(li)
}
function addTask(text) {
    const li = document.createElement('li')

    const checkBoxesOnGoing = document.createElement('input')
    checkBoxesOnGoing.type = "checkbox"
    checkBoxesOnGoing.className = "flex justify-end w-4 h-4 accent-indigo-600";
    const checkBoxesCompleted = document.createElement('input')
    checkBoxesCompleted.type = "checkbox"
    checkBoxesCompleted.className = "flex justify-end w-4 h-4 accent-indigo-600";

    const checkboxSpan = document.createElement('span')
    checkboxSpan.className = 'flex flex-row gap-2'

    checkboxSpan.appendChild(checkBoxesOnGoing)
    checkboxSpan.appendChild(checkBoxesCompleted)

    const span = document.createElement('span')
    span.textContent = `${count}) ${text}`
    span.className = "text-slate-800"

    li.appendChild(span)
    li.appendChild(checkboxSpan)
    li.className = "flex justify-between items-center px-4 py-2 bg-slate-100 rounded-md shadow-sm"
    taskList.appendChild(li)

    task.push({
        id: count,
        text: text,
        isOngoing: false,
        isCompleted: false,
        elements: {
            li,
            span,
            checkBoxesOnGoing,
            checkBoxesCompleted
        }
    })

    taskInput.value = '';
    count++;
}
addTaskBtn.onclick = function () {
    let text = taskInput.value;
    console.log(text)
    if (text === "") return
    addTask(text)
}

function updateTextAreaWithCompletedTask() {
    const completedTask = []

    task.forEach(task => {
        if (task.elements.checkBoxesCompleted.checked) {
            completedTask.push(task.elements)
            console.log(task.elements)
        }
    })

    // console.log("Completed tasks:", completedTask);
    taskList.textContent = ''

    for (const task of completedTask) {
        const text = task.span.textContent
        addingInTextArea(text)

    }

}//fucntion to log completed task inconsole log



function updateTextAreaWithOngoingTask() {
    const onGoingTask = []
    task.forEach(task => {
        if (task.elements.checkBoxesOnGoing.checked) {
            onGoingTask.push(task.elements)
        }
    })

    taskList.textContent = ""

    for (const task of onGoingTask) {
        const text = task.span.textContent
        const li = document.createElement('li')
        const span = document.createElement('span')

        span.textContent = text;

        li.appendChild(span)
        li.className = "flex justify-between items-center px-4 py-2 bg-slate-100 rounded-md shadow-sm  "
        taskList.appendChild(li)
    }
}

function updateTextAreaWithAllTask() {
    taskList.textContent = ''
    for (const alltasks of task) {
        const text = alltasks.elements.span.textContent

        if (text.trim() === "") {
            continue
        }
        const li = document.createElement('li')
        const span = document.createElement('span')

        span.textContent = text;


        li.className = "flex justify-between items-center px-4 py-2 bg-slate-100 rounded-md shadow-sm"

        const checkBoxesOnGoing = document.createElement('input')
        checkBoxesOnGoing.type = "checkbox"
        checkBoxesOnGoing.className = "flex justify-end w-4 h-4 accent-indigo-600";
        checkBoxesOnGoing.isOngoing = checkBoxesOnGoing.checked

        const checkBoxesCompleted = document.createElement('input')
        checkBoxesCompleted.type = "checkbox"
        checkBoxesCompleted.className = "flex justify-end w-4 h-4 accent-indigo-600";
        checkBoxesCompleted.isCompleted = alltasks.checked

        checkBoxesOnGoing.onchange = () => {
            alltasks.isOngoing = checkBoxesOnGoing.checked;
        }

        checkBoxesCompleted.onchange = () => {
            alltasks.isCompleted = checkBoxesOnGoing.checked
        }

        const checkboxSpan = document.createElement('span')
        checkboxSpan.className = 'flex flex-row gap-2'
        checkboxSpan.appendChild(checkBoxesOnGoing)
        checkboxSpan.appendChild(checkBoxesCompleted)

        li.appendChild(span)
        li.appendChild(checkboxSpan)
        taskList.appendChild(li)

        alltasks.elements = {
            li,
            span,
            checkBoxesOnGoing,
            checkBoxesCompleted
        }
    }

    task.push({
        id: count,
        text: text,
        isOngoing: true,
        isCompleted: false,
        elements: {
            li,
            span,
            checkBoxesOnGoing,
            checkBoxesCompleted
        }
    })

}

