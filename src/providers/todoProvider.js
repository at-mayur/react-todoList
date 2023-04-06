import { createContext } from "react"

import { useTodoProvider } from "../customHooks/todoContextProvider";

const initialState = {
    todos: [],
    setTodos: () => {},
    todoList: () => {},
    creatingTodo: () => {},
    updatingTodo: () => {},
    deletingTodo: () => {}
}

export const todoContext = createContext(initialState);

function TodoProvider( {children} ){
    const todoState = useTodoProvider();
    return (
        <todoContext.Provider value={ todoState }>{children}</todoContext.Provider>
    );
}

export default TodoProvider;