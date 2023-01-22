import { Avatar, Box, Button, Card, CardContent, Divider, Grid, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGlobalProvider } from "../utils/themeContext";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Drawer from '@mui/material/Drawer';
import Editor from "../components/Quill";

const Blog = () => {
    const { colors, mode } = useGlobalProvider()
    const [open, setOpen] = useState(false)
    const BlogList = () => {
        return <Box
            sx={{

                display: 'flex',
                flexDirection: 'column',

                height: '100%',
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
                        placeholder="Search blog"
                    />
                </Box>
            </Box>


            <List sx={{ overflowY: 'scroll', py: '0rem !important', height: 'auto' }}
                className="scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100"
            >
                {
                    [1, 2, 3, 4, 5, 6, 1, 2, 2, 3].map((item, index) => (
                        <Box key={index}
                            sx={{
                                borderLeft: `2px solid ${colors.orange[500]}`,
                                maxWidth: {
                                    xs: '200px',
                                    md: '100%'
                                }

                            }}
                        >
                            <ListItem disablePadding>
                                <ListItemButton sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',

                                }}>
                                    <Typography>Lorem, ipsum dolor....</Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}
                                    >
                                        <Typography
                                            fontSize=".6rem"
                                        >30 days Ago</Typography>
                                        <IconButton
                                            sx={{
                                                width: '14px !important',
                                                height: '14px !important',
                                            }}
                                        >
                                            <DeleteIcon fontSize=".5rem" />
                                        </IconButton>
                                    </Box>

                                </ListItemButton>
                                <Divider />

                            </ListItem>
                            <Divider />
                        </Box>
                    ))
                }

            </List>



        </Box>

    }
    return <Box sx={{
        p: {
            xs: '10px 10px',
            sm: '10px 10px',
            md: '25px',
        }
    }}>


        {/* <Title title="Messanger" subtitle="Blog App" /> */}
        <Paper sx={{ my: '0px', borderRadius: { xs: '0', sm: '5px', md: '10px' }, background: 'transparent', overflow: 'hidden' }} elevation={10}>

            <Drawer
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        p: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.3rem',
                        background: colors.primary[400],
                    },

                }}
            >
                <BlogList />

            </Drawer>

            <Grid container spacing={0} sx={{ height: '100%' }}>
                <Grid item sx={{
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'block',
                    },
                    bgcolor: colors.primary[mode === 'dark' ? 600 : 800],
                    // bgcolor: colors.primary[300],
                    height: '100%',
                    height: "100vh"

                }}
                    md={4}

                >
                    <BlogList />

                </Grid>
                <Grid item
                    xs={12} sm={12} md={8}

                    sx={{
                        background: colors.primary[mode === 'dark' ? 800 : 900],
                        // background: colors.primary[600],
                        height: "100vh"
                    }}
                >

                    <Box
                        sx={{
                            p: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            height: '100%',
                        }}>

                        <Box disablePadding sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between'

                        }}>
                            <IconButton onClick={() => setOpen(true)}>
                                <MenuOutlinedIcon sx={{
                                    display: {
                                        xs: 'block',
                                        sm: 'block',
                                        md: 'none',
                                    }
                                }}

                                />
                            </IconButton>
                            <Button
                                sx={{
                                    bgcolor: colors.teal[500] + '!important',
                                    alignSelf: 'flex-end',
                                    justifySelf: "flex-end"
                                }}
                            >Add Blog</Button>

                        </Box>
                        <Divider />

                        <Box display="flex" flexDirection="column" py={2}
                            sx={{ overflowY: 'auto', height: 'auto' }}
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
                                placeholder="Enter Blog Title"
                            />
                        </Box>
                        <Box width="100%" display="flex" sx={{
                            gap: '1rem',
                            alignItems: 'flex-start',
                            flexDirection: 'column'

                        }}>
                            <Typography
                                sx={{
                                    color: colors.grey[100],
                                    fontSize: '.8rem',
                                    fontWeight: 'bold',
                                }}
                            >Featured Image</Typography>
                            <TextField type="file" />

                        </Box>
                        <Box width="100%" display="flex" sx={{
                            gap: '1rem',
                            alignItems: 'flex-start',
                            flexDirection: 'column'

                        }}>
                            <Typography
                                sx={{
                                    color: colors.grey[100],
                                    fontSize: '.8rem',
                                    fontWeight: 'bold',
                                }}
                            >New Blog</Typography>
                            <Editor />

                        </Box>
                    </Box>
                </Grid>

            </Grid>

        </Paper>
    </Box>
};
Blog.user = true
export default Blog;
