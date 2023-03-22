import 'styles/globals.css'
import { UserContext } from 'lib/UserContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {

  const [user, setUser] = useState("");

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}
