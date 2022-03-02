import React, { useState } from 'react';
import Project_details from './Project_details';
import Deliverables from './Deliverables';

function Timeline(props) {

    // console.log('timeline.data');
    // console.log(props.data);
    // console.log('timeline.data');

    var size = props.data.projectDetails.length;

    let set = {
        name: "",
        date: "",
        days: "",
        location: ""
    };

    const {nameVar,setNameVar} = useState();
    const [active, setActive] = useState('timeline');
    const [valuesArray, setValuesArray] = useState([]);
    // const {date,setDate} = useState('');
    // const {days,setDays} = useState('');
    // const {location,setLocation} = useState('');
    const [values, setValues] = useState({
        name: "",
        date: "",
        days: "",
        location: ""
    });

    let name,value;
    let value1,value3,value2;


    const handleInputChange = (event) => {
        name = event.target.name;
        value = event.target.value;
        console.log(value);
        setValues({...values,[name]:value});
    };
    // const handleInputChange = (event) => {
    //     value1 = event.target.value;
    //     console.log(value1);
    //     setValues({...values,date: value1 });
    // };
    // const handleInputChange = (event) => {
    //     value2 = event.target.value;
    //     console.log(value2);
    //     setValues({...values,days: value2 });
    // };
    // const handleInputChange = (event) => {
    //     value3 = event.target.value;
    //     console.log(value3);
    //     setValues({...values,location: value3 });
    // };

    // const handleNameChange = (event) => {
    //     value1 = event.target.value;
    //     name = event.target.name;
    //     setValues({...values,name:nameVar});
    // }

    const handleSubmit = () => {
        props.data.projectDetails[size - 1].timeLine.name = values.name;
        props.data.projectDetails[size - 1].timeLine.date = values.date;
        props.data.projectDetails[size - 1].timeLine.days = values.days;
        props.data.projectDetails[size - 1].timeLine.location = values.location;
        setActive('deliverables')
    }

    const [components, setComponents] = useState([<div className="row" style={{ marginLeft: '45px', marginBottom: '0px', position: 'relative', bottom: '25px' }}>
        <div className="col-lg-3 timeline-input">
            <label for="inputText" className="add-account-text" style={{ position: 'relative', top: '-25px' }}>Name</label>
            <input name="name" values={values.name} onChange={handleInputChange} type="text" className="form-control add-timeline-input" id="inputEmail" placeholder="" />
        </div>
        <div className="col-lg-3 timeline-input">
            <label for="inputText" className="add-account-text" style={{ position: 'relative', top: '-25px' }}>date</label>
            <input name="date" values={values.date} onChange={handleInputChange} type="text" className="form-control add-timeline-input" id="inputEmail" placeholder="" />
        </div>
        <div className="col-lg-3 timeline-input">
            <label for="inputText" className="add-account-text" style={{ position: 'relative', top: '-25px' }}>days</label>
            <input name="days" values={values.days} onChange={handleInputChange} type="text" className="form-control add-timeline-input" id="inputEmail" placeholder="" />
        </div>
        <div className="col-lg-3 timeline-input">
            <label for="inputText" className="add-account-text" style={{ position: 'relative', top: '-25px' }}>location</label>
            <input name="location" values={values.location} onChange={handleInputChange} type="text" className="form-control add-timeline-input" id="inputEmail" placeholder="" />
        </div>
    </div>]);

    let component = <div className="row" style={{ marginLeft: '45px', marginBottom: '30px' }}>
        <div className="col-lg-3 timeline-input">
            <input name="name" values={values.name}  onChange={handleInputChange} type="text" className="form-control add-timeline-input" id="inputEmail" placeholder="" />
        </div>
        <div className="col-lg-3 timeline-input">
            <input name="date" values={values.date} onChange={handleInputChange} type="text" className="form-control add-timeline-input" id="inputEmail" placeholder="" />
        </div>
        <div className="col-lg-3 timeline-input">
            <input name="days" values={values.days} onChange={handleInputChange} type="text" className="form-control add-timeline-input" id="inputEmail" placeholder="" />
        </div>
        <div className="col-lg-3 timeline-input">
            <input name="location" values={values.location} onChange={handleInputChange} type="text" className="form-control add-timeline-input" id="inputEmail" placeholder="" />
        </div>
    </div>;



const addTimeline = () => {
        console.log(`pushing`);
        setComponents((prev) => {
            return [...prev, component];
        });
        console.log(values);
        setValuesArray((prev) => {
            return [...prev, values];
        })
        console.log(valuesArray);
        // values.name="";
        // values.date="";
        // values.days="";
        // values.location="";
        var x = '';
        setValues({name: "", date: "", days: "", location:""});
        console.log(`second values`);
        console.log(values);
    }

    return (
        <div>
            {active === 'timeline' &&
                <div className="container-fluid brand-details-1" style={{ height: 'fit-content', paddingBottom: '100px' }}>
                    <h3 className="details-title">Timeline</h3>
                    <div className="container input-container-timeline" style={{ height: 'fit-content' }}>
                        <button className="btn btn-primary addButton" onClick={addTimeline} style={{ borderRadius: '30px', position: 'relative', top: '3px' }}><i className="fa fa-plus addIcon"></i></button>
                        {components.map((doc) => {
                            return (
                                <div>
                                    {doc}
                                </div>
                            )
                        })}
                    </div>
                    <div className="bottom-container-1">
                        <button className="poc-prev btn" onClick={() => setActive('project-details')} ><i className="fa fa-long-arrow-left" aria-hidden="true"></i>  Prev</button>
                        <button className="poc-create-button btn" onClick={handleSubmit}>Next <i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                    </div>
                </div>
            } {active === 'project-details' && <Project_details data={props.data} />}
            {active === 'deliverables' && <Deliverables data={props.data} />}
        </div>
    )
}

export default Timeline;
