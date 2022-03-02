import React, { useState, useEffect } from 'react';
import Lead from './Lead';
import { db } from '../../firebase';
import firebase from 'firebase';
import { useHistory } from 'react-router';
import Project from './Project';



const Poc = (props) => {
    const history = useHistory();
    const [active, setActive] = useState("poc");
    const [visibility,setVisibility] = useState("hidden");
    const [values, setValues] = useState({
        fullName: "",
        phoneNumber: "",
        email: ""
    });

    let name, value;
    const handleInputChange = (event) => {
        name = event.target.name;
        value = event.target.value;

        setValues({ ...values, [name]: value });
    };
    const handleFormSubmit = () => {
        setVisibility('visible');
        // db = firebase.firestore();
        // db.collection('project').doc(data.id).doc('poc').doc('0').add({...values,data})
        // alert(db.collection('project').doc(data.id).doc('poc').doc('0'));
        console.log('====================================');
        console.log(props.data);
        console.log('====================================');
        var batch = db.batch();
        // db.collection('project').where('brandName','==',props.data).update({"poc.fullName":values.fullName,"poc.phoneNumber":values.phoneNumber,"poc.email":values.email});
        // db.collection('project').doc(props.data).update({"poc.fullName":values.fullName,"poc.phoneNumber":values.phoneNumber,"poc.email":values.email});

        // var updateRef = firebase.database().ref('poc');
        // updateRef.update({"fullName":values.fullName,"phoneNumber":values.phoneNumber,"email":values.email});

        // batch.commit().then(() => {
        //     alert(`data updated`);
        // });

        props.data.poc.fullName = values.fullName;
        props.data.poc.phoneNumber = values.phoneNumber;
        props.data.poc.email = values.email;

        db.collection("project").add(props.data).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }


    const handleAddProject = () => {
        setActive('project');
    }

    const redirectToDashboard = () => { history.push('/dashboard') }

    return (
        <div>
            {active === 'poc' &&
                <>
                    <div className="container-fluid poc-main">
                        <h1 className="poc-title">Poc Details</h1>
                        <div className="container input-container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <label for="inputText" className="add-account-text">Full Name</label>
                                    <input name="fullName" onChange={handleInputChange} value={values.fullName} type="text" className="form-control add-account-input" id="inputEmail" placeholder="" />
                                </div>
                                <div className="col-lg-6">
                                    <label for="inputText" className="add-account-text">Phone number</label>
                                    <input name="phoneNumber" onChange={handleInputChange} value={values.phoneNumber} type="text" className="form-control add-account-input" id="inputEmail" placeholder="" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <label for="inputText" className="add-account-text">email</label>
                                    <input value={values.email} name="email" type="email" onChange={handleInputChange} className="form-control add-account-input" id="inputEmail" placeholder="" />
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid poc-bottom">
                            <button className="poc-prev btn" onClick={() => setActive('lead')}><i className="fa fa-long-arrow-left" aria-hidden="true"></i>  Prev</button>
                            <button className="poc-create-button btn" onClick={handleFormSubmit} type="submit">Create</button>
                        </div>
                    </div>
                    <div style={{visibility: visibility}}>
                    <div className="alert-container-1" style={{zIndex:'10' }}>
                    <div className="tick-container"><i class="fa fa-check fa-2x" aria-hidden="true" style={{top:'18px',left:'16px',position:'relative',color:'#fff'}}></i></div>
                    <h1 className="success-alert-account">New Account Added Successfully</h1>
                        <button className="btn btn-primary alert-account-button" onClick={handleAddProject} style={{top:'165px',fontStyle:'bold'}}>Add a Project</button>
                        <button className="btn btn-primary alert-manage-account-button" onClick={redirectToDashboard} style={{top:'192px'}}>Go To Dashboard</button>
                    </div>
                    <div className="container-navigation" style={{ zIndex:'10' }}>
                        <div className="icon-container dash-icon">
                            <a href="/dashboard">
                                <i className="fa fa-home fa-2x" aria-hidden="true"></i>
                            </a>
                        </div>
                        <a href="/accountEdit">
                            <i className="fa fa-folder fa-2x dash-icon1" aria-hidden="true"></i>
                        </a>
                        <i className="fa fa-user fa-2x dash-icon2" aria-hidden="true"></i>
                        <i className="fa fa-tasks fa-2x dash-icon3" aria-hidden="true"></i>
                        <i className="fa fa-credit-card fa-2x dash-icon4" aria-hidden="true"></i>
                    </div>
                    <div className="blur-container" style={{ zIndex: '-1', filter: 'brightness(0.65)', height: '1080px' }}>
                        <div className="container-fluid add-project-nav">
                            <div className="container-fluid add-project-nav-1">
                                <button className="create-account-lead-button btn btn-primary"><i className="fa fa-book " aria-hidden="true"></i></button>
                                <p className="create-account-lead-inner">Account Details</p>
                                <p className="create-account-lead-inner-1">Setup Lead Details</p>
                            </div>
                            <div className="container-fluid add-project-nav-1">
                                <button className="create-account-lead-button btn btn-primary"><i className="fa fa-smile-o " aria-hidden="true"></i></button>
                                <p className="create-account-lead-inner-2">POC Details</p>
                                <p className="create-account-lead-inner-3">Add POCs</p>
                            </div>
                        </div>
                        </div>
                    </div>

                </>
            }
            {active === 'lead' && <Lead />}
            {active ==='project' && <Project data={props.data}/>}
        </div>
    )
}

export default Poc;
