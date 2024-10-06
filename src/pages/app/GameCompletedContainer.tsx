import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { Auth, Planets } from '../../api';
import { Spinner, Header } from '../../components';

const GameCompletedContainer: React.FC = () => {
    const nav = useNavigate();
    const fetchingTimeoutRef = useRef<number | null>(null);
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

    useEffect(() => {
        fetchingTimeoutRef.current = setInterval(() => {
            // Planets.getInstance().getPlanets()
            //     .then((planets) => {
            //         if (planets.length > 0) {
            //             clearInterval(fetchingTimeoutRef.current!);
            //         }
            //     })
            //     .catch((error) => {
            //         console.error(error);
            //     });
        }, 1000);
    }, []);

    return (<div>
        <Header />
        Game completed!

        <Spinner />
    </div>);
};

export default GameCompletedContainer;
