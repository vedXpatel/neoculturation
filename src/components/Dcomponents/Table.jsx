import React, { useContext, useEffect, useState } from 'react';
import { Redirect} from "react-router-dom";
import { AuthContext } from "../Auth";
import { db } from '../../firebase';
import Project from '../Dcomponents/Project';


function Table() {
    const [values, setValues] = useState([]);
    const [active,setActive] = useState('dashboard');
    const handleClick = () => setActive('project');



    function fetchAll(e) {
        e.preventDefault();
        db.collection('project').get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                setValues((prev) => {
                    return [...prev, doc.data()];
                })
            })
        });
    }

    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div>
        {active === 'dashboard' && 
        <>
            {/* <button className="btn btn-primary" onClick={fetchAll}>click</button>
            <table class="table table-bordered main-table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Account Name</th>
                        <th scope="col">1 Internal POC</th>
                        <th scope="col">Total Project</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {values.map((doc) => {
                        return (
                            <tr>
                                <th scope="row">1</th>
                                <td>{doc.brandName}</td>
                                <td>{doc.poc.fullName}</td>
                                <td><button className="btn btn-primary" onClick={handleClick}>Add Project</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}
            </>
        }
        {active === 'project' && <Project/>}
        </div>
    )
}

export default Table;