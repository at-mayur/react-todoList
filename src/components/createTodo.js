import { useState } from "react";
import { useTodos } from "../customHooks/todoContextProvider";
import styles from "../styles/createTodoStyle.module.css";

function CreateTodo(){

    const todoContext = useTodos();

    const [taskDetail, setTaskDetail] = useState("");
    const [taskCreating, setTaskCreating] = useState(false);

    async function handleCreateTodo(event){

        setTaskCreating(true);

        event.preventDefault();

        let body = {
            title: taskDetail,
            completed: false,
        };
        const response = await todoContext.creatingTodo(body);

        if(response.success){
            let todoList = [ response.data, ...todoContext.todos ];
            todoContext.setTodos(todoList);
        }

        setTaskCreating(false);

    }

    function handleDetailChange(event){
        setTaskDetail(event.target.value);
    }

    return (
        <div className={styles.createTodoContainer}>
            <form method="post" className={styles.createForm} onSubmit={ handleCreateTodo }>
                <textarea name="todoDesc" placeholder="Enter short description about Task..." defaultValue={taskDetail} onChange={ handleDetailChange }></textarea>
                <button type="submit" disabled={ taskCreating }>{ taskCreating ? "Creating...": "Create Task" }</button>
            </form>
        </div>
    );
}

export default CreateTodo;