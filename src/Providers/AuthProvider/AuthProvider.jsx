import { createContext } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const handleSignup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const handleLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }



    const userInfo = {
        handleSignup,
        auth,
        handleLogin
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;