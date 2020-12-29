import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/v4'


const LOCAL_STORAGE_KEY = 'todoapp.todos';

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null;
  }

  const handleClearTodos = () => {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  return (
    <div className="container main">
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <div className="input-field">
    <input ref={todoNameRef} type="text" id="input"/>
    <label for="input">Create Todo</label>
    </div>
    <button className="indigo lighten-2 white-text" onClick={handleAddTodo}>Add Todo</button>
    <button className="indigo lighten-2 white-text" onClick={handleClearTodos}>Clear Completed Todos</button>
    <div className="grey-text text-light-3">{todos.filter(todo => !todo.complete).length} left todo</div>
    </div>
  );
}

export default App;
