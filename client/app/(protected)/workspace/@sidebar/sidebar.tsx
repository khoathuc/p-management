'use client'
import React, { useEffect } from 'react';
import { CiCalendarDate } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaAngleDown, FaPlus } from "react-icons/fa6";
import { IoIosSearch, IoMdHelpCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuFileText, LuHome, LuInbox } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { PiNotePencilBold } from "react-icons/pi";
import { TbUsers } from "react-icons/tb";
import './styles.scss';

interface SidebarProps {
    currentState: string | null;
    setCurrentState: (state: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentState, setCurrentState }) => {

    let resetButtonActived = () => {
        setUserMenuButtonActived(-1);
    }

    let buttonClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, num: number) => {
        setUserMenuButtonActived(num);
        // console.log(event.currentTarget.children[1].children[0].innerHTML);
        setCurrentState(event.currentTarget.children[1].children[0].textContent);
    }

    let getBtnIdx = (e: Element) => {
        let result = -1;
        Array.from(document.querySelectorAll('.sidebar .button-container')).forEach((value: Element, idx: number) => {
            if (value === e) {
                result = idx;
            }
        })
        return result;
    };

    let [userMenuButtonActived, setUserMenuButtonActived] = React.useState(-1);


    useEffect(() => {
        Array.from(document.querySelectorAll('.sidebar .button-container')).forEach((element: Element) => {
            element.classList.remove('onactive');
        });
        if (userMenuButtonActived != -1) {
            // console.log(document.querySelectorAll('.sidebar .button-container')[userMenuButtonActived]);
            document.querySelectorAll('.sidebar .button-container')[userMenuButtonActived].classList.add('onactive');
        }
    }, [userMenuButtonActived]);

    useEffect(() => {
        if (currentState === null) {
            resetButtonActived();
        }
    }, [currentState]);

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
                    <div onClick={(event) => buttonClicked(event, getBtnIdx(event.currentTarget))} className="button-container">
                        <div className='icon'><IoIosSearch /></div>
                        <div className='text'><p>Search</p></div>
                    </div>
                    <div onClick={(event) => buttonClicked(event, getBtnIdx(event.currentTarget))} className="button-container">
                        <div className='icon'><LuHome /></div>
                        <div className='text'><p>Home</p></div>
                    </div>
                    <div onClick={(event) => buttonClicked(event, getBtnIdx(event.currentTarget))} className="button-container">
                        <div className='icon'><LuInbox /></div>
                        <div className='text'><p>Inbox</p></div>
                    </div>
                    <div onClick={(event) => buttonClicked(event, getBtnIdx(event.currentTarget))} className="button-container">
                        <div className='icon'><TbUsers /></div>
                        <div className='text'><p>Users</p></div>
                    </div>
                    <div onClick={(event) => buttonClicked(event, getBtnIdx(event.currentTarget))} className="button-container">
                        <div className='icon'><IoSettingsOutline /></div>
                        <div className='text'><p>Settings</p></div>
                    </div>
                </div>

                <div className="public-workspace">
                    <div className="title">
                        <p>Public Workspace</p>
                        <FaPlus className='plus-icon' />
                    </div>
                    <div onClick={(event) => buttonClicked(event, getBtnIdx(event.currentTarget))} className="button-container">
                        <div className='icon'><MdDashboard /></div>
                        <div className='text'><p>Board</p></div>
                    </div>
                    <div onClick={(event) => buttonClicked(event, getBtnIdx(event.currentTarget))} className="button-container">
                        <div className='icon'><CiCalendarDate /></div>
                        <div className='text'><p>Calender</p></div>
                    </div>
                    <div onClick={(event) => buttonClicked(event, getBtnIdx(event.currentTarget))} className="button-container">
                        <div className='icon'><LuFileText /></div>
                        <div className='text'><p>Text</p></div>
                    </div>
                </div>

                <div className="private-workspace">
                    <div className="title">
                        <p>Private Workspace</p>
                        <FaPlus className='plus-icon' />
                    </div>
                    <div onClick={(event) => buttonClicked(event, getBtnIdx(event.currentTarget))} className="button-container">
                        <div className='icon'><MdDashboard /></div>
                        <div className='text'><p>Board</p></div>
                    </div>
                    <div onClick={(event) => buttonClicked(event, getBtnIdx(event.currentTarget))} className="button-container">
                        <div className='icon'><CiCalendarDate /></div>
                        <div className='text'><p>Calender</p></div>
                    </div>
                    <div onClick={(event) => buttonClicked(event, getBtnIdx(event.currentTarget))} className="button-container">
                        <div className='icon'><LuFileText /></div>
                        <div className='text'><p>Text</p></div>
                    </div>
                </div>

                <div className="trash-and-help">
                    <div onClick={(event) => buttonClicked(event, getBtnIdx(event.currentTarget))} className="button-container">
                        <div className='icon'><FaRegTrashAlt /></div>
                        <div className='text'><p>Trash</p></div>
                    </div>
                    <div onClick={(event) => buttonClicked(event, getBtnIdx(event.currentTarget))} className="button-container">
                        <div className='icon'><IoMdHelpCircleOutline /></div>
                        <div className='text'><p>Help & Support</p></div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Sidebar;