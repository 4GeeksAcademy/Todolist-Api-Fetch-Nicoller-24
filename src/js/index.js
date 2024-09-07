//import react into the bundle
import React from "react";
import ReactDOM from "react-dom/client";


import TodoList from "./component/todolist.jsx";

//render your react application
ReactDOM.createRoot(document.getElementById('app')).render(<TodoList/>);

