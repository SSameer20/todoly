import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSortAmountDown } from "react-icons/fa";
import { MdOutlineAddComment } from "react-icons/md";
import { FaRegCircle, FaRegCheckCircle, FaStar } from "react-icons/fa";   //,
import { CiStar } from "react-icons/ci";
import axios from 'axios'
import '../style/home.css'

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/server/task-data');
            setTasks(response.data.recordset);
            console.log(response.data.recordset)
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }

    };




    useEffect(() => {
        fetchData();
    });


    return (
        <div className="home">

            

            <div className="menu">
                <div className="menu-title">
                    <p> To Do List</p>
                </div>
                <div className="menu-items">
                    <p> <Link to="/create"><MdOutlineAddComment /></Link></p>
                    {/* <button id="back" type="submit"><Link to="/create">Add Task  <MdOutlineAddComment /></Link></button> */}
                    {/* <button><FaSortAmountDown/></button> */}
                    {/*  onClick={SortData} */}

                </div>
            </div>

            <div className="items">
                {
                    tasks.map((task) => {
                        return <div className="item" key={task.id} >
                            <div className="details">

                                <button style={{ backgroundColor: "white", border: "none" }} onClick={(e) => e.completed = !e.completed}>
                                    {
                                        task.completed === "y" ? <FaRegCheckCircle /> : <FaRegCircle />
                                    }
                                </button>
                                <div className="task-title">{task.task_name}</div>
                            </div>

                            <div className="importance">

                                <p>{task.current_time.split('T')}</p>
                                {
                                    task.importance === "true" ? <FaStar /> : <CiStar />
                                }

                            </div>
                        </div>

                    })
                }



            </div>


        </div >
    )
}
