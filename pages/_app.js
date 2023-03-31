import { UserContext } from 'lib/UserContext';
import { useState, useEffect } from 'react';
import "styles/globals.css";

export default function App({ Component, pageProps }) {

  const [user, setUser] = useState({
    username: "",
    user_id: ""
  });

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}
