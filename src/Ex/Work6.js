import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const handleDelete = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const handleEdit = (todoId, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === todoId ? { ...todo, text: newText } : todo))
    );
  };

  const handleToggle = (todoId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New Todo"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onToggle={handleToggle}
          />
        ))}
      </ul>
    </div>
  );
}
function TodoItem({ todo, onDelete, onEdit, onToggle }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);
  
    const handleDeleteClick = () => {
      onDelete(todo.id);
    };
  
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleEditChange = (event) => {
      setNewText(event.target.value);
    };
  
    const handleEditSubmit = (event) => {
      event.preventDefault();
      if (newText.trim() === '') return;
      onEdit(todo.id, newText);
      setIsEditing(false);
    };
  
    const handleToggle = () => {
      onToggle(todo.id);
    };
  
    return (
      <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <input type="text" value={newText} onChange={handleEditChange} />
            <button type="submit">Save</button>
            </form>
  ) : (
    <>
      <span>{todo.text}</span>
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={handleDeleteClick}>Delete</button>
    </>
  )}
</li>);
}

function Work6() {
const [todos, setTodos] = useState([
{ id: 1, text: 'Buy milk', completed: false },
{ id: 2, text: 'Do laundry', completed: true },
{ id: 3, text: 'Learn React', completed: false },
]);
const [newTodoText, setNewTodoText] = useState('');

const handleNewTodoChange = (event) => {
setNewTodoText(event.target.value);
};

const handleNewTodoSubmit = (event) => {
event.preventDefault();
if (newTodoText.trim() === '') return;
const newTodo = {
id: todos.length + 1,
text: newTodoText,
completed: false,
};
setTodos([...todos, newTodo]);
setNewTodoText('');
};

const handleDeleteTodo = (id) => {
setTodos(todos.filter((todo) => todo.id !== id));
};

const handleEditTodo = (id, newText) => {
setTodos(
todos.map((todo) => {
if (todo.id === id) {
return {
...todo,
text: newText,
};
}
return todo;
})
);
};

const handleToggleTodo = (id) => {
setTodos(
todos.map((todo) => {
if (todo.id === id) {
return {
...todo,
completed: !todo.completed,
};
}
return todo;
})
);
};

return (
<>
<h1>Todo List</h1>
<ul>
{todos.map((todo) => (
<TodoItem
         key={todo.id}
         todo={todo}
         onDelete={handleDeleteTodo}
         onEdit={handleEditTodo}
         onToggle={handleToggleTodo}
       />
))}
</ul>
<form onSubmit={handleNewTodoSubmit}>
<input type="text" value={newTodoText} onChange={handleNewTodoChange} />
<button type="submit">Add Todo</button>
</form>
</>
);
}

export default Work6;
