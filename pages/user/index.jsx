import { Avatar, Box, Button, Divider, Grid, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import React from "react";
import { useGlobalProvider } from "../../utils/themeContext";
import ProfileCard from "../../components/ProfileCard";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextStepper from "../../components/TextStepper";
import Post from "../../components/Post";
import Edit from "../../components/Edit";
import Blogs from "../../components/Blogs"

const User = () => {
    const { colors } = useGlobalProvider()

    return <Box my={2} sx={{
        mx: {
            xs: 2,
            md: 3,

        },
    }}>
        <ProfileCard />
        {/* <UserTabs /> */}
        <Grid container mt={2} rowGap={2}
        >

            <Grid item xs={12} md={4} component={Paper}
                sx={{
                    p: 2,
                    backgroundColor: colors.primary[600],
                    borderRadius: "1rem",
                }}

            >
                <Typography sx={{
                    fontWeight: "bold",

                }}>Introduction</Typography>
                <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nihil corrupti. Nobis animi aperiam cupiditate dolores doloribus distinctio voluptas dolorum?</Typography>
            </Grid>
            <Post />

            <Edit />
            <Grid item xs={12} md={4} component={Paper}
                sx={{
                    p: 2,
                    backgroundColor: colors.primary[600],
                    borderRadius: "1rem",
                }}

            >
                <Typography sx={{
                    fontWeight: "bold",

                }}>Introduction</Typography>
                <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nihil corrupti. Nobis animi aperiam cupiditate dolores doloribus distinctio voluptas dolorum?</Typography>
            </Grid>

            <TextStepper />

            <Blogs />





        </Grid>
    </Box>;
}

User.user = true;
export default User;
