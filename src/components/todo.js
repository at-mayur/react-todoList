import { useState } from "react";
import React from "react";
import styles from "../styles/todoStyle.module.css";

// importing api call actions from /config/todoActions
import { updateTodoAction, deleteTodoAction } from "../config/todoActions";
import { useTodos } from "../customHooks/todoContextProvider";


function Todo(props) {

  // Using context provided by provider by using custom hook useTodos()
  const todoContext = useTodos();

  // Using useState hook to manage component
  // editTodo to enable disable update todo form on click of edit and cancel btn
  const [editTodo, setEditTodo] = useState(false);

  // updatingTodo to enable disable button when request sent to api and is waiting for response
  const [updatingTodo, setUpdatingTodo] = useState(false);




  // Note: API takes update request for ids upto 200.
  // Create new task will create task with id 201. Hence newly created task update will throw error.




  // Function to handle mark complete btn click
  async function handleMarkComplete(event){

    // Preventing default action
    event.preventDefault();

    // Note: API takes update request for ids upto 200.
    // Create new task will create task with id 201. Hence newly created task update will throw error.
    if(props.todo.id>200){
      alert("API takes update request for ids upto 200. Newly created task has ID 201. Hence Update request cannot be processed.");
      return;
    }

    // Set updatingTodo to true.
    // It will disable button.
    setUpdatingTodo(true);


    // create body object with task detail as entered by user.
    let body = {
      completed: true
    };

    // Send request to update task
    const response = await updateTodoAction(props.todo.id, body);

    // if response is successful then completion status as per the response data.
    if(response.success){
      
      todoContext.updateTodo(props.todo.id, response.data);

    }

    // Set updatingTodo to false.
    // It will enable button.
    setUpdatingTodo(false);

  }


  // Function to handle form submit after update btn click.
  async function handleTodoUpdate(event){

    event.preventDefault();

    // Note: API takes update request for ids upto 200.
    // Create new task will create task with id 201. Hence newly created task update will throw error.
    if(props.todo.id>200){
      alert("API takes update request for ids upto 200. Newly created task has ID 201. Hence Update request cannot be processed.");
      return;
    }

    setUpdatingTodo(true);

    let textArea = document.getElementById(`todo-update-title-${props.todo.id}`);

    // create body object with task detail as entered by user.
    let body = {
      title: textArea.value,
      completed: false
    };

    // Send request to update task
    const response = await updateTodoAction(props.todo.id, body);

    // if response is successful.
    if(response.success){
      // Update todos state
      todoContext.updateTodo(props.todo.id, body);

      // set edit false
      setEditTodo(false);
    }

    setUpdatingTodo(false);

  }


  // Function to handle delete todo after delete btn click.
  async function handleDeleteTodo(){

    setUpdatingTodo(true);
    
    // Send request to delete todo
    const response = await deleteTodoAction(props.todo.id);

    // if response is successful.
    if(response.success){
        // Update todos state
        todoContext.deleteTodo(props.todo.id);

        // console.log(todoContext.todos);
    }


    setUpdatingTodo(false);

  }

  // handle click for edit and cancel edit btn
  function handleEditTodo(){
    setEditTodo(!editTodo);
  }


  // if edit clicked then render this component
  if (editTodo) {
    return (
      // main container
      <div id={"todo-"+props.todo.id} className={styles.todoContainer}>

        {/* Form to update description for todo */}
        <div className={styles.todoContent}>

          <form method="post" className={styles.updateTodoForm} onSubmit={ handleTodoUpdate }>
              <textarea id={"todo-update-title-"+props.todo.id} name="todoDesc" defaultValue={props.todo.title} ></textarea>
              <button type="submit" disabled={ updatingTodo }>{ updatingTodo ? "Updating...": "Update" }</button>
          </form>

        </div>

        {/* Cancel edit button */}
        <div className={styles.todoActions}>

            <img src="https://cdn-icons-png.flaticon.com/512/4347/4347434.png" alt="cancel-edit" onClick={ handleEditTodo } />

        </div>
        
      </div>
    );
  }
  
  // if cancel edit clicked then render this component
  return (
    // main container
    <div id={"todo-"+props.todo.id} className={styles.todoContainer}>

        {/* Task description */}
        <div className={styles.todoContent}>
            {/* Task description */}
            <p className={props.todo.completed ? styles.complete : ""}>{props.todo.title}</p>

            {/* If task is not complete then display Mark Complete button */}
            {!props.todo.completed ? (
              <form method="post" onSubmit={ handleMarkComplete }>
                  <button type="submit" disabled={ updatingTodo }>{ updatingTodo ? "Updating...": "Mark Complete" }</button>
              </form>
            ) : null}
        </div>
        
        {/* todo edit and delete btns */}
        <div className={styles.todoActions}>
              {/* If task is not complete then display Edit button */}
            {!props.todo.completed ? (
              <img src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png" alt="edit" onClick={ handleEditTodo } />
            ) : null}
            
            {/* If delete request is processing then display "..." as processing status.
            else display delete btn. */}
            {updatingTodo ? (
              <span style={ {color: "red", fontSize: 26} }>...</span>
            ) : ( 
              <img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="delete" onClick={ handleDeleteTodo } />
             )}
        </div>

    </div>
  );
}

export default Todo;
