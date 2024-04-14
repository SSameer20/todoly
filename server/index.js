const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const data = require("./data/task")
const sql = require("mssql/msnodesqlv8");


const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(cors())
app.use(bodyParser.json());

// Creating and connecting to the MS SQL SErver Database
var config =  {
  server : "ZENX\\SQLEXPRESS04",
    database: "todo",
    driver: "msnodesqlv8",
    options : {
        trustedConnection : true
    }
}

let dbData;
const sortData = () => {
  sql.connect(config, function(err){
    if(!err){
      var request = new sql.Request();
      request.query("select * from task  order by task_name", function(err, data){
        if(!err){
          console.log(data);
          dbData = data;
        }
        else{
          console.log(err);
        }
      })
    }
    else{
      console.log("Error While Connecting", err)
    }
  })
}

const fetchData = () => {
  sql.connect(config, function(err){
    if(!err){
      var request = new sql.Request();
      request.query("select * from task", function(err, data){
        if(!err){
          console.log(data);
          dbData = data;
        }
        else{
          console.log(err);
        }
      })
    }
    else{
      console.log("Error While Connecting", err)
    }
  })
}

async function insertTask(task, desc, completed,importance) {
  const pool = await connectToDatabase();

  try {
    const request = pool.request();
    request.input('task_name', sql.VarChar(50), task); // Adjust data type if needed
    request.input('desc', sql.VarChar(100), desc); // Adjust data type if needed
    request.input('completed', sql.Char(1), completed); 
    request.input('importance', sql.Char(1), importance); // Adjust data type if needed

    const result = await request.query(`
      INSERT INTO task (task_name, desc, completed, importance)
      VALUES (@task, @desc, @completed, @importance)
    `);

    console.log('Task inserted successfully:', result.rowsAffected); // Check rows affected
  } catch (error) {
    console.error('Error inserting task:', error);
    // Handle errors appropriately (e.g., log details, send error response)
  }
}



// Endpoint to receive form data
app.post('/server/create-task', (req, res) => {
  const newData = req.body; // Get data from request body
  data.push(newData); // Add new data to the array
  insertTask(req.body.task_name, req.body.desc,req.body.completed, req.body.importance )
  res.json({ message: 'Task created successfully!' });
});

app.get('/server/sort-data', (req, res)=>{
  sortData();
  res.setHeader('Content-Type', 'application/json');
  res.send(dbData);

})

app.get('/server/task-data', (req,res)=>{
  fetchData();
  res.setHeader('Content-Type', 'application/json');
  res.send(dbData);
  // console.log(dbData.recordset)
})

app.get('/', (req,res)=>{
    res.send('Hello from server');

})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
