//eslint-disable-next-line
const getState = ({ getStore, getActions, setStore }) => {
   const api_base_url = "http://127.0.0.1:5000";
   const access_token = localStorage.getItem("access_token") || "-";

	return {
		store: {
            userLoggedIn: false,
            user: {},
            loading: false
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
            getUserData: () => {
               /**
                  fetch().then().then(data => setStore({ "foo": data.bar }))
               */
               setStore({loading: true});
               const actions = getActions();

               fetch(`${api_base_url}/user/`, {
                  method: "GET", // or 'DELETE'
                  headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${access_token}`
                  },
                  // body: JSON.stringify({name: "data"}),
               })
               .then((response) => {
                  console.log('response:', response);
                  if (response.ok) {
                     setStore({userLoggedIn: true})

                  } else {
                     if (response.status === 401) {
                        actions.logout_user();
                     };
                  }
                  return response.json()
               })
               .then((data) => {
                  setStore({user: data.payload, loading: false})
                  console.log(data);
               })
               .catch((error) => {
                  setStore({loading: false});
                  console.error('Error:', error);
               });
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