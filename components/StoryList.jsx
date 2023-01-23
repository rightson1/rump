import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useGlobalProvider } from "../utils/themeContext";
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Divider, Grid, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { useStoryQuery, useStoryDelete } from '../utils/hooks/useStory';


const StoryList = () => {
    const { colors, mode } = useGlobalProvider()
    const { data, isLoading } = useStoryQuery();
    const { mutate: deleteStory, isLoading: deleteLoading } = useStoryDelete()
    const handleDelete = (id) => {
        window.confirm("Are you sure you want to delete this story?") && deleteStory(id)
    }


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
                data?.map((item, index) => (
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
                                <Typography>{item?.story.slice(0, 15)}..</Typography>
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
                                    >{item?.title}</Typography>
                                    <IconButton
                                        onClick={() => handleDelete(item.id)}
                                    // sx={{
                                    //     width: '20px !important',
                                    //     height: '20px !important',
                                    // }}
                                    >
                                        {deleteLoading ?
                                            <CircularProgress /> : <DeleteIcon fontSize="1rem" />
                                        }
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

export default StoryList