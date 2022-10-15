import { useContext, useState } from "react";
import { Context } from "../store/appContex";
import { noSpace, validate_field, validateFormInputs } from "../helpers/validations";
import { handleChange } from "../helpers/handlers";

export const Login = () => {

    const {store, actions} = useContext(Context);
    const [userInfo, setUserInfo] = useState({});

    const form_fields= {
        email: "user-email",
        password: "user-password",
        company: "user-company"
    }
    
    const initialFormState = {
        fields: {
            [form_fields.email]: "",
            [form_fields.password]: "",
            [form_fields.company]: ""
        },
        feedback: {
            [form_fields.email]: {valid: true, msg: ""},
            [form_fields.password]: {valid:true, msg: ""}
        }
    }

    const [form, setForm] = useState(initialFormState);

    const handleSubmit = (event) => { //event is the form that submit
        // se realiza validación de todos los requeridos y si todos son validos, se procede con el submit
        event.preventDefault();
        const {valid, feedback} = validateFormInputs(event.target.id, form.feedback) // valida todos los campos requeridos del formulario con id
        setForm({
            feedback: feedback,
            ...form
        });

        if (!valid) { // si no fueron validados los campos requeridos
            console.log("formulario no cumple con las validaciones");
            return null;
        }
        if (userInfo.user) {
            //login user
            let body = {
                email: form.fields[form_fields.email],
                password: form.fields[form_fields.password]
            };
            actions.fetchData(`/auth/login`, "POST", body)
            .then(data => {
                const { result, payload } = data

                if (result === 403) {
                    setForm({
                        feedback: Object.assign(form.feedback, 
                            {[form_fields.password]: {valid:false, msg:"Contraseña incorrecta, intenta nuevamente"}}),
                        ...form
                    });
                    return;
                } else if (result === 200) {
                    actions.login_user(payload);
                }
            })
        } else {
            //get user info
            actions.fetchData(`/auth/email-public-info?email=${form.fields[form_fields.email]}`)
            .then(data =>{
                const {result, payload} = data
                if (result === 404) {
                    console.log("404 -> redirect to signup-form with data as prop")
                };
                setUserInfo(payload);
            });

        }
        return null;
    };

    const handleInputChange = (event) => {
        setForm({
            fields: handleChange(event, form.fields),
            feedback: Object.assign(form.feedback, {[event.target.name]: {valid:true, msg:""}}),
            ...form
        })
    };

    const checkField = (event) => {
        setForm({feedback: validate_field(event, form.feedback), ...form});
    };

    const restartLogin = () => {
        setForm(initialFormState);
        setUserInfo({});
    }

    return (
        <div className="signin-view">
            <div className="form-container">
                <h1>Estokealo</h1>
                <p>Ingrese sus datos para iniciar sesión:</p>
                <form id="signin-form" onSubmit={handleSubmit} noValidate autoComplete="on">
                    {/* email field */}
                    <div className="form-group">
                        <label htmlFor={form_fields.email}>Correo electrónico:</label>
                        <span className={`invalid-tooltip ${form.feedback[form_fields.email].valid ? "valid" : "invalid"}`}>
                            {form.feedback[form_fields.email].msg}
                        </span>
                        <input
                            className={form.feedback[form_fields.email].valid ? "valid" : "invalid"}
                            type="email" 
                            placeholder="Ingesa tu correo electrónico" 
                            name={form_fields.email}
                            value={form.fields[form_fields.email]}
                            onChange={handleInputChange}
                            onKeyPress={noSpace}
                            onBlur={checkField}
                            disabled={store.loading || userInfo.user}
                            required
                        />
                    </div>
                    {/* company options field */}
                    {userInfo.companies ? 
                    <div className="form-inline-group">
                        <label htmlFor={`company`}>Empresa:</label>
                        <select 
                            value={form.fields[form_fields.company]} 
                            onChange={handleInputChange}
                            name={form_fields.company}
                            className={form.fields[form_fields.company] ? "": "empty-select"}
                            >
                            <option value="">Entrar sin empresa...</option>
                            {userInfo.companies.map((item) => 
                            <option key={item.ID} value={item.name}>
                                {item.name}
                            </option>)}
                        </select>
                    </div>: ""}
                    {/* password field */}
                    {userInfo.user ? 
                    <div className="form-group">
                        <label htmlFor={form_fields.password}>Contraseña:</label>
                        <span className={`invalid-tooltip ${form.feedback[form_fields.password].valid ? "valid" : "invalid"}`}>
                            {form.feedback[form_fields.password].msg}
                        </span>
                        <input
                            className={form.feedback[form_fields.password].valid ? "valid" : "invalid"}
                            type="password" 
                            placeholder="Ingesa tu contraseña" 
                            name={form_fields.password}
                            value={form.fields[form_fields.password]}
                            onChange={handleInputChange}
                            onKeyPress={noSpace}
                            onBlur={checkField}
                            disabled={store.loading}
                            required
                        />
                        <button 
                            className="btn-link"
                            type="button">
                                ¿Olvidaste tu contraseña?
                        </button>
                    </div> : ""}
                    {/* submit button */}
                    <div className="submit-container">
                        {userInfo.user ? 
                        <button 
                            className="btn btn-link"
                            type="button"
                            onClick={restartLogin}
                            disabled={store.loading}>
                                {`< atrás`}
                        </button> : ""}
                        <button 
                            className="btn btn-primary submit-btn"
                            type="submit"
                            disabled={store.loading}>
                                {store.loading ? <span>Cargando...</span> : userInfo.user ? "Ingresar" : "Siguiente"}
                        </button>
                    </div>
                </form>
                <p className="btn-link">¿no tienes cuenta? crea una cuenta</p>
            </div>
            <div className="side-container">
                <span>{JSON.stringify(userInfo || "")}</span>
            </div>
        </div>
    )
}