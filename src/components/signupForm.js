import { useContext, useState } from "react";
import { Context } from "../store/appContex";
import { noSpace, validate_field, validateFormInputs } from "../helpers/validations";
import { handleChange } from "../helpers/handlers";

export const SignupForm = () => {

    const {store, actions} = useContext(Context);
    const [userInfo, setUserInfo] = useState({});

    const form_fields= {
        email: "user-email",
        password: "user-password",
        name: "user-first-name",
        lname: "user-last-name"
    }
    
    const initialFormState = {
        fields: {
            [form_fields.email]: "",
            [form_fields.password]: "",
            [form_fields.name]: "",
            [form_fields.lname]: ""
        },
        feedback: {
            [form_fields.email]: {valid: true, msg: ""},
            [form_fields.password]: {valid:true, msg: ""},
            [form_fields.name]: {valid: true, msg: ""},
            [form_fields.lname]: {valid: true, msg: ""}
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
            });
        } else {
            //get user info
            actions.fetchData(`/auth/email-public-info?email=${form.fields[form_fields.email]}`)
            .then(data =>{
                const {result, payload} = data
                if (result === 404) {
                    //redirect to signup.
                    console.log("nop");
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
        <div className="card custom-login-form mb-4">
            <div className="form-container">
                <h1>Estokealo</h1>
                <p>Ingrese sus datos para iniciar sesión:</p>
                <form 
                id="signup-form" 
                onSubmit={handleSubmit} 
                noValidate
                autoComplete="on">
                    {/* email field */}
                    <div className="mb-3">
                        <label htmlFor={form_fields.email} className="form-label">Correo electrónico:</label>
                        <input
                            className={`form-control ${form.feedback[form_fields.email].valid ? "" : "is-invalid"}`}
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
                        {/* {form.feedback[form_fields.email].valid ? null : 
                        <div className="invalid-tooltip">{form.feedback[form_fields.email].msg}</div>} */}
                        <div className={`invalid-feedback ${form.feedback[form_fields.email].valid ? "" : "invalid"}`}>
                            {form.feedback[form_fields.email].msg}
                        </div>
                    </div>
                    {/* company options field */}
                    {userInfo.companies ? 
                    <div className="mb-3">
                        <label htmlFor="company" className="form-label">Empresa:</label>
                        <select 
                            value={form.fields[form_fields.company]} 
                            onChange={handleInputChange}
                            name={form_fields.company}
                            className="form-select"
                            >
                            <option value="">Entrar sin empresa...</option>
                            {userInfo.companies.map((item) => 
                            <option key={item.ID} value={item.name}>
                                {item.name}
                            </option>)}
                        </select>
                        <div id="companyHelp" className="form-text">
                            Selecciona la empresa con la que deseas iniciar sesión.
                        </div>
                    </div>: ""}
                    {/* password field */}
                    {userInfo.user ? 
                    <div className="mb-3">
                        <label htmlFor={form_fields.password} className="form-label">Contraseña:</label>
                        {/* <span className={`invalid-tooltip ${form.feedback[form_fields.password].valid ? "valid" : "invalid"}`}>
                            {form.feedback[form_fields.password].msg}
                        </span> */}
                        <input
                            className={`form-control ${form.feedback[form_fields.password].valid ? "" : "is-invalid"}`}
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
                        <div className={`invalid-feedback ${form.feedback[form_fields.password].valid ? "" : "invalid"}`}>
                            {form.feedback[form_fields.password].msg}
                        </div>
                        <button 
                        id="forgot-pw-link"
                        className="btn btn-link mt-2"
                        type="button">
                            ¿Olvidaste tu contraseña?
                        </button>
                        {/* {form.feedback[form_fields.password].valid ? null : 
                        <div className="invalid-feedback">{form.feedback[form_fields.password].msg}</div>} */}
                    </div> : ""}
                    {/* submit button */}
                    <div className="submit-container">
                        {userInfo.user ? 
                        <button 
                            className="btn btn-outline-secondary"
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
            </div>
        </div>
    )
}