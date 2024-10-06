import React from 'react';
import { Typography } from '@mui/material';

import './Gamers.css';
import { Avatar } from '../../../../../components';

type GamersProps = {
    list: Array<any>;
};

const Gamers: React.FC<GamersProps> = ({ list }) => {
    return (
        <div className="gamers">
            {list.map((gamer) => (
                <GamerItem item={gamer} key={gamer?.id} />
            ))}
        </div>
    );
};

const GamerItem: React.FC<{ item: any }> = ({ item }) => <div>
    <div className="gamer-item">
        <div className="gamer-avatar">
            <Avatar userId={item.id} alt={item.name} />
        </div>
        <Typography variant="h6">{item.name}</Typography>
    </div>
</div>

export default Gamers;