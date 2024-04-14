import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSortAmountDown } from "react-icons/fa";
import { MdOutlineAddComment } from "react-icons/md";
import {  FaRegCheckCircle,  FaStar  } from "react-icons/fa";   //,
import { CiStar } from "react-icons/ci";
import axios from 'axios'
import '../style/home.css'

export default function Home() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/task-data');
                setTasks(response.data);
                console.log(response.data) // Update state with fetched data
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData(); // Call the function to fetch data
    }, []);


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
                        return <div className="item">
                            <div className="details">
                                {/* <FaRegCircle /> */}
                                <FaRegCheckCircle />
                                <div className="task-title">{task.task}</div>
                            </div>
                            
                            <div className="importance">
                                {
                                    task.imp ? <FaStar /> : <CiStar />
                                }
                                
                            {/* <CiStar style={{color : task.imp ? "red" : "black"}} /> */}

                            </div>
                        </div>

                    })
                }



            </div>


        </div>
    )
}
