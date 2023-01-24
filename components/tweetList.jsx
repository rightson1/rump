import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Box, Button, Divider, ListItem, ListItemIcon, Paper, Typography, ListItemText, AvatarGroup, List, Tooltip, Skeleton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useGlobalProvider } from '../utils/themeContext';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useRouter } from 'next/router';

import { format } from "timeago.js"
import { useTweetsQuery } from '../utils/hooks/useTweet';
export default function Tweet({ id }) {
    const router = useRouter()
    const { data, isLoading } = useTweetsQuery()
    const { colors } = useGlobalProvider()
    return (
        <List className="overflow-x-hidden  h-screen overflow-y-scroll " >


            {
                data?.length > 0 ? data.map((item, index) => {
                    return <Box key={index}>
                        <ListItem >
                            <ListItemIcon>
                                <Avatar src={`https://i.pravatar.cc/150?u=${index}`} sx={{
                                    width: 30,
                                    height: 30,
                                }} />
                            </ListItemIcon>
                            <Box className="w-full flex justify-between items-center">
                                <ListItemText
                                    primary={item.name}
                                    secondary={format(item.createdAt.toDate())}
                                ></ListItemText>
                                <MoreHorizIcon />
                            </Box>
                        </ListItem>
                        <Box ml={'30px'}>
                            <Box onClick={() => router.push(`/post/${item.id}`)}>
                                <Typography>{item.text}</Typography>

                                <Box
                                    component="img"
                                    className="w-full h-[200px] object-cover"
                                    src={item?.image}
                                />


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
                                        >10 comments</Typography>
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
                                return <Box key={index} className="flex gap-2 p-3">
                                    <Skeleton variant="circular" width={30} height={30} />
                                    <Skeleton variant="text" width={300} />
                                </Box>
                            })
                        }
                    </>)
                    :

                    <Box className="flex justify-center items-center h-[200px]">
                        <Typography>No tweet yet</Typography>
                    </Box>
            }

        </List>
    )

}

