'use client'

import { useEffect, useState } from 'react';
import Body from './@body/body';
import Header from './@header/header';
const MakeNewWorkspace = () => {

    const submit = () => {
        if (page < 3) setPage(page + 1);
    }

    const return_btn = () => {
        if (page > 0) setPage(page - 1);
    }

    const skip_btn = () => {
        if (page < 3) setPage(page + 1);
    }

    var [children, setChildren] = useState(<>
        <>Ngot ngao den may cung tan thanh may</>
    </>)

    var screen1 = <>
        <h1>Tất cả bắt đầu với bảng</h1>
        <p>Bảng là nơi thực hiện công việc trong PManagement. Bạn sẽ tìm thấy thẻ, danh sách, ngày hết hạn, và hơn thế nữa để giúp bạn luôn ngăn nắp và đi đúng hướng.</p>
        <div className="input-title">Nhập tên bảng</div>
        <input type="text" placeholder={'ví dụ: bảng PManagement của tôi'} />
        <button className='submit' onClick={() => submit()}>Sau</button>

    </>

    let screen2 = <>
        <h1>Bây giờ hãy sắp xếp bảng của bạn với các danh sách</h1>
        <p>Danh sách là một nhóm thẻ đại diện cho các mốc quan trọng, các ý tưởng hoặc mục tiêu của nhóm. Tùy chỉnh danh sách của bạn và thêm bao nhiêu tùy thích.</p>
        <p>Nhiều người bắt đầu với:</p>
        <div className="input-title">Đặt tên danh sách của bạn</div>
        <input type="text" placeholder={'ví dụ: Cần làm'} />
        <input type="text" placeholder={'ví dụ: Đang làm'} />
        <input type="text" placeholder={'ví dụ: Đã xong'} />
        <button className='submit' onClick={() => submit()}>Sau</button>
    </>

    let screen3 = <>
        <h1>Các thẻ là khối xây dựng của bạn</h1>
        <p>Đối với những việc bạn cần làm, sắp xếp hoặc chia sẻ với đồng đội.</p>
        <p>Bạn cũng có thể đặt ngày đến hạn cho thẻ để không bao giờ bỏ lỡ điều gì.</p>
        <p>Thêm tiêu đề cho một số thẻ trong danh sách <b>Can lam</b> của bạn</p>

        <div className="input-title">Tên thẻ 1</div>
        <input type="text" placeholder={'ví dụ: Lập kế hoạch dự án'} />
        <div className="input-title">Tên thẻ 2</div>
        <input type="text" placeholder={'ví dụ: Họp khởi động'} />
        <button className='submit' onClick={() => submit()}>Sau</button>
    </>

    let screen4 = <>
        <h1>Mời nhóm của bạn</h1>
        <p>Bạn đã sẵn sàng! Hãy mời đồng đội cộng tác cùng bạn.</p>
        <div className="input-title">Nhập email hoặc tìm kiếm theo tên</div>
        <input type="text" placeholder={'ví dụ: Jessica@gmail.com, Jessica Smith'} />
        <button className='submit' onClick={() => submit()}>Một điều cuối cùng</button>
    </>

    var [page, setPage] = useState(0);

    useEffect(() => {
        if (page == 0) setChildren(screen1);
        else if (page == 1) setChildren(screen2);
        else if (page == 2) setChildren(screen3);
        else if (page == 3) setChildren(screen4);
    }, [page]);
    return (
        <>
            <Header />
            <Body content={children} return_btn={return_btn} skip_btn={skip_btn} />
        </>
    );
};

export default MakeNewWorkspace;