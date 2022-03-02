import React,{useState} from 'react';
import DeliverablesEdit from './DeliverablesEdit';
import ShortlistEdit from './ShortlistEdit';

function StakeholdersEdit(props) {
     
    const [active, setActive] = useState('stakeholders');
    const [values, setValues] = useState(
        {
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
    )

    // var size = props.data.projectDetails.length;

    let name, value;
    const handleInputChange = (event) => {
        name = event.target.name;
        value = event.target.value;

        setValues({ ...values, [name]: value });
    };

    const handleSubmit = () => {
        props.data.projectDetails.stakeholders.poc.name = values.poc.name;
        props.data.projectDetails.stakeholders.contribution = values.contribution;
        props.data.projectDetails.stakeholders.poc.phone = values.poc.phone;
        props.data.projectDetails.stakeholders.poc.email = values.poc.email;
        props.data.projectDetails.stakeholders.internal.email = values.internal.email;
        props.data.projectDetails.stakeholders.internal.name = values.internal.name;
        props.data.projectDetails.stakeholders.internal.phone = values.internal.phone;

        console.log('stakeholders');
        console.log(props.data);
        console.log('stakeholders');

        setActive('shortlist');
    }


    return (
        <div>
            {active === 'stakeholders' &&
                <div className="container-fluid stake-main">
                    <h3 className="details-title">Stakeholders</h3>
                    <div className="container input-container">
                        <div className="row">
                            <div className="col-lg-6" style={{marginLeft:'10px'}}>
                                <label for="inputText" className="add-account-text">Contribution</label>
                                <input type="text" name="contribution" value={values.contribution} onClick={handleInputChange} className="form-control add-account-input" id="inputEmail" placeholder={props.data.projectDetails.stakeholders.contribution} />
                            </div>
                        </div>
                    </div>
                    <div className="bottom-container-1">
                        <button className="poc-prev btn" onClick={() => setActive('deliverables')}><i className="fa fa-long-arrow-left" aria-hidden="true"></i>  Prev</button>
                        <button className="poc-create-button btn" onClick={handleSubmit}>Next <i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                    </div>
                    <h3 className="add-stakeholder-text">POC Client Side</h3>
                    <div className="container input-container-timeline" style={{padding:'10px'}}>
                    <div className="row" style={{margin:'10px'}}>
                        <div className="col-lg-6">
                            <label for="inputText" className="add-account-text">Name</label>
                            <input name="name" value={values.poc.name} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputEmail" placeholder={props.data.projectDetails.stakeholders.poc.name} style={{width:'380px'}}/>
                        </div>
                        <div className="col-lg-6">
                            <label for="inputText" className="add-account-text">email</label>
                            <input name="location" value={values.poc.location} onChange={handleInputChange} type="email" className="form-control add-account-input" id="inputEmail" placeholder={props.data.projectDetails.stakeholders.poc.email} style={{width:'380px'}}/>
                        </div>
                    </div>
                </div>
                    <h3 className="add-stakeholder-text" style={{top: '450px'}}>Internal POC</h3>
                    <div className="container input-container-timeline" style={{padding:'10px'}}>
                    <div className="row" style={{margin:'10px'}}>
                        <div className="col-lg-6">
                            <label for="inputText" className="add-account-text">Name</label>
                            <input name="name" value={values.internal.name} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputEmail" placeholder={props.data.projectDetails.stakeholders.internal.name} style={{width:'380px'}}/>
                        </div>
                        <div className="col-lg-6">
                            <label for="inputText" className="add-account-text">email</label>
                            <input name="location" value={values.internal.location} onChange={handleInputChange} type="email" className="form-control add-account-input" id="inputEmail" placeholder={props.data.projectDetails.stakeholders.internal.email} style={{width:'380px'}}/>
                        </div>
                    </div>
                </div>
                </div>
            } {active === 'deliverables' && <DeliverablesEdit data={props.data}/>}
            {active === 'shortlist' && <ShortlistEdit data={props.data}/>}
        </div>
    )
}

export default StakeholdersEdit
