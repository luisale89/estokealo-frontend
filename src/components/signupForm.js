import { useContext, useState } from "react";
import { Context } from "../store/appContex";
import { noSpace, validate_field, validateFormInputs } from "../helpers/validations";
import { handleChange } from "../helpers/handlers";
import { VerifyEmail } from "./verifyEmail";

export const SignupForm = () => {

    //eslint-disable-next-line
    const {store, actions} = useContext(Context);
    const [emailVerified, setEmailVerified] = useState(false)

    const form_fields= {
        email: "user-email",
        password: "user-password",
        re_password: "user-repeated-password",
        first_name: "user-first-name",
        last_name: "user-last-name",
        showPassword: "show-password-btn"
    }
    
    const initialFormState = {
        fields: {
            [form_fields.email]: "",
            [form_fields.password]: "",
            [form_fields.re_password]: "",
            [form_fields.first_name]: "",
            [form_fields.last_name]: "",
            [form_fields.showPassword]: ""
        },
        feedback: {
            [form_fields.email]: {valid: true, msg: ""},
            [form_fields.password]: {valid:true, msg: ""},
            [form_fields.re_password]: {valid:true, msg: ""},
            [form_fields.first_name]: {valid: true, msg: ""},
            [form_fields.last_name]: {valid: true, msg: ""}
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

    if (emailVerified) {
        return (
            <div className="card">
                <h5 className="card-title text-center pt-2">Crear una cuenta: </h5>
                <div className="card-body">
                    <p className="text-secondary">Ingrese sus datos para crear una cuenta:</p>
                    <form
                    id="signin-form" 
                    onSubmit={handleSubmit}
                    noValidate 
                    autoComplete="on">
                        <div className="input-group mb-2">
                            <span className="input-group-text">Nombre | Apellido</span>
                            <input 
                                type="text" 
                                aria-label="First name" 
                                className={`form-control ${form.feedback[form_fields.first_name].valid ? "" : "is-invalid"}`}
                                name={form_fields.first_name}
                                value={form.fields[form_fields.first_name]}
                                onChange={handleInputChange}
                                onBlur={checkField}
                                disabled={store.loading}
                                required/>
                            <input 
                                type="text" 
                                aria-label="Last name" 
                                className={`form-control ${form.feedback[form_fields.last_name].valid ? "" : "is-invalid"}`}
                                name={form_fields.last_name}
                                value={form.fields[form_fields.last_name]}
                                onChange={handleInputChange}
                                onBlur={checkField}
                                disabled={store.loading}
                                required/>
                        </div>
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
                                disabled={store.loading}
                                required
                            />
                            <div className={`invalid-feedback ${form.feedback[form_fields.email].valid ? "" : "invalid"}`}>
                                {form.feedback[form_fields.email].msg}
                            </div>
                        </div>
                        {/* password field */}
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
                        </div>
                        {/* password field */}
                        <div className="mb-2 custom-pw-container p-1">
                            <label htmlFor={form_fields.re_password} className="form-label">Reingresa tu contraseña:</label>
                            <input
                                className={`form-control ${form.feedback[form_fields.re_password].valid ? "" : "is-invalid"}`}
                                type={form.fields[form_fields.showPassword] ? "text" : "password"} 
                                placeholder="Ingesa tu contraseña" 
                                name={form_fields.re_password}
                                value={form.fields[form_fields.re_password]}
                                onChange={handleInputChange}
                                onKeyPress={noSpace}
                                onBlur={checkField}
                                disabled={store.loading}
                                id={form_fields.re_password}
                                required
                            />
                            <div className={`invalid-feedback ${form.feedback[form_fields.re_password].valid ? "" : "invalid"}`}>
                                {form.feedback[form_fields.re_password].msg}
                            </div>
                        </div>
                        {/* submit button */}
                        <div className="custom-submit-container">
                            <button 
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => {window.history.back()}}
                                disabled={store.loading}>
                                    {`< atrás`}
                            </button>
                            <button 
                                className="btn btn-primary submit-btn custom-submit-btn"
                                type="submit"
                                disabled={store.loading}>
                                    {store.loading ? <span>Cargando...</span> : "Siguiente"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    } else {
        return <VerifyEmail callback={() => {setEmailVerified(true)}}/>
    }
}