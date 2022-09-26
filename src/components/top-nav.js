import { useContext } from "react";
// import { Link } from "react-router-dom";
import { Context } from "../store/appContex";
import useFetch from "../helpers/hooks";

export const TopNav = () => {

    //eslint-disable-next-line
    const {store, actions} = useContext(Context);
    const { data, loading, error } = useFetch("/company/")

    return (
        <div id="top-nav">
            <div>TopNav component</div>
            <span>search field</span>
            <div>
                {data && <div>{JSON.stringify(data)}</div>}
                {loading && <div>loading...top-nav</div>}
                {error && <div>{error}</div>}
            </div>
            <button onClick={() => {actions.logout_user()}}>logout user...</button>
        </div>
    )
}