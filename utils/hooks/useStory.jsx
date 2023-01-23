import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "react-query";

const addStory = (newStory) => addDoc(collection(db, "stories"), newStory)

export const useStoryMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(addStory, {
        onSuccess: (data) => {
            queryClient.refetchQueries("stories", getStories);
            queryClient.setQueryData("stories", (oldData) => {
                return {
                    ...oldData,
                    data: [...oldData.data, data.data],
                };
            });
        },
    });
};


const deleteStory = (id) => deleteDoc(doc(db, "stories", id))
export const useStoryDelete = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteStory, {
        onSuccess: (data) => {
            queryClient.refetchQueries("stories", getStories);
            queryClient.setQueryData("stories", (oldData) => {
                return {
                    ...oldData,
                    data: oldData.data.filter((item) => item.id !== data),
                };
            });
        },
    });
};
const getStories = () => getDocs(collection(db, "stories")).then((data) => {
    const stories = [];
    data.forEach((doc) => {
        stories.push({ id: doc.id, ...doc.data() });
    });
    return { data: stories };
})
export const useStoryQuery = () => {
    return useQuery("stories", getStories, {
        fetchOnMount: false,
        staleTime: 300000,
        select: (data) => data.data,
    });
};