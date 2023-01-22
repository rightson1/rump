import { Avatar, Box, Button, Card, CardContent, Divider, Grid, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGlobalProvider } from "../utils/themeContext";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Drawer from '@mui/material/Drawer';

const Story = () => {
    const { colors, mode } = useGlobalProvider()
    const [open, setOpen] = useState(false)
    const StoryList = () => {
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
                        placeholder="Search Story"
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
                                        >Story Title</Typography>
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


        {/* <Title title="Messanger" subtitle="Story App" /> */}
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
                <StoryList />

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
                    height: "85vh"

                }}
                    md={4}

                >
                    <StoryList />

                </Grid>
                <Grid item
                    xs={12} sm={12} md={8}

                    sx={{
                        background: colors.primary[mode === 'dark' ? 800 : 900],
                        // background: colors.primary[600],
                        height: "85vh"
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
                            >Add Story</Button>

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
                                placeholder="Enter Story Title"
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
                            >Edit Story</Typography>
                            <Box
                                component="textarea"
                                sx={{
                                    width: "100%",
                                    outline: colors.teal[100],
                                    bgcolor: colors.primary[600],
                                    border: `1px solid ${colors.black[400]}`,
                                    '$:focus': {
                                        outline: colors.teal[100],
                                    }
                                }}
                                className="resize-none rounded-sm px-2 focus:border-teal-500 focus:border-2  max-h-[100px] h-[100px]"
                                placeholder="Enter Story"
                            />
                            <Typography
                                sx={{
                                    color: colors.grey[100],
                                    fontSize: '.8rem',
                                    fontWeight: 'bold',
                                }}
                            >Story Color</Typography>
                            <Box
                                className="flex gap-1"
                            >
                                <Box sx={{
                                    width: '30px',
                                    height: '30px',
                                    bgcolor: colors.teal[500],
                                    borderRadius: '50%',
                                }}>

                                </Box>
                                <Box sx={{
                                    width: '30px',
                                    height: '30px',
                                    bgcolor: colors.yellow[500],
                                    borderRadius: '50%',
                                }}>

                                </Box>
                                <Box sx={{
                                    width: '30px',
                                    height: '30px',
                                    bgcolor: colors.orange[500],
                                    borderRadius: '50%',
                                }}>

                                </Box>
                                <Box sx={{
                                    width: '30px',
                                    height: '30px',
                                    bgcolor: colors.greenAccent[500],
                                    borderRadius: '50%',
                                }}>

                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

            </Grid>

        </Paper>
    </Box>
};
Story.user = true
export default Story;
