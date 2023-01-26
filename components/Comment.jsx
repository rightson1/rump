import React from "react";
import { useGlobalProvider } from "../utils/themeContext";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { Avatar, Box, Button, Divider, Grid, ListItem, ListItemIcon, Paper, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { useAuth } from "../utils/authContext";
import Info from "../components/Info";
import { storage, db } from "../utils/firebase";
import { doc, addDoc, collection } from 'firebase/firestore';
import CircularProgress from "@mui/material/CircularProgress";
const Comment = ({ id, comment, reply }) => {
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
    const { colors, mode } = useGlobalProvider()
    const [state, setState] = React.useState({
        open: false,
        error: false,
    })
    const [text, setText] = React.useState("")
    const { user } = useAuth()

    const [file, setFile] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const handleSubmit = () => {
        setLoading(true)

        if (file) {
            const storageRef = ref(storage, `posts/${id}/${file.name}`);
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
                        addDoc(collection(db, "posts"), {
                            text,
                            image: downloadURL,
                            createdAt: new Date(),
                            email: user?.email,
                            name: user?.name,
                            reply: id,
                            userId: user?.id,
                            photoUrl: user?.photoUrl ? user.photoUrl : '',
                        })
                    }).then(() => {
                        setLoading(false)
                        setFile(null)
                        setText("")
                        handleState(false)
                    }).catch((err) => {
                        handleState(true)
                    })

                }
            );
        } else {
            addDoc(collection(db, "posts"), {
                text,
                createdAt: new Date(),
                email: user?.email,
                photoUrl: user?.photoUrl ? user?.photoUrl : '',
                userId: user?.id,
                name: user?.name,
                reply: id,
            }).then(() => {
                setLoading(false)
                setFile(null)
                setText("")
                handleState(false)
            }).catch((err) => {
                setLoading(false)
                setFile(null)
                setText("")
                handleState(true)
            })

        }
    }

    return <Box item
        elevation={mode == "dark" ? 10 : 1}
        component={Paper}

        sx={{
            p: 2,
            backgroundColor: colors.primary[comment ? 600 : 900],
            borderRadius: "1rem",
            width: "auto",
            height: "100%",
            mx: {
                xs: 0,
                md: 2

            }
        }}

    >

        <Typography>
            {comment ? "Add Comment" : "Add Reply"}
        </Typography>
        <ListItem>
            <ListItemIcon>
                <Avatar src="/girl.png" />
            </ListItemIcon>
            <Box
                component="textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{
                    width: "100%",
                    outline: colors.teal[100],
                    backgroundColor: colors.primary[comment ? 600 : 900],
                    '$:focus': {
                        outline: colors.teal[100],
                    }
                }}
                className="resize-none rounded-md px-2 focus:border-teal-500 focus:border-2 "
                placeholder="What's on your mind?"
            />
        </ListItem>
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
                        variant="determinate" />

                </>
            }
        </Box>
        <Divider />
        <Box gap={4} height="100%" display="flex" justifyContent="center" my={2} flexDirection="row" alignItems="center">
            <Box display="flex" justifyContent="center" my={0} flexDirection="column" alignItems="center">
                <EmojiEmotionsIcon sx={{
                    color: colors.yellow[500] + " !important",

                }} />
                <Typography >
                    Feeling/Activity
                </Typography>
            </Box>
            <Box
                component="label"
                htmlFor="file"
                display="flex" justifyContent="center" my={0} flexDirection="column" alignItems="center">
                <AddAPhotoOutlinedIcon sx={{
                    color: colors.orange[500] + " !important",

                }} />
                <input className="hidden" id="file" type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <Typography >
                    Photo/Video

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
                Comment
            </Button>

            }
        </Box>
        <Info opened={state.open} type={state.error ? 'Error' : 'Success'} />
    </Box>
};

export default Comment;
