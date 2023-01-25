import { Avatar, Box, Button, Card, CardContent, Divider, Grid, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalProvider } from "../utils/themeContext";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Drawer from '@mui/material/Drawer';
import Editor from "../components/Quill";
import CloseIcon from '@mui/icons-material/Close';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { useAuth } from "../utils/authContext";
import Info from "../components/Info";
import { storage, db } from "../utils/firebase";
import { doc, addDoc, collection } from 'firebase/firestore';
import Title from "../components/Title";
const Blog = () => {
    const { colors, mode } = useGlobalProvider()
    const { user } = useAuth();
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState('')
    const [progress, setProgress] = useState(0)



    const [state, setState] = useState({
        error: null,
        loading: false,
        opened: false,
    });
    const [text, setText] = useState('')

    const [open, setOpen] = useState(false)
    const handleSubmit = () => {
        if (!text && !title) {
            window.alert('Please enter all details')
        } if (!file) {
            window.alert('Please select featured image')
        }
        else {
            setState({ ...state, loading: true });

            const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                let uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            }, (error) => {

                setState({ ...state, error: true, loading: false, opened: true });

            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const data = { name: user?.name, email: user?.email, title, text, image: downloadURL, createdAt: new Date() }
                    const docRef = collection(db, "blogs");

                    addDoc(docRef, data).then(() => {
                        setState({ ...state, error: false, loading: false, opened: true });
                        setText('')
                        setTitle('')
                        setFile(null)
                    }).catch((error) => {

                        setState({ ...state, error: true, loading: false, opened: true });
                    }
                    );
                }).catch((error) => {
                    setState({ ...state, error: true, loading: false, opened: true });
                })
            })

        }

    }

    return <Box sx={{
        p: {
            xs: '10px 10px',
            sm: '10px 10px',
            md: '25px',
        }
    }}>


        <Title title="Blog" subtitle="New Blog" />
        <Paper sx={{ my: '0px', borderRadius: { xs: '0', sm: '5px', md: '10px' }, background: 'transparent', overflow: 'hidden' }} elevation={10}>

            <Grid container spacing={0} sx={{ height: '100%' }}>
                <Grid item sx={{
                    display: {

                        md: 'block',
                    },
                    bgcolor: colors.primary[mode === 'dark' ? 600 : 800],
                    // bgcolor: colors.primary[300],
                    height: '100%',
                    height: "auto"


                }}
                    md={6}
                    sm={12}
                    xs={12}

                >
                    {/* <BlogList /> */}
                    <Box
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
                            {/* <IconButton onClick={() => setOpen(true)}>
                                <MenuOutlinedIcon sx={{
                                    display: {
                                        xs: 'block',
                                        sm: 'block',
                                        md: 'none',
                                    }
                                }}

                                />
                            </IconButton> */}

                            <Typography
                                sx={{
                                    color: colors.grey[100],
                                    fontSize: '.8rem',
                                    fontWeight: 'bold',
                                }}
                            >Create A New Blog</Typography>
                        </Box>
                        <Divider />

                        <Box display="flex" flexDirection="column" py={2}
                            sx={{ overflowY: 'auto', height: 'auto' }}
                        >    <Typography
                            sx={{
                                color: colors.grey[100],
                                fontSize: '.8rem',
                                fontWeight: 'bold',
                            }}
                        >Blog Title</Typography>
                            <Box
                                component="input"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
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
                                placeholder="Enter Blog Title"
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
                            >Featured Image</Typography>
                            {!file && <TextField type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                id="file"
                                fullWidth
                                className=""

                            />}
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

                                            className="w-full h-auto max-h-[50vh] object-cover rounded-md cursor-pointer"
                                            src={file ? URL.createObjectURL(file) : "https://via.placeholder.com/150"}


                                        />
                                        <CircularProgress

                                            className="absolute top-1/2 translate-y-1/2 right-1/2 translate-x-1/2 z-10 font "
                                            variant="determinate" value={progress} />

                                    </>
                                }
                            </Box>

                        </Box>

                    </Box>
                </Grid>
                <Grid item
                    xs={12} sm={12} md={6}

                    sx={{
                        background: colors.primary[mode === 'dark' ? 800 : 900],
                        // background: colors.primary[600],
                        height: "auto"
                    }}
                >

                    <Box
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
                            justifyContent: 'space-between',
                            justifyContent: 'flex-end'

                        }}>
                            <Box
                                sx={{
                                    display: {
                                        xs: 'none',
                                        sm: 'none',
                                        md: 'block',
                                    },

                                    alignItems: 'center',
                                }}
                            >
                                {state.loading ? <Button><CircularProgress /></Button> :
                                    <Button
                                        onClick={() => handleSubmit()}
                                        sx={{
                                            bgcolor: colors.teal[500] + '!important',
                                            alignSelf: 'flex-end',
                                            justifySelf: "flex-end"
                                        }}
                                    >Add Blog</Button>
                                }

                            </Box>

                        </Box>
                        <Divider />


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
                            >New Blog</Typography>
                            <Editor {...{ setText, text }} />
                            <Box
                                sx={{
                                    alignSelf: 'flex-end',
                                    display: {
                                        xs: 'block',
                                        sm: 'block',
                                        md: 'none',
                                    }
                                }}
                            >
                                {state.loading ? <Button><CircularProgress /></Button> :
                                    <Button
                                        onClick={() => handleSubmit()}
                                        sx={{
                                            bgcolor: colors.teal[500] + '!important',
                                            alignSelf: 'flex-end',
                                            justifySelf: "flex-end"
                                        }}
                                    >Add Blog</Button>
                                }

                            </Box>
                        </Box>
                    </Box>
                </Grid>

            </Grid>
            <Info type={state.error ? 'Error' : 'Success'} opened={state.opened} />
        </Paper>
    </Box>
};
Blog.user = true
export default Blog;
