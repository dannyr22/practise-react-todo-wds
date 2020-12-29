import React from 'react'

export default function Todo({ todo, toggleTodo }) {

    const handleTodoClick = () => {
        toggleTodo(todo.id)
    }
    return (
        <div className="container">
        <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
        <span>{todo.name}</span>
        </label>
            
        </div>
    )
}
