import React,{useState} from 'react';
import ProjectdetailsEdit from './PcomponentsEdit/ProjectdetailsEdit';
import TimelineEdit from './PcomponentsEdit/TimelineEdit';
import DeliverablesEdit from './PcomponentsEdit/DeliverablesEdit';
import StakeholdersEdit from './PcomponentsEdit/StakeholdersEdit';
import ShortlistEdit from './PcomponentsEdit/ShortlistEdit';


function ProjectEdit(props) {


    const [active,setActive] = useState('project details');

    console.log('====================================edit');
    console.log(props.data);
    console.log('====================================edit');
    return (
        <div>
            <div>
            <div className="container-navigation">
            <a href="/Dashboard">
                <i class="fa fa-home fa-2x dash-icon" aria-hidden="true"></i>
            </a>
                <i class="fa fa-folder fa-2x dash-icon1" aria-hidden="true"></i>
                <i class="fa fa-user fa-2x dash-icon2" aria-hidden="true"></i>
                <i class="fa fa-tasks fa-2x dash-icon3" aria-hidden="true"></i>
                <i class="fa fa-credit-card fa-2x dash-icon4" aria-hidden="true"></i>
            </div>
            <div className="container-fluid project-nav">
                <div className="container-fluid project-nav-inside">
                    <button className="btn btn-primary add-project-button-form" onClick={() => setActive('project details')}><i className="fa fa-briefcase " aria-hidden="true"></i></button>
                    <p className="add-project-text">Project Details</p>
                    <p className="add-project-text-2">Add Project Details</p>
                </div>
                <div className="container-fluid project-nav-inside">
                    <button className="btn btn-primary add-project-button-form" onClick={() => setActive('timeline')}><i className="fa fa-building-o" aria-hidden="true"></i></button>
                    <p className="add-project-text">Timeline</p>
                    <p className="add-project-text-2">Add Project Duration</p>
                </div>
                <div className="container-fluid project-nav-inside">
                    <button className="btn btn-primary add-project-button-form" onClick={() => setActive('deliverables')}><i className="fa fa-truck " aria-hidden="true"></i></button>
                    <p className="add-project-text">Deliverables</p>
                    <p className="add-project-text-2">Add Deliverables</p>
                </div>
                <div className="container-fluid project-nav-inside">
                    <button className="btn btn-primary add-project-button-form" onClick={() => setActive('stakeholders')}><i className="fa fa-users " aria-hidden="true"></i></button>
                    <p className="add-project-text">Stakeholders</p>
                    <p className="add-project-text-2">Add Stakeholders</p>
                </div>
                <div className="container-fluid project-nav-inside">
                    <button className="btn btn-primary add-project-button-form" onClick={() => setActive('Shortlist')}><i className="fa fa-star " aria-hidden="true"></i></button>
                    <p className="add-project-text">Shortlist Talent</p>
                    <p className="add-project-text-2">Add Contributors</p>
                </div>
            </div>
        </div>
            {active === 'project details' && <ProjectdetailsEdit data={props.data} />}
            {active === 'timeline' && <TimelineEdit />}
            {active === 'deliverables' && <DeliverablesEdit />}
            {active === 'stakeholders' && <StakeholdersEdit/>}
            {active === 'Shortlist' && <ShortlistEdit/>}
        </div>
    )
}

export default ProjectEdit;
