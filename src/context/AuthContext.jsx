import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (snap.exists()) setProfile(snap.data());
        } catch {
          // If Firestore not configured yet, use mock profile
          setProfile(null);
        }
      } else {
        // Don't clear user if they are using a demo account
        setUser((prev) => prev?.isDemo ? prev : null);
        setProfile((prev) => prev?.isDemo ? prev : null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const loginAsDemo = (role) => {
    setUser({ uid: 'demo-user', isDemo: true, displayName: `Demo ${role}` });
    setProfile({ role, name: `Demo ${role}`, isDemo: true, village: 'Demo Village', district: 'Demo District' });
  };

  const logout = () => {
    if (user?.isDemo) {
      setUser(null);
      setProfile(null);
      return Promise.resolve();
    }
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout, loginAsDemo }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

