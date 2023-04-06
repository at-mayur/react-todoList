import { useState } from "react";

import styles from "../styles/todoStyle.module.css";
import { useTodos } from "../customHooks/todoContextProvider";

function Todo(props) {

  const todoContext = useTodos();

  const [editTodo, setEditTodo] = useState(false);
  const [todoDesc, setTodoDesc] = useState(props.todo.title);
  const [todoComplete, setTodoComplete] = useState(props.todo.completed);
  const [updatingTodo, setUpdatingTodo] = useState(false);

  async function handleMarkComplete(event){

    setUpdatingTodo(true);
    event.preventDefault();
    const response = await todoContext.updatingTodo(props.todo.id, { "completed": true });

    if(response.success){
      setTodoComplete(response.data.completed);
    }

    setUpdatingTodo(false);

  }

  async function handleTodoUpdate(event){

    setUpdatingTodo(true);
    event.preventDefault();
    let body = {
      title: todoDesc,
      completed: false
    };
    const response = await todoContext.updatingTodo(props.todo.id, body);

    if(response.success){
      setTodoDesc(response.data.title);
      setTodoComplete(response.data.completed);
      setEditTodo(false);
    }

    setUpdatingTodo(false);

  }

  async function handleDeleteTodo(){

    setUpdatingTodo(true);
    
    await props.handleDelete(props.todo.id);

    setUpdatingTodo(false);

  }

  function handleEditTodo(){
    setEditTodo(!editTodo);
  }

  function handleTodoChange(event){
    setTodoDesc(event.target.value);
  }

  if (editTodo) {
    return (
      <div id={"todo-"+props.todo.id} className={styles.todoContainer}>
        <div className={styles.todoContent}>

          <form method="post" className={styles.updateTodoForm} onSubmit={ handleTodoUpdate }>
              <textarea name="todoDesc" defaultValue={todoDesc} onChange={ handleTodoChange } ></textarea>
              <button type="submit" disabled={ updatingTodo }>{ updatingTodo ? "Updating...": "Update" }</button>
          </form>

        </div>

        <div className={styles.todoActions}>

            <img src="https://cdn-icons-png.flaticon.com/512/4347/4347434.png" alt="cancel-edit" onClick={ handleEditTodo } />

        </div>
        
      </div>
    );
  }
  
  return (
    <div id={"todo-"+props.todo.id} className={styles.todoContainer}>
        <div className={styles.todoContent}>
            <p className={todoComplete ? styles.complete : ""}>{todoDesc}</p>
            {!todoComplete ? (
              <form method="post" onSubmit={ handleMarkComplete }>
                  <button type="submit" disabled={ updatingTodo }>{ updatingTodo ? "Updating...": "Mark Complete" }</button>
              </form>
            ) : null}
        </div>
        
        <div className={styles.todoActions}>
            {!todoComplete ? (
              <img src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png" alt="edit" onClick={ handleEditTodo } />
            ) : null}
            
            {updatingTodo ? (
              <span style={ {color: "red", fontSize: 24} }>...</span>
            ) : ( 
              <img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="delete" onClick={ handleDeleteTodo } />
             )}
        </div>

    </div>
  );
}

export default Todo;
