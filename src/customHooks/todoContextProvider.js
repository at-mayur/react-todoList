import { useContext, useEffect, useState } from "react";

import { todoContext } from "../providers/todoProvider";
// importing api call actions from /config/todoActions
import { getTodos } from "../config/todoActions";


// Custom hook to use context state to avoid importing context and calling useContext every time we need
export const useTodos = () => {
    return useContext(todoContext);
};


// custom hook to provide state to context
export const useTodoProvider = () => {

    // useState hook to store todo list.
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    // function which fetches todos and updates todos
    // useEffect hook with empty [] as 2nd arg to re render comonent only once after 1st render.
    useEffect(() => {

        // after rendering component first time.
        // make a call to api and update list of todos.
        const getTodoList = async () => {

            const response = await getTodos();
    
            if(response.success){
                // Set todos list if response successful. api returns empty object also hence checking length.
                if(response.data.length){
                    setTodos(response.data);
                }

            }
            
            setLoading(false);
    
        };

        getTodoList();
        
    }, []);


    // function update todos state after new todo creation
    const addTodo = (newTodo) => {

        // prepending newly created task to list.
        let todoList = [ newTodo, ...todos ];

        // calling setTodos to set todoList and re render component
        setTodos(todoList);

    };

    
    // function to update todos state after updating todo
    const updateTodo = (id, updatedTodo) => {

        // Updating todo with given id with updated data
        let todoList = todos.map( (todo) => {
            if(todo.id===id){
                let newTodo = todo;
                if(updatedTodo.completed){
                    newTodo.completed = updatedTodo.completed;
                }
                if(updatedTodo.title){
                    newTodo.title = updatedTodo.title;
                }
                return newTodo;
            }

            return todo;
        } );

        setTodos(todoList);

    };


    // function to update todos state after deleting todo
    const deleteTodo = (id) => {

        // remove the one which got deleted.
        let updatedTodos = todos.filter((todo) => todo.id !== id);

        // update list with new list.
        setTodos(updatedTodos);

    };


    // returning state with todos list and updating functions
    return {
        todos,
        loading,
        addTodo,
        updateTodo,
        deleteTodo,
    };

};