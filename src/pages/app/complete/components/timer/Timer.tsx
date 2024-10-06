import React, { useState, useEffect } from 'react';
import './Timer.css';

type TimerProps = {
    duration: number;
};

const Timer: React.FC<TimerProps> = ({ duration }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1000);
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [timeLeft]);

    const formatTime = (time: number) => {
        const totalSeconds = Math.floor(time / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div>
            <div className="timer">
                {formatTime(timeLeft)}
            </div>
        </div>
    );
};

export default Timer;
