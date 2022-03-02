import React,{useState, useContext} from 'react';
import { Redirect} from "react-router-dom";
import { AuthContext } from "../Auth";
import Lead from './Lead';
import Poc from './Poc';

function Account() {

    const [active, setActive] = useState("lead");
    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        return <Redirect to="/" />;
    }
 

    return (
        <div>
            <div className="container-navigation">
            <a href="/Dashboard">
                <i class="fa fa-home fa-2x dash-icon" aria-hidden="true"></i>
            </a>
                <i class="fa fa-folder fa-2x dash-icon1" aria-hidden="true"></i>
                <i class="fa fa-user fa-2x dash-icon2" aria-hidden="true"></i>
                <i class="fa fa-tasks fa-2x dash-icon3" aria-hidden="true"></i>
                <i class="fa fa-credit-card fa-2x dash-icon4" aria-hidden="true"></i>
            </div>
            <div className="container-fluid title-container">
                <h3>Accounts</h3>
            </div>
            <div className="container-fluid add-project-nav">
                <div className="container-fluid add-project-nav-1">
                    <button onClick={() => setActive("lead")} className="create-account-lead-button btn btn-primary"><i className="fa fa-book " aria-hidden="true"></i></button>
                    <p className="create-account-lead-inner">Account Details</p>
                    <p className="create-account-lead-inner-1">Setup Lead Details</p>
                </div>
                <div className="container-fluid add-project-nav-1">
                    <button onClick={() => setActive("poc")} className="create-account-lead-button btn btn-primary"><i className="fa fa-smile-o " aria-hidden="true"></i></button>
                    <p className="create-account-lead-inner-2">POC Details</p>
                    <p className="create-account-lead-inner-3">Add POCs</p>
                    </div>
            </div>
               {active === "lead" && <Lead/>}
               {active === "poc" && <Poc/>}
        </div>
    )
}

export default Account;
