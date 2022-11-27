//eslint-disable-next-line
const getState = ({ getStore, getActions, setStore }) => {
   const api_base_url = "http://127.0.0.1:5000";

	return {
		store: {
         userLoggedIn: false,
         sessionUserData: {},
         sessionRoleData: {},
         loading: false,
         backdrop: true,
         toast_shown: false,
         toast_text: "",
         toast_type: "info" //info-success-warning-danger
		},
		actions: {
         login_user: (payload={}) => {
            /*
            login_function
               */
            localStorage.setItem("access_token", payload.access_token);
            setStore({
               userLoggedIn: true,
               sessionUserData: payload.user,
               sessionRoleData: payload.role
            });
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
            actions.show_toast("Sesión finalizada con éxito", "success");
            return null;
         },
         hide_toast: () => {
            /* Function to hide app AppToast */
            setStore({toast_shown: false});
            const tid = sessionStorage.getItem("snackbar_timer");
            if (tid) {
               clearTimeout(tid);
               sessionStorage.removeItem("snackbar_timer");
            }
            return null;
         },
         show_toast: (text="hello", type="info") => {
            /* Function to show app notifications */
            const actions = getActions();
            const timer_id = setTimeout(actions.hide_toast, 3000); //3 seconds
            setStore({toast_shown: true, toast_text: text, toast_type: type});
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
               actions.fetchData("/auth/test-jwt")
               .then(data => {
                  //eslint-disable-next-line
                  const { result, payload } = data;
                  result === 200 ? setStore({
                     userLoggedIn: true,
                     sessionUserData: payload.user,
                     sessionRoleData: payload.role
                  }) : setStore({
                     userLoggedIn: false,
                     sessionUserData: {},
                     sessionRoleData: {}
                  });
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
                  if (response.status === 401) { //unauthorized
                     actions.logout_user();
                     actions.show_toast("La sesión ha expirado", "info");
                  } else if (response.status === 400) { //bad.request
                     actions.show_toast("Los datos ingresados no son válidos", "danger");
                  };
               }
               return response.json();
            })
            .then(data => {
               setStore({loading: false, backdrop: false});
               console.log(data);
               //returs promise to caller
               return data
            })
            .catch(error => {
               actions.show_toast("Error de conexión. Intenta más tarde.", "danger");
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