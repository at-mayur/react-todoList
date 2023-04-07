import { useTodos } from "../customHooks/todoContextProvider";
import styles from "../styles/todoListStyle.module.css";

import Todo from "./todo";
import Loader from "./loader";

function TodoList(){

    // Using context provided by provider by using custom hook useTodos()
    const todoContext = useTodos();

    // Getting todos list from Context
    const todos = todoContext.todos;

    return (
        <div className={styles.todoContainer}>

            {/* Rendering Todo Component for every todo in todoList */}
            {todoContext.loading ? (
                // display loader if api is fetching posts.
                <Loader />
                ) : (
                    // render todos after todos fetched from api
                <>
                    { todos.map( (todo, index) => {
                        // Passing index as key
                        return <Todo todo={todo} key={index} />

                    } ) }
                </>
            )}
            
        </div>
    );
}

export default TodoList;