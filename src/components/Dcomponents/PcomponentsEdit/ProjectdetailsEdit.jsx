import React,{useState,useEffect} from 'react';
import TimelineEdit from './TimelineEdit';
import Project_details from '../Pcomponents/Project_details';
import {db} from '../../../firebase';

let temp2;
let index;
let data1;

function ProjectdetailsEdit(props) {
    // console.log('value check index check');
    // console.log(props.data);
    // console.log('value check index check');

    const [accounts,setAccounts] = useState([]);
    const [projects,setProjects] = useState([]);
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
        props.data.projectDetails.projectName = values.projectName;
        props.data.projectDetails.mediaFormat = values.mediaFormat;
        props.data.projectDetails.assetType = values.assetType;
        props.data.projectDetails.businessObjectives = values.businessObjectives;
        setActive('timeline');
    }

    useEffect(() => {
        db.collection('project').get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                setAccounts((prev) => {
                    return [...prev, doc.data()];
                })
            })
        });
    }, []);

    useEffect(() => {
        db.collection('project').get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                for (let i = 0; i < doc.data().projectDetails.length; i++) {
                    setProjects((prev) => {
                        return [...prev,doc.data().projectDetails[i].projectName]
                    })
                }
            })
        });
    },[]);

    const [visibility,setVisibility] = useState('visible');
    const [brightness,setBrightness] = useState('brightness(0.65)');

    let accountSelect1 = React.createRef();
    const handleAddProject = () => {
        let addProject = accountSelect1.current.value;
        console.log(addProject);
        for (let i = 0; i < accounts.length; i++) {
            // console.log(accounts[i]);
            if(addProject === accounts[i].brandName){
                data1 = accounts[i];
            }
        }
        console.log(data1);
        console.log(`data`);
        setActive('project');
        setVisibility('hidden');
        setBrightness('brightness(1)');
    }
    const handleManageAccount = () => {}
    const optionSelect = () => {}

    if(props.data === undefined){
        return(
            <>
             <>
                <div className="alert-container-2" style={{ zIndex: '10' ,visibility: visibility}}>
                <select class="form-control alert-input-1" name="category" id="" placeholder="Select Account" style={{ fontFamily: 'Gotham Pro',top:'40px' }} ref={accountSelect1}>
                        {accounts.map((doc) => {
                            {index+=1}
                            return (
                                <option value={doc.brandName} style={{ fontFamily: 'Gotham Pro' }}>{doc.brandName}</option>
                            )
                        })}
                    </select>
                    <button className="btn btn-primary alert-account-button" onClick={handleAddProject} style={{top:'60px'}}>Add Project</button>
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
                    <select class="form-control alert-input-1" name="category" id="" placeholder="Select Account" style={{ fontFamily: 'Gotham Pro',top: '100px'}} ref={optionSelect}>
                        {/* onChange={handleInputChange} */}
                        {projects.map((doc) => {
                            {index+=1}
                            return (
                                <option value={index} style={{ fontFamily: 'Gotham Pro' }}>{doc}</option>
                            )
                        })}
                    </select>
                    <button className="btn btn-primary alert-manage-account-button" onClick={handleManageAccount} style={{top: '120px'}}>Manage Project</button>
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
                <div className="blur-container" style={{ zIndex: '-1', filter: brightness, height: '1080px' ,visibility:visibility }}>
                    <div className="container-fluid add-project-nav" style={{visibility: 'visible'}}>
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
                    {/* <ProjectdetailsEdit/> */}
                </div>
                </>
                {active==='project' && <Project_details data={data1}/>}
            </>
        )
    }
    else{

    return (
        <div>
        {active === 'project-details' &&
            <div className="container-fluid brand-details-1">
                <h3 className="details-title">Project Details</h3>
                <div className="container input-container">
                    <div className="row">
                        <div className="col-lg-6">
                            <label for="inputText" className="add-account-text">Project Name</label>
                            <input name="projectName" value={values.projectName} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputEmail" placeholder={props.data.projectDetails.projectName} />
                        </div>
                        <div className="col-lg-6">
                            <label for="inputText" className="add-account-text">Project Id</label>
                            <input name="projectId" value={values.projectId} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputEmail" placeholder={props.data.projectDetails.projectId} disabled/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <label for="inputText" className="add-account-text">Media Format</label>
                            <input name="mediaFormat" value={values.mediaFormat} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputEmail" placeholder={props.data.projectDetails.mediaFormat}/>
                        </div>
                        <div className="col-lg-6">
                            <label for="inputText" className="add-account-text">Asset type</label>
                            <input name="assetType" value={values.assetType} onChange={handleInputChange} type="text" className="form-control add-account-input" id="inputEmail" placeholder={props.data.projectDetails.assetType} />
                        </div>
                    </div>
                    <div className="row">
                        <label for="inputText" className="add-account-text">Business Objectives</label>
                        <input name="businessObjectives" value={values.businessObjectives} onChange={handleInputChange} type="text" className="form-control large-input" id="inputEmail" placeholder={props.data.projectDetails.businessObjectives} />
                    </div>
                </div>
                <div className="bottom-container-1">
                    {/* <button className="poc-prev btn" onClick = {()=> setActive('brand')} ><i className="fa fa-long-arrow-left" aria-hidden="true"></i>  Prev</button> */}
                    <button className="poc-create-button btn" onClick = {handleSubmit}>Next <i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                </div>
            </div>
        }
         {active==="timeline" && <TimelineEdit data={props.data}/>}
        </div>
    )
    }
}

export default ProjectdetailsEdit;
