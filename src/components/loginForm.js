import { useContext, useState } from "react";
import { Context } from "../store/appContex";
import { noSpace, validate_field, validateFormInputs } from "../helpers/validations";
import { handleChange } from "../helpers/handlers";
import { useNavigate, Link } from "react-router-dom";

export const LoginForm = () => {

    const {store, actions} = useContext(Context);
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    const form_fields= {
        email: "user-email",
        password: "user-password",
        company: "user-company",
        showPassword: "show-password"
    }
    
    const initialFormState = {
        fields: {
            [form_fields.email]: "",
            [form_fields.password]: "",
            [form_fields.company]: "",
            [form_fields.showPassword]: false
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
        const ele = document.getElementById(form_fields.password);
        if (ele) {
            ele.type = "password";
            setForm({
                fields: Object.assign(form.fields, 
                    {[form_fields.showPassword]: false}),
                ...form
            });
        }

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
                password: form.fields[form_fields.password],
                company_id: userInfo.companies.find((company) => company.name === form.fields[form_fields.company])?.id
            };
            //fetch data
            actions.fetchData(`/auth/login`, "POST", body)
            .then(data => {
                const { result, payload } = data
                if (result === 403) {
                    setForm({
                        feedback: Object.assign(form.feedback, 
                            {[form_fields.password]: {valid:false, msg:"Contraseña incorrecta, intenta nuevamente"}}),
                        ...form
                    });
                } else if (result === 200) {
                    actions.show_toast("Sesión iniciada con éxito", "success");
                    actions.login_user(payload);
                }
            });
        } else {
            //get user-public-info
            actions.fetchData(`/auth/email-public-info?email=${form.fields[form_fields.email]}`)
            .then(data =>{
                const {result, payload} = data
                if (result === 404) {
                    //redirect to signup view
                    navigate(`/auth/signup${"?email="+form.fields[form_fields.email]}`);
                } else if (result === 200){
                    setUserInfo(payload);
                };
            });
        };
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
        <div className="card">
            <h5 className="card-title text-center pt-2">Inicio de sesión: </h5>
            <div className="card-body">
                {userInfo.user ? 
                <p className="mb-0">
                    Hola de nuevo, {userInfo.user.firstName} <span role="img" aria-label="waving-hand">👋</span>
                </p> : null}
                <p className="text-secondary">Ingresa tus datos para iniciar sesión:</p>
                <form
                id="login-form" 
                onSubmit={handleSubmit}
                noValidate 
                autoComplete="on">
                    {/* email field */}
                    <div className="mb-2 p-1">
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
                    <div className="mb-2 p-1">
                        <label htmlFor="company" className="form-label">Empresa:</label>
                        <select 
                            value={form.fields[form_fields.company]} 
                            onChange={handleInputChange}
                            name={form_fields.company}
                            className="form-select"
                            disabled={store.loading}
                            >
                            <option value="">Entrar sin empresa...</option>
                            {userInfo.companies.map((item) => 
                            <option key={item.id} value={item.name}>
                                {item.name}
                            </option>)}
                        </select>
                        <div id="companyHelp" className="form-text">
                            Selecciona la empresa con la que deseas iniciar sesión.
                        </div>
                    </div>: ""}
                    {/* password field */}
                    {userInfo.user ? 
                    <div className="mb-2 custom-pw-container p-1">
                        <label htmlFor={form_fields.password} className="form-label">Contraseña:</label>
                        <input
                            className={`form-control ${form.feedback[form_fields.password].valid ? "" : "is-invalid"}`}
                            type={form.fields[form_fields.showPassword] ? "text" : "password"} 
                            placeholder="Ingesa tu contraseña" 
                            name={form_fields.password}
                            value={form.fields[form_fields.password]}
                            onChange={handleInputChange}
                            onKeyPress={noSpace}
                            onBlur={checkField}
                            disabled={store.loading}
                            id={form_fields.password}
                            required
                        />
                        <div className={`invalid-feedback ${form.feedback[form_fields.password].valid ? "" : "invalid"}`}>
                            {form.feedback[form_fields.password].msg}
                        </div>
                        <div className="form-check form-switch custom-show-pw-button">
                            <input 
                            className="form-check-input" 
                            type="checkbox"
                            name= {form_fields.showPassword}
                            checked= {form.fields[form_fields.showPassword]}
                            onChange={handleInputChange}
                            id="show-password-input" />
                            <label className="form-check-label" htmlFor="show-password-input">
                                mostrar contraseña
                            </label>
                        </div>
                        <Link
                            to={`/auth/restart-password?email=${form.fields[form_fields.email]}`}
                            id="forgot-pw-link"
                            className="btn btn-link mt-2"
                            type="button"
                            disabled={store.loading}>
                                ¿Olvidaste tu contraseña?
                        </Link>
                    </div> : null}
                    {/* submit button */}
                    <div className="custom-submit-container">
                        {userInfo.user ? 
                        <button 
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={restartLogin}
                            disabled={store.loading}>
                                {`< atrás`}
                        </button> : null}
                        <button 
                            className="btn btn-primary submit-btn custom-submit-btn"
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