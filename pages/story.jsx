import { Avatar, Box, Button, Card, CardContent, CircularProgress, Divider, Grid, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGlobalProvider } from "../utils/themeContext";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Drawer from '@mui/material/Drawer';
import DoneIcon from '@mui/icons-material/Done';
import StoryList from "../components/StoryList";
import { db } from "../utils/firebase";
import { doc, collection, addDoc } from 'firebase/firestore'
import Info from "../components/Info";
import { useStoryMutation } from "../utils/hooks/useStory";
import { useAuth } from "../utils/authContext";
import Title from "../components/Title";
import ArrowLeftSharp from "@mui/icons-material/ArrowLeftSharp";
const Story = () => {
    const { colors, mode } = useGlobalProvider()
    const { user } = useAuth()
    const [state, setState] = useState({
        loading: false,
        error: false,
        open: false,
    })
    const [selected, setSelected] = useState(0)
    const [open, setOpen] = useState(false)
    const { mutate: addStory, isLoading: loading, isError, isSuccess } = useStoryMutation()
    const handleSubmit = (e) => {
        e.preventDefault()
        setState({ ...state, loading: true })
        const title = e.target.title.value
        const story = e.target.story.value
        const data = { title, story, selected, userId: user?.id }
        addStory(data)
        e.target.reset();

    }
    const ColorSelect = ({ color, index }) => {

        return <Box
            onClick={() => setSelected(color)}
            sx={{
                width: '30px',
                height: '30px',
                bgcolor: color,
                borderRadius: '50%',
            }}
            className={selected === color ? 'border-2 border-teal-900' : ''}

        >


        </Box>
    }
    return <Box sx={{
        p: {
            xs: '10px 10px',
            sm: '10px 10px',
            md: '25px',
        }
    }}>


        <Title title="Story" subtitle=" New Story" />
        <Paper sx={{ my: '0px', borderRadius: { xs: '0', sm: '5px', md: '10px' }, background: 'transparent', overflow: 'hidden' }} elevation={10}>

            <Drawer
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        p: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.3rem',
                        background: colors.primary[400],
                    },

                }}
            >
                <StoryList />

            </Drawer>

            <Grid container spacing={0} sx={{ height: '100%' }}>
                <Grid item sx={{
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'block',
                    },
                    bgcolor: colors.primary[mode === 'dark' ? 600 : 800],

                    height: '100%',
                    height: "85vh"

                }}
                    md={4}

                >
                    <StoryList />

                </Grid>
                <Grid item
                    xs={12} sm={12} md={8}

                    sx={{
                        background: colors.primary[mode === 'dark' ? 800 : 900],
                        // background: colors.primary[600],
                        height: "85vh"
                    }}
                >

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            p: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            height: '100%',
                        }}>

                        <Box disablePadding sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between'

                        }}>
                            <IconButton
                                sx={{
                                    visibility: {
                                        xs: 'visible',
                                        sm: 'visible',
                                        md: 'hidden',
                                    }
                                }}
                                onClick={() => setOpen(true)}>
                                {/* <MenuOutlinedIcon sx={{
                                    display: {
                                        xs: 'block',
                                        sm: 'block',
                                        md: 'none',
                                    }
                                }}

                                /> */}
                                <ArrowLeftSharp /><Typography>View Stories</Typography>
                            </IconButton>
                            <Button
                                sx={{
                                    bgcolor: colors.teal[500] + '!important',
                                    alignSelf: 'flex-end',
                                    justifySelf: "flex-end"
                                }}
                                type="submit"
                            >{loading ? <CircularProgress /> : "Add Story"
                                }</Button>

                        </Box>
                        <Divider />

                        <Box display="flex" flexDirection="column" py={2}
                            sx={{ overflowY: 'auto', height: 'auto' }}
                        >
                            <Box
                                component="input"

                                sx={{
                                    width: "100%",
                                    outline: colors.teal[100],
                                    bgcolor: 'transparent',
                                    border: `1px solid ${colors.black[100]}`,
                                    '$:focus': {
                                        outline: colors.teal[100],
                                    }
                                }}
                                className="resize-none rounded-md p-2 focus:border-teal-500 focus:border-2 "
                                required
                                name="title"
                                placeholder="Enter Story Title"
                            />
                        </Box>
                        <Box width="100%" display="flex" sx={{
                            gap: '1rem',
                            alignItems: 'flex-start',
                            flexDirection: 'column'

                        }}>
                            <Typography
                                sx={{
                                    color: colors.grey[100],
                                    fontSize: '.8rem',
                                    fontWeight: 'bold',
                                }}
                            >Edit Story</Typography>
                            <Box
                                component="textarea"
                                required
                                name="story"
                                sx={{
                                    width: "100%",
                                    outline: colors.teal[100],
                                    bgcolor: colors.primary[600],
                                    border: `1px solid ${colors.black[400]}`,
                                    '$:focus': {
                                        outline: colors.teal[100],
                                    }
                                }}
                                className="resize-none rounded-sm px-2 focus:border-teal-500 focus:border-2  max-h-[100px] h-[100px]"
                                placeholder="Enter Story"
                            />
                            <Typography
                                sx={{
                                    color: colors.grey[100],
                                    fontSize: '.8rem',
                                    fontWeight: 'bold',
                                }}
                            >Story Color</Typography>
                            <Box
                                className="flex gap-1"
                            >{
                                    [colors.teal[500], colors.yellow[500], colors.orange[500], colors.greenAccent[500]].map((color, index) => {

                                        return <ColorSelect color={color} key={index} value={index} />
                                    })
                                }

                            </Box>
                        </Box>
                    </Box>
                </Grid>

            </Grid>

        </Paper>
        <Info type={isError ? 'Error' : 'Success'} opened={isError || isSuccess} />
    </Box>
};
Story.user = true
export default Story;
