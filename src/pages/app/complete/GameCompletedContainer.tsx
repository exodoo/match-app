import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { Auth, Planets } from '../../../api';
import { Spinner, Header } from '../../../components';
import { Timer, Gamers } from './components';

import './GameCompleted.css';

const GameCompletedContainer: React.FC = () => {
    const nav = useNavigate();
    const fetchingTimeoutRef = useRef<number | null>(null);
    const [results, setResults] = useState<any[]>([]);

    const userId = localStorage.getItem('id');

    if (!Auth.getInstance().isLoggedIn())
        return <Navigate to="/" replace />;

    /*useEffect(() => {
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
    }, []);*/

    useEffect(() => {
        fetchingTimeoutRef.current = setInterval(() => {
            Planets.getInstance().getMatches(userId)
                .then((response) => {
                    const matches = response.matches;
                    const res = [];

                    for (let i = 0; i < matches.length; i++) {
                        res.push(matches[i].gamer);
                    }

                    setResults(res);
                    clearInterval(fetchingTimeoutRef.current!);
                })
                .catch((error) => {
                    console.error(error);
                });
        }, 1000);
    }, []);

    return (<div className="game-completed">
        <Header />
        Game completed!

        {results.length < 3 ? <Timer duration={300000} /> : <Gamers list={results}/>}

        <Spinner />
    </div>);
};

export default GameCompletedContainer;
