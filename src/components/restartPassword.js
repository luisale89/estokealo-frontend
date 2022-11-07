import { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContex";
import { noSpace, validate_field, validateFormInputs } from "../helpers/validations";
import { handleChange } from "../helpers/handlers";
import { VerifyEmail } from "./verifyEmail";
import { useNavigate } from "react-router-dom";
import { validations } from "../helpers/validations";

export const RestartPassword = () => {

    //eslint-disable-next-line
    const {store, actions} = useContext(Context);
    const [emailVerified, setEmailVerified] = useState(false)
    const navigate = useNavigate();

    const form_fields= {
        email: "user-email",
        password: "user-password",
        re_password: "user-repeated-password",
        showPassword: "show-password-btn"
    }
    
    const initialFormState = {
        fields: {
            [form_fields.email]: "",
            [form_fields.password]: "",
            [form_fields.re_password]: "",
            [form_fields.showPassword]: ""
        },
        feedback: {
            [form_fields.email]: {valid: true, msg: ""},
            [form_fields.password]: {valid:true, msg: ""},
            [form_fields.re_password]: {valid:true, msg: ""}
        }
    }

    const [form, setForm] = useState(initialFormState);
    //ComponentDidMount
    useEffect(() => {
        // if an email has been set in the query params, set the state.
        const params = new URLSearchParams(window.location.search);
        const email_in_params = params.get("email");
        const { valid, feedback } = validations["email"](email_in_params);
        //invalid email
        if (!valid) {
            console.log(feedback);
            actions.show_toast("email inválido en URL", "danger");
            navigate("/auth/login", {replace: true});
        //email validated
        } else {
            setForm({
                fields: Object.assign(form.fields, 
                    {[form_fields.email]: email_in_params}),
                ...form
            });
        }
    //eslint-disable-next-line
    }, []);

    const handleSubmit = (event) => { //event is the form that submit
        // se realiza validación de todos los requeridos y si todos son validos, se procede con el submit
        event.preventDefault();
        let {valid, feedback} = validateFormInputs(event.target.id, form.feedback) // valida todos los campos requeridos del formulario con id
        setForm({
            feedback: feedback,
            ...form
        });

        if (form.fields[form_fields.password] !== form.fields[form_fields.re_password]) {
            valid = false;
            setForm({
                feedback: Object.assign(form.feedback, {[form_fields.re_password]: {valid:false, msg:"Las contraseñas ingresadas no coinciden"}}),
                ...form
            })
        }

        if (!valid) { // si no fueron validados los campos requeridos
            return null;
        }
        //enviar datos para cambiar la contraseña
        const request_body = {
            new_password: form.fields[form_fields.password],
            re_new_password: form.fields[form_fields.re_password] 
        };
        const verified_token = sessionStorage.getItem("verified_token");
        actions.fetchData("/auth/password-reset", "PUT", request_body, verified_token)
        .then(({result, payload}) => {
            if (result === 200) {
                actions.show_toast("La contraseña ha sido actualizada", "success");
                navigate("/auth/login", {replace: true});
            } else {
                console.log(payload);
            }
        })
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
                <h5 className="card-title text-center pt-2">Cambio de contraseña: </h5>
                <div className="card-body">
                    <p className="text-secondary">Ingresa tu nueva contraseña:</p>
                    <form
                    id="signin-form" 
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
                                disabled
                                readOnly
                            />
                            <div className={`invalid-feedback ${form.feedback[form_fields.email].valid ? "" : "invalid"}`}>
                                {form.feedback[form_fields.email].msg}
                            </div>
                        </div>
                        {/* password field */}
                        <div className="mb-2 custom-pw-container p-1">
                            <label htmlFor={form_fields.password} className="form-label">Nueva contraseña:</label>
                            <input
                                className={`form-control ${form.feedback[form_fields.password].valid ? "" : "is-invalid"}`}
                                type={form.fields[form_fields.showPassword] ? "text" : "password"} 
                                placeholder="Ingesa tu nueva contraseña" 
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
                                    ver contraseña
                                </label>
                            </div>
                        </div>
                        {/* password field */}
                        <div className="mb-2 custom-pw-container p-1">
                            <label htmlFor={form_fields.re_password} className="form-label">Reingresa tu nueva contraseña:</label>
                            <input
                                className={`form-control ${form.feedback[form_fields.re_password].valid ? "" : "is-invalid"}`}
                                type="password"
                                placeholder="Reingresa tu nueva contraseña" 
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
                                className="btn btn-outline-danger"
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
        return <VerifyEmail 
            email={form.fields[form_fields.email]} 
            callback={() => {setEmailVerified(true)}}
        />
    }
}