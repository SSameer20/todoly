import React from 'react';
import { LuListTodo } from "react-icons/lu";
// import {Link} from 'react-router-dom';
import '../style/navigation.css';
// import { IoBarChart } from "react-icons/io5";
// import { FaHome, FaNetworkWired } from "react-icons/fa";

export default function Navigation() {
  return (
    <nav>
      <div className="navigation-bar">
      <LuListTodo /> <p id='navigation-title'> To Do Application</p>
      </div>
    </nav>
  )
}