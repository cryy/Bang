import { Box, Typography } from '@material-ui/core'

import React from 'react'
import { use100vh } from "react-div-100vh";

export function Starting() {
    
    const h = use100vh();
    

    return (
        <Box display="flex" justifyContent="center" alignItems="center" style={{
            height: h as number
        }}>
            <Typography textAlign="center" fontWeight="600" fontSize="2.1rem">
                Počinjemo!
            </Typography>
        </Box>
    )
}