//eslint-disable-next-line
const getState = ({ getStore, getActions, setStore }) => {
   const api_base_url = "http://127.0.0.1:5000";
   const access_token = localStorage.getItem("access_token") || "-";

	return {
		store: {
            userLoggedIn: false,
            user: {},
            loading: false,
		},
		actions: {
            login_user: () => {
				/*
					login_function to complete with API
                */
               setStore({userLoggedIn: true});
               return "user logged-in";
            },
            logout_user: () => {
				   /*
					logout_function to complete with API
                */
               setStore({userLoggedIn: false, user: {}, loading: true});
               localStorage.removeItem("access_token");
               return "user logged-out";
            },
            fetchData: (url="", method="GET", parameters="", body={}) => {
               const actions = getActions();
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
               const response = fetch(`${api_base_url}${url}${parameters}`, request_config)
               .then(response => {
                  //when response is resolved
                  setStore({loading: false});
                  if (!response.ok) {
                     if (response.status === 401) {
                        actions.logout_user();
                     };
                  }
                  return response.json();
               })
               .then(data => {
                  const {result, message} = data
                  console.log(message);
                  if (result === 404) {
                     console.log("yes is 404");
                  }
                  //returs promise to caller
                  return data
               })
               .catch(error => {
                  setStore({loading: false});
                  console.log(error);
               });

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