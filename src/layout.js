import { useContext } from "react";
import { Route, Routes, Outlet, Navigate} from "react-router-dom";
import injectContext from "./store/appContex";
import { Context } from "./store/appContex";
//views
import { Login } from "./views/login";
import { Dashboard } from "./views/dashboard";
//components
import { SideNav } from "./components/side-nav";
import { TopNav } from "./components/top-nav";


export const Layout = () => {
    const { store } = useContext(Context);
    return (
        <div id="app-wrapper">
            {store.backdrop ? <div>backdrop</div> : 
            <Routes>
                <Route path="/login" element={<LoginRouter />}></Route>
                <Route element={<LayoutRouter />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace={true} />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/about" element={<div><p>about...</p></div>}></Route>
                </Route>
                <Route path="*" element={<h1>not found...</h1>}></Route>
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
            <div id="main">
                <TopNav />
                <SideNav />
                <Outlet />
            </div>
        )
    } else {
        return (
            <Navigate to="/login" replace={true}/>
        )
    }
}

const LoginRouter = () => {
    const { store } = useContext(Context)

    if (!store.userLoggedIn) {
        return <Login />
        
    } else {
        return (
            <Navigate to="/dashboard" replace={true}/>
        )
    }
}

export default injectContext(Layout)