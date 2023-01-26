import { Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useGlobalProvider } from "../utils/themeContext";
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuth } from "../utils/authContext";
const ContactList = ({ current, setCurrent }) => {
    const { colors, mode } = useGlobalProvider()
    const { user } = useAuth();
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const q = query(collection(db, "users"), where("online", "==", true));
        const unsubscribe = onSnapshot(q, snapshot => {

            setUsers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])
    return <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            height: '100%',
        }}>
        <Box>
            <TextField label="Search Contact" fullWidth />
        </Box>

        <List sx={{ overflowY: 'scroll', py: '1rem', height: 'auto' }}>
            {
                users.filter((item, index) => item.id !== user.id).map((user, index) => (<ListItem key={index} disablePadding onClick={() => setCurrent(user)}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar src={user?.photoUrl} />
                        </ListItemIcon>
                        <ListItemText primary={user?.name} secondary={user?.username} />

                    </ListItemButton>

                </ListItem>
                ))
            }

        </List>



    </Box>
}
export default ContactList;
