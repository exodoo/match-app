import React from 'react';

import './Gamers.css';

type GamersProps = {
    list: Array<any>;
};

const Gamers: React.FC<GamersProps> = ({ list }) => {
    return (
        <div>
            <div className="gamers">
                {list.map((gamer, index) => (
                    <GamerItem item={gamer} key={gamer?.id} />
                ))}
            </div>
        </div>
    );
};

const GamerItem: React.FC<{ item: any }> = ({ item }) => <div>
    <div className="gamer">
        <div className="gamer-name">{item.name}</div>
        <div className="gamer-score">{item.score}</div>
    </div>
</div>

export default Gamers;