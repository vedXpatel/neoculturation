import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Folder from './Folder';


let i = 0;

function MoodBoard() {

    const history = useHistory();

    function handleClick(e, data) {
        console.log(data.item);
    }

    const [component, setComponent] = useState([]);
    function openFolder() {
        history.push('/folder');
    }

    const images = ['folder','folder1','folder2','folder3','folder4','folder5'];

    if(i>5){
        i=0;
    }

    function createFolder(event) {
        let temp = <div className={images[i]} style={{ position: 'absolute', left: event.clientX, top: event.clientY }} onClick={openFolder}>
            <h3></h3>
        </div>;
        console.log(i);
        i+=1;
        setComponent((prev) => {
            return [...prev, temp];
        })

        console.log(event.clientX);
        console.log(event.clientY);
    }

    return (
        <div className="canvas">
            <div className="moodboard-title"></div>
            <div className="chat-container"></div>
            <div>
                <ContextMenuTrigger id="add_same_id">
                    <div className="hight">Right Click for Open Menu</div>
                </ContextMenuTrigger>
                <ContextMenu className="menu" id="add_same_id">
                    <MenuItem
                        onClick={createFolder}
                        data={{ item: "Home" }}
                        className="menuItem"
                    >
                        Create New Folder
                    </MenuItem>
                    <MenuItem
                        onClick={handleClick}
                        data={{ item: "Post" }}
                        className="menuItem"
                    >
                        Post
                    </MenuItem>
                    <MenuItem
                        onClick={handleClick}
                        data={{ item: "Create Post" }}
                        className="menuItem"
                    >
                        Create Post
                    </MenuItem>
                    <MenuItem
                        onClick={handleClick}
                        data={{ item: "All Post" }}
                        className="menuItem"
                    >
                        All Post
                    </MenuItem>
                    <MenuItem
                        onClick={handleClick}
                        data={{ item: "Stats" }}
                        className="menuItem"
                    >
                        Stats
                    </MenuItem>
                    <MenuItem
                        onClick={handleClick}
                        data={{ item: "Chat" }}
                        className="menuItem"
                    >
                        Chat
                    </MenuItem>
                    <MenuItem
                        onClick={handleClick}
                        data={{ item: "Settings" }}
                        className="menuItem"
                    >
                        Settings
                    </MenuItem>
                    <MenuItem
                        onClick={handleClick}
                        data={{ item: "Profile" }}
                        className="menuItem"
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        onClick={handleClick}
                        data={{ item: "Logout" }}
                        className="menuItem"
                    >
                        Logout
                    </MenuItem>
                </ContextMenu>
                {component.map((doc) => {
                    return (
                        doc
                    )
                })}
            </div>
        </div>
    )
}

export default MoodBoard;