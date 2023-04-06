import './App.css';

import CreateTodo from "./components/createTodo";
import TodoList from "./components/todoList";
import TodoProvider from './providers/todoProvider';

function App() {

  return (
    <div className="App">

      <TodoProvider>

        <div className='app-heading'>
          <img src='https://cdn-icons-png.flaticon.com/512/3031/3031267.png' alt='todo' />
          <h1>
            To Do
          </h1>
        </div>

        <CreateTodo />
        <TodoList />

      </TodoProvider>
      
    </div>
  );
}

export default App;
