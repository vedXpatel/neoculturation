import React,{useState} from 'react';
import ProjectdetailsEdit from './ProjectdetailsEdit';
import DeliverablesEdit from './DeliverablesEdit';


function TimelineEdit(props) {
   
    console.log('timeline.data');
    console.log(props.data);
    console.log('timeline.data');

    const [active, setActive] = useState('timeline');
    const [values, setValues] = useState({
        name: "",
        date: "",
        days: "",
        location: ""
    });

    let name, value;
    const handleInputChange = (event) => {
        name = event.target.name;
        value = event.target.value;

        setValues({ ...values, [name]: value });
    };

    const handleSubmit = () => {
        props.data.projectDetails.timeLine.name = values.name;
        props.data.projectDetails.timeLine.date = values.date;
        props.data.projectDetails.timeLine.days = values.days;
        props.data.projectDetails.timeLine.location = values.location;
        setActive('deliverables')
    }

    return (
        <div>
            {active === 'timeline' &&
                <div className="container-fluid brand-details-1">
                    <h3 className="details-title">Timeline</h3>
                    <div className="container input-container-timeline">
                    <div className="row">
                        <div className="col-lg-3">
                            <label for="inputText" className="add-account-text">Name</label>
                            <input name="name" value={values.name} onChange={handleInputChange} type="text" className="form-control add-timeline-input" id="inputEmail" placeholder={props.data.projectDetails.timeLine.name} />
                        </div>
                        <div className="col-lg-3">
                            <label for="inputText" className="add-account-text">date</label>
                            <input name="date" value={values.date} onChange={handleInputChange} type="text" className="form-control add-timeline-input" id="inputEmail" placeholder={props.data.projectDetails.timeLine.date} />
                        </div>
                        <div className="col-lg-3">
                            <label for="inputText" className="add-account-text">days</label>
                            <input name="days" value={values.days} onChange={handleInputChange} type="text" className="form-control add-timeline-input" id="inputEmail" placeholder={props.data.projectDetails.timeLine.days} />
                        </div>
                        <div className="col-lg-3">
                            <label for="inputText" className="add-account-text">location</label>
                            <input name="location" value={values.location} onChange={handleInputChange} type="text" className="form-control add-timeline-input" id="inputEmail" placeholder={props.data.projectDetails.timeLine.location} />
                        </div>
                    </div>
                </div>
                    <div className="bottom-container-1">
                        <button className="poc-prev btn" onClick={() => setActive('project-details')} ><i className="fa fa-long-arrow-left" aria-hidden="true"></i>  Prev</button>
                        <button className="poc-create-button btn" onClick={handleSubmit}>Next <i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                    </div>
                </div>
            } {active === 'project-details' && <ProjectdetailsEdit data={props.data}/>}
            {active === 'deliverables' && <DeliverablesEdit data={props.data}/>}
        </div>
    )
}

export default TimelineEdit
