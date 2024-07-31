// import Nav from './Nav'
// import Projects from './Projects'
export default function Header () {
    const logout = () => {
        localStorage.removeItem('loggedInUser')
        navigate('/')
      }
    return (
        <div className="Header">
            {/* {<Nav />}  */}
            <button className="logout" onClick={logout}>Log Out</button>
            {/* <Projects>Projects</Projects> */}
        </div>
    )
}