import React,{useState} from 'react';
import Timeline from './Timeline';

function Project_details(props) {
    // props.data.projectDetails.push({
    //         projectId: "",
    //         projectName: "",
    //         mediaFormat: "",
    //         assetType: "",
    //         businessObjectives: "",
    //         timeLine: {
    //             name: "",
    //             date: "",
    //             days: "",
    //             location: ""
    //         },
    //         deliverables: {
    //             deliverables: "",
    //             usage: ""
    //         },
    //         stakeholders: {
    //             contribution: "",
    //             poc: {
    //                 name: "",
    //                 phone: "",
    //                 email: ""
    //             },
    //             internal: {
    //                 name: "",
    //                 phone: "",
    //                 email: ""
    //             }
    //         }
    //     });

    console.log('value check index check');
    console.log(props.data);
    console.log('value check index check');

    var size = props.data.projectDetails.length;
    console.log(size);
    const [active,setActive] = useState('project-details');
    const [values,setValues] = useState({
            projectId: "",
            projectName: "",
            mediaFormat: "",
            assetType: "",
            businessObjectives: ""
        });

    let name, value;
    const handleInputChange = (event) => {
        name = event.target.name;
        value = event.target.value;

        setValues({ ...values, [name]: value });
    };

    const handleSubmit = () => {
        props.data.projectDetails[size-1].projectId = values.projectId;
        props.data.projectDetails[size-1].projectName = values.projectName;
        props.data.projectDetails[size-1].mediaFormat = values.mediaFormat;
        props.data.projectDetails[size-1].assetType = values.assetType;
        props.data.projectDetails[size-1].businessObjectives = values.businessObjectives;
        setActive('timeline');
    }


    return (
        <div>
        {active === 'project-details' &&
            <div className="container-fluid brand-details-1">
                <h3 className="details-title">Project Details</h3>
                <div className="container input-container">
                    <div className="row">
                        <div className="col-lg-6">
                            <label for="inputText" className="add-account-text">Project Name</label>
                            <input name="projectName" value={values.projectName} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputEmail" placeholder="" />
                        </div>
                        <div className="col-lg-6">
                            <label for="inputText" className="add-account-text">Project Id</label>
                            <input name="projectId" value={values.projectId} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputEmail" placeholder="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <label for="inputText" className="add-account-text">Media Format</label>
                            <input name="mediaFormat" value={values.mediaFormat} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputEmail" placeholder="" />
                        </div>
                        <div className="col-lg-6">
                            <label for="inputText" className="add-account-text">Asset type</label>
                            {/* <input name="assetType" value={values.assetType} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputEmail" placeholder="" /> */}
                            <select class="form-control add-account-input" name="assetType" id="" onChange={handleInputChange} >
                                            <option value="Campaign">Campaign</option>
                                            <option value="Product">Product</option>
                                            {/* <option value="Hospitality">Hospitality</option> */}
                                        </select>
                        </div>
                    </div>
                    <div className="row">
                        <label for="inputText" className="add-account-text">Business Objectives</label>
                        {/* <input name="businessObjectives" value={values.businessObjectives} onChange={handleInputChange} type="text" className="form-control large-input" id="inputEmail" placeholder="" /> */}
                        <select class="form-control add-account-input" name="businessObjective" id="" onChange={handleInputChange} >
                                            <option value="Increase in lead/sales">Increase in lead/sales</option>
                                            <option value="Increase brand awareness">Increase brand awareness</option>
                                            {/* <option value="Hospitality">Hospitality</option> */}
                        </select>
                    </div>
                </div>
                <div className="bottom-container-1">
                    {/* <button className="poc-prev btn" onClick = {()=> setActive('brand')} ><i className="fa fa-long-arrow-left" aria-hidden="true"></i>  Prev</button> */}
                    <button className="poc-create-button btn" onClick = {handleSubmit}>Next <i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                </div>
            </div>
        }
         {active==="timeline" && <Timeline data={props.data}/>}
        </div>
    )
}

export default Project_details;
