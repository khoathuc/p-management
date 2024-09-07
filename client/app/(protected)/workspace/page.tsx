'use client';
import { create } from 'zustand';
import Content from './@content/content';
import Header from './@header/header';
import Sidebar from './@sidebar/sidebar';
import './styles.scss';

type StateStore = {
    currentState: string | null;
    setCurrentState: (state: string | null) => void;
};

export const useSidebarState = create<StateStore>((set, get) => ({
    currentState: null,
    setCurrentState: (state) => set({ currentState: state }),
}));

const Wireframe = () => {
    const { currentState, setCurrentState } = useSidebarState();
    return (
        <div>
            <Header />
            <div className='body'>
                <Sidebar currentState={currentState} setCurrentState={setCurrentState} />
                <Content ></Content>
            </div>

        </div>
    );
};

export default Wireframe;
