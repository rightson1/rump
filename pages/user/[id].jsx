import { Avatar, Box, Button, Divider, Grid, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import React from "react";
import { useGlobalProvider } from "../../utils/themeContext";
import ProfileCard from "../../components/ProfileCard";
import { useMemo } from "react";
import TextStepper from "../../components/TextStepper";
import Post from "../../components/Post";
import Edit from "../../components/Edit";
import Blogs from "../../components/Blogs"
import { useBlogsQuery } from "../../utils/hooks/useBlogs";
import { useAuth } from "../../utils/authContext";
import Into from "../../components/Into";
import UserTabs from "../../components/UserTabs";
import TweetList from "../../components/Tweets";
import { useTweetsQuery } from "../../utils/hooks/useTweet";
import { useRouter } from "next/router";
import { useGetUser } from "../../utils/hooks/useRegister";

const Id = () => {
    const router = useRouter();
    const { id } = router.query;
    const { colors } = useGlobalProvider();
    const { data: user } = useGetUser(id)
    const [value, setValue] = React.useState(0);
    const { data } = useTweetsQuery();
    const tweets = useMemo(() => {
        if (!user) return;
        return data?.filter((tweet) => tweet.email === user.email)
    }, [data, user])


    return <Box my={2} sx={{
        mx: {
            xs: 2,
            md: 3,

        },
    }}>
        <ProfileCard user={user} />
        {/* <UserTabs /> */}
        <Grid container mt={2} rowGap={2}
        >

            {/* <Into user={user} />
            <Post />

            <Edit />
            <Grid item xs={12} md={4} component={Paper}
                sx={{
                    p: 2,
                    backgroundColor: colors.primary[600],
                    borderRadius: "1rem",
                }}

            >
                <Typography sx={{
                    fontWeight: "bold",

                }}>Changing Profile</Typography>
                <Typography>You can change you profile pic by clicking on the avatar, then the introduction by clicking,</Typography>
            </Grid> */}
            <UserTabs {...{ value, setValue }} />


            {value === 0 ? <>
                <TextStepper />

                <Blogs />
            </> :
                <>
                    <Grid item xs={12} md={7.8}>
                        <TweetList data={tweets} user={user} />
                    </Grid>
                    <TextStepper />

                </>}




        </Grid>
    </Box>
};
Id.user = true
export default Id;
