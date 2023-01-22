import React from "react";
import { useGlobalProvider } from "../utils/themeContext";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { Avatar, Box, Button, Divider, Grid, ListItem, ListItemIcon, Paper, Typography } from "@mui/material";
import { CameraAltOutlined, CameraSharp } from "@mui/icons-material";
const Edit = () => {
    const { colors } = useGlobalProvider()
    return <Grid item xs={12} md={7.7} component={Paper}

        sx={{
            p: 2,
            backgroundColor: colors.primary[600],
            borderRadius: "1rem",
            width: "100%",
            height: "100%",
            mr: {
                xs: 0,
                md: 2

            }
        }}

    >
        <Typography>
            Edit Profile
        </Typography>
        <ListItem>
            <ListItemIcon className="relative">
                <Avatar src="/girl.png" />
                <Box
                    className="absolute top-1/2  transform translate-x-1/2 -translate-y-1/2 "
                >
                    <CameraAltOutlined />
                </Box>
            </ListItemIcon>
            <Box
                component="textarea"
                sx={{
                    width: "100%",
                    outline: colors.teal[100],
                    bgcolor: colors.primary[600],
                    '$:focus': {
                        outline: colors.teal[100],
                    }
                }}
                className="resize-none rounded-md px-2 focus:border-teal-500 focus:border-2 "
                placeholder="Change Introduction"
            />
        </ListItem>
        <Divider />
        <Box gap={4} height="100%" display="flex" justifyContent="center" my={2} flexDirection="row" alignItems="center">
            <Box display="flex" justifyContent="center" my={0} flexDirection="column" alignItems="center">
                <EmojiEmotionsIcon sx={{
                    color: colors.yellow[500] + " !important",

                }} />
                <Typography >
                    Add Emoji
                </Typography>
            </Box>

            <Button
                sx={{
                    backgroundColor: colors.teal[500] + " !important",
                    color: colors.primary[600] + " !important",
                    borderRadius: "1rem",
                }}>
                Edit
            </Button>
        </Box>

    </Grid>
};

export default Edit;
