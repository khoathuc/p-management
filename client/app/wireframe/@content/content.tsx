'use client';
import { useEffect } from 'react';
import './styles.scss';

type ContentProps = {
    currentState: string;
}
const Content: React.FC<ContentProps> = ({ currentState }) => {
    useEffect(() => {
        console.log(12312312312);
    }, [currentState])
    return (
        <div className="content">
            <h1>{currentState}</h1>
        </div>
    );
};

export default Content;