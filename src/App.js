import React, { useCallback, useState, useEffect } from 'react';

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);


  const onNewTodoChange = useCallback((event) => {
    setNewTodo(event.target.value);
  }, [])

  const formSubmitted = useCallback((event) => {
    event.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([
      {
        id: Math.random().toString(32),
        content: newTodo,
        done: false,
      },
      ...todos
    ])
    setNewTodo('');
  }, [newTodo, todos]);

  // closure to return function event
  const onTodoDone = useCallback((todo, index) => (event) => {
    const newTodo = [...todos];
    newTodo.splice(index, 1, {
      ...todo,
      done: !todo.done
    })
    setTodos(newTodo);
  }, [todos])

  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo))
  }, [todos])

  useEffect(() => {
    console.log(todos)
    // return () => {
    //   console.log('component was unmount cleanup!')
    // }
  }, [todos])

  return (
    <div>
      <form onSubmit={formSubmitted}>
        <label htmlFor="newTodo">Enter TODO:</label>
        <input
          id="newTodo"
          name="newTodo"
          value={newTodo}
          onChange={onNewTodoChange} />
        <button>Add TODO</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input
              checked={todo.done}
              type="checkbox"
              onChange={onTodoDone(todo, index)}
            />
            <span className={todo.done ? 'done' : ''}>{todo.content}</span>
            <button onClick={removeTodo(todo)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
