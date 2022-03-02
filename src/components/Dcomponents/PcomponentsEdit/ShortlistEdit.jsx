import React, { useState,useEffect } from 'react';
import { db } from '../../../firebase';
import StakeholdersEdit from './StakeholdersEdit';

function ShortlistEdit(props) {


    const [talent, setTalent] = useState([]);
    const [active, setActive] = useState('shortlist');


    console.log('props check final check');
    console.log(props.data);
    console.log('props check final check');


    const check = (event) => {
        let temp = event.target.value;
        // if(props.data.talent.includes(temp)){
        //     console.log(props.data.talent.includes(temp));
        // } else{
        //     props.data.talent.push(temp);
        // }
        props.data.talent.name = temp;
    console.log('props check final check');
    console.log(props.data);
    console.log('props check final check');
    }

    var size = props.data.projectDetails.length;

    const handleSubmit = () => {

    
        db.collection('project').where("brandName", "==", props.data.brandName).limit(1).get().then(query => {
            console.log(query);
            const thing = query.docs[0];
            console.log(thing.data());
            let temp = thing.data();
            // temp.projectDetails = temp.projectDetails.map((doc) => {
            //     if(doc.projectId === props.data.projectId) {
            //         return(
            //             props.data
            //         )
            //     }
            // });
            var l = temp.projectDetails.length;
            for (let i = 1; i < l; i++) {
                const tempArray = [props.data];
                console.log('====================================for check');
                console.log(temp.projectDetails[i]);
                console.log(props.data.projectDetails.projectId);
                console.log('====================================for check');
                console.log('====================================');
                console.log(tempArray);
                console.log('====================================');
                if(temp.projectDetails[i].projectId === props.data.projectDetails.projectId){
                    temp.projectDetails[i].projectName = props.data.projectDetails.projectName;
                    temp.projectDetails[i].mediaFormat = props.data.projectDetails.mediaFormat;
                    temp.projectDetails[i].assetType = props.data.projectDetails.assetType;
                    temp.projectDetails[i].businessObjectives = props.data.projectDetails.businessObjectives;
                    temp.projectDetails[i].timeLine.name = props.data.projectDetails.timeLine.name;
                    temp.projectDetails[i].timeLine.date = props.data.projectDetails.timeLine.date;
                    temp.projectDetails[i].timeLine.days = props.data.projectDetails.timeLine.days;
                    temp.projectDetails[i].timeLine.location = props.data.projectDetails.timeLine.location;
                    temp.projectDetails[i].deliverables.deliverables = props.data.projectDetails.deliverables.deliverables;
                    temp.projectDetails[i].deliverables.usage = props.data.projectDetails.deliverables.usage;
                    temp.projectDetails[i].stakeholders.contribution = props.data.projectDetails.stakeholders.contribution;
                    temp.projectDetails[i].stakeholders.poc.name = props.data.projectDetails.stakeholders.poc.name;
                    temp.projectDetails[i].stakeholders.poc.phone = props.data.projectDetails.stakeholders.poc.phone;
                    temp.projectDetails[i].stakeholders.poc.email = props.data.projectDetails.stakeholders.poc.email;
                    temp.projectDetails[i].stakeholders.internal.name = props.data.projectDetails.stakeholders.internal.name;
                    temp.projectDetails[i].stakeholders.internal.phone = props.data.projectDetails.stakeholders.internal.phone;
                    temp.projectDetails[i].stakeholders.internal.email = props.data.projectDetails.stakeholders.internal.email;
                    break;
                }
               
            }
            console.log(temp);
            thing.ref.update(temp);
        });
        alert(`data stored`);
    }


    useEffect(() => {

        db.collection('talent').get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                setTalent((prev) => {
                    return [...prev, doc.data()];
                })
            })
        });
    },[]);

    return (
        <div>
            {active === 'shortlist' &&
                <section>
                    <div className="container-fluid talent-container">
                        <h3 className="details-title">Shortlist Talent</h3>
                        {/* <button className="btn btn-primary shortlist-refresh" onClick={fetchTalent}>refresh</button> */}
                        <div className="container-fluid">
                            <div className="row">
                                {talent.map((doc) => {
                                    return (
                                        <div className="col-lg-4 talent-box" style={{ paddingLeft: '20px' }}>
                                            <p className="talent-box-title">{doc.name}</p>
                                            <p className="talent-box-location"><i class="fa fa-map-marker" aria-hidden="true" style={{ marginRight: '10px' }}></i>{doc.location}</p>
                                            <div className="container logo-container">
                                                <div className="row">
                                                    <i class="fa fa-facebook-official col-lg-1" aria-hidden="true" style={{color:'blue'}}></i>
                                                    <i class="fa fa-instagram col-lg-1" aria-hidden="true" style={{color:'red'}}></i>
                                                </div>
                                            </div>
                                            <div className="bubble-container"><p className="bubble-text">{doc.fields[0]}</p></div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="bottom-container-2">
                            <button className="poc-prev btn" onClick={() => setActive('stakeholders')}><i className="fa fa-long-arrow-left" aria-hidden="true"></i>  Prev</button>
                            <button className="poc-create-button btn" onClick={handleSubmit}>Create</button>
                        </div>
                    </div>
                    <div className="container-fluid talent-list-container">
                        <h3 className="details-title">List</h3>
                        <div className="container-fluid talent-list-container-inner">
                            {talent.map((doc) => {
                                return (
                                    <div className="row" style={{ position: 'relative', top: '30px' }}>
                                        <input style={{ marginLeft: '20px' }} type="checkbox" class="form-check-input col-lg-6" id="exampleCheck1" onClick={check} value={doc.name}></input>
                                        <p style={{ marginLeft: '20px' }} className="talent-list col-lg-6">{doc.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            } {active === 'stakeholders' && <StakeholdersEdit data={props.data}/>}
        </div>
    )
}

export default ShortlistEdit;

