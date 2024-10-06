import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
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
    const [selected, setSelected] = useState<any | null>(null);
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

    return (<>
        {loading && <Spinner />}
        {completed && <Navigate to="/complete" replace />}
        <Box>
            <Header />
            <Box className="card">
                <Box className="planets-matching-header">
                    <PlanetDetailedCard planet={selected} />
                    <Box className="planets-matching-action-container">
                        <IconButton onClick={() => handleRatePlanet(selected, -1)} color="error" className="planets-matching-action">
                            <CloseIcon />
                        </IconButton>
                        <IconButton onClick={() => handleRatePlanet(selected, 1)} color="success" className="planets-matching-action">
                            <FavoriteIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box className="planets-matching-details">
                    <Typography variant="h6" gutterBottom fontWeight={400}>Planet Details</Typography>
                    <Box className="planets-matching-details-pair">
                        <Typography variant="body1" color="textDisabled" >
                            Discovery method
                        </Typography>
                        <Typography variant="body1">{selected?.discovered_method || '-'}</Typography>
                    </Box>
                    <Box className="planets-matching-details-pair">
                        <Typography variant="body1" color="textDisabled" >
                            Type
                        </Typography>
                        <Typography variant="body1">{selected?.type || '-'}</Typography>
                    </Box>
                    <Box className="planets-matching-details-description">
                        <Typography>
                            {selected?.description || '-'}
                        </Typography>
                    </Box>
                </Box>
                <Box className="planets-matching-details">
                    <Typography variant="h6" gutterBottom fontWeight={400}>Host Star</Typography>
                    <Box className="planets-matching-details-pair">
                        <Typography variant="body1" color="textDisabled" >
                            Star name
                        </Typography>
                        <Typography variant="body1">{selected?.star?.name || '-'}</Typography>
                    </Box>
                    <Box className="planets-matching-details-pair">
                        <Typography variant="body1" color="textDisabled" >
                            Star mass
                        </Typography>
                        <Typography variant="body1">{selected?.star?.mass || '-'}</Typography>
                    </Box>
                    <Box className="planets-matching-details-pair">
                        <Typography variant="body1" color="textDisabled" >
                            Star radius
                        </Typography>
                        <Typography variant="body1">{selected?.star?.radius ? `${selected?.star?.radius} RSun` : '-'}</Typography>
                    </Box>
                </Box>
            </Box>
            <TabBar />
        </Box>
    </>);
};

export default PlanetsMatchingContainer;
