import { Avatar, Box, Card, CardContent, Divider, Grid, IconButton, Button, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography, Skeleton } from "@mui/material";
import React, { useState } from "react";
import CircularProgress from "@mui/material";
import { useGlobalProvider } from "../utils/themeContext";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Drawer from '@mui/material/Drawer';
import ChatInput from "../components/ChatInput";
import ContactList from "../components/ContactList";
import Messages from "../components/Messages";
import { useEffect } from "react";
import { useAuth } from "../utils/authContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
const Chat = () => {
    const { colors, mode } = useGlobalProvider()
    const [open, setOpen] = useState(false)
    const [current, setCurrent] = useState(null)
    const { user } = useAuth()

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            console.log("rada")
            const docRef = doc(db, "users", user.id)
            updateDoc(docRef, {
                online: user.online === false ? true : false
            }).then((res) => {
                console.log(res)
            }).catch((e) => {
                console.log(e)
            })
            e.preventDefault();
            e.returnValue = '';

        }
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [user?.id]);
    //...
    useEffect(() => {
        const handleVisibilityChange = (event) => {
            if (document.visibilityState === "hidden") {
                const docRef = doc(db, "users", user.id)
                updateDoc(docRef, {
                    online: user.online === false ? true : false
                }).then((res) => {
                    console.log('rada')
                }).catch((e) => {
                    console.log(e)
                })
            }
        }
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [user?.id]);



    return <Box sx={{
        p: {
            xs: '10px 10px',
            sm: '10px 10px',
            md: '25px',
        }
    }}>
        <Skeleton width="100vw" height={50}>Under development</Skeleton>
        <Paper sx={{ my: '0px', borderRadius: { xs: '0', sm: '5px', md: '10px' }, background: 'transparent', overflow: 'hidden' }} elevation={10}>

            <Drawer
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.3rem',
                        background: colors.primary[400],
                    },

                }}
            >
                <ContactList {...{ current, setCurrent }} />

            </Drawer>

            <Grid container spacing={0} sx={{ height: '100%' }}>
                <Grid item sx={{
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'block',
                    },
                    bgcolor: colors.primary[mode === 'dark' ? 600 : 800],
                    padding: '1rem',
                    height: "85vh"

                }}
                    md={4}

                >
                    <ContactList {...{ current, setCurrent }} />
                </Grid>
                <Grid item
                    xs={12} sm={12} md={8}

                    sx={{
                        background: colors.primary[mode === 'dark' ? 800 : 900],
                        // background: colors.primary[600],
                        height: "85vh"
                    }}
                >
                    {!current ?
                        <>
                            <ListItem disablePadding>
                                <IconButton onClick={() => setOpen(true)}>
                                    <MenuOutlinedIcon sx={{
                                        display: {
                                            xs: 'block',
                                            sm: 'block',
                                            md: 'none',
                                        }
                                    }}

                                    />
                                </IconButton>
                            </ListItem>
                            <Divider />
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
                                    Select A Contact To Chat
                                </Typography>
                            </Box>

                        </>


                        : <Box
                            sx={{
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                height: '100%',
                            }}>

                            <ListItem disablePadding>
                                <IconButton onClick={() => setOpen(true)}>
                                    <MenuOutlinedIcon sx={{
                                        display: {
                                            xs: 'block',
                                            sm: 'block',
                                            md: 'none',
                                        }
                                    }}

                                    />
                                </IconButton>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Avatar src={current.photoUrl} />
                                    </ListItemIcon>
                                    <ListItemText primary={current.name} secondary="Online" />

                                </ListItemButton>

                            </ListItem>
                            <Divider />

                            <Messages />
                            <ChatInput {...{ current }} />
                        </Box>
                    }


                </Grid>

            </Grid>

        </Paper>
    </Box>
};
Chat.user = true
export default Chat;
