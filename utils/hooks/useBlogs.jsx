import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "react-query";

const addBlogs = (newBlogs) => addDoc(collection(db, "blogs"), newBlogs)

export const useBlogsMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(addBlogs, {
        onSuccess: (data) => {
            queryClient.refetchQueries("blogs", getBlogs);
            // queryClient.setQueryData("blogs", (oldData) => {
            //     return {
            //         ...oldData,
            //         data: [...oldData.data, data.data],
            //     };
            // });
        },
    });
};


const deleteBlogs = (id) => deleteDoc(doc(db, "blogs", id))
export const useBlogsDelete = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteBlogs, {
        onSuccess: (data) => {
            queryClient.refetchQueries("blogs", getBlogs);
            // queryClient.setQueryData("blogs", (oldData) => {
            //     return {
            //         ...oldData,
            //         data: oldData.data.filter((item) => item.id !== data),
            //     };
            // });
        },
    });
};
const getBlogs = () => getDocs(collection(db, "blogs")).then((data) => {
    const blogs = [];
    data.forEach((doc) => {
        blogs.push({ ...doc.data(), id: doc.id, });
    });
    return { data: blogs };
})
export const useBlogsQuery = () => {
    return useQuery("blogs", getBlogs, {
        fetchOnMount: false,
        staleTime: 300000,
        select: (data) => data.data,
    });
};