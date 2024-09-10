import { element } from "prop-types";
import React, { useState, useEffect } from "react";

const TodoList = () => {
    const [pendienteInput, setPendienteInput] = useState("");
    const [pendiente, setPendiente] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null); // Estado para controlar el hover

    function getTodos() {
        fetch('https://playground.4geeks.com/todo/users/nicolle')
            .then((response) => response.json())
            .then((data) => setPendiente(data.todos))
            .catch((error) => console.error("Error al obtener los datos:", error));
    }

    function addTodo(newtask) {
        fetch('https://playground.4geeks.com/todo/todos/nicolle',
            {method: 'POST', 
             headers: {"Content-Type": "application/json"},
             body: JSON.stringify({
                "label": newtask,
                "is_done": false,
            })
            } )
            .then((response) => response.json())
            .then(() => getTodos())
            .catch((error) => console.error("Error al obtener los datos:", error));
    }
    
    function deleteTodo (id) {
        console.log("https://playground.4geeks.com/todo/todos/" + id)
        
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: 'DELETE',
            body: JSON.stringify() 
        })
        .then((response) => response.text())
        .then(() => getTodos())
        .catch((error) => console.error(error));
    }
    function deleteAllTodos() {
        pendiente.map((todos) => {
            fetch(`https://playground.4geeks.com/todo/todos/${todos.id}`, {
                method: 'DELETE',
                body: JSON.stringify() 
            })
            .then((response) => response.text())
            .then(() => getTodos())
            .catch((error) => console.error(error));
        } ) }
    
    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>  
            <div style={{ backgroundColor: "#f5f5dc", minHeight: "100vh", padding: "20px" }}> 
                <div className="container d-flex flex-column justify-content-center">
                    <p className="mx-auto" style={{color: "#d70026", fontSize: "95px"}}>ToDos</p>
                    <div 
                        className="mx-auto d-flex align-items-center"
                        style={{
                            width: "50%",
                            border: "1px solid #ccc", 
                            padding: "5px", 
                            backgroundColor: "white"
                        }}
                    >
                        <input
                            style={{
                                border: "none",  // Sin borde en el input
                                outline: "none",  // Sin borde al enfocar
                                width: "100%"  // El input toma todo el ancho del div
                            }}
                            type="text"
                            value={pendienteInput}
                            onChange={(e) => setPendienteInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    addTodo(pendienteInput)
                                  
                                    setPendienteInput("");
                                }
                            }}
                            placeholder={pendiente.length !== 0 ? "Añadir nueva tarea" : "No hay tareas, añadir tareas"}
                        />
                    </div>

                    {pendiente.map((element, index) => (
                        <p
                            key={index}
                            className="mx-auto d-flex justify-content-between align-items-center"
                            style={{ width: "50%", position: "relative", borderRight: "1px solid #ccc", borderLeft: "1px solid #ccc", borderBottom: "1px solid #ccc", padding: "5px", backgroundColor: "white", marginBottom: "0px" }}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                        >
                            {element.label}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-x"
                                viewBox="0 0 16 16"
                                style={{
                                    opacity: hoverIndex === index ? 1 : 0, // Cambia la opacidad según el estado
                                    cursor: "pointer",
                                    transition: "opacity 0.3s ease"
                                }}
                                onClick={() => {
                                    deleteTodo(element.id)
                                }}
                            >
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </p>
                    ))}
                    <div className="mx-auto " style={{width: "50%", position: "relative", backgroundColor: "white", borderRight: "1px solid #ccc", borderLeft: "1px solid #ccc", borderBottom: "1px solid #ccc", padding: "5px", color: "rgb(151 151 151)"}}>{pendiente.length} Task</div>
                </div>
                <button className="btn btn-danger mx-auto" style={{ width: "20%", marginTop: "20px" }}onClick={() => deleteAllTodos()} >
                    Eliminar todas las tareas
                </button>
            </div>
        </>
    );

};

export default TodoList;
