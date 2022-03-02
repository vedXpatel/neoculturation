import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "./Auth";
import { db } from "../firebase.js";
import Project from './Dcomponents/Project';
import LeadEdit from './Dcomponents/AccountEdit/LeadEdit';

var num = 245;
let temp;
let editTemp;

const valuesRef = db.collection('project').orderBy("brandName", "asc");

const Dashboard = () => {
    const history = useHistory();
    const handleCreateAccount = () => history.push('/account');
    var index = 0;
    // const [property,setProperty] = useState('hidden');
    const [values, setValues] = useState([]);
    const [active, setActive] = useState('dashboard');
    const [total, setTotal] = useState([]);
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);

    function handleClick(event) {
        setActive('project');
        temp = event.target.value;
        console.log('temp check');
        console.log(temp);
        console.log('temp check');
    };

    const handleEditClick = (event) => {
        editTemp = event.target.value;
        setActive('accountEdit');
    }

    const handleDelete = (event) => {
        let temp1 = event.target.value;
        db.collection('project').where("brandName", "==", values[temp1].brandName).limit(1).get().then(query => {
            console.log(query);
            const thing = query.docs[0];
            console.log(thing.data());
            const temp2 = thing.data();
            thing.ref.delete(temp2);
            alert(`account deleted`);
        })
    }

    const [lastDoc, setLastDoc] = useState();

    useEffect(() => {
        db.collection('project').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                setTotal((prev) => {
                    return [...prev, doc.data()];
                })
            })
        })
    }, []);

    useEffect(() => {
        // orderBy("brandName", "asc").limit(10)
        valuesRef.limit(10).get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                setValues((prev) => {
                    return [...prev, doc.data()];
                })
                const lastDoc = snapshot.docs[snapshot.docs.length - 1];
                setLastDoc(lastDoc);
                console.log(lastDoc.data());
                console.log(`lastDoc`);
            })
        });
    }, []);

    const fetchNextData = () => {
        valuesRef.startAfter(lastDoc).limit(10).get().then((snapshot) => {
            // snapshot.docs.forEach((doc) => {
            //     console.log(doc.data());
            //     setValues(() => {
            //         return [doc.data()];
            //     })
            // })
            const value = snapshot.docs.map((doc) => doc.data());
            setValues(value);
            const lastDoc = snapshot.docs[snapshot.docs.length - 1];
            setLastDoc(lastDoc);
        });
        console.log(`this is nothing`);
    }

    const fetchPreviousData = () => {
        valuesRef.endBefore(lastDoc).limit(10).get().then((snapshot) => {
            const value = snapshot.docs.map((doc) => doc.data());
            setValues(value);
            const lastDoc = snapshot.docs[snapshot.docs.length - 1];
            setLastDoc(lastDoc);
        });
        console.log(`previous`);
    }

    useEffect(() => {
        if (query.length > 0) {
            let search = query.toLowerCase();
            db.collection('project').get().then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    let documents = doc.data().brandName.toLowerCase();
                    if (documents.slice(0, search.length).indexOf(search) !== -1) {
                        setResult(() => {
                            return [ doc.data().brandName]
                        });
                    }
                })
            })
            // for (let index = 0; index < total.length; index++) {
            //     let documents = total[index].brandName.toLowerCase();
            //     if(documents.slice(0,search.length).indexOf(search) !== -1){
            //         setResult(prevResult => {
            //             return[...prevResult,total[index].brandName]
            //         });
            //     }
            // }
        } else {
            setResult([]);
        }
    }, [query]);

    let searchRef = React.useRef();

    // const setSearchAccount = (display) => {
    //     // let display = searchRef.current.value;
    //     // event.preventDefault();
    //     for (let index = 0; index < total.length; index++) {
    //         if(display === total[index].brandName){
    //             setValues(total[index]);
    //             console.log(`setting values`);
    //             console.log(values);
    //         }
    //     }
    //     console.log(display);
    // }


    var classes;
    if (active === 'dashboard') {
        classes = "icon-container dash-icon";
    } else {
        classes = "";
    }


    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        return <Redirect to="/" />;
    }

    var totalProjects = 0;
    for (let index = 0; index < total.length; index++) {
        totalProjects += total[index].projectDetails.length - 1;
    }


    return (
        <div className="">
            {active === 'dashboard' &&
                <section>
                    {/* <div className=""> */}
                    {/* <button className="btn btn-primary" onClick={() => firebaseConfig.auth().signOut()}>Sign Out</button> */}
                    <div className="container-navigation">
                        <div className={classes}>
                            <a href="/dashboard">
                                <i className="fa fa-home fa-2x" aria-hidden="true"></i>
                            </a>
                        </div>
                        <a href="/accountEdit">
                            <i className="fa fa-folder fa-2x dash-icon1" aria-hidden="true"></i>
                        </a>
                        <a href="/projectEdit" className="">
                            <i className="fa fa-user fa-2x dash-icon2" aria-hidden="true"></i>
                        </a>
                        <i className="fa fa-tasks fa-2x dash-icon3" aria-hidden="true"></i>
                        <i className="fa fa-credit-card fa-2x dash-icon4" aria-hidden="true"></i>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="co-lg-2 dash-card">
                                <h3 className="card-title">Total Accounts</h3>
                                <h1 className="dash-count">{total.length}</h1>
                            </div>
                            <div className="co-lg-2 dash-card1 ">
                                <h3 className="card-title">Total Projects</h3>
                                <h1 className="dash-count">{totalProjects}</h1>
                            </div>
                            <div className="co-lg-2 dash-card1 ">
                                <h3 className="card-title">Confirmed Billing</h3>
                                <h1 className="dash-count">{num}</h1>
                            </div>
                            <div className="co-lg-2 dash-card1 ">
                                <h3 className="card-title">Confirmed Influencers</h3>
                                <h1 className="dash-count">{num}</h1>
                            </div>
                            <div className="co-lg-2 dash-card1 ">
                                <h3 className="card-title">Total Team</h3>
                                <h1 className="dash-count">{num}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid main-container">
                        {/* <h1 className="table-text">Work</h1> */}
                        <span className="fa fa-search search-icon"></span>
                        <input className="form-control search-container" placeholder="          Search Accounts" value={query} onChange={(event) => { setQuery(event.target.value) }}></input>
                        <div className="searchBar">
                            {result.map((doc, i) => (
                                <a href="/" className="searchResult">
                                    <div className="searchEntry">
                                        <p ref={searchRef} value={doc}>{doc}</p>
                                    </div>
                                </a>
                            )
                            )}
                        </div>
                        <button className="create-button btn btn-primary" onClick={handleCreateAccount}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-2" style={{ paddingRight: '10px' }}>
                                        <i className="fa fa-plus-circle create-icon " aria-hidden="true"></i>
                                    </div>
                                    <div className="col-lg-10" style={{ paddingTop: '2px', paddingLeft: '0px' }}>
                                        <p className="create-text">Create New Account</p>
                                    </div>
                                </div>
                            </div>
                            {/* <i className="fa fa-plus-circle create-icon" aria-hidden="true"></i>
                            <p className="">Create New Account</p> */}
                        </button>
                        {/* <button className="btn btn-primary refresh-button" onClick={fetchAll}>Refresh</button> */}

                        <section>
                            <a href="" className="toggle-account" style={{ width: 'fit-content' }}>Accounts ({total.length})
                                <div className="toggle-account-container"></div>
                            </a>
                            <a href="/projects" className="toggle-project">Projects ({totalProjects})
                            </a>


                            <table className="table table-bordered main-table">
                                <thead>
                                    <tr style={{ height: '35px' }}>
                                        <th scope="col">#</th>
                                        <th scope="col">Account Name</th>
                                        <th scope="col">External POC</th>
                                        <th scope="col">Total Project</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {values.map((doc) => {
                                        return (
                                            <tr>
                                                <th scope="row" style={{ width: '50px' }}>{index += 1}</th>
                                                <td style={{ fontWeight: 'bold' }}>{doc.brandName}</td>
                                                <td style={{ width: '400px' }} data-letters={doc.poc.fullName[0]}>{doc.poc.fullName}</td>
                                                <td style={{ width: '300px' }}>{doc.projectDetails.length - 1}</td>
                                                <td style={{ width: '400px' }}>
                                                    <div className="container">
                                                        <div className="row">
                                                            <button className="btn btn-primary dashboard-buttons col-lg-4" onClick={handleClick} value={index - 1}>Add Project</button>
                                                            <button className="btn btn-primary dashboard-buttons col-lg-4" style={{ width: '60px' }} onClick={handleEditClick} value={index - 1}>Edit</button>
                                                            <button className="btn btn-primary dashboard-buttons col-lg-4" style={{ width: '60px' }} value={index - 1} onClick={handleDelete}>Delete</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <p className="results">Showing 1 to {index} of {total.length} results</p>
                            <nav aria-label="..." className="dashboard-pagination">
                                <ul className="pagination pagination-sm">
                                    <li className="page-item">
                                        <a className="page-link" href="#" tabindex="-1" onClick={fetchPreviousData}>&lt;</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" tabindex="-1">1</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" tabindex="-1" onClick={fetchNextData}>&gt;</a>
                                    </li>
                                </ul>
                            </nav>
                        </section>
                    </div>
                </section>
            }
            {active === 'project' && <Project data={values[temp]} />}
            {active === 'accountEdit' && <LeadEdit data={values[editTemp]} />}
        </div>
    )
}

export default Dashboard;