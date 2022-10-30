import { useContext } from "react";
import { Route, Routes, Outlet, Navigate} from "react-router-dom";
import injectContext from "./store/appContex";
import { Context } from "./store/appContex";
//views
import { Auth } from "./views/auth";
import { Dashboard } from "./views/dashboard";
//components
import { SideNav } from "./components/side-nav";
import { TopNav } from "./components/top-nav";
import { Snackbar } from "./components/snackbar";
import { LoginForm } from "./components/loginForm";
import { SignupForm } from "./components/signupForm";
import { RestartPassword } from "./components/restartPassword";


export const Layout = () => {
    const { store } = useContext(Context);
    return (
        <div id="app-wrapper">
            <Snackbar />
            {store.backdrop ? <div>backdrop</div> : 
            <Routes>
                <Route path="/auth" element={<AuthRouter />}>
                    <Route path="/auth/login" element={<LoginForm />}></Route> {/* This will render login component */}
                    <Route path="/auth/signup" element={<SignupForm />}></Route>
                    <Route path="/auth/restart-password" element={<RestartPassword />}></Route>
                </Route>
                <Route element={<LayoutRouter />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace={true} />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/about" element={<div><p>about...</p></div>}></Route>
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
            <div id="main-app">
                <TopNav />
                <SideNav />
                <Outlet />
            </div>
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