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
    return <h2>Current User: {user}</h2>;
  }

  function UserNav() {
    return(
      <>
        <Link href='/login'>Log In</Link><br/>
        <Link href='/signup'>Sign Up</Link><br/>
      </>
    )
  }

  function Title() {
      return(
          <>
              <h1>Tea Time Blog</h1>
          </>
      )
  }

  function LogOut(){
      function handleClick() {
          setUser(null)
      }

      return(
          <>
              <button onClick={handleClick}>Log Out</button>
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
          <Title />
          <User />
          <UserNav />
          <LogOut />
      </main>
    </>
  )
}
