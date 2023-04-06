import { useContext, useState } from "react";

import { todoContext } from "../providers/todoProvider";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../config/todoActions";

export const useTodos = () => {
    return useContext(todoContext);
};


export const useTodoProvider = () => {

    const [todos, setTodos] = useState([]);

    const todoList = async () => {

        const response = await getTodos();

        if(response.success){
            setTodos(response.data);
            return {
                success: true
            }
        }

        else{
            return {
                success: false
            }
        }

    };

    const creatingTodo = async (body) => {

        const response = await createTodo(body);

        return response;

    };

    const updatingTodo = async (id, body) => {

        const response = await updateTodo(id, body);

        return response;

    };

    const deletingTodo = async (id) => {

        const response = await deleteTodo(id);

        return response;

    };

    return {
        todos,
        setTodos,
        todoList,
        creatingTodo,
        updatingTodo,
        deletingTodo
    };

};