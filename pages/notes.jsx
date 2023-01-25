import { Avatar, Box, Button, Card, CardContent, CircularProgress, Divider, Grid, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalProvider } from "../utils/themeContext";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Drawer from '@mui/material/Drawer';
import DoneIcon from '@mui/icons-material/Done';
import NoteList from "../components/NoteList";
import { db } from "../utils/firebase";
import { doc, collection, addDoc } from 'firebase/firestore'
import Info from "../components/Info";
import { useNotesDelete, useNotesMutation, useNotesQuery } from "../utils/hooks/useNotes";
import { useAuth } from "../utils/authContext";
import Title from "../components/Title";
const Note = () => {
    const { mutate, isSuccess: added, isError: failed, isLoading: loading } = useNotesMutation()


    const { mutate: deleteNote, isSuccess, isError } = useNotesDelete()
    const { user } = useAuth()
    const { colors, mode } = useGlobalProvider()
    const { data, isLoading, refetch } = useNotesQuery(user?.id)
    useEffect(() => {
        refetch()
    }, user)

    const [state, setState] = useState({
        loading: false,
        error: false,
        open: false,
    })
    const [selected, setSelected] = useState(0)
    const [open, setOpen] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        setState({ ...state, loading: true })
        const title = e.target.title.value
        const note = e.target.note.value
        const data = { title, note, selected, userId: user.id }
        mutate(data)
        e.target.reset()


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
        <Title title="Notes" subtitle="Add To Diary" />


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
                <NoteList />

            </Drawer>

            <Grid container spacing={0} sx={{ height: '100%' }}>
                <Grid item sx={{
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'block',
                    },
                    bgcolor: colors.primary[mode === 'dark' ? 600 : 800],
                    // bgcolor: colors.primary[300],
                    height: '100%',
                    height: "85vh"

                }}
                    md={4}

                >
                    <NoteList />

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
                            <Button
                                sx={{
                                    bgcolor: colors.teal[500] + '!important',
                                    alignSelf: 'flex-end',
                                    justifySelf: "flex-end"
                                }}
                                type="submit"
                            >{loading ? <CircularProgress /> : "Add Note"
                                }</Button>

                        </Box>
                        <Divider />

                        <Box display="flex" flexDirection="column" py={2}
                            sx={{ overflowY: 'auto', height: 'auto' }}
                        >          <Typography
                            sx={{
                                color: colors.grey[100],
                                fontSize: '.8rem',
                                fontWeight: 'bold',
                            }}
                        >Enter Note Title</Typography>
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
                                placeholder="Enter Note Title"
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
                            >Add Note</Typography>
                            <Box
                                component="textarea"
                                required
                                name="note"
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
                                placeholder="Enter Note"
                            />
                            <Typography
                                sx={{
                                    color: colors.grey[100],
                                    fontSize: '.8rem',
                                    fontWeight: 'bold',
                                }}
                            >Note Color</Typography>
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
        <Info type={failed ? 'Error' : 'Success'} opened={failed || added} />
    </Box>
};
Note.user = true
export default Note;
