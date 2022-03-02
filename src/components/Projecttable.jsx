import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "./Auth";
import { db } from "../firebase.js";
import ProjectEdit from './Dcomponents/ProjectEdit';
import { computeHeadingLevel } from '@testing-library/react';

var num = 245;
let temp;
const valuesRef = db.collection('project').orderBy("brandName", "asc");


function Projecttable() {
    const history = useHistory();
    const handleCreateAccount = () => history.push('/account');
    var index = 0;
    const [values, setValues] = useState([]);
    const [active, setActive] = useState('projects');
    const [totals, setTotal] = useState([]);
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    function handleClick(event) {
        setActive('project');
        temp = event.target.value;
        console.log('temp check');
        console.log(temp);
        console.log('temp check');
    };

    function handleDelete(event) {
        let temp1 = event.target.value;
        db.collection('project').where("brandName", "==", totalProjects[temp1].brandName).limit(1).get().then(query => {
            console.log(query);
            const thing = query.docs[0];
            console.log(thing.data());
            let temp2 = thing.data();
            let i = 0;
            let z = temp2.projectDetails.map((doc) => {
                i += 1;
                if (doc.projectId === totalProjects[temp1].projectDetails.projectId) {
                    return temp2.projectDetails.indexOf(doc);
                } return i;
            });
            console.log('====================================');
            console.log(z);
            console.log('====================================');
            temp2.projectDetails.splice(z, 1);
            console.log(temp2);
            thing.ref.update(temp2);
            // history.push('/projects');
            alert(`project deleted`);
            // window.location.reload();
        });
    }

    // console.log('====================================');
    // console.log(values);
    // console.log('====================================');

    useEffect(() => {

        db.collection('project').get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                setTotal((prev) => {
                    return [...prev, doc.data()];
                })
            })
        });
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

    




    const totalProjects = [];
    function total() {
        for (let i = 0; i < values.length; i++) {
            for (let j = 1; j < values[i].projectDetails.length; j++) {
                console.log(i + 'i' + j);
                const fields = {
                    brandName: "",
                    legalName: "",
                    country: "",
                    city: "",
                    gst: "",
                    category: "",
                    website: "",
                    instagram: "",
                    youtube: "",
                    facebook: "",
                    other: "",
                    poc: {
                        fullName: "",
                        phoneNumber: "",
                        email: ""
                    },
                    projectDetails: {
                        projectId: "",
                        projectName: "",
                        mediaFormat: "",
                        assetType: "",
                        businessObjectives: "",
                        timeLine: {
                            name: "",
                            date: "",
                            days: "",
                            location: ""
                        },
                        deliverables: {
                            deliverables: "",
                            usage: ""
                        },
                        stakeholders: {
                            contribution: "",
                            poc: {
                                name: "",
                                phone: "",
                                email: ""
                            },
                            internal: {
                                name: "",
                                phone: "",
                                email: ""
                            }
                        }
                    }, talent: { name: "", location: "" }
                }
                fields.brandName = values[i].brandName;
                fields.talent.name = values[i].talent.name;
                fields.talent.location = values[i].talent.location;
                fields.legalName = values[i].legalName;
                fields.country = values[i].country;
                fields.city = values[i].city;
                fields.gst = values[i].gst;
                fields.category = values[i].category;
                fields.website = values[i].website;
                fields.instagram = values[i].instagram;
                fields.youtube = values[i].youtube;
                fields.facebook = values[i].facebook;
                fields.other = values[i].other;
                fields.poc.phoneNumber = values[i].poc.phoneNumber;
                fields.poc.email = values[i].poc.email;
                fields.poc.fullName = values[i].poc.fullName;
                fields.projectDetails.projectId = values[i].projectDetails[j].projectId;
                fields.projectDetails.mediaFormat = values[i].projectDetails[j].mediaFormat;
                fields.projectDetails.assetType = values[i].projectDetails[j].assetType;
                fields.projectDetails.businessObjectives = values[i].projectDetails[j].businessObjectives;
                fields.projectDetails.timeLine.name = values[i].projectDetails[j].timeLine.name;
                fields.projectDetails.timeLine.days = values[i].projectDetails[j].timeLine.days;
                fields.projectDetails.timeLine.location = values[i].projectDetails[j].timeLine.location;
                fields.projectDetails.deliverables.deliverables = values[i].projectDetails[j].deliverables.deliverables;
                fields.projectDetails.deliverables.usage = values[i].projectDetails[j].deliverables.usage;
                fields.projectDetails.stakeholders.contribution = values[i].projectDetails[j].stakeholders.contribution;
                fields.projectDetails.stakeholders.poc.name = values[i].projectDetails[j].stakeholders.poc.name;
                fields.projectDetails.stakeholders.poc.phone = values[i].projectDetails[j].stakeholders.poc.phone;
                fields.projectDetails.stakeholders.poc.email = values[i].projectDetails[j].stakeholders.poc.email;
                fields.projectDetails.stakeholders.internal.name = values[i].projectDetails[j].stakeholders.internal.name;
                fields.projectDetails.stakeholders.internal.phone = values[i].projectDetails[j].stakeholders.internal.phone;
                fields.projectDetails.stakeholders.internal.email = values[i].projectDetails[j].stakeholders.internal.email;
                fields.projectDetails.projectName = values[i].projectDetails[j].projectName;
                fields.projectDetails.timeLine.date = values[i].projectDetails[j].timeLine.date;
                console.log(`poc`)
                totalProjects.push(fields);
            }
        }
        console.log(`total`);
        console.log(totalProjects);
        return totalProjects;
    }

    const copy = Array.from(total());
    const [lastDoc, setLastDoc] = useState();

    // e.preventDefault();
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
                    for (let i = 0; i < doc.data().projectDetails.length; i++) {
                        let documents = doc.data().projectDetails[i].projectName.toLowerCase();
                        if (documents.slice(0, search.length).indexOf(search) !== -1) {
                            setResult(() => {
                                return [ doc.data().projectDetails[i].projectName]
                            });
                        }
                    }
                })
            })
        } else {
            setResult([]);
        }
    }, [query]);


    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        return <Redirect to="/" />;
    }



    return (
        <>
            {active === 'projects' &&
                <section>
                    <div className="container-navigation">
                        <i className="fa fa-home fa-2x dash-icon" aria-hidden="true"></i>
                        <i className="fa fa-folder fa-2x dash-icon1" aria-hidden="true"></i>
                        <i className="fa fa-user fa-2x dash-icon2" aria-hidden="true"></i>
                        <i className="fa fa-tasks fa-2x dash-icon3" aria-hidden="true"></i>
                        <i className="fa fa-credit-card fa-2x dash-icon4" aria-hidden="true"></i>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="co-lg-2 dash-card">
                                <h3 className="card-title">Total Accounts</h3>
                                <h1 className="dash-count">{totals.length}</h1>
                            </div>
                            <div className="co-lg-2 dash-card1 ">
                                <h3 className="card-title">Total Projects</h3>
                                <h1 className="dash-count">{copy.length}</h1>
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
                                        <p value={doc}>{doc}</p>
                                    </div>
                                </a>
                            )
                            )}
                        </div>
                        <button className="create-button btn btn-primary" onClick={handleCreateAccount}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-2">
                                        <i className="fa fa-plus-circle create-icon" aria-hidden="true"></i>
                                    </div>
                                    <div className="col-lg-10">
                                        <p className="create-text">Create New Account</p>
                                    </div>
                                </div>
                            </div>
                        </button>
                        {/* <button className="btn btn-primary refresh-button" onClick={fetchAll}>Refresh</button> */}
                        <a href="/" className="toggle-account" style={{width:'fit-content'}}>Accounts ({totals.length})
                        </a>
                        <a href="/projects" className="toggle-project">Projects ({copy.length})
                            <div className="toggle-account-container"></div>
                        </a>
                        <table className="table table-bordered main-table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Project Id</th>
                                    <th scope="col">Project Name</th>
                                    <th scope="col">Account Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                    <th scope="col">Internal POC</th>
                                    <th scope="col">Delivery</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {copy.map((doc) => {
                                    return (
                                        <tr>
                                            <th scope="row">{index += 1}</th>
                                            <td>{doc.projectDetails.projectId}</td>
                                            <td>{doc.projectDetails.projectName}</td>
                                            <td style={{ fontWeight: 'bold' }}>{doc.brandName}</td>
                                            <td>Closed</td>
                                            <td>{doc.projectDetails.timeLine.date}</td>
                                            <td>{doc.projectDetails.timeLine.date}</td>
                                            <td data-letters={doc.poc.fullName[0]}>{doc.poc.fullName}</td>
                                            <td> <div className="delivery-container"> <p>Ongoing</p> </div> </td>
                                            <td style={{width:"190px"}}>
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <button className="btn btn-primary add-project-button" style={{ width: '60px' }} onClick={handleClick} value={index - 1}>Edit</button>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <button className="btn btn-primary add-project-button col-lg-6" style={{ width: '60px',marginLeft:'0px' }} onClick={handleDelete} value={index - 1}>Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                        <p className="results">Showing 1 to {index} of {copy.length} results</p>
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
                    </div>
                </section>
            }
            {active === 'project' && <ProjectEdit data={totalProjects[temp]} />}
        </>

    )
}

export default Projecttable;