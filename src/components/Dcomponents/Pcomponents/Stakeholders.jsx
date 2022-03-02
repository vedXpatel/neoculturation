import React, { useState } from 'react';
import Deliverables from './Deliverables';
import { db } from '../../../firebase';
import Shortlist from './Shortlist';
import Select from 'react-select';

function Stakeholders(props) {

    const options = [
        { value: 'Art Directors', label: 'Art Directors' },
        { value: 'Directors', label: 'Directors' },
        { value: 'Consultant', label: 'Consultant' },
    ]

    let valueTemp;
    const [stakeholderValue,setStakeholderValue] = useState([]);
    // console.log(stakeholderValue);
    const setStakeholder = (event) => {
        // console.log(event.target.value);
        // // valueTemp = event.target.value;
        // setStakeholderValue(valueTemp);
        console.log(`mutli`);
        setStakeholderValue(event);
    }


    const [active, setActive] = useState('stakeholders');
    const [values, setValues] = useState(
        {
            contribution: "",
            poc_name: "",
            poc_phone: "",
            poc_email: "",
            internal_name: "",
            internal_phone: "",
            internal_email: ""
        }
    )

    var size = props.data.projectDetails.length;

    let name, value;
    const handleInputChange = (event) => {
        name = event.target.name;
        value = event.target.value;

        setValues({ ...values, [name]: value });
    };

    const handleSubmit = () => {
        // props.data.projectDetails[size - 1].stakeholders.contribution.push(stakeholderValue);
        props.data.projectDetails[size - 1].stakeholders.poc.name = values.poc_name;
        // props.data.projectDetails[size - 1].stakeholders.contribution = values.contribution;
        props.data.projectDetails[size - 1].stakeholders.poc.phone = values.poc_phone;
        props.data.projectDetails[size - 1].stakeholders.poc.email = values.poc_email;
        props.data.projectDetails[size - 1].stakeholders.internal.email = values.internal_email;
        props.data.projectDetails[size - 1].stakeholders.internal.name = values.internal_name;
        props.data.projectDetails[size - 1].stakeholders.internal.phone = values.internal_phone;

        console.log('stakeholders');
        console.log(props.data);
        console.log('stakeholders');
        var batch = db.batch();

        setActive('shortlist');
    }

    const [components, setComponents] = useState([<div className="row" style={{ margin: '0px 10px 0px 10px' }}>
        <div className="col-lg-6" style={{ position: 'relative', top: '-30px' }}>
            <label for="inputText" className="add-account-text" style={{ position: 'relative', top: '-18px', left: "40px" }}>Name</label>
            <input name="poc_name" value={values.poc_name} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputEmail" placeholder="" style={{ width: '380px' }} />
        </div>
        <div className="col-lg-6" style={{ position: 'relative', top: '-30px' }}>
            <label for="inputText" className="add-account-text" style={{ position: 'relative', top: '-18px', left: "40px" }}>email</label>
            <input name="poc_email" value={values.poc_email} onChange={handleInputChange} type="email" className="form-control add-account-input" id="inputEmail" placeholder="" style={{ width: '380px' }} />
        </div>
    </div>]);

    let component = <div className="row" style={{ margin: '0px 10px 10px 10px' }}>
        <div className="col-lg-6">

            <input name="poc_name" value={values.poc_name} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputEmail" placeholder="" style={{ width: '380px' }} />
        </div>
        <div className="col-lg-6">

            <input name="poc_email" value={values.poc_email} onChange={handleInputChange} type="email" className="form-control add-account-input" id="inputEmail" placeholder="" style={{ width: '380px' }} />
        </div>
    </div>;

    let component2 = <div className="row" style={{ margin: '0px 10px 10px 10px' }}>
        <div className="col-lg-6">

            <input name="internal_name" value={values.internal_name} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputEmail" placeholder="" style={{ width: '380px' }} />
        </div>
        <div className="col-lg-6">
            <input name="internal_email" value={values.internal_email} onChange={handleInputChange} type="email" className="form-control add-account-input" id="inputEmail" placeholder="" style={{ width: '380px' }} />
        </div>
    </div>;

    const [components2, setComponent2] = useState([<div className="row" style={{ margin: '0px 10px 0px 10px' }}>
        <div className="col-lg-6" style={{ position: 'relative', top: '-30px' }}>
            <label for="inputText" className="add-account-text" style={{ position: 'relative', top: '-18px', left: "40px" }}>Name</label>
            <input name="internal_name" value={values.internal_name} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputEmail" placeholder="" style={{ width: '380px' }} />
        </div>
        <div className="col-lg-6" style={{ position: 'relative', top: '-30px' }}>
            <label for="inputText" className="add-account-text" style={{ position: 'relative', top: '-18px', left: "40px" }}>Email</label>
            <input name="internal_email" value={values.internal_email} onChange={handleInputChange} type="email" className="form-control add-account-input" id="inputEmail" placeholder="" style={{ width: '380px' }} />
        </div>
    </div>]);

    const addComponent = () => {
        setComponent2((prev) => {
            return [...prev, component2];
        })
    }



    const addTimeline = () => {
        setComponents((prev) => {
            return [...prev, component];
        })
        console.log(components);
        console.log(`pushing`);
    }


    return (
        <div>
            {active === 'stakeholders' &&
                <div className="container-fluid stake-main" style={{ height: "fit-content", paddingBottom: '100px' }}>
                    <h3 className="details-title">Stakeholders</h3>
                    <div className="container input-container">
                        <div className="row">
                            <div className="col-lg-6" style={{ marginLeft: '10px' }}>
                                <label for="inputText" className="add-account-text">Contribution</label>
                                {/* <input type="text" name="contribution" value={values.contribution} onClick={handleInputChange} className="form-control add-account-input" id="inputEmail" placeholder="" /> */}
                                {/* <select class="form-control add-account-input" name="contribution" onChange={handleInputChange} id="" multiple data-live-search="true">
                                            <option value="Art Directors">Art Directors</option>
                                            <option value="Directors">Directors</option>
                                            <option value="Consultant">Consultant</option>
                                </select> */}
                                <Select className="basic-multi-select" defaultValue={[options[2], options[3]]}
                                    isMulti
                                    name="stakeholders"
                                    classNamePrefix="select" onChange={setStakeholder}  options={options}/>
                                    {/* value={options.filter(obj => obj.value === setStakeholderValue)} */}
                            </div>
                        </div>
                    </div>
                    <div className="bottom-container-1">
                        <button className="poc-prev btn" onClick={() => setActive('deliverables')}><i className="fa fa-long-arrow-left" aria-hidden="true"></i>  Prev</button>
                        <button className="poc-create-button btn" onClick={handleSubmit}>Next <i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                    </div>
                    <h3 className="add-stakeholder-text">POC Client Side</h3>

                    <div className="container input-container-timeline" style={{ paddingTop: '10px', height: 'fit-content' }}>
                        <button className="btn btn-primary addButton" onClick={addTimeline} style={{ borderRadius: '30px', position: 'relative', top: '3px' }}><i className="fa fa-plus addIcon"></i></button>
                        {components.map((doc) => {
                            return (
                                <div>
                                    {doc}
                                </div>
                            )
                        })}

                    </div>
                    <h3 className="add-stakeholder-text" style={{ top: '45px', position: 'relative' }}>Internal POC</h3>
                    <div className="container input-container-timeline" style={{ padding: '10px', height: 'fit-content' }}>
                        <button className="btn btn-primary addButton" onClick={addComponent} style={{ borderRadius: '30px', position: 'relative', top: '3px' }}><i className="fa fa-plus addIcon"></i></button>
                        {components2.map((doc) => {
                            return (
                                <div>
                                    {doc}
                                </div>
                            )
                        })}
                    </div>
                </div>
            } {active === 'deliverables' && <Deliverables data={props.data} />}
            {active === 'shortlist' && <Shortlist data={props.data} />}
        </div>
    )
}

export default Stakeholders;
