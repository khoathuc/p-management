import Content from './@content/content';
import Header from './@header/header';
import Sidebar from './@sidebar/sidebar';
const Wireframe = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <Content></Content>
        </div>
    );
};

export default Wireframe;