
async function customFetch(url, { body, config }){

    try {

        const headers = {
            "Content-Type": "application/json"
        };

        let configuration = {
            ...config,
            headers
        };

        if(body){
            configuration.body = JSON.stringify(body);
        }

        let response = await fetch(url, configuration);

        let data = await response.json();

        return data;
        
    } catch (error) {
        
        console.error(error);

    }

}


export async function getTodos(){
    let url = `https://jsonplaceholder.typicode.com/todos`;
    let config = {
        method: "GET"
    };

    let data = await customFetch(url, {config});
    if(data && data.length){
        return {
            data,
            success: true
        };
    }

    return {
        success: false
    };
    
}

export async function createTodo(body){
    let url = `https://jsonplaceholder.typicode.com/todos`;
    let config = {
        method: "POST"
    };

    let data = await customFetch(url, {body, config});
    if(data){
        return {
            data,
            success: true
        };
    }

    return {
        success: false
    };
}

export async function updateTodo(id, body){
    let url = `https://jsonplaceholder.typicode.com/todos/${id}`;
    let config = {
        method: "PUT"
    };

    let data = await customFetch(url, {body, config});
    if(data){
        return {
            data,
            success: true
        };
    }

    return {
        success: false
    };
}

export async function deleteTodo(id){
    let url = `https://jsonplaceholder.typicode.com/todos/${id}`;
    let config = {
        method: "DELETE"
    };

    let data = await customFetch(url, {config});
    if(data){
        return {
            data,
            success: true
        };
    }

    return {
        success: false
    };
}