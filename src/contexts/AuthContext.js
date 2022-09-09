import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import "../lib/firebase";

import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [lodding, setLodding] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLodding(false);
    });

    return unsubscribe;
  }, []);

  // signup function
  async function singup(username, email, password) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);

    //update profile.
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    //update local state.
    const user = auth.currentUser;
    setCurrentUser({
      ...user,
    });
  }

  // login function
  function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  // logout function.
  function logout() {
    const auth = getAuth();
    signOut(auth);
  }

  // Password reset function.
  function passwordreset(email) {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email);
  }

  // register with google.
  async function signInWithGoogle() {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider);
  }

  const value = {
    currentUser,
    singup, 
    login, 
    logout,
    passwordreset, 
    signInWithGoogle, 
  };

  return (
    <AuthContext.Provider value={value}>
      {!lodding && children}
    </AuthContext.Provider>
  );
}
