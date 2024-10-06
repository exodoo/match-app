import React from 'react';

import './Avatar.css';

type AvatarProps = {
    src: string;
    alt: string;
};

export const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
    return (
        <img src={src} alt={alt} />
    );
};
