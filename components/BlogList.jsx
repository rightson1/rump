import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useGlobalProvider } from "../utils/themeContext";
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from "@mui/material";

const BlogList = () => {
    const { colors, mode } = useGlobalProvider()
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

export default BlogList