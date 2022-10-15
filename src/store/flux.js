//eslint-disable-next-line
const getState = ({ getStore, getActions, setStore }) => {
   const api_base_url = "http://127.0.0.1:5000";

	return {
		store: {
            userLoggedIn: false,
            loading: false,
            backdrop: true
		},
		actions: {
            login_user: (payload={}) => {
				/*
					login_function to complete with API
                */
               localStorage.setItem("access_token", payload.accessToken);
               setStore({userLoggedIn: true});
               return null;
            },
            logout_user: () => {
				   /*
					logout_function to complete with API
                */
               const access_token = localStorage.getItem("access_token");
               const actions = getActions();
               if (access_token) {
                  actions.fetchData("/auth/logout", "DELETE");
                  localStorage.removeItem("access_token");
                  setStore({userLoggedIn: false, backdrop: true});
               }
               return null;
            },
            test_user_validation: () => {
               const actions = getActions();
               const access_token = localStorage.getItem("access_token");
               //fetch user endpoint
               if (!access_token) {
                  setStore({userLoggedIn: false, backdrop: false});
               } else {
                  setStore({backdrop: true});
                  actions.fetchData("/user/")
                  .then(data => {
                     //eslint-disable-next-line
                     const { result, payload } = data;
                     result === 200 ? setStore({userLoggedIn: true}) : setStore({userLoggedIn: false});
                  });
               }
               return null;
            },
            fetchData: (url="", method="GET", body={}, parameters="") => {
               const actions = getActions();
               const access_token = localStorage.getItem("access_token");
               let request_config = {
                  method: method,
                  headers: {
                      "Content-type": "application/json",
                      "Authorization": `Bearer ${access_token}`
                  },
                  redirect: "error",
                  mode: "cors"
               };
               if (method === "PUT" || method === "POST") {
                     request_config = { ...request_config, body: JSON.stringify(body) }
               };
               setStore({loading: true});
               //fetch
               const response = fetch(`${api_base_url}${url}${parameters}`, request_config)
               .then(response => {
                  //when response is resolved
                  if (!response.ok) {
                     if (response.status === 401) {
                        actions.logout_user();
                     };
                  }
                  return response.json();
               })
               .then(data => {
                  const {result, payload} = data
                  setStore({loading: false, backdrop: false});
                  if (result === 404) {
                     console.log(payload);
                  }
                  //returs promise to caller
                  return data
               })
               .catch(error => {
                  setStore({loading: false, backdrop: false});
                  return {result: 500, payload: error}
               });
               console.log("fetch finished");
               //return promise
               return response
            },
            updateTables: (newTables) => {
                setStore({tables: newTables});
                return true; //! simulando exito en fetch a API
            },
            // set_role: (role) => { // establece el rol global de la app para las configuraciones.
            //     const store = getStore();
            //     role = typeof(role) !== 'undefined' ? role : store.user.roles[0].role;

            //     store.user.roles.forEach(item => { //what happens if user.role is empty?
            //         if (item.role === role) {
            //             setStore({current_role: role});
            //         }
            //     });
            //     // sessionStorage.setItem("a_token", "luis");
            //     // document.cookie = "name = luis, path = /, domain = localhost";//create a cookie that all app will see.
            //     // history.push(`/${store.app_roles[role].name}`); //set_role se debe ejecutar después del login efectivo del usuario.
            // }
		}
	};
};

export default getState;