import { useContext } from "react";
import { Route, Routes, Outlet, Navigate} from "react-router-dom";
import injectContext from "./store/appContex";
import { Context } from "./store/appContex";
//views
import { Auth } from "./views/auth";
import { Dashboard } from "./views/dashboard";
import { Stores } from "./views/stores";
//components
import { Navbar } from "./components/navbar";
import { AppHeader } from "./components/appHeader";
import { AppToast } from "./components/toast";
import { LoginForm } from "./components/loginForm";
import { SignupForm } from "./components/signupForm";
import { RestartPassword } from "./components/restartPassword";
import { AppModal } from "./components/modal";


export const Layout = () => {
    const { store } = useContext(Context);
    return (
        <div id="app-wrapper">
            <AppToast />
            <AppModal />
            {store.backdrop ? <div>backdrop</div> : 
            <Routes>
                <Route element={<AuthRouter />}>
                    <Route path="/auth" element={<Navigate to={"/auth/login"} replace={true}></Navigate>}></Route>
                    <Route path="/auth/login" element={<LoginForm />}></Route> {/* This will render login component */}
                    <Route path="/auth/signup" element={<SignupForm />}></Route>
                    <Route path="/auth/restart-password" element={<RestartPassword />}></Route>
                </Route>
                <Route element={<LayoutRouter />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace={true} />}></Route>
                    <Route path="/home" element={<div><p>home...</p></div>}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/orders" element={<div><p>pedidos...</p></div>}></Route>
                    <Route path="/stores" element={<Stores />}></Route>
                    <Route path="/catalogs" element={<div><p>Catalogos...</p></div>}>
                        <Route path="/catalogs/items" element={<div><p>clientes...</p></div>}></Route>
                        <Route path="/catalogs/qrcodes" element={<div><p>clientes...</p></div>}></Route>
                    </Route>
                    <Route path="/resources" element={<div><p>Terceros...</p></div>}>
                        <Route path="/resources/clients" element={<div><p>clientes...</p></div>}></Route>
                        <Route path="/resources/providers" element={<div><p>clientes...</p></div>}></Route>
                        <Route path="/resources/users" element={<div><p>usuarios...</p></div>}></Route>
                    </Route>
                    <Route path="/settings" element={<div><p>Configuraci??n...</p></div>}></Route>
                    <Route path="/profile" element={<div><p>perfil...</p></div>}></Route>
                </Route>
                <Route path="*" element={<h1>not found view...</h1>}></Route>
            </Routes>
            }
        </div>
    );
};

const LayoutRouter = () => {
    const { store } = useContext(Context);

    if (store.userLoggedIn) {
        // protected view
        return (
            <>
                <AppHeader />
                <div className="d-flex h-100" style={{paddingTop: "60px"}}>
                    <Navbar />
                    <Outlet />
                </div>
            </>
        )
    } else {
        return (
            <Navigate to="/auth/login" replace={true}/>
        )
    }
}

const AuthRouter = () => {
    const { store } = useContext(Context)

    if (!store.userLoggedIn) {
        return <Auth />
        
    } else {
        return (
            <Navigate to="/dashboard" replace={true}/>
        )
    }
}

export default injectContext(Layout)