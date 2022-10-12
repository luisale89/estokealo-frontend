import { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContex';

const useFetch = (resource="", options={}, body={}) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(0);
    //eslint-disable-next-line
    const {store, actions} = useContext(Context);
    const api_base_url = "http://127.0.0.1:5000";
    const {method = "GET", parameters = ""} = options

    let request_config = {
        method: method || "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        redirect: options.redirect || "error"
    };
    if (method === "PUT" || method === "POST") {
        request_config = { ...request_config, body: JSON.stringify(body) }
    }

    useEffect(() => {
        setLoading(true);
        setData(null);
        setError(null);

        fetch(`${api_base_url}${resource}${parameters}`, request_config)
        .then((response) => {
            console.log("Response: ", response);
            if (!response.ok) {
                if (response.status === 401) {
                    actions.logout_user(); // logout user when unauthorized
                }
                setError(response.status); //status code (400, 401, etc...)
            }
            return response.json();
        })
        .then((data) => {
            setLoading(false)
            setData(data.payload)
            console.log(data)
        })
        .catch((error) => {
            console.error("Error: ", error);
            setLoading(false);
            setError(500); //service unavailable.
        })
    //eslint-disable-next-line
    }, [resource])

    return {data, loading, error}
}

export default useFetch