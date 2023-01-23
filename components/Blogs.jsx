import React from "react";
import { useGlobalProvider } from "../utils/themeContext";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { Avatar, Box, Button, Divider, Grid, ListItem, ListItemIcon, Paper, Typography, ListItemText, AvatarGroup, List, Tooltip, Skeleton } from "@mui/material";
import { CameraAltOutlined, CameraSharp } from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { height } from "@mui/system";
import { useBlogsQuery } from "../utils/hooks/useBlogs";
const Blogs = () => {
    const { data, isLoading } = useBlogsQuery();

    const { colors } = useGlobalProvider()
    return <Grid item xs={12} md={7.8}
        rowGap={2}
        sx={{
            ml: {
                xs: 0,
                md: 1
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",

        }}

    >
        {
            isLoading ? <Skeleton
                variant="rectangular"
                width="100%"
                height="500px"

            /> : data?.map((blog) => {
                function createMarkup() {
                    return { __html: blog?.text };
                }


                return <Paper
                    key={blog.id}
                    sx={{
                        backgroundColor: colors.primary[600],

                    }}
                >
                    <ListItem>
                        <ListItemIcon className="relative">
                            <Avatar src="/girl.png" />

                        </ListItemIcon>
                        <ListItemText primary={blog?.name} secondary={blog.time ? time : "38 minutes ago"} />
                    </ListItem>
                    <Box
                        src={blog?.image}
                        component="img"
                        className="w-full max-h-[300px] object-cover"
                    />
                    <Box className="p-2" dangerouslySetInnerHTML={createMarkup()} >

                    </Box>
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
            })
        }
    </Grid>
};

export default Blogs;
