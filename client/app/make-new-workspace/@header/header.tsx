import './styles.scss';

const Header = () => {
    return (
        <div className="make-new-workspace-header">
            <div className="wrapper">
                <img className="logo" src="/images/trello_logo.png" alt="logo" />
                <span className='name'>Trello</span>
            </div>
        </div>
    );
}

export default Header;