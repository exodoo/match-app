import React from 'react';
import { Box, Typography, ThemeProvider, createTheme } from '@mui/material';

import { PlanetView } from '../../../../../components';
import './DetailedHeader.css';

type DetailedHeaderProps = {
    planet: any;
};

export const DetailedHeader: React.FC<DetailedHeaderProps> = ({ planet }) => {

    return <ThemeProvider theme={createTheme({
        palette: {
            mode: 'dark',
        },
    })}>
        <Box className="detailed-header">
            <PlanetView planetTexture={planet.planet_texture} background={planet.background} />
            <Box className="detailed-header-meta">
                <Typography variant="h4" color="textPrimary">{planet.name}</Typography>
                <Typography variant="subtitle2" color="textPrimary"><b>Age: </b>{planet.age}b</Typography>
                <Typography variant="body1" color="textPrimary">{planet.surface_conditions}</Typography>
            </Box>
        </Box>
    </ThemeProvider>;
};