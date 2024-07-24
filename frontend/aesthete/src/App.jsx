import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import UserProfile from './components/UserProfile'

function App() {
  

  return (
    <div className = 'App'>
      <Header/>
      <Main/>
      <Footer/>
      <LoginButton />
      <LogoutButton />
      <UserProfile />

    </div>
  )
  }

export default App
