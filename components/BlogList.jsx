import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useGlobalProvider } from "../utils/themeContext";
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { useBlogsQuery } from "../utils/hooks/useBlogs"
import { useRouter } from 'next/router';
import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';
const BlogList = () => {
    const { colors, mode } = useGlobalProvider()
    const router = useRouter()
    const { data } = useBlogsQuery();
    const [search, setSearch] = useState(null)
    const Blog = ({ item, index }) => {
        return (<Box key={index}
            onClick={() => router.push(`/article/${item?.id}`)}
        >
            <ListItem disablePadding sx={{
                p: 1
            }}>
                <ListItemButton sx={{
                    padding: 0 + " !important",
                }}>
                    {/* <ListItemIcon> */}
                    <Avatar src={`https://i.pravatar.cc/150?u=${index}`}
                        sizes='small'
                        sx={{
                            width: 30,
                            height: 30,
                            mr: 1,
                        }} />
                    {/* </ListItemIcon> */}
                    <Box className="w-full flex  flex-col">

                        <Typography
                            sx={{
                                fontSize: ".4rem",
                            }}
                        >by {item?.name}</Typography>
                        <ListItemText primary={item?.title} secondary="Read Moree...." />
                    </Box>

                </ListItemButton>
            </ListItem>
            <Divider />
        </Box>)
    }

    return <Box
        sx={{

            display: 'flex',
            flexDirection: 'column', height: '100%',
        }}
    >

        <Box>
            <Box
                sx={{
                    py: 2,
                    px: {
                        xs: 1,
                        md: 2
                    }
                }}
            >
                <Box
                    component="input"

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
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search blog"
                />
            </Box>
        </Box>


        <List sx={{ overflowY: 'scroll', py: '0rem !important', height: 'auto' }}
            className="scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100"
        >
            {data?.length > 0 ? search ?
                data?.filter((item) => item?.title?.toLowerCase().includes(search?.toLowerCase())).map((item, index) => {
                    return <Blog item={item} index={index} key={index} />
                }) :
                data?.map((item, index) => {
                    return <Blog item={item} index={index} key={index} />
                }) : isLoading ? (<List>{
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                        return <ListItem key={index}>
                            <Skeleton variant="rectangular" width={210} height={118} />
                        </ListItem>
                    })
                }
                </List>) : <Box>
                <Box
                    className="w-full h-full flex justify-center items-center flex-col"
                >
                    <Box
                        component="img"
                        className="w-full h-auto mx-auto"
                        src="/robot.gif"
                    />
                    <Typography
                        sx={{ color: colors.orange[500] }}
                        className="text-center text-xl"
                    >
                        No blogs add yet
                    </Typography>
                </Box>
            </Box>

            }

        </List>



    </Box>

}

export default BlogList