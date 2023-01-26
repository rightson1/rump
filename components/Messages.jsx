import {  Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGlobalProvider } from "../utils/themeContext";

const Messages = () => {
    const { colors, mode } = useGlobalProvider()
    return <Box display="flex" flexDirection="column" py={2}
        sx={{ overflowY: 'auto', height: 'auto' }}
    >
        {
            [0, 0, 0].map((item, index) => (<>
                <ListItem sx={{
                    alignSelf: "self-start",
                    maxWidth: '80%',
                }}>

                    <Box
                        sx={{
                            padding: '.3rem',
                            background: colors.orange[200],
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'

                        }}>
                        <Typography
                        >
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        </Typography>
                        <img src="/profile.jpg" className="w-full obje h-[100px]" />
                    </Box>

                </ListItem>
                <ListItem sx={{
                    alignSelf: "self-end",
                    maxWidth: '80%',
                    width: 'auto',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    background: colors.yellow[500],
                    borderRadius: '10px',

                }}>

                    <Typography sx={{
                        textAlign: 'center'
                    }}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    </Typography>

                </ListItem>
            </>))
        }
    </Box>
};

export default Messages;
