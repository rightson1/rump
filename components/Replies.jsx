import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Box, Button, Divider, ListItem, ListItemIcon, Paper, Typography, ListItemText, AvatarGroup, List, Tooltip, Skeleton, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useGlobalProvider } from '../utils/themeContext';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useRouter } from 'next/router';
import { useGetAllReplies, useRepliesQuery } from '../utils/hooks/useReplies';
import { format } from "timeago.js"
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../utils/firebase';
import Bottom from './Bottom';
export default function Replies({ id }) {
    const router = useRouter()
    const { data, isLoading } = useRepliesQuery(id);
    const { data: tweets } = useGetAllReplies()
    const { colors } = useGlobalProvider()
    const [replies, setReplies] = useState([])

    const [tweet, setTweet] = useState();
    const [close, setClose] = useState(false)

    useEffect(() => {
        if (!id) return;

        const q = query(collection(db, "posts"), where("reply", "==", id));
        const unsubscribe = onSnapshot(q, snapshot => {

            setReplies(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
        return () => unsubscribe();
    }, [id])
    return (
        <Box

        >

            <Bottom {...{ tweet, setClose, close, reply: true }} />

            {
                replies?.length > 0 ? replies.map((item, index) => {

                    return <Box key={index}>
                        <ListItem>
                            <ListItemIcon onClick={() => router.push(`/user/${item.userId}`)}>
                                <Avatar src={item.photoUrl} sx={{
                                    width: 30,
                                    height: 30,
                                }} />
                            </ListItemIcon>
                            <Box className="w-full flex justify-between items-center">
                                <ListItemText
                                    primary={item.name}
                                    secondary={format(item.createdAt.toDate())}
                                ></ListItemText>
                                <IconButton
                                    onClick={() => {
                                        setTweet(item)
                                        setClose(true)
                                    }}
                                >
                                    <MoreHorizIcon />
                                </IconButton>
                            </Box>
                        </ListItem>
                        <Box ml={'30px'}>
                            <Box >
                                <Typography>{item.text}</Typography>
                                {item.image &&
                                    <Box
                                        component="img"
                                        className="w-full h-[200px] object-cover md:h-[300px]"
                                        src={item?.image}
                                    />

                                }
                            </Box>
                            <Box className="flex  justify-between align-center p-3">

                                <Box display="flex" gap={2}>
                                    <Tooltip title="Like">
                                        <Avatar
                                            sx={{
                                                bgcolor: colors.yellow[600],
                                                cursor: 'pointer',
                                                border: 'none !important',
                                                height: 25,
                                                width: 25,
                                            }}

                                        >
                                            <FavoriteBorderIcon
                                                sx={{
                                                    color: colors.grey[100],
                                                    fontSize: '1rem'
                                                }}
                                            />
                                        </Avatar>
                                    </Tooltip>
                                    <Tooltip
                                        title="Share"
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: colors.orange[600],
                                                cursor: 'pointer',
                                                border: 'none !important',
                                                height: 25,
                                                width: 25,
                                            }}
                                        >
                                            <ShareIcon
                                                sx={{
                                                    color: colors.grey[100],
                                                    fontSize: '1rem'
                                                }}
                                            />
                                        </Avatar>

                                    </Tooltip>
                                </Box>

                                <Box className="flex gap-2">
                                    <Box className="flex">
                                        <ChatBubbleOutlineIcon sx={{
                                            color: colors.grey[300],
                                        }} />
                                        <Typography
                                            color={colors.grey[300]}
                                            className="text-xs "
                                        >  {tweets?.filter(tweet => {
                                            return tweet.reply === item?.id
                                        }).length}</Typography>
                                    </Box>
                                    <Typography
                                        color={colors.grey[300]}
                                        className="text-xs "
                                    >1 hour Ago</Typography>

                                </Box>
                            </Box>
                        </Box>
                        <Divider />
                    </Box>
                }) : isLoading ?
                    (<>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                                return <Box key={index} className="flex gap-2 p-3 flex-col">
                                    <Box className="flex">
                                        <Skeleton variant="circular" width={30} height={30} />
                                        <Box className="flex flex-col ml-2">
                                            <Skeleton variant="text" width={100} />
                                            <Skeleton variant="text" width={100} />
                                        </Box>

                                    </Box>
                                    <Skeleton variant="text" className='w-screen' height={70} />

                                </Box>
                            })
                        }
                    </>)
                    :

                    <Box className="flex justify-center items-center h-[200px]">
                        <Typography>No replies yet</Typography>
                    </Box>
            }

        </Box>
    )

}
