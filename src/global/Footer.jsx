import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from '../theme';


const Footer = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    return (
        <div>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderTop="1px solid"
                borderColor={colors.text[400]}
                py={1}
                sx={{
                    backgroundColor: colors.text[900]
                }}
            >
                <Typography variant='h5' color={colors.text[500]} >
                    All Rights Reserved By Kalyani Municipality
                </Typography>
            </Box>
        </div>
    )
}

export default Footer
