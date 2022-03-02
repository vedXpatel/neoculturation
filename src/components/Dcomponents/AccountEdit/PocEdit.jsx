import React,{useState} from 'react';
import LeadEdit from './LeadEdit';
import {db} from '../../../firebase';

function PocEdit(props) {

    const [active,setActive] = useState("pocEdit");
    const [values,setValues] = useState({
        fullName: "",
        phoneNumber: "",
        email: ""
    });

    console.log(`this is shit`);
    console.log(props.data);

    let name, value;
    const handleInputChange = (event) => {
        name = event.target.name;
        value = event.target.value;

        setValues({ ...values, [name]: value });
    };

    const handleFormSubmit = () => {
        db.collection('project').where("brandName","==",props.data.brandName).limit(1).get().then(query => {
            console.log(query);
            const thing = query.docs[0];
            console.log(thing);
            let temp = thing.data();
            temp.brandName = props.data.brandName;
            temp.legalName = props.data.legalName;
            temp.country = props.data.country;
            temp.city = props.data.city;
            temp.gst = props.data.gst;
            temp.category = props.data.category;
            temp.website = props.data.website;
            temp.instagram = props.data.instagram;
            temp.youtube = props.data.youtube;
            temp.facebook = props.data.facebook;
            temp.other = props.data.other;
            temp.poc.fullName = values.fullName;
            temp.poc.phoneNumber = values.phoneNumber;
            temp.poc.email = values.email;
            thing.ref.update(temp);
        });
        alert(`updated`);
    }

    return (
        <div>
            {active ==='pocEdit' && 
            <div className="container-fluid poc-main">
                <h1 className="poc-title">Poc Details</h1>
                <div className="container input-container">
                    <div className="row">
                        <div className="col-lg-6">
                            <label for="inputText" className="add-account-text">Full Name</label>
                            <input name="fullName" onChange={handleInputChange} value = {values.fullName} type="text" className="form-control add-account-input" id="inputEmail" placeholder="" />
                        </div>
                        <div className="col-lg-6">
                            <label for="inputText" className="add-account-text">Phone number</label>
                            <input name="phoneNumber" onChange={handleInputChange} value = {values.phoneNumber} type="text" className="form-control add-account-input" id="inputEmail" placeholder="" />
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
                    <button className="poc-prev btn" onClick={() => setActive('leadEdit')}><i className="fa fa-long-arrow-left" aria-hidden="true"></i>  Prev</button>
                    <button className="poc-create-button btn" onClick = {handleFormSubmit}>Create</button>
                </div>
            </div>
            }
            {active === 'leadEdit' && <LeadEdit/>}
        </div>
    )
}

export default PocEdit;
