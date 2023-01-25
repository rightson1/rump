import React from "react";
import { useGlobalProvider } from "../utils/themeContext";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { Avatar, Box, Button, Divider, Grid, ListItem, ListItemIcon, Paper, Typography, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import { useAuth } from "../utils/authContext";
import { updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../utils/firebase";
import { doc } from "firebase/firestore";
const Edit = () => {
    const { colors } = useGlobalProvider()
    const { user } = useAuth();
    const [file, setFile] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [introduction, setIntroduction] = React.useState("");
    const [state, setState] = React.useState({
        open: false,
        error: false,
    })

    const handleState = (error) => {
        if (error) {
            setState({
                open: true,
                error: true,
            })
        } else {
            setState({
                open: true,
                error: false,
            })
        }
    }

    const handleSubmit = () => {
        setLoading(true)

        if (file) {
            const storageRef = ref(storage, `profile/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    setLoading(false)
                    handleState(true)

                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        const updateRef = doc(db, "users", user?.id);
                        if (!introduction) {
                            updateDoc(updateRef, {
                                photoUrl: downloadURL,
                                introduction,

                            }).then(() => {
                                setLoading(false)
                                setFile(null)
                                handleState(false)
                            }).catch((err) => {
                                handleState(true)
                            })
                        } else {
                            updateDoc(updateRef, {
                                photoUrl: downloadURL,
                                introduction,

                            }).then(() => {
                                setLoading(false)
                                setFile(null)
                                setIntroduction("")
                                handleState(false)
                            }).catch((err) => {
                                handleState(true)
                            })
                        }

                    }).catch((err) => {
                        handleState(true)
                    })

                }
            );
        } else {
            const updateRef = doc(db, "users", user?.id);
            updateDoc(updateRef, {
                introduction,
            }).then(() => {
                setLoading(false)
                setFile(null)
                setIntroduction("")
                handleState(false)
            }).catch((err) => {
                handleState(true)
            })

        }
    }
    return <Grid item xs={12} md={7.7} component={Paper}

        sx={{
            p: 2,
            backgroundColor: colors.primary[600],
            borderRadius: "1rem",
            width: "100%",
            height: "100%",
            mr: {
                xs: 0,
                md: 2

            }
        }}

    >
        <Typography>
            Edit Profile
        </Typography>
        <ListItem>
            <input type="file" className="hidden" id="profile"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <ListItemIcon className="relative" >
                <Avatar src="/girl.png" />
                <Box
                    className="absolute top-1/2  transform translate-x-1/2 -translate-y-1/2  cursor-pointer"
                    component="label" htmlFor="profile"
                >
                    <CameraAltOutlined />
                </Box>
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
                onChange={(e) => setIntroduction(e.target.value)}
                value={introduction}
                className="resize-none rounded-md px-2 focus:border-teal-500 focus:border-2 "
                placeholder="Change Introduction"
            />
        </ListItem>
        <Divider />
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

                </>
            }
        </Box>
        <Box gap={4} height="100%" display="flex" justifyContent="center" my={2} flexDirection="row" alignItems="center">
            <Box display="flex" justifyContent="center" my={0} flexDirection="column" alignItems="center">
                <EmojiEmotionsIcon sx={{
                    color: colors.yellow[500] + " !important",

                }} />
                <Typography >
                    Add Emoji
                </Typography>
            </Box>
            {loading ? <Button
                sx={{
                    backgroundColor: colors.orange[500] + " !important",
                    color: colors.primary[600] + " !important",
                    borderRadius: "1rem",
                }}>
                <CircularProgress />
            </Button> : <Button
                onClick={handleSubmit}
                sx={{
                    backgroundColor: colors.teal[500] + " !important",
                    color: colors.primary[600] + " !important",
                    borderRadius: "1rem",
                }}>
                Edit
            </Button>

            }
        </Box>

    </Grid>
};

export default Edit;
