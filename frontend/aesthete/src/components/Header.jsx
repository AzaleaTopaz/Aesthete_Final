import Nav from './Nav'

export default function Header () {
    const logout = () => {
        localStorage.removeItem('loggedInUser')
        navigate('/')
      }
    return (
        <div className="Header">
            {/* {<Nav />}  */}
            <button className="logout" onClick={logout}>Log Out</button>
        </div>
    )
}