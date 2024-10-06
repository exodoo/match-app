import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { Auth, Planets } from '../../api';

export const GameCompleted: React.FC = () => {
    const nav = useNavigate();
    const [results, setResults] = useState<any[]>([]);

    if (!Auth.getInstance().isLoggedIn())
        return <Navigate to="/" replace />;

    useEffect(() => {
        const planetsService = Planets.getInstance();
        planetsService.getPlanets()
            .then((planets) => {
                setResults(planets);
                if (planets.length > 0) {
                    nav('/app', { replace: true });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (<div>
        Game completed!
    </div>);
};
