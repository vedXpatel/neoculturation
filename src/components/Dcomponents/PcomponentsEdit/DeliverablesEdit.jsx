import React,{useState} from 'react';
import TimelineEdit from './TimelineEdit';
import StakeholdersEdit from './StakeholdersEdit';

function DeliverablesEdit(props) {
    const [active, setActive] = useState('deliverables');
    const [values, setValues] = useState({
        deliverables: "",
        sow: "",
        usage: ""
    })

    console.log(`deliverables`);
    console.log(props.data);

    // var size = props.data.data.projectDetails.length;

    let name, value;
    const handleInputChange = (event) => {
        name = event.target.name;
        value = event.target.value;

        setValues({ ...values, [name]: value });
    };

    const handleSubmit = () => {
        props.data.projectDetails.deliverables.deliverables = values.deliverables;
        props.data.projectDetails.deliverables.sow = values.sow;
        props.data.projectDetails.deliverables.usage = values.usage;

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
                                    <textarea name="deliverables" value={values.deliverables} onChange={handleInputChange} className="form-control del-input" id="exampleFormControlTextarea1" rows="3" placeholder={props.data.projectDetails.deliverables.deliverables}></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1" className="add-account-text">SOW/SLA</label>
                                    <textarea name="sow" value={values.sow} onChange={handleInputChange} className="form-control del-input" id="exampleFormControlTextarea1" rows="3" placeholder={props.data.projectDetails.deliverables.sow}></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <label for="inputText" className="add-account-text">Usage</label>
                                <input name="usage" value={values.usage} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputEmail" placeholder={props.data.projectDetails.deliverables.usage} />
                            </div>
                        </div>
                    </form>
                    <div className="bottom-container-1">
                        <button className="poc-prev btn" onClick={() => setActive('timeline')}><i className="fa fa-long-arrow-left" aria-hidden="true"></i>  Prev</button>
                        <button className="poc-create-button btn" onClick={handleSubmit}>Next <i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                    </div>
                </div>
            } {active === 'timeline' && <TimelineEdit data={props.data}/>}
            {active === 'stakeholders' && <StakeholdersEdit data={props.data}/>}
        </div>
    )
}

export default DeliverablesEdit
