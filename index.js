const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());

let tasks = [
    { id: 1, title: 'Learning js', completed: false },
    { id: 2, title: 'Learning GO', completed: false },
]

app.get('/', (req, res) => {
    console.log('Server is /')
    return res.status(200).send('Server is running')
})


app.get('/tasks', (req, res) => {
    const task = tasks;
    // console.log(ta);
    return res.status(200).json(task);
})



//task by id
app.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id)
    const task = tasks.find(i => i.id === id)

    if (task)
        return res.status(200).json(task)
    else
        return res.status(404).json({ message: "Not found" })
})

//POST create a new task
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    }
    tasks.push(newTask)

    return res.status(201).json(newTask)
})


app.put('/Update/:id', (req, res) => {
    const id = Number(req.params.id)
    const taskIndex = tasks.find(i => i.id === id)

    if (taskIndex) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body }
        return res.status(201).json(tasks)
    }

    return res.status(401).json({ message: "Does not exist with this id" })
})


//delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id)
    tasks = tasks.filter(t => t.id !== id)
    return res.status(204).json(tasks)
})

app.listen(port, () => {
    console.log("server is running")
})