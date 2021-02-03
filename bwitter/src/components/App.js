import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
  <>
  <AppRouter isLoggedIn={isLoggedIn}/>
  <footer>&copy; {new Date().getFullYear()} Bwitter</footer>
  </>
  );
}
  
export default App;
