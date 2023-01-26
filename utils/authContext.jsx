
import { createContext, useContext, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "./firebase";
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "./firebase";
import { useRouter } from "next/router";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState({});
    const router = useRouter()
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAdmin({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                });
                const q = query(collection(db, "users"), where("email", "==", user.email));
                getDocs(q).then((res) => {
                    const [admins, ...rest] = res.docs.map((doc) => {
                        return { id: doc.id, ...doc.data() }
                    })
                    if (admins) {
                        const docRef = doc(db, "users", admins.id)
                        updateDoc(docRef, {
                            online: true,
                        }).then(() => {
                            console.log("online")
                        })
                        setUser(admins)
                    } else {
                        setUser(null)
                        router.push('/register')
                    }
                })

            } else {
                setAdmin(null);
            }
        });
        setLoading(false);
        return () => {
            unsub()
        }
    }, [])


    const logout = async () => {
        console.log(user)
        const docRef = doc(db, "users", user.id)
        updateDoc(docRef, {
            online: false
        }).then(() => {
            console.log("offline")
        }).catch((e) => {
            console.log(e)
        })
        setAdmin(null);
        await signOut(auth).then(() => {
            router.push('/login')
        }).catch((e) => {
            console.log(e)
        })
    }
    return (
        <AuthContext.Provider value={{ logout, admin, user }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);