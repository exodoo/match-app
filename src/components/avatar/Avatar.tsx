import React, { useEffect, useState } from 'react';
import { UserClientService } from '../../service/user.client';
import './Avatar.css';

type AvatarProps = {
    userId: string;
    alt: string;
};

export const Avatar: React.FC<AvatarProps> = ({ userId, alt }) => {
    const [avatarSrc, setAvatarSrc] = useState<string>('');

    useEffect(() => {
        const userService = UserClientService.getInstance();
        const avatarPath = userService.getAvatarById(userId.toString());
        setAvatarSrc(avatarPath);
    }, [userId]);

    return <img src={avatarSrc} alt={alt} className="avatar" />;
};