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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Search from '@mui/icons-material/Search';
import { useGlobalProvider } from '../utils/themeContext';
import Flex from "./Flex"
import More from '@mui/icons-material/More';
import { Avatar } from '@mui/material';

const drawerWidth = 220;

export default function Rightbar() {
    const { colors, mode } = useGlobalProvider()
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
                <InputBase placeholder='Search...' />

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
                    {[1, 2, 3, 4, 5].map((item, index) => {
                        return (<Box key={index}>
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
                                        >by Rightson Tole </Typography>
                                        <ListItemText primary="How To Overcome Depression" secondary="Read Moree...." />
                                    </Box>

                                </ListItemButton>

                            </ListItem>
                            <Divider />
                        </Box>)
                    })

                    }
                </List>


            </Box>

        </Drawer>

    );
}