import { useContext } from "react";
import { Context } from "../store/appContex";
// import { Link } from "react-router-dom";

export const Dashboard = () => {

    //eslint-disable-next-line
    const { store, actions } = useContext(Context);

    return (
        <div id="dashboard-view">
            {store.loading && <span>loading dashboard...</span>}
            <h2>dashboard view</h2>
        </div>
    )
}