import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import Stakeholders from './Stakeholders';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Shortlist(props) {



    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [talent, setTalent] = useState([]);
    const [active, setActive] = useState('shortlist');
    const [stakeholders, setStakeholders] = useState([]);
    const [stakeState, setStakeState] = useState('photographer');


    // console.log('props check final check');
    // console.log(props.data);
    // console.log('props check final check');


    const check = (event) => {
        let temp = event.target.value;
        if (props.data.talent.includes(temp)) {
            console.log(props.data.talent.includes(temp));
        } else {
            props.data.talent.push(temp);
        }
        // console.log('props check final check');
        // console.log(props.data);
        // console.log('props check final check');
    }

    var size = props.data.projectDetails.length;

    const handleSubmit = () => {
        db.collection('project').where("brandName", "==", props.data.brandName).limit(1).get().then(query => {
            console.log(`query`);
            console.log(query);
            const thing = query.docs[0];
            console.log(thing.data());
            let temp = thing.data();
            temp.projectDetails.push(props.data.projectDetails[size - 1]);
            console.log(temp);
            thing.ref.update(temp);
        });
        alert(`data stored`);
    }

    useEffect(() => {
        let tempArr = [];
        db.collection('talent').where('category', '==', stakeState).get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                tempArr.push(doc.data());
            })
            setTalent(tempArr);
        });
    }, [stakeState]);



    console.log('====================================');
    console.log(talent);
    console.log('====================================');

    return (
        <div>
            {active === 'shortlist' &&
                <section>
                    <div className="container-fluid talent-container">
                        <h3 className="details-title">Shortlist Talent</h3>
                        <span className="fa fa-search search-icon" style={{ top: '24px', left: '66px' }}></span>
                        <input className="form-control search-container" style={{ left: '40px', top: '-6px' }} placeholder="          Search Accounts" ></input>


                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Photographer" {...a11yProps(0)} onClick={() => setStakeState('photographer')} />
                                <Tab label="Consultant" {...a11yProps(1)} onClick={() => setStakeState('consultant')} />
                                <Tab label="Item Three" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0} >
                            {/* {setStakeState('photographer')} */}
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {/* {setStakeState('consultant')} */}
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                        </TabPanel>

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
                                                    <i class="fa fa-facebook-official col-lg-1" aria-hidden="true" style={{ color: 'blue' }}></i>
                                                    <i class="fa fa-instagram col-lg-1" aria-hidden="true" style={{ color: 'red' }}></i>
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
                            {stakeholders.map((doc) => {
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
            } {active === 'stakeholders' && <Stakeholders data={props.data} />}
        </div>
    )
}

export default Shortlist;

