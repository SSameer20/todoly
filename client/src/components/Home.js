import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSortAmountDown } from "react-icons/fa";
import { MdOutlineAddComment } from "react-icons/md";
import { FaRegCircle, FaRegCheckCircle,  FaStar  } from "react-icons/fa";   //,
import { CiStar } from "react-icons/ci";
import axios from 'axios'
import '../style/home.css'

export default function Home() {
    const [tasks, setTasks] = useState([]);
//   const [sortBy, setSortBy] = useState(0);


  const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:3001/task-data');
        setTasks(response.data);
        console.log(response.data)
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

    useEffect(() => {
       fetchData();
    }, []);

    // const handleSort = (criteria) => {
    //     setSortBy(!sortBy);
    //     const sortedTasks = [...tasks].sort((a, b) => {
    //       if (criteria === 0) return 0;
    //       if (criteria === 1) return a.imp - b.imp; // Ascending by importance
    //     //   if (criteria === 'importance-desc') return b.imp - a.imp; // Descending by importance
    //       return 0; // Default case
    //     });
    //     setTasks(sortedTasks);
    //   };


    return (
        <div className="home">

            <div className="menu">
                <div className="menu-title">
                    <p> To Do List</p>
                </div>
                <div className="menu-items">
                    <p> <Link to="/create"><MdOutlineAddComment /></Link></p>
                    <p><FaSortAmountDown /></p>

                </div>
            </div>

            <div className="items">
                {
                    tasks.map((task) => {
                        return <div className="item" >
                            <div className="details">
                    
                                <button style={{backgroundColor:"white", border:"none"}} onClick={(e) => e.completed = !e.completed}>
                                    {
                                    task.completed ? <FaRegCheckCircle /> : <FaRegCircle />
                                    }
                                    </button>
                                <div className="task-title">{task.task}</div>
                            </div>
                            
                            <div className="importance">
                                <p>{task.time}</p>
                                {
                                    task.imp ? <FaStar /> : <CiStar />
                                }
                                
                            </div>
                        </div>

                    })
                }



            </div>


        </div>
    )
}
