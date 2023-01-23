import React from "react";
import { useGlobalProvider } from "../utils/themeContext";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { Avatar, Box, Button, Divider, Grid, ListItem, ListItemIcon, Paper, Typography } from "@mui/material";
const Post = () => {
    const { colors } = useGlobalProvider()
    return <Grid item xs={12} md={7.7} component={Paper}

        sx={{
            p: 2,
            backgroundColor: colors.primary[600],
            borderRadius: "1rem",
            width: "100%",
            height: "100%",
            ml: {
                xs: 0,
                md: 2

            }
        }}

    >

        <Typography>
            Add Post
        </Typography>
        <ListItem>
            <ListItemIcon>
                <Avatar src="/girl.png" />
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
                placeholder="What's on your mind?"
            />
        </ListItem>
        <Divider />
        <Box gap={4} height="100%" display="flex" justifyContent="center" my={2} flexDirection="row" alignItems="center">
            <Box display="flex" justifyContent="center" my={0} flexDirection="column" alignItems="center">
                <EmojiEmotionsIcon sx={{
                    color: colors.yellow[500] + " !important",

                }} />
                <Typography >
                    Feeling/Activity
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" my={0} flexDirection="column" alignItems="center">
                <AddAPhotoOutlinedIcon sx={{
                    color: colors.orange[500] + " !important",

                }} />
                <Typography >
                    Photo/Video

                </Typography>
            </Box>
            <Button
                sx={{
                    backgroundColor: colors.teal[500] + " !important",
                    color: colors.primary[600] + " !important",
                    borderRadius: "1rem",
                }}>
                Post
            </Button>
        </Box>

    </Grid>
};

export default Post;
