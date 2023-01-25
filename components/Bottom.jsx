import React, { useEffect } from "react";
import Drawer from '@mui/material/Drawer';
import { useGlobalProvider } from "../utils/themeContext";
import { useAuth } from "../utils/authContext";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CircularProgress, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useTweetsDelete } from "../utils/hooks/useTweet";
import PersonIcon from '@mui/icons-material/Person';
import { useRepliesDelete } from "../utils/hooks/useReplies";
import { useRouter } from "next/router";
import Info from "./Info";
const Bottom = ({ close, setClose, tweet, reply }) => {
    const { colors } = useGlobalProvider();
    const { user } = useAuth();
    const { mutate, isLoading, isError, isSuccess } = useTweetsDelete();
    const { mutate: deleteReply, isLoading: loading, isError: error, isSuccess: success } = useRepliesDelete()
    const router = useRouter();
    const handleDelete = (id) => {
        if (reply) {
            deleteReply(id)
        } else {
            mutate(id);
        }
        setTimeout(() => {
            setClose(false)
        }, [1000])

    }

    return <Drawer
        anchor="bottom"
        open={close}
        onClose={() => setClose(false)}
        sx={{
            '& .MuiDrawer-paper': {
                display: 'flex',
                flexDirection: 'column',
                gap: '.3rem',
                background: colors.primary[400],
                borderTopLeftRadius: "2rem",
                borderTopRightRadius: "2rem",
            },

        }}
    >
        {user?.email == tweet?.email ? (<>
            <List py={2}>
                <ListItem disablePadding onClick={() => handleDelete(tweet.id)}>
                    <ListItemButton className="flex justify-center items-center">
                        <IconButton >
                            {isLoading || loading ? <CircularProgress /> : <DeleteOutlineIcon />}
                        </IconButton>

                        <ListItemText primary={isLoading || loading ? "loading.." : reply ? "Delete Reply" : "Delete Post"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </>) : (<>
            <List py={2}>
                <ListItem disablePadding
                    onClick={() => router.push(`/user/${tweet.userId}`)}
                >
                    <ListItemButton className="flex justify-center items-center">
                        <IconButton >
                            <PersonIcon />
                        </IconButton>

                        <ListItemText primary={"View Profile"} />
                    </ListItemButton>
                </ListItem>
            </List>

        </>)}
        <Info type={error || isError ? "Error" : "Sucess"} opened={success || isError} />
    </Drawer>
};

export default Bottom;
