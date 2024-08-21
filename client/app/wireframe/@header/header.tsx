import { FaAngleDown } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import './styles.scss';
<IoIosNotificationsOutline />
const Header = () => {
    return (
        <div className='header'>
            <div className="workspace-selector">
                <div className="logo">
                    <img src="/images/trello_logo.png" alt="app logo" />
                </div>
                <div className="workspace">
                    Workspace
                    <FaAngleDown className="angle-down" />
                </div>
                <div className="recent">
                    Recent
                    <FaAngleDown className="angle-down" />
                </div>
            </div>

            <div className="tab-selector">

            </div>

            <div className="user-menu-and-notification">
                <div className="notification">
                    <IoIosNotificationsOutline style={{ width: '20px', height: '20px' }} />
                </div>
                <div className="user-menu">
                    <div className="avatar">
                        <img src="/images/empty-avatar.png" alt="user avatar" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;