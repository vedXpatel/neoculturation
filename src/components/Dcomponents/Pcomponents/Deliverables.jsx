import React, { useState } from 'react';
import Timeline from './Timeline';
import Stakeholders from './Stakeholders';

function Deliverables(props) {

    const [active, setActive] = useState('deliverables');
    const [values, setValues] = useState({
        deliverables: "",
        sow: "",
        usage: ""
    })

    var size = props.data.projectDetails.length;

    let name, value;
    const handleInputChange = (event) => {
        name = event.target.name;
        value = event.target.value;

        setValues({ ...values, [name]: value });
    };

    const handleSubmit = () => {
        props.data.projectDetails[size-1].deliverables.deliverables = values.deliverables;
        props.data.projectDetails[size-1].deliverables.sow = values.sow;
        props.data.projectDetails[size-1].deliverables.usage = values.usage;

        setActive('stakeholders');
    }

    return (
        <div>
            {active === 'deliverables' &&
                <div className="container-fluid del-main">
                    <h3 className="details-title">Deliverables</h3>
                    <form action="">
                        <div className="container input-container">
                            <div className="row">
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1" className="add-account-text">Deliverables</label>
                                    <textarea name="deliverables" value={values.deliverables} onChange={handleInputChange} className="form-control del-input" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1" className="add-account-text">SOW/SLA</label>
                                    <textarea name="sow" value={values.sow} onChange={handleInputChange} className="form-control del-input" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <label for="inputText" className="add-account-text">Usage</label>
                                {/* <input name="usage" value={values.usage} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputEmail" placeholder="" /> */}
                                <select class="form-control add-account-input" name="usage" onChange={handleInputChange} id="" >
                                            <option value="Commercial">Commercial</option>
                                            <option value="Digital">Digital</option>
                                            <option value="Print">Print</option>
                                        </select>
                            </div>
                        </div>
                    </form>
                    <div className="bottom-container-1">
                        <button className="poc-prev btn" onClick={() => setActive('timeline')}><i className="fa fa-long-arrow-left" aria-hidden="true"></i>  Prev</button>
                        <button className="poc-create-button btn" onClick={handleSubmit}>Next <i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                    </div>
                </div>
            } {active === 'timeline' && <Timeline data={props.data}/>}
            {active === 'stakeholders' && <Stakeholders data={props.data}/>}
        </div>
    )
}

export default Deliverables;
