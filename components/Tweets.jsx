import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Box, Button, Divider, ListItem, ListItemIcon, Skeleton, Typography, ListItemText, List, Tooltip, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useGlobalProvider } from '../utils/themeContext';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { format } from "timeago.js"
import Bottom from './Bottom';
import { useGetAllReplies } from '../utils/hooks/useReplies';
import { useAuth } from '../utils/authContext';
export default function TweetList({ data, isLoading, user }) {
    const router = useRouter()
    const { colors } = useGlobalProvider()
    const [close, setClose] = useState(false)
    const { data: replies } = useGetAllReplies();
    const { user: current } = useAuth();
    const [tweet, setTweet] = useState();

    const BottomHandle = () => {
        return <Bottom setClose={setClose} close={close} tweet={tweet} >

        </Bottom>
    }
    return (
        <>
            <BottomHandle />
            <List className="overflow-x-hidden  h-screen overflow-y-scroll  w-full" >


                {
                    data?.length > 0 ? data.map((item, index) => {

                        return <Box key={index} className="curs"

                        >
                            <ListItem

                            >
                                <ListItemIcon
                                    className='cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        if (current?.email == item?.email) {
                                            router.push('/user')
                                        } else {
                                            router.push(`/user/${item?.userId}`)
                                        }
                                    }}
                                >
                                    <Avatar src={item.photoUrl} sx={{
                                        width: 30,
                                        height: 30,
                                    }} />
                                </ListItemIcon>
                                <Box className="w-full flex justify-between items-center">
                                    <ListItemText
                                        primary={item.name}
                                        secondary={`@${item.name.split(' ')[0]}`}
                                    ></ListItemText>
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setTweet(item)
                                            console.log(close)
                                            setClose(true)

                                        }}
                                    >
                                        <MoreHorizIcon />
                                    </IconButton>
                                </Box>
                            </ListItem>
                            <Box ml={'30px'}
                                className="cursor-pointer"
                                onClick={() => router.push(`/post/${item.id}`)}
                            >
                                <Box>
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
                                            >
                                                {replies?.filter(tweet => {
                                                    return tweet.reply === item?.id
                                                }).length}
                                                {/* <Comments item={item} /> */}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            color={colors.grey[300]}
                                            className="text-xs "
                                        >{format(item?.createdAt.toDate())}</Typography>

                                    </Box>
                                </Box>
                            </Box>
                            <Divider />
                        </Box>
                    }) : isLoading ? (<>
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
                    </>) : <>
                        <Box className="flex flex-col items-center justify-center h-full">
                            <Typography variant="h4" className="text-center">No Tweets Found</Typography>
                            <Button variant="contained" onClick={() => router.push('/user')}>Create Tweet</Button>
                        </Box>
                    </>
                }

            </List>
        </>
    )

}

