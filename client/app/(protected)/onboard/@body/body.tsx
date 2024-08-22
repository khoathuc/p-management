import { BsArrowLeft } from "react-icons/bs";
import './styles.scss';
type MyComponentProps = {
    content: React.ReactNode;
    return_btn: () => void;
    skip_btn: () => void;
    page: number;
}

const Body: React.FC<MyComponentProps> = ({ content, return_btn, skip_btn, page }) => {
    return (
        <div className="make-new-workspace-body">
            <div className="body">
                <div className="left">
                    <div className="content">{content}</div>
                    {page == 0 ? <></> : <div className="button-bottom">
                        <button className='return-btn' onClick={return_btn}><div className="return-btn-text"><BsArrowLeft />  Quay lại</div></button>
                        <button className='skip-btn' onClick={skip_btn}><div className="ship-btn-text">Bỏ qua</div></button>
                    </div>}

                </div>
                <div className="right"></div>
            </div>

        </div>
    );
}

export default Body;