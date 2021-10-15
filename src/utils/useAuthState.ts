import { onAuthStateChanged } from "firebase/auth";
import { auth } from "index";
import { useEffect, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";

export const useAuthState = () => {
    const [user, setUser] = useState<FirebaseUser | null>(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const listener = onAuthStateChanged(auth, user => {
            if (user) setUser(user)
            setLoading(false)
        })
        return () => listener()
      }, [])
    
    return { user, loading }
}