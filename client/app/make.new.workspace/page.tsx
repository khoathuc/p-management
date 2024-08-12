'use client'

import { useState } from 'react';
import { BsGraphUpArrow } from "react-icons/bs";
import { FaCheck } from 'react-icons/fa';
import { GrSort } from "react-icons/gr";
import { LuListTodo } from "react-icons/lu";
import { VscOrganization } from "react-icons/vsc";
import Body from './@body/body';
import Header from './@header/header';

const MakeNewWorkspace = () => {
    const [page, setPage] = useState(0);
    const [selectedButton, setSelectedButton] = useState(0);

    const submit = () => {
        if (page < 4) setPage(page + 1);
    };

    const return_btn = () => {
        if (page > 0) {
            setPage(page - 1);
            setSelectedButton(0);
        }
    };

    const skip_btn = () => {
        if (page < 4) setPage(page + 1);
    };

    const handleButtonClick = (buttonIndex: number) => {
        setSelectedButton(buttonIndex);
    };

    const renderScreen = () => {
        switch (page) {
            case 0:
                return (
                    <>
                        <h1>Điều gì đưa bạn đến đây hôm nay</h1>
                        <ul>
                            <li>
                                <button onClick={() => handleButtonClick(1)} className={selectedButton === 1 ? 'button-clicked' : ''}>
                                    {selectedButton === 1 ? <FaCheck color='rgba(102,156,247,255)' fontSize='1.35em' /> : <GrSort />}
                                    <span>Sắp xếp ý tưởng và công việc</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleButtonClick(2)} className={selectedButton === 2 ? 'button-clicked' : ''}>
                                    {selectedButton === 2 ? <FaCheck color='rgba(102,156,247,255)' fontSize='1.35em' /> : <LuListTodo />}
                                    <span>Theo dõi tác vụ cá nhân và những việc cần làm</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleButtonClick(3)} className={selectedButton === 3 ? 'button-clicked' : ''}>
                                    {selectedButton === 3 ? <FaCheck color='rgba(102,156,247,255)' fontSize='1.35em' /> : <VscOrganization />}
                                    <span>Quản lý dự án của đội ngũ</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleButtonClick(4)} className={selectedButton === 4 ? 'button-clicked' : ''}>
                                    {selectedButton === 4 ? <FaCheck color='rgba(102,156,247,255)' fontSize='1.35em' /> : <BsGraphUpArrow />}
                                    <span>Tạo và tự động hóa quy trình làm việc của đội ngũ</span>
                                </button>
                            </li>
                        </ul>
                        {
                            selectedButton > 0 ?
                                <button className='submit' onClick={submit}>Tiếp tục</button> :
                                <button className='submit-disabled' onClick={submit} disabled>Tiếp tục</button>
                        }

                        <button className='skip' onClick={skip_btn}>Bỏ qua</button>
                    </>
                );
            case 1:
                return (
                    <>
                        <h1>Tất cả bắt đầu với bảng</h1>
                        <p>Bảng là nơi thực hiện công việc trong PManagement. Bạn sẽ tìm thấy thẻ, danh sách, ngày hết hạn, và hơn thế nữa để giúp bạn luôn ngăn nắp và đi đúng hướng.</p>
                        <div className="input-title">Nhập tên bảng</div>
                        <input type="text" placeholder={'ví dụ: bảng PManagement của tôi'} />
                        <button className='submit' onClick={submit}>Sau</button>
                    </>
                );
            case 2:
                return (
                    <>
                        <h1>Bây giờ hãy sắp xếp bảng của bạn với các danh sách</h1>
                        <p>Danh sách là một nhóm thẻ đại diện cho các mốc quan trọng, các ý tưởng hoặc mục tiêu của nhóm. Tùy chỉnh danh sách của bạn và thêm bao nhiêu tùy thích.</p>
                        <p>Nhiều người bắt đầu với:</p>
                        <div className="input-title">Đặt tên danh sách của bạn</div>
                        <input type="text" placeholder={'ví dụ: Cần làm'} />
                        <input type="text" placeholder={'ví dụ: Đang làm'} />
                        <input type="text" placeholder={'ví dụ: Đã xong'} />
                        <button className='submit' onClick={submit}>Sau</button>
                    </>
                );
            case 3:
                return (
                    <>
                        <h1>Các thẻ là khối xây dựng của bạn</h1>
                        <p>Đối với những việc bạn cần làm, sắp xếp hoặc chia sẻ với đồng đội.</p>
                        <p>Bạn cũng có thể đặt ngày đến hạn cho thẻ để không bao giờ bỏ lỡ điều gì.</p>
                        <p>Thêm tiêu đề cho một số thẻ trong danh sách <b>Can lam</b> của bạn</p>

                        <div className="input-title">Tên thẻ 1</div>
                        <input type="text" placeholder={'ví dụ: Lập kế hoạch dự án'} />
                        <div className="input-title">Tên thẻ 2</div>
                        <input type="text" placeholder={'ví dụ: Họp khởi động'} />
                        <button className='submit' onClick={submit}>Sau</button>
                    </>
                );
            case 4:
                return (
                    <>
                        <h1>Mời nhóm của bạn</h1>
                        <p>Bạn đã sẵn sàng! Hãy mời đồng đội cộng tác cùng bạn.</p>
                        <div className="input-title">Nhập email hoặc tìm kiếm theo tên</div>
                        <input type="text" placeholder={'ví dụ: Jessica@gmail.com, Jessica Smith'} />
                        <button className='submit' onClick={submit}>Một điều cuối cùng</button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Header />
            <Body content={renderScreen()} return_btn={return_btn} skip_btn={skip_btn} page={page} />
        </>
    );
};

export default MakeNewWorkspace;