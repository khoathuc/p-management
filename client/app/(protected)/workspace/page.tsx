'use client';
import React from 'react';
import Content from './@content/content';
import Header from './@header/header';
import Sidebar from './@sidebar/sidebar';
import './styles.scss';
const Wireframe = () => {

    let [currentState, setCurrentState] = React.useState("");

    return (
        <div>
            <Header />
            <div className='body'>
                <Sidebar currentState={currentState} setCurrentState={setCurrentState} />
                <Content currentState={currentState}></Content>
            </div>

        </div>
    );
};

export default Wireframe;
