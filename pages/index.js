import Head from 'next/head'
import { useContext } from 'react';
import { UserContext } from 'lib/UserContext';
import { Inter } from 'next/font/google'
import styles from 'styles/Home.module.css'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [user, setUser] = useContext(UserContext);
  
  function User() { 
    return <h1>{user}</h1>;
  }

  function UserNav() {
    return(
      <>
        <Link href='/login'>Log In</Link>
        <Link href='/signup'>Sign Up</Link>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>Tea Time Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <User />
        <UserNav />
      </main>
    </>
  )
}
