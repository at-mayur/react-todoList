import { useEffect } from "react";
import { useTodos } from "../customHooks/todoContextProvider";
import styles from "../styles/todoListStyle.module.css";

import Todo from "./todo";

function TodoList(){

    const todoContext = useTodos();
    const todos = todoContext.todos;

    useEffect(() => {

        todoContext.todoList();

    }, []);

    async function handleDeleteTodo(id){

        const response = await todoContext.deletingTodo(id);
    
        if(response.success){
          let updatedTodos = todos.filter((todo) => todo.id !== id);

          todoContext.setTodos(updatedTodos);
        }
        
    }

    return (
        <div className={styles.todoContainer}>

            { todos.map( (todo) => {

                return <Todo todo={todo} handleDelete={handleDeleteTodo} key={todo.id} />

            } ) }
            
        </div>
    );
}

export default TodoList;