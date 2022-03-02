import React, { useState} from 'react';
import Poc from './Poc';



function Lead() {

    const [active, setActive] = useState('lead');
    const [values, setValues] = useState({
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
        projectDetails: [{
            projectId: "",
            projectName: "",
            mediaFormat: "",
            assetType: "",
            businessObjectives: "",
            timeLine: [{
                name: "",
                date: "",
                days: "",
                location: ""
            }],
            deliverables: {
                deliverables: "",
                usage: ""
            },
            stakeholders: {
                contribution: "",
                poc:[{
                    name: "",
                    phone: "",
                    email: ""
                }],
                internal: [{
                    name: "",
                    phone: "",
                    email: ""
                }]
            }
        }],
        talent: []
    });

    let name, value;
    const handleInputChange = (event) => {
        name = event.target.name;
        value = event.target.value;

        setValues({ ...values, [name]: value });
    };

    const submitData = () => {
        
        set();
    }

    function set() { setActive('poc') };
   

    return (
        <div>
            {active === "lead" &&
                <section>
                    <form action="" method="POST">
                        <div className="container-fluid details-container">
                            <h3 className="details-title">Lead Details</h3>
                            <div className="container input-container">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label for="inputText" className="add-account-text">Brand Name</label>
                                        <input value={values.brandName} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputText" placeholder="" name="brandName" />
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
                                <button className="next-button btn" onClick={submitData}>Next <i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </form>
                </section>
            }

            {active === 'poc' && <Poc data={values} />}
        </div>
    )
}

export default Lead;
