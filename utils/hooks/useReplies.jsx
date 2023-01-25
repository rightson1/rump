import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "react-query";

const addReplies = (newReplies) => addDoc(collection(db, "replies"), newReplies)

export const useRepliesMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(addReplies, {
        onSuccess: (data) => {
            queryClient.refetchQueries("replies", getReplies);
            queryClient.setQueryData("replies", (oldData) => {
                return {
                    ...oldData,
                    data: [...oldData.data, data.data],
                };
            });
        },
    });
};

const updateReplies = (newReplies) => updateDoc(doc(db, "replies", newReplies.id), newReplies)
export const useRepliesUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation(updateReplies, {
        onSuccess: (data) => {
            queryClient.refetchQueries("replies", getReplies);
            queryClient.setQueryData("replies", (oldData) => {
                return {
                    ...oldData,
                    data: [...oldData.data, data.data],
                };
            });
        },
    });
}
const deleteReplies = (id) => {
    console.log(id)
    return deleteDoc(doc(db, "posts", id))
}
export const useRepliesDelete = () => {

    const queryClient = useQueryClient();

    return useMutation(deleteReplies, {
        onSuccess: (data) => {
            queryClient.refetchQueries("posts", getReplies);

        },
    });
};

const getReplies = (id) => getDocs(query(collection(db, "posts"), where("reply", "==", id))).then((data) => {
    const replies = [];
    data?.forEach((doc) => {
        replies.push({ id: doc.id, ...doc.data() });
    });
    return { data: replies };
})
export const useRepliesQuery = (id) => {

    return useQuery(["posts", id], () => getReplies(id), {
        fetchOnMount: false,
        staleTime: 300000,
        cacheTime: 300000,
        fetchOnMount: false,

        select: (data) => data.data,
    });
};

const getAll = (id) => getDocs(collection(db, "posts")).then((data) => {
    const replies = [];
    data?.forEach((doc) => {
        replies.push({ id: doc.id, ...doc.data() });
    });
    return { data: replies };
})
export const useGetAllReplies = (id) => {

    return useQuery("posts", getAll, {
        fetchOnMount: false,
        staleTime: 300000,
        cacheTime: 300000,
        fetchOnMount: false,

        select: (data) => data.data,
    });
};

