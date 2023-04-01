import Head from 'next/head'
import { useContext } from 'react';
import { UserContext } from 'lib/UserContext';
import { Inter } from 'next/font/google'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [user, setUser] = useContext(UserContext);

  const LogSignStyle = {
      color: "white",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "20px",
      margin: "0 10px",
  }

  function UserNav() {
    return(
      <>
        <ul className="LogSign">
          <li><Link href='/login' style={LogSignStyle}>Log In</Link></li>
          <li><Link href='/signup' style={LogSignStyle}>Sign Up</Link></li>
        </ul>
      </>
    )
  }

  function Title() {
      return(
          <>
            <div className="Title">
              <h1>Tea Time Blog</h1>
            </div>
          </>
      )
  }

  function LogOut(){
      function handleClick() {
          setUser({username: "", user_id: ""})
      }

      return(
      <>
        <ul className="UserLogout">
          <li><h2 className="Username">{user.username}</h2></li>
          <li><button onClick={handleClick} className="LogOut">Log Out</button></li>
        </ul>
      </>)
  }

  function TopBar(){
    if(user.username){
      return(
        <>
          <div className="TopBar">
            <Title />
            <LogOut />
          </div>
            
        </>)
    }else{
      return(
        <>
          <div className="TopBar">
            <Title />
            <UserNav />
          </div>
            
        </>)
    }
  }

  return (
    <>
      <Head>
        <title>Tea Time Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <TopBar />
      </main>
    </>
  )
}
