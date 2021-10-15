import { onAuthStateChanged } from "firebase/auth";
import { auth } from "index";
import { useEffect, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";

export const useAuthState = () => {
    const [user, setUser] = useState<FirebaseUser | null>(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        const listener = onAuthStateChanged(auth, user => {
            setLoading(false)
            if (user) setUser(user)
        })
        return () => listener()
      }, [])
    
    return { user, loading }
}