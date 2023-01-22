import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useGlobalProvider } from "../utils/themeContext";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const ProfileCard = () => {
    const { colors } = useGlobalProvider()
    return <Box my={2}>
        <Paper elevation={3}
            sx={{

                bgcolor: colors.primary[600],
                overflow: "hidden",
                borderRadius: "1rem",
                pb: 2
            }}
        >
            <Box className="">
                <Box component="img" src="/profile.jpg" />
                <Box className="relative left-1/2 bottom-10
                w-[80px] h-[80px] translate-x-[-50%] rounded-full bg flex items-center justify-center
                -mb-5
                ">
                    <Box component="img" src="/girl.png" className=" left-1/2
                w-[98%] h-[98%] rounded-full object-cover 
                "/>
                </Box>
                <Box display="flex" justifyContent="center" my={1} flexDirection="column" alignItems="center">
                    <Typography
                        fontFamily="Roboto"
                        fontWeight="bold"
                        fontSize="1rem"
                    > Achshash Jananice</Typography>
                    <Typography
                        fontFamily="Roboto"
                        fontWeight="light"
                        fontSize=".8rem"
                    > @_janice</Typography>
                </Box>
                <Grid container px={1} rowGap={2}>
                    <Grid item xs={4} md={3}>
                        <Box display="flex" justifyContent="center" my={0} flexDirection="column" alignItems="center">
                            <FeedOutlinedIcon sx={{
                                color: colors.grey[300] + " !important",
                            }} />
                            <Typography
                                sx={{
                                    color: colors.grey[100] + " !important",
                                    fontSize: "1.2rem",
                                    fontWeight: "bold"
                                }}

                            >100</Typography>
                            <Typography
                                sx={{
                                    color: colors.grey[300] + " !important",
                                    fontSize: ".8rem",

                                }}

                            >Blogs</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={3}>
                        <Box display="flex" justifyContent="center" my={0} flexDirection="column" alignItems="center">
                            <TextsmsOutlinedIcon sx={{
                                color: colors.grey[300] + " !important",
                            }} />
                            <Typography
                                sx={{
                                    color: colors.grey[100] + " !important",
                                    fontSize: "1.2rem",
                                    fontWeight: "bold"
                                }}

                            >256</Typography>
                            <Typography
                                sx={{
                                    color: colors.grey[300] + " !important",
                                    fontSize: ".8rem",

                                }}

                            >Posts</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={3}>
                        <Box display="flex" justifyContent="center" my={0} flexDirection="column" alignItems="center">
                            <PeopleAltOutlinedIcon sx={{
                                color: colors.grey[300] + " !important",
                            }} />
                            <Typography
                                sx={{
                                    color: colors.grey[100] + " !important",
                                    fontSize: "1.2rem",
                                    fontWeight: "bold"
                                }}

                            >100</Typography>
                            <Typography
                                sx={{
                                    color: colors.grey[300] + " !important",
                                    fontSize: ".8rem",

                                }}

                            >Friends</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3} >
                        <Box gap={2} height="100%" display="flex" justifyContent="center" my={0} flexDirection="row" alignItems="center">
                            <FacebookOutlinedIcon sx={{
                                color: colors.grey[100] + " !important",
                                bgcolor: colors.yellow[500] + " !important",
                                p: 1,
                                fontSize: "2rem",

                            }} />
                            <TwitterIcon sx={{
                                color: colors.grey[100] + " !important",
                                bgcolor: colors.orange[500] + " !important",
                                p: 1,
                                fontSize: "2rem",
                            }} />
                            <LinkedInIcon sx={{
                                color: colors.grey[100] + " !important",
                                bgcolor: colors.blueAccent[500] + " !important",
                                p: 1,
                                fontSize: "2rem",
                            }} />
                        </Box>
                    </Grid>

                </Grid>

            </Box>
        </Paper>
    </Box>;
}
export default ProfileCard;
