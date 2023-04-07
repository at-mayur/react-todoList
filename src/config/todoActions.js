
// custom fetch function
async function customFetch(url, { body, config }){

    try {

        // header for request
        const headers = {
            "Content-Type": "application/json"
        };

        // configuring options for fetch.
        let configuration = {
            ...config,
            headers
        };

        // if body is present then include in configuration.
        if(body){
            // JSON.Stringify to convert object to string
            configuration.body = JSON.stringify(body);
        }

        // send request
        let response = await fetch(url, configuration);

        // get json data from response
        let data = await response.json();

        // return data
        if(data){
            return {
                data,
                success: true
            };
        }
    
        return {
            success: false,
            msg: "No Data"
        };
        
    } catch (error) {
        
        console.error(error);
        return {
            success: false,
            msg: error
        };

    }

}


// function to get todo list
export function getTodos(){

    // url and config with method as GET
    let url = `https://jsonplaceholder.typicode.com/todos`;
    let config = {
        method: "GET"
    };

    // get data by using above declared custom fetch
    return customFetch(url, {config});

    
}


// function to create todo task
export function createTodoAction(body){
    // url and config with method as POST
    let url = `https://jsonplaceholder.typicode.com/todos`;
    let config = {
        method: "POST"
    };

    // get data by using above declared custom fetch by passing body
    return customFetch(url, {body, config});
    
}

// function to update todo task
export function updateTodoAction(id, body){
    // url and config with method as PUT
    let url = `https://jsonplaceholder.typicode.com/todos/${id}`;
    let config = {
        method: "PUT"
    };

    // get data by using above declared custom fetch by passing body
    return customFetch(url, {body, config});
    
}

// function to delete todo task
export function deleteTodoAction(id){
    // url and config with method as DELETE
    let url = `https://jsonplaceholder.typicode.com/todos/${id}`;
    let config = {
        method: "DELETE"
    };

    // get data by using above declared custom fetch
    return customFetch(url, {config});
    
}