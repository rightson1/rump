import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Box, Button, Divider, ListItem, ListItemIcon, Paper, Typography, ListItemText, AvatarGroup, List, Tooltip, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useGlobalProvider } from '../../utils/themeContext';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useRouter } from 'next/router';
import Replies from '../../components/Replies';
import Title from '../../components/Title';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
export default function Home() {
    const router = useRouter()
    const { id: index } = useRouter().query

    const { colors } = useGlobalProvider()
    return (<Box
        className="h-[85vh] w-full overflow-hidden"
    >
        <Box className="flex justify-between items-center pr-3">
            <Title title="Tweet" />
            <IconButton
                onClick={() => router.back()} >
                <KeyboardBackspaceIcon />
            </IconButton>
        </Box>
        <Box className="overflow-x-hidden  h-screen overflow-y-scroll scrollbar-none" >

            <Box key={index}>
                <ListItem >
                    <ListItemIcon>
                        <Avatar src={`https://i.pravatar.cc/150?u=${index}`} sx={{
                            width: 30,
                            height: 30,
                        }} />
                    </ListItemIcon>
                    <Box className="w-full flex justify-between items-center">
                        <ListItemText
                            primary="Achsash Janice"
                            secondary="@_janice"
                        ></ListItemText>
                        <MoreHorizIcon />
                    </Box>
                </ListItem>
                <Box ml={'30px'}>
                    <Box onClick={() => router.push(`/post/${index}`)}>
                        <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam excepturi consequuntur a. Minus, ex accusamus consectetur ullam id perferendis recusandae!</Typography>
                        {index % 2 === 0 &&
                            <Box
                                component="img"
                                className="w-full h-[200px] object-cover"
                                src={`https://picsum.photos/id/${index + index * index / 2}/700/700`}
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
                            >1 hour Ago</Typography>

                        </Box>
                    </Box>
                </Box>
                <Divider />
            </Box>
            <Box className="flex  m-3  flex-col">
                <Typography
                    className='font-bold'>Replies</Typography>
                <Replies />
            </Box>
        </Box>

    </Box>
    )

}

