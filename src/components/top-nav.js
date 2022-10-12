import { useContext } from "react";
// import { Link } from "react-router-dom";
import { Context } from "../store/appContex";

export const TopNav = () => {

    //eslint-disable-next-line
    const {store, actions} = useContext(Context);

    return (
        <div id="top-nav">
            <div>TopNav component</div>
            <span>search field</span>
            <button onClick={() => {actions.logout_user()}}>logout user...</button>
        </div>
    )
}