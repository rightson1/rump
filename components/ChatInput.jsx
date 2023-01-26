import { Avatar, Box, Card, CardContent, Divider, Grid, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGlobalProvider } from "../utils/themeContext";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from '@mui/icons-material/Close';
const Chat = ({ current }) => {
    const { colors, mode } = useGlobalProvider()
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    return <Box width="100%" display="flex" sx={{
        gap: '1rem',
        alignItems: 'center',

    }}>
        <Box display="flex" gap={1} component="label" id="file"
            className="cursor-pointer"
        >
            <input type="file" className="hidden" id="file" />
            <ImageOutlinedIcon sx={{ fontSize: "2rem" }} />

        </Box>
        <Box sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <textarea className={`flex-grow-1 w-[100%]  resize-none rounded-md outline-none focus:border-[2px] focus:border-[rgba(255,255,0,.3)]`} style={{
                backgroundColor: colors.primary[mode === 'dark' ? 600 : 800],
                color: colors.grey[mode === 'dark' ? 500 : 800],


            }} />
        </Box>

        <Box

            className="flex flex-col justify-center align-center w-full relative" sx={{
                alignItems: 'center',
            }}>
            {file &&
                <>
                    <IconButton
                        className="absolute -top-2 right-1/2 translate-x-1/2 z-10 font "
                        onClick={() => setFile(null)}
                    >
                        <CloseIcon
                            className="text-white  border-black border-2 p-1 rounded-full text-3xl"
                        /></IconButton>
                    <Box
                        component="img"

                        className="w-full h-auto max-h-[50vh] object-cover rounded-md cursor-pointer "
                        src={file ? URL.createObjectURL(file) : "https://via.placeholder.com/150"}


                    />
                    <CircularProgress

                        className="absolute top-1/2 translate-y-1/2 right-1/2 translate-x-1/2 z-10 font "
                        variant="determinate" />

                </>
            }
        </Box>



    </Box>
};

export default Chat;
