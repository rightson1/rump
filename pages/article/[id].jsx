import { Box, Skeleton, Tooltip, Avatar, AvatarGroup, Card, CardContent, Divider, Grid, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useGlobalProvider } from "../../utils/themeContext";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Drawer from '@mui/material/Drawer';
import { useBlogsQuery } from "../../utils/hooks/useBlogs";
import { useRouter } from 'next/router';
import { CameraAltOutlined, CameraSharp } from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import Comment from "../../components/Comment";
import Replies from "../../components/Replies";
const Chat = () => {
    const { colors, mode } = useGlobalProvider()
    const [open, setOpen] = useState(false)
    const { id } = useRouter().query;
    const { data, isLoading } = useBlogsQuery();
    function createMarkup() {
        return { __html: blog?.text };
    }

    const blog = useMemo(() => data?.find(item => item?.id === id), [data, id])

    return <Box sx={{
        p: {
            xs: '10px 10px',
            sm: '10px 10px',
            md: '25px',
        }
    }}>

        <Paper sx={{ my: '0px', borderRadius: { xs: '0', sm: '5px', md: '10px' }, background: 'transparent', overflow: 'hidden' }} elevation={10}>
            {
                isLoading ? <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="500px"

                /> : blog ? (<Paper
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
                    <Divider />
                    <Typography
                        className="px-2 font-bold my-4 text-center" sx={{ color: colors.redAccent[500] }}>Comment</Typography>
                    <Comment id={id} comment={true} />
                    <div className="mt-5"></div>
                    <Divider />
                    <Typography
                        className="px-2 font-bold my-4 text-center" sx={{ color: colors.greenAccent[500] }}>Comments</Typography>

                    <Replies id={id} />
                </Paper>
                ) : (<Box>
                    <Box
                        className="w-full h-full flex justify-center items-center flex-col"
                    >
                        <Box
                            component="img"
                            className="w-[200px] h-[200px] mx-auto"
                            src="/robot.gif"
                        />
                        <Typography
                            sx={{ color: colors.orange[500] }}
                            className="text-center text-xl"
                        >
                            Blog Not Found
                        </Typography>
                    </Box>

                </Box>)
            }
        </Paper>
    </Box>
};

export default Chat;
