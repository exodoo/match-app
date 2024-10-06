import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { Auth, Planets } from '../../api';
import { Header, TabBar, Spinner } from '../../components';
import PlanetDetailedCard from './PlanetDetailedCard';

const planetsService = Planets.getInstance();

const PlanetsMatchingContainer: React.FC = () => {
    const [completed, setCompleted] = useState(false);
    const [planets, setPlanets] = useState<any[]>([]);
    const [selected, setSelected] = useState<unknown | null>(null);
    const [loading, setLoading] = useState(true);
    const [rateSending, setRateSending] = useState(false);

    if (!Auth.getInstance().isLoggedIn())
        return <Navigate to="/" replace />;

    const handleRatePlanet = (planet: any, rating: number) => {
        if (completed || rateSending) return;
        setRateSending(true);
        planetsService.ratePlanet(planet.id, rating)
            .then(() => {
                return planetsService.getNotRatedPlanets(planets);
            })
            .then((planets) => {
                planets.length === 0 && !!selected
                    ? setCompleted(true) :
                    setSelected(planets[0]);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setRateSending(false);
            });
    };

    useEffect(() => {
        planetsService.getPlanets()
            .then((planets) => {
                if (planets.length === 0 && planetsService.isAnyPlanetRated) {
                    return setCompleted(true);
                }

                setPlanets(planets);
                setSelected(planets[0]);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <Header />
            <div className="card">
                {loading && <Spinner />}
                {completed && <Navigate to="/complete" replace />}
                <div>
                    <PlanetDetailedCard planet={selected} />
                    <Button>Like</Button>
                    <Button>Dislike</Button>
                </div>
            </div>
            <TabBar />
        </div>
    );
};

export default PlanetsMatchingContainer;
