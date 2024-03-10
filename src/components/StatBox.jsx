import React from 'react'
import { tokens } from '../theme';
import { Box, useTheme } from '@mui/material';

const StatBox = ({value, title, icon, bgcolor, bgcolor2}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    return (
        <Box
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            gridTemplateRows="repeat(2, 1fr)"
        >
            <Box
                gridArea="1 / 1 / 2 / 3"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="30px"
                bgcolor={bgcolor}
                color={colors.primary[500]}
                borderRadius=" 5px 0 0 0"
                pt={1}
                width="160px"
            >
               {value}
            </Box>
            <Box
                gridArea="2 / 1 / 3 / 3"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor={bgcolor}
                color={colors.primary[500]}
                px={4}
                borderRadius=" 0 0 0 5px"
            >
                {title}
            </Box>
            <Box
                gridArea="1 / 3 / 3 / 4"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor={bgcolor2}
                color={colors.primary[500]}
                borderRadius=" 0 5px 5px 0"
            >
                {icon}
            </Box>
        </Box>
    )
}

export default StatBox
