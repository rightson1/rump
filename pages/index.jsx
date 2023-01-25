import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Box, Button, Divider, ListItem, ListItemIcon, Skeleton, Paper, Typography, ListItemText, AvatarGroup, List, Tooltip, IconButton } from "@mui/material";
import { useEffect } from 'react';
import { useGlobalProvider } from '../utils/themeContext';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useRouter } from 'next/router';
import { useTweetsQuery } from '../utils/hooks/useTweet';
import { useState } from 'react';
import { format } from "timeago.js"
import Bottom from '../components/Bottom';
import { useGetAllReplies } from '../utils/hooks/useReplies';
import { useAuth } from '../utils/authContext';
import TweetList from '../components/Tweets';
import { collection, getDocs, onSnapshot } from '@firebase/firestore';
import { db } from '../utils/firebase';
export default function Home() {
  const router = useRouter()
  const { data, isLoading } = useTweetsQuery()
  const { colors } = useGlobalProvider()
  const [close, setClose] = useState(false)
  const { data: replies } = useGetAllReplies();
  const [tweet, setTweet] = useState();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const q = collection(db, "tweets");
    const unsubscribe = onSnapshot(q, snapshot => {

      setTweets(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      setLoading(false)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  // const BottomHandle = () => {
  //   return <Bottom setClose={setClose} close={close} tweet={tweet} >

  //   </Bottom>
  // }

  return (
    <Box
      className="h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden"
    >
      <TweetList {...{ data: tweets, user, isLoading: loading }} />
    </Box>
  )

}

