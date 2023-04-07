import './App.css';

// importing components
import CreateTodo from "./components/createTodo";
import TodoList from "./components/todoList";

// importing Context Provider
import TodoProvider from './providers/todoProvider';

function App() {

  return (
    <div className="App">

      {/* Wrapping all content within Context Provider */}
      <TodoProvider>

        {/* Header for app */}
        <div className='app-heading'>
          <img src='https://cdn-icons-png.flaticon.com/512/3031/3031267.png' alt='todo' />
          <h1>
            To Do
          </h1>
        </div>

        {/* Rendering components if todos fetched from api else show loading */}
        <CreateTodo />
        <TodoList />
        

      </TodoProvider>
      
    </div>
  );
}

export default App;
