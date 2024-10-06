import React from 'react';

import './Matches.css';

type MatchesProps = {
    matchesCount: number;
};

const Matches: React.FC<MatchesProps> = ({ matchesCount }) => {
    return (
        <div>
            <div className="matches">
                {matchesCount}
            </div>
        </div>
    );
};

export default Matches;