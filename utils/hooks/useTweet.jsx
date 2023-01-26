import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "react-query";

const addTweets = (newTweets) => addDoc(collection(db, "tweets"), newTweets)

export const useTweetsMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(addTweets, {
        onSuccess: (data) => {
            queryClient.refetchQueries("tweets", getTweets);
            queryClient.setQueryData("tweets", (oldData) => {
                return {
                    ...oldData,
                    data: [...oldData.data, data.data],
                };
            });
        },
    });
};


const deleteTweets = (id) => deleteDoc(doc(db, "tweets", id))
export const useTweetsDelete = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteTweets, {
        onSuccess: (data) => {
            queryClient.refetchQueries("tweets", getTweets);
            // queryClient.setQueryData("tweets", (oldData) => {
            //     return {
            //         ...oldData,
            //         data: oldData.data.filter((item) => item.id !== data),
            //     };
            // });
        },
    });
};
const getTweets = () => getDocs(collection(db, "tweets")).then((data) => {
    const tweets = [];
    data.forEach((doc) => {
        tweets.push({ id: doc.id, ...doc.data() });
    });
    return { data: tweets };
})
export const useTweetsQuery = () => {
    return useQuery("tweets", getTweets, {


        select: (data) => data.data,
    });
};