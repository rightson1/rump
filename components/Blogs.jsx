import React from "react";
import { useGlobalProvider } from "../utils/themeContext";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { Avatar, Box, Button, Divider, Grid, ListItem, ListItemIcon, Paper, Typography, ListItemText, AvatarGroup, List, Tooltip } from "@mui/material";
import { CameraAltOutlined, CameraSharp } from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { height } from "@mui/system";
const Blogs = () => {
    const { colors } = useGlobalProvider()
    return <Paper
        sx={{
            backgroundColor: colors.primary[600],

        }}
    >
        <ListItem>
            <ListItemIcon className="relative">
                <Avatar src="/girl.png" />

            </ListItemIcon>
            <ListItemText primary="Achshash Janice" secondary="38 minutes ago" />
        </ListItem>
        <Box
            src="/choco.png"
            component="img"
        />
        <Typography
            my={2}
            sx={{
                fontWeight: "bold",
                textAlign: "center"
            }}
        >How To Overcome Stress</Typography>
        <Typography
            sx={{
                textAlign: "center"
            }}
        >

            Many of us are facing challenges that can be stressful, overwhelming, and cause strong emotions in adults and children. Public health actions, such as physical distancing, can make us feel isolated and lonely and can increase stress and anxiety.

            After a traumatic event, people may have strong and lingering reactions. Learning healthy ways to cope and getting the right care and support can help reduce stressful feelings and symptoms.
        </Typography>

        <Typography
            my={2}
            sx={{
                fontWeight: "bold",
                textAlign: "center"
            }}
        >Tips</Typography>
        <Typography
            sx={{
                textAlign: "center"
            }}
        >
            Tips for Parents and Caregivers
            It is natural for children to worry when scary or stressful events happen in their lives. Talking to your children about these events can help put frightening information into a more balanced setting. Monitor what children see and hear about stressful events happening in their lives. Here are some suggestions to help children cope:
        </Typography>

        <Box className="flex  justify-between align-center p-3">

            <AvatarGroup max={2}>
                <Avatar
                    sx={{
                        bgcolor: colors.yellow[600],
                        cursor: 'pointer',
                        border: 'none !important',
                        width: "30px !important",
                        height: "30px !important"
                    }}

                >
                    <FavoriteBorderIcon
                        sx={{
                            color: colors.grey[100]
                        }}
                    />
                </Avatar>
                <Avatar
                    sx={{
                        bgcolor: colors.orange[600],
                        cursor: 'pointer',
                        border: 'none !important',
                        height: 30,
                        width: 30

                    }}
                >
                    <ShareIcon
                        sx={{
                            color: colors.grey[100]
                        }}
                    />
                </Avatar>

            </AvatarGroup>

            <Box >
                <Typography>6 Comments</Typography>

            </Box>
        </Box>
        <Divider />`
        <Typography className="px-2 font-bold">Comments</Typography>
        <List>
            <Box>
                <ListItem>
                    <ListItemIcon>
                        <Avatar src="/avatar1.jpeg" />
                    </ListItemIcon>

                    <ListItemText primary="Achshash Janice" secondary="            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet delectus veritatis debitis at ipsum. Vitae vero ipsa deleniti assumenda quisquam?" />

                </ListItem>
                <Box className="flex  justify-between align-center p-3">

                    <AvatarGroup max={2}>
                        <Tooltip title="Like">
                            <Avatar
                                sx={{
                                    bgcolor: colors.yellow[600],
                                    cursor: 'pointer',
                                    border: 'none !important',
                                    height: 25,
                                    width: 25,
                                }}

                            >
                                <FavoriteBorderIcon
                                    sx={{
                                        color: colors.grey[100],
                                        fontSize: '1rem'
                                    }}
                                />
                            </Avatar>
                        </Tooltip>
                        <Tooltip
                            title="Share"
                        >
                            <Avatar
                                sx={{
                                    bgcolor: colors.orange[600],
                                    cursor: 'pointer',
                                    border: 'none !important',
                                    height: 25,
                                    width: 25,
                                }}
                            >
                                <ShareIcon
                                    sx={{
                                        color: colors.grey[100],
                                        fontSize: '1rem'
                                    }}
                                />
                            </Avatar>

                        </Tooltip>
                    </AvatarGroup>

                    <Box >
                        <Typography
                            color={colors.grey[300]}
                            className="text-xs "
                        >1 hour Ago</Typography>

                    </Box>
                </Box>
            </Box>
        </List>

    </Paper>
};

export default Blogs;
