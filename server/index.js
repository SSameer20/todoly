const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
// const data = require("./data/task")

const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(cors())
app.use(bodyParser.json());

let data = [
  {
    task: 'Call friend',
    desc: 'Need to call a school friend today',
    imp: false
  }
  ,
    {
      task: 'Clean the kitchen',
      desc: 'Post-dinner dishes are piling up.',
      imp: false
    },
    {
      task: 'Go for a walk',
      desc: 'Need some fresh air and exercise.',
      imp: false
    },
    {
      task: 'Research vacation options',
      desc: 'Time to start planning that summer trip!',
      imp: true
    },
    {
      task: 'Read a book for book club',
      desc: 'Discussion next week. Better get started!',
      imp: true
    }
  
];
// Endpoint to receive form data
app.post('/create-task', (req, res) => {
  const newData = req.body; // Get data from request body
  data.push(newData); // Add new data to the array
  res.json({ message: 'Task created successfully!' });
});

app.get('/task-data', (req,res)=>{
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
})

app.get('/', (req,res)=>{
    res.send('Hello from server');

})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
