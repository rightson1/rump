import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc, query, where, updateDoc } from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "react-query";

const addNotes = (newNotes) => addDoc(collection(db, "notes"), newNotes)

export const useNotesMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(addNotes, {
        onSuccess: (data) => {
            queryClient.refetchQueries("notes", getNotes);

        },
    });
};


const updateNotes = (newNotes) => updateDoc(doc(db, "notes", newNotes.id), newNotes)
export const useNotesUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation(updateNotes, {
        onSuccess: (data) => {
            queryClient.refetchQueries("notes", getNotes);

        },
    });
}
const deleteNotes = (id) => deleteDoc(doc(db, "notes", id))
export const useNotesDelete = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteNotes, {
        onSuccess: (data) => {
            queryClient.refetchQueries("notes", getNotes);

        },
    });
};
const getNotes = (id) => getDocs(query(collection(db, "notes"), where("userId", "==", id))).then((data) => {
    const notes = [];
    data.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data() });
    });
    return { data: notes };
})
export const useNotesQuery = (id) => {
    console.log(id)
    return useQuery("notes", () => getNotes(id), {
        fetchOnMount: false,
        staleTime: 300000,
        select: (data) => data.data,
    });
};