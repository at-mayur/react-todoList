import { useState } from "react";
import { useTodos } from "../customHooks/todoContextProvider";
import styles from "../styles/createTodoStyle.module.css";

// importing api call actions from /config/todoActions
import { createTodoAction } from "../config/todoActions";

// Functional component to create todo
function CreateTodo(){

    // Using context provided by provider by using custom hook useTodos()
    const todoContext = useTodos();

    // Using useState hook to manage component
    // taskDetail for storing and updating task detail as user types within textarea
    const [taskDetail, setTaskDetail] = useState("");

    // taskCreating to enable disable button when request sent to api is waiting for response
    const [taskCreating, setTaskCreating] = useState(false);

    // Function to handle form submit action to create new Task.
    async function handleCreateTodo(event){

        // Set taskCreating to true.
        // It will disable button and show text as creating..
        setTaskCreating(true);

        // Preventing default action
        event.preventDefault();

        // create body object with task detail as entered by user.
        let body = {
            title: taskDetail,
            completed: false,
        };

        // Send request to create task
        const response = await createTodoAction(body);


        // if response is successful then add todo item to current list.
        if(response.success){
            // prepending newly created task to list.
            todoContext.addTodo(response.data);

            // resetting text area.
            setTaskDetail("");

        }
        

        // Set taskCreating to false.
        // It will enable button and show text as create task..
        setTaskCreating(false);

    }

    // On change event handler for text area
    function handleDetailChange(event){
        setTaskDetail(event.target.value);
    }

    return (
        <div className={styles.createTodoContainer}>
            {/* Form to create task */}
            <form method="post" className={styles.createForm} onSubmit={ handleCreateTodo }>
                <textarea name="todoDesc" placeholder="Enter short description about Task..." value={taskDetail} onChange={ handleDetailChange }></textarea>
                {/* Button. Disabled when clicked and waiting for response. Enabling again after getting response. */}
                <button type="submit" disabled={ taskCreating }>{ taskCreating ? "Creating...": "Create Task" }</button>
            </form>
        </div>
    );
}

export default CreateTodo;