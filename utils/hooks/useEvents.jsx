import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc, query, where, onSnapshot } from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";

const addEvents = (newEvents) => setDoc(doc(db, "events", newEvents.id), newEvents)

export const useEventsMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(addEvents, {

    });
};
const deleteEvents = (id) => deleteDoc(doc(db, "events", id))
export const useEventsDelete = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteEvents, {
        onSuccess: (data) => {

        },
    });
};
