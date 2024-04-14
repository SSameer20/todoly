import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import '../style/create.css'
import axios from 'axios'




export default function Create() {

  const [formdata, setFormdata] = useState({
    task: '',
    desc: '',
    imp: '',
    time: new Date().toISOString().slice(11,16),
    completed: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = (e) => {
    axios.post('http://localhost:3001/create-task', formdata)
      .then(response => {
        console.log(response.data);
        alert('Task created successfully!');
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while creating the task. Please try again.');

      });

   

  };


  return (
    <div className='create-task'>
      <form action="" method="" id="form-box">
        <div className="task-title">
          <label htmlFor="">Task Name : </label>
          <input type="text" name="task" value={formdata.task} id="task-title" onChange={handleChange} />
        </div>

        <div className="form-task">
          <label htmlFor="">Description : </label>
          <textarea name="desc" id="desc" cols="20" rows="1" value={formdata.desc} onChange={handleChange}></textarea>
        </div>

        <div className="form-importance">
          <label htmlFor="">Important : </label>
          <input type="radio" name="imp" id="imp_yes" value="yes" checked={formdata.imp === 'yes'} onChange={handleChange} />
          <label htmlFor="imp_yes"> Yes </label>
          <input type="radio" name="imp" id="imp_no" value="no" checked={formdata.imp === 'no'} onChange={handleChange} />
          <label htmlFor="imp_yes"> No </label>
        </div>


        <button type="submit" onClick={handleSubmit}> Create</button>
        <button type="reset">Cancel</button>

      </form>
      <button type="submit"><Link to="/">Go back</Link></button>




    </div>
  )
}
