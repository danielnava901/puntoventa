

const sender = async ({url, data = {}, token = null, method = "POST"}) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    if(!!token) headers.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: method,
        headers: headers,
        body: method !== "GET" ? JSON.stringify(data) : null,
        redirect: "follow"
    };

    let response = await fetch(url, requestOptions);

    /*Token caducó*/
    if(response.status === 401) {
        localStorage.removeItem("auth");
        window.location.href = "/";
    }

    if(!response.ok) {
        return null;
    }
    response = await response.json();

    return response.data;
}

export {sender};