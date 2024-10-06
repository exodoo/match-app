import React from 'react';

import './Timer.css';

type TimerProps = {
    time: number;
};

const Timer: React.FC<TimerProps> = ({ time }) => {
    return (
        <div>
            <div className="timer">
                {/* TODO: use https://date-fns.org/ to format date */}
                {time}
            </div>
        </div>
    );
};

export default Timer;