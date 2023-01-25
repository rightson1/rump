import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { useGlobalProvider } from "../utils/themeContext";
const Into = ({ user }) => {
    const { colors } = useGlobalProvider();
    return <Grid item xs={12} md={4} component={Paper}
        sx={{
            p: 2,
            backgroundColor: colors.primary[600],
            borderRadius: "1rem",
        }}

    >
        <Typography sx={{
            fontWeight: "bold",

        }}>Introduction</Typography>
        <Typography>{user?.introduction ? user?.introduction : 'No introduction added'}</Typography>
    </Grid>
};

export default Into;
