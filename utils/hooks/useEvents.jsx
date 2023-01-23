import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "react-query";

const addEvents = (newEvents) => setDoc(doc(db, "events", newEvents.id), newEvents)

export const useEventsMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(addEvents, {
        onSuccess: (data) => {
            queryClient.refetchQueries("events", getEvents);
            queryClient.setQueryData("events", (oldData) => {
                return {
                    ...oldData,
                    data: [...oldData.data, data.data],
                };
            });
        },
    });
};
const deleteEvents = (id) => deleteDoc(doc(db, "events", id))
export const useEventsDelete = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteEvents, {
        onSuccess: (data) => {
            queryClient.refetchQueries("events", getEvents);
            queryClient.setQueryData("events", (oldData) => {
                return {
                    ...oldData,
                    data: oldData.data.filter((item) => item.id !== data),
                };
            });
        },
    });
};
const getEvents = () => getDocs(collection(db, "events")).then((data) => {
    const events = [];
    data.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
    });
    return { data: events };
})
export const useEventsQuery = () => {
    return useQuery("events", getEvents, {
        fetchOnMount: false,
        select: (data) => data.data,
    });
};