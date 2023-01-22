import { Grid, Box, Paper, Typography, Button, Divider, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalProvider } from "../utils/themeContext";
import GoogleIcon from '@mui/icons-material/Google';
import Info from "../components/Info";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useRegister } from "../utils/hooks/useRegister";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
const Register = () => {
    const [values, setValues] = useState(null);
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const { mutate, isLoading, isError, isSuccess } = useRegister()
    const [state, setState] = useState({
        opened: false,
        error: null,
    })
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                router.push('/')
            }).catch((e) => {
                console.log(e)
            })
    }

    const handleChange = (e) => {

        setValues({ ...values, [e.target.name]: e.target.value })

    }
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        const email = values.email.trim();
        const password = values.password.trim();
        signInWithEmailAndPassword(auth, email, password).then(() => {
            router.push('/')
            setLoading(false)
        }).catch(() => {
            setLoading(false)

        })
    }
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


            <Box
                onSubmit={handleSubmit}
                component="form"
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: 'column',
                    width: {
                        xm: '80vw',
                        sm: '70vw',
                        md: '400px'
                    },
                }}>
                <Typography
                    variant="h3"
                    sx={{
                        alignSelf: 'flex-start',
                        opacity: 0.8,
                        fontWeight: 700,

                    }}
                >Welcome To Rump</Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: colors.primary[200],
                    }}

                >New To Rump ? <Typography component="button"
                    onClick={() => router.push('/register')}
                    color={colors.teal[500]}
                >Create Account</Typography></Typography>


                <Box
                    className="flex flex-col gap-2 items-center "
                >
                    <Typography
                        sx={{
                            alignSelf: 'flex-start',
                        }}
                    >Email</Typography>
                    <Box
                        component="input"
                        required
                        name="email"
                        onChange={handleChange}
                        sx={{
                            width: "100%",
                            outline: colors.teal[100],
                            bgcolor: 'transparent',
                            border: `1px solid ${colors.black[400]}`,
                            '$:focus': {
                                outline: colors.teal[100],
                            }
                        }}
                        className="resize-none rounded-md p-4 focus:border-teal-500 focus:border-2  w-full"

                    />
                </Box>

                <Box
                    className="flex flex-col gap-2 items-center "
                >
                    <Typography
                        sx={{
                            alignSelf: 'flex-start',
                        }}
                    >Password</Typography>
                    <Box
                        component="input"
                        required
                        name="password"
                        onChange={handleChange}
                        sx={{
                            width: "100%",
                            outline: colors.teal[100],
                            bgcolor: 'transparent',
                            border: `1px solid ${colors.black[400]}`,
                            '$:focus': {
                                outline: colors.teal[100],
                            }
                        }}
                        className="resize-none rounded-md p-4 focus:border-teal-500 focus:border-2  w-full"

                    />
                </Box>
                {loading || isLoading ? <Button><CircularProgress /> </Button> : <Button
                    sx={{
                        bgcolor: colors.orange[500] + ' !important',
                        width: "100%",

                    }}
                    type="submit"
                >Register</Button>}

                <Divider />
                <Typography>or</Typography>
                <Button
                    className="flex gap-2 items-center"
                    onClick={() => signInWithGoogle()}
                    sx={{
                        bgcolor: 'transparent',
                        width: "100%",
                        border: `2px solid ${colors.black[300]}`,

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

            </Box>
        </Grid>
        <Info type={isError || state.error ? true : false} opened={state.opened || isSuccess || isError} />
    </Grid>;
};
Register.noLayout = true
export default Register;
