import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Auth, Planets } from '../../../api';
import { Header, TabBar, Spinner } from '../../../components';
import PlanetDetailedCard from '../details/PlanetDetailedCard';
import './PlanetsMatchingContainer.css';

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
                    <Box>
                        <IconButton onClick={() => handleRatePlanet(selected, -1)} color="error" className="planets-matching-action">
                            <CloseIcon />
                        </IconButton>
                        <IconButton onClick={() => handleRatePlanet(selected, 1)} color="primary" className="planets-matching-action">
                            <FavoriteIcon />
                        </IconButton>
                    </Box>
                </div>
            </div>
            <TabBar />
        </div>
    );
};

export default PlanetsMatchingContainer;
