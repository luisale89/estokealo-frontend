import { useContext } from "react";
import { Route, Routes, Outlet, Navigate} from "react-router-dom";
import injectContext from "./store/appContex";
import { Context } from "./store/appContex";
//views
import { SignIn } from "./views/signin";
import { Dashboard } from "./views/dashboard";
//components
import { SideNav } from "./components/side-nav";
import { TopNav } from "./components/top-nav";


export const Layout = () => {
    return (
        <Routes>
            <Route path="/signin" element={<SignInRouter />}></Route>
            <Route element={<LayoutRouter />}>
                <Route path="/" element={<Navigate to="/dashboard" replace={true} />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/about" element={<div><p>about...</p></div>}></Route>
            </Route>
            <Route path="*" element={<h1>not found...</h1>}></Route>
        </Routes>
    );
};

const LayoutRouter = () => {
    const { store } = useContext(Context);

    if (store.userLoggedIn) {
        // protected view
        return (
            <div id="main">
                <TopNav />
                <SideNav />
                <Outlet />
            </div>
        )
    } else {
        return (
            <Navigate to="/signin" replace={true}/>
        )
    }
}

const SignInRouter = () => {
    const { store } = useContext(Context)

    if (!store.userLoggedIn) {
        return <SignIn />
        
    } else {
        return (
            <Navigate to="/dashboard" replace={true}/>
        )
    }
}

export default injectContext(Layout)