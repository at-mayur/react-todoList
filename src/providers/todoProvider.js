import { createContext } from "react"

import { useTodoProvider } from "../customHooks/todoContextProvider";

// Initial state for todoContext
const initialState = {
    todos: [],
    loading: true,
    addTodo: () => {},
    updateTodo: () => {},
    deleteTodo: () => {},
}

// Create and export todoContext
export const todoContext = createContext(initialState);

// Create TodoProvider component to make context available to all children of it's
function TodoProvider( {children} ){
    // custom hook which manages context's state
    const todoState = useTodoProvider();

    return (
        // context.Provider will provide context to all of his children
        <todoContext.Provider value={ todoState }>{children}</todoContext.Provider>
    );
}

export default TodoProvider;