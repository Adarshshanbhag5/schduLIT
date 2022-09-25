import { collection, onSnapshot, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";

const FirestoreContext = createContext();
export const useFirestoreContext = () => useContext(FirestoreContext);
export function FirestoreProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "events"));
    setLoading(true);
    const unsub = onSnapshot(q, (querysnapshot) => {
      let responseData = [];
      querysnapshot.forEach((doc) => {
        responseData.push(doc.data());
        setLoading(false);
      });
      setData(responseData);
    });
    return () => unsub();
  }, []);

  const value = { data, loading };
  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  );
}
