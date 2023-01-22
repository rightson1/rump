import { Grid, Box, Paper, Typography, Button, Divider } from "@mui/material";
import React from "react";
import { useGlobalProvider } from "../utils/themeContext";
import GoogleIcon from '@mui/icons-material/Google';
const Register = () => {
    const { colors } = useGlobalProvider()
    return <Grid container
        sx={{
            zIndex: 5,
        }}
    >
        <Grid item
            xs={12}
            md={6}
            sx={{
                position: 'relative',
                backgroundImage: 'url(/register.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'right bottom',

                width: "100%",
                p: 2,
                height: {
                    xs: "60vh",
                    md: "100vh"
                },
            }}
        >
            <Box
                component="img"
                src="/Rump.svg"
                className="w-[200px] z-[3]"

            />
        </Grid>
        <Grid item
            xs={12}
            component={Paper}
            md={6}
            sx={{
                width: "100%",
                gap: 1,
                p: 2,
                bgcolor: colors.primary[600],
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',

            }}
        >
            <Typography
                variant="h3"
                sx={{
                    textAlign: 'center',

                }}
            >Welcome To Rump</Typography>
            <Typography
                variant="body2"
                sx={{
                    color: colors.primary[200],
                }}
                textAlign="center"
            >Already have an Account ? <Typography component="button"
                color={colors.teal[500]}
            >Sign In</Typography></Typography>

            <Box
                className="flex flex-col gap-2 items-center w-3/4 max-w-[400px]"
            >
                <Typography
                    sx={{
                        alignSelf: 'flex-start',
                    }}
                >Name</Typography>
                <Box
                    component="input"

                    sx={{
                        width: "100%",
                        outline: colors.teal[100],
                        bgcolor: 'transparent',
                        border: `1px solid ${colors.black[400]}`,
                        '$:focus': {
                            outline: colors.teal[100],
                        }
                    }}
                    className="resize-none rounded-md p-2 focus:border-teal-500 focus:border-2  w-full"

                />
            </Box>

            <Box
                className="flex flex-col gap-2 items-center w-3/4 max-w-[400px]"
            >
                <Typography
                    sx={{
                        alignSelf: 'flex-start',
                    }}
                >Email</Typography>
                <Box
                    component="input"

                    sx={{
                        width: "100%",
                        outline: colors.teal[100],
                        bgcolor: 'transparent',
                        border: `1px solid ${colors.black[400]}`,
                        '$:focus': {
                            outline: colors.teal[100],
                        }
                    }}
                    className="resize-none rounded-md p-2 focus:border-teal-500 focus:border-2  w-full"

                />
            </Box>

            <Box
                className="flex flex-col gap-2 items-center w-3/4 max-w-[400px]"
            >
                <Typography
                    sx={{
                        alignSelf: 'flex-start',
                    }}
                >Password</Typography>
                <Box
                    component="input"

                    sx={{
                        width: "100%",
                        outline: colors.teal[100],
                        bgcolor: 'transparent',
                        border: `1px solid ${colors.black[400]}`,
                        '$:focus': {
                            outline: colors.teal[100],
                        }
                    }}
                    className="resize-none rounded-md p-2 focus:border-teal-500 focus:border-2  w-full"

                />
            </Box>
            <Button
                sx={{
                    bgcolor: colors.orange[500] + ' !important',
                    width: "100%",
                    maxWidth: "370px",
                    my: 2,
                }}
            >Register</Button>

            <Divider />
            <Typography>or</Typography>
            <Button
                className="flex gap-2 items-center"
                sx={{
                    bgcolor: 'transparent',
                    width: "100%",
                    border: `2px solid ${colors.black[300]}`,
                    maxWidth: "370px",

                    my: 2,
                }}
            >   <GoogleIcon sx={{
                color: colors.orange[500],

            }}
                />
                <Typography
                    sx={{
                        color: colors.black[300],
                        fontWeight: 500,
                    }}
                >
                    Google
                </Typography>
            </Button>

        </Grid>
    </Grid>;
};
Register.noLayout = true
export default Register;
