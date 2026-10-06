import { useEffect, useState } from 'react';
import { useParams, Navigate, Outlet } from 'react-router-dom';
import type { User } from '../types/app';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/AuthContext';
import styles from './AuthProviderLayout.module.css';

export const AuthProviderLayout = () => {
   const {userId} = useParams();
   const [user, setUser] = useState<User>();
   const [loading, setLoading] = useState(true);

   //fetch user information from backend
   useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await fetch(`/api/users/${userId}`, {
            method: "GET"
          });
  
          if (!res.ok) throw new Error("Failed to fetch");
  
          const data = await res.json();
          setUser(data);
        }
        catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      if (userId) fetchUser();
  
    }, [userId]);
  if (loading) return <p>Loading...</p>
  if (!user) return <Navigate to="/"/>
  return (
    //once user is authenticated into session, layout of the application will change
    //acts as a wrapper, providing information of user from top (parent) down (child) 
    <AuthContext.Provider value={{user, loading}}>
      <div className={styles.appLayout}>
        <Sidebar/>
        <main className={styles.mainContent}>
          {loading ? <>Loading...</> : <Outlet/>}
        </main>
      </div>
    </AuthContext.Provider>
  )
}
