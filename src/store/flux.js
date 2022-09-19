//eslint-disable-next-line
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            userLoggedIn: false,
            appLoading: false,
            user: {}
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
                setStore({userLoggedIn: false});
                return "user logged-out";
            },
            loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
                */
               setStore({appLoading: true})
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