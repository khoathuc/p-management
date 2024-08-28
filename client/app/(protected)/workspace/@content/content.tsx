'use client';
import './styles.scss';

type ContentProps = {
    currentState: string | null;
}
const Content: React.FC<ContentProps> = ({ currentState }) => {
    return (
        <div className="content">
            <h1>{currentState}</h1>
        </div>
    );
};

export default Content;