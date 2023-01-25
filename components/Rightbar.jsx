import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InputBase from '@mui/material/InputBase';
import Search from '@mui/icons-material/Search';
import { useGlobalProvider } from '../utils/themeContext';
import Flex from "./Flex"
import More from '@mui/icons-material/More';
import { Avatar, Skeleton } from '@mui/material';
import { useBlogsQuery } from '../utils/hooks/useBlogs';
import { useState } from 'react';
import { useRouter } from 'next/router';
const drawerWidth = 220;

export default function Rightbar() {
    const { colors, mode } = useGlobalProvider()
    const router = useRouter()
    const { data, isLoading } = useBlogsQuery();
    const [search, setSearch] = useState("")
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
                    <Avatar src={item?.image}
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

    return (

        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                flexGrow: 1,
                display: {
                    xs: 'none',
                    sm: 'none',
                    md: 'block',
                },
                '& .MuiDrawer-paper': {
                    background: colors.primary[mode == "dark" ? 800 : 1000],
                    width: drawerWidth,
                    py: 2

                },
            }}
            variant="permanent"
            anchor="right"
        >
            <Flex sx={{
                background: colors.primary[mode == "dark" ? 600 : 900],
                p: ".1rem .5rem",
                mx: 1,
                borderRadius: "1rem",

            }} >
                <Search sx={{
                    fontSize: "1rem",
                }} />
                <InputBase placeholder='Search...'
                    onChange={(e) => setSearch(e.target.value)}

                />

            </Flex>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 1,
                    height: '100%',
                    my: 2,
                    mx: 1,
                    // background: colors.primary[mode == "dark" ? 900 : 900],
                }}
            >
                <Typography
                    component="h6"
                    fontWeight="bold"
                    sx={{
                        color: colors.primary[100],
                        textDecoration: "underline",
                    }}
                >Latest Blogs</Typography>
                <List>
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

        </Drawer>

    );
}