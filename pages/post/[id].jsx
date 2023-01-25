import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Box, Button, Divider, ListItem, ListItemIcon, Skeleton, Paper, Typography, ListItemText, AvatarGroup, List, Tooltip, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useGlobalProvider } from '../../utils/themeContext';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useRouter } from 'next/router';
import Replies from '../../components/Replies';
import Title from '../../components/Title';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Comment from '../../components/Comment';
import { useMemo } from 'react';
import { format } from "timeago.js"
import { useTweetsQuery } from '../../utils/hooks/useTweet';
const Tweet = () => {
    const router = useRouter()
    const { data, isLoading } = useTweetsQuery()
    const { id } = useRouter().query

    const item = useMemo(() => data?.find(item => item?.id === id), [data, id])

    const { colors } = useGlobalProvider()

    return <Box sx={{
        p: {
            xs: '10px 10px',
            sm: '10px 10px',
            md: '25px',
        }
    }}>
        <Box className="flex justify-between items-center pr-3">
            <IconButton
                onClick={() => router.back()} >
                <KeyboardBackspaceIcon />
            </IconButton>
            <Title title="Tweet" />

        </Box>
        <Paper sx={{ my: '0px', borderRadius: { xs: '0', sm: '5px', md: '10px' }, background: 'transparent', overflow: 'hidden' }} elevation={10}>
            {
                item ? (
                    <Box >
                        <ListItem >
                            <ListItemIcon>
                                <Avatar src={`https://i.pravatar.cc/150?u=${id}`} sx={{
                                    width: 30,
                                    height: 30,
                                }} />
                            </ListItemIcon>
                            <Box className="w-full flex justify-between items-center">
                                <ListItemText
                                    primary={item.name}
                                    secondary={`@${item.name.split(' ')[0]}`}
                                ></ListItemText>
                                <MoreHorizIcon />
                            </Box>
                        </ListItem>
                        <Box ml={'30px'}>
                            <Box onClick={() => router.push(`/post/${item.id}`)}>
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
                                        >10 comments</Typography>
                                    </Box>
                                    <Typography
                                        color={colors.grey[300]}
                                        className="text-xs "
                                    >{format(item?.createdAt.toDate())}</Typography>

                                </Box>
                            </Box>
                        </Box>
                        <Divider />
                        <Typography
                            className="px-2 font-bold my-4 text-center" sx={{ color: colors.redAccent[500] }}>Comment</Typography>
                        <Comment id={id} />
                        <div className="mt-5"></div>
                        <Divider />
                        <Typography
                            className="px-2 font-bold my-4 text-center" sx={{ color: colors.greenAccent[500] }}>Comments</Typography>

                        <Replies id={id} />
                    </Box>
                ) : isLoading ? (<>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                            return <Box key={index} className="flex gap-2 p-3">
                                <Skeleton variant="circular" width={"full"} height={30} />
                                <Skeleton variant="text" width={"full"} />
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


        </Paper>
    </Box>
};

export default Tweet;
