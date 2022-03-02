import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PocEdit from './PocEdit';
import { db } from '../../../firebase';
import Lead from '../Lead';

let temp2;


function LeadEdit(props) {

    const history = useHistory();

    const [accounts, setAccounts] = useState([]);
    const [active, setActive] = useState('leadEdit');
    const [values, setValues] = useState({
        legalName: "",
        country: "",
        city: "",
        gst: "",
        category: "",
        website: "",
        instagram: "",
        youtube: "",
        facebook: "",
        other: ""
    });


    useEffect(() => {
        db.collection('project').get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                setAccounts((prev) => {
                    return [...prev, doc.data()];
                })
            })
        });
    }, []);


    let name, value;
    const handleInputChange = (event) => {
        name = event.target.name;
        value = event.target.value;

        setValues({ ...values, [name]: value });
    };

    const handleSubmit = () => {
        props.data.legalName = values.legalName;
        props.data.country = values.country;
        props.data.city = values.city;
        props.data.gst = values.gst;
        props.data.category = values.category;
        props.data.website = values.website;
        props.data.instagram = values.instagram;
        props.data.youtube = values.youtube;
        props.data.facebook = values.facebook;
        props.data.other = values.other;
        setActive('pocEdit');
    }

    var index = 0;
    

    const handleAddAccount = () => history.push('/account');

    let optionSelect = React.createRef();
    const handleManageAccount = () => {
        temp2 = optionSelect.current.value;
        console.log(temp2);
        console.log(`asdaf`);
        setActive('alertLeadEdit');
    }

    console.log(temp2);

    if (props.data === undefined) {
        return (
            <>
            {active==='leadEdit' && 
             <>
                <div className="alert-container-1" style={{ zIndex: '10' }}>
                    <button className="btn btn-primary alert-account-button" onClick={handleAddAccount}>Add Account</button>
                    <p className="alert-text-1"> -OR- </p>
                    <select class="form-control alert-input-1" name="category" id="" placeholder="Select Account" style={{ fontFamily: 'Gotham Pro' }} ref={optionSelect}>
                        {/* onChange={handleInputChange} */}
                        {accounts.map((doc) => {
                            {index+=1}
                            return (
                                <option value={index} style={{ fontFamily: 'Gotham Pro' }}>{doc.brandName}</option>
                            )
                        })}
                    </select>
                    <button className="btn btn-primary alert-manage-account-button" onClick={handleManageAccount}>Manage Account</button>
                </div>
                <div className="container-navigation" style={{ zIndex: '10' }}>
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
                    <Lead />
                </div>
                </>
            }
                <div className="container" style={{zIndex:'120'}}>
                {active==='alertLeadEdit' && <LeadEdit data={accounts[temp2-1]}/>}
                </div>
            </>
        )
    }
    else {
        return (
            <div>
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
                </div>
                {active === "leadEdit" &&
                    <section>
                        <form action="" method="POST">
                            <div className="container-fluid details-container">
                                <h3 className="details-title">Lead Details</h3>
                                <div className="container input-container">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label for="inputText" className="add-account-text">Brand Name</label>
                                            <input value={values.brandName} onChange={handleInputChange} type="" className="form-control add-account-input" id="inputText" placeholder="" name="brandName" disabled />
                                        </div>
                                        <div className="col-lg-6">
                                            <label for="inputText" className="add-account-text">legal Name</label>
                                            <input value={values.legalName} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputText" placeholder="" name="legalName" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label for="inputText" className="add-account-text">country </label>
                                            <input value={values.country} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputText" placeholder="" name="country" />
                                        </div>
                                        <div className="col-lg-6">
                                            <label for="inputText" className="add-account-text">city</label>
                                            <input value={values.city} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputText" placeholder="" name="city" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label for="inputText" className="add-account-text">gst number</label>
                                            <input value={values.gst} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputText" placeholder="" name="gst" />
                                        </div>
                                        <div className="col-lg-6">
                                            <label for="inputText" className="add-account-text">category</label>
                                            {/* <input value={values.category} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputText" placeholder="" name="category" /> */}
                                            <select class="form-control add-account-input" name="category" id="" onChange={handleInputChange} >
                                                <option value="Automobile">Automobile</option>
                                                <option value="Beauty">Beauty</option>
                                                <option value="Hospitality">Hospitality</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label for="inputText" className="add-account-text">website</label>
                                            <input value={values.website} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputText" placeholder="" name="website" />
                                        </div>
                                        <div className="col-lg-6">
                                            <label for="inputText" className="add-account-text">instagram</label>
                                            <input value={values.instagram} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputText" placeholder="" name="instagram" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label for="inputText" className="add-account-text">youtube</label>
                                            <input value={values.youtube} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputText" placeholder="" name="youtube" />
                                        </div>
                                        <div className="col-lg-6">
                                            <label for="inputText" className="add-account-text">facebook</label>
                                            <input value={values.facebook} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputText" placeholder="" name="facebook" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label for="inputText" className="add-account-text">other web link</label>
                                            <input value={values.other} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputText" placeholder="" name="other" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-container" style={{ bottom: '0px' }} >
                                    <button className="next-button btn" onClick={handleSubmit}>Next <i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </form>
                    </section>
                }

                {active === 'pocEdit' && <PocEdit data={props.data} />}
            </div>
        )
    }
}

export default LeadEdit;
