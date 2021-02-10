import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  console.log(authService.currentUser);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  // setInterval(() => {
   
  // }, 2000);
  return (
  <>
  {init ? (
  <AppRouter 
  refreshUser={refreshUser}
  isLoggedIn={Boolean(userObj)} 
  userObj={userObj}/>
   ) : (
     "Initializing..."
   )}
  <footer>&copy; {new Date().getFullYear()} Bwitter</footer>
  </>
  );
}
  
export default App;
