//eslint-disable-next-line
const getState = ({ getStore, getActions, setStore }) => {
   const api_base_url = "http://127.0.0.1:5000";

	return {
		store: {
         userLoggedIn: false,
         loading: false,
         backdrop: true,
         show_snackbar: false,
         snackbar_text: "",
         snackbar_type: "info" //info-success-warning-error
		},
		actions: {
         login_user: (payload={}) => {
            /*
            login_function
               */
            localStorage.setItem("access_token", payload.access_token);
            setStore({userLoggedIn: true});
            return null;
         },
         logout_user: () => {
            /*Logout function*/
            const access_token = localStorage.getItem("access_token");
            const actions = getActions();
            if (access_token) {
               actions.fetchData("/auth/logout", "DELETE");
               localStorage.removeItem("access_token");
               setStore({userLoggedIn: false, backdrop: true});
            }
            actions.show_snackbar("sesion finalizada", "success");
            return null;
         },
         hide_snackbar: () => {
            /* Function to hide app Snackbar */
            setStore({show_snackbar: false, snackbar_text: ""});
            const tid = sessionStorage.getItem("snackbar_timer");
            if (tid) {
               clearTimeout(tid);
               sessionStorage.removeItem("snackbar_timer");
            }
            return null;
         },
         show_snackbar: (text="hello", type="info") => {
            /* Function to show app snackbar */
            const actions = getActions();
            const timer_id = setTimeout(actions.hide_snackbar, 3000);
            setStore({show_snackbar: true, snackbar_text: text, snackbar_type: type});
            sessionStorage.setItem("snackbar_timer", timer_id);
            return null;
         },
         test_user_validation: () => {
            /* function to check if access_token in localStorage (if any) is valid, then login user or redirect to login */
            const actions = getActions();
            const access_token = localStorage.getItem("access_token");
            //fetch user endpoint
            if (!access_token) {
               setStore({userLoggedIn: false, backdrop: false});
            } else {
               setStore({backdrop: true});
               actions.fetchData("/auth/test-user-validation")
               .then(data => {
                  //eslint-disable-next-line
                  const { result, payload } = data;
                  result === 200 ? setStore({userLoggedIn: true}) : setStore({userLoggedIn: false});
               });
            }
            return null;
         },
         fetchData: (url="", method="GET", body={}, custom_access_token=null) => {
            /* General function to fetch data to API */
            const actions = getActions();
            let access_token = localStorage.getItem("access_token");
            if (custom_access_token) {
               //custom access token
               access_token = custom_access_token
            }
            let request_config = {
               method: method,
               headers: {
                     "Content-type": "application/json",
                     "Authorization": `Bearer ${access_token}`
               },
               redirect: "error"
            };
            if (method === "PUT" || method === "POST") {
                  request_config = { ...request_config, body: JSON.stringify(body) }
            };
            setStore({loading: true});
            //fetch
            const response = fetch(`${api_base_url}${url}`, request_config)
            .then(response => {
               //when response is resolved
               if (!response.ok) {
                  if (response.status === 401) {
                     actions.logout_user();
                     actions.show_snackbar("La sesión ha expirado", "info");
                  };
               }
               return response.json();
            })
            .then(data => {
               setStore({loading: false, backdrop: false});
               //returs promise to caller
               return data
            })
            .catch(error => {
               actions.show_snackbar("Error de conexión. Intenta más tarde.", "error");
               setStore({
                  loading: false, 
                  backdrop: false
               });
               return {result: 500, payload: error}
            });
            //return promise
            return response
         },
		}
	};
};

export default getState;