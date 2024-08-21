'use client'
import React, { useEffect } from 'react';
import { CiCalendarDate } from "react-icons/ci";
import { FaAngleDown, FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuFileText, LuHome, LuInbox } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { PiNotePencilBold } from "react-icons/pi";
import { TbUsers } from "react-icons/tb";
import './styles.scss';
const Sidebar: React.FC = () => {

    let buttonClicked = (event: React.MouseEvent) => {
        setUserMenuButtonActived(event.currentTarget);
    }

    let [userMenuButtonActived, setUserMenuButtonActived] = React.useState<Element | null>(null);

    useEffect(() => {
        setUserMenuButtonActived(document.querySelector('.sidebar .button-container'));
    }, []);

    useEffect(() => {
        if (userMenuButtonActived) {
            Array.from(document.querySelectorAll('.sidebar .button-container')).forEach((element: Element) => {
                element.classList.remove('onactive');
            });
            userMenuButtonActived.classList.add('onactive');
        }
    }, [userMenuButtonActived]);

    return (
        <div className='sidebar'>
            <div className="wrapper">
                <div className="user-menu">
                    <div style={{ display: "flex", alignItems: "flex-end" }}>
                        <span className="avatar">
                            <img src="./images/empty-avatar.png" alt="avatar" />
                        </span>
                        <span className='name'>
                            <p>William</p>
                            <FaAngleDown className="angle-down" />
                        </span>
                        <div className="note-icon">
                            <PiNotePencilBold />
                        </div>
                    </div>
                    <div onClick={buttonClicked} className="button-container">
                        <div className='icon'><IoIosSearch /></div>
                        <div className='text'><p>Search</p></div>
                    </div>
                    <div onClick={buttonClicked} className="button-container">
                        <div className='icon'><LuHome /></div>
                        <div className='text'><p>Home</p></div>
                    </div>
                    <div onClick={buttonClicked} className="button-container">
                        <div className='icon'><LuInbox /></div>
                        <div className='text'><p>Inbox</p></div>
                    </div>
                    <div onClick={buttonClicked} className="button-container">
                        <div className='icon'><TbUsers /></div>
                        <div className='text'><p>Users</p></div>
                    </div>
                    <div onClick={buttonClicked} className="button-container">
                        <div className='icon'><IoSettingsOutline /></div>
                        <div className='text'><p>Settings</p></div>
                    </div>
                </div>

                <div className="public-workspace">
                    <div className="title">
                        <p>Public Workspace</p>
                        <FaPlus className='plus-icon' />
                    </div>
                    <div onClick={buttonClicked} className="button-container">
                        <div className='icon'><MdDashboard /></div>
                        <div className='text'><p>Board</p></div>
                    </div>
                    <div onClick={buttonClicked} className="button-container">
                        <div className='icon'><CiCalendarDate /></div>
                        <div className='text'><p>Calender</p></div>
                    </div>
                    <div onClick={buttonClicked} className="button-container">
                        <div className='icon'><LuFileText /></div>
                        <div className='text'><p>Text</p></div>
                    </div>
                </div>

                <div className="private-workspace">
                    <div className="title">
                        <p>Private Workspace</p>
                        <FaPlus className='plus-icon' />
                    </div>
                    <div onClick={buttonClicked} className="button-container">
                        <div className='icon'><MdDashboard /></div>
                        <div className='text'><p>Board</p></div>
                    </div>
                    <div onClick={buttonClicked} className="button-container">
                        <div className='icon'><CiCalendarDate /></div>
                        <div className='text'><p>Calender</p></div>
                    </div>
                    <div onClick={buttonClicked} className="button-container">
                        <div className='icon'><LuFileText /></div>
                        <div className='text'><p>Text</p></div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Sidebar;