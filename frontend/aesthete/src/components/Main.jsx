import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Signup from './Signup'
// import LoginButton from './LoginButton'
import UserProfile from './UserProfile'

export default function Main() {
    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup/>}/>
                {/* <Route path="/login" element={<LoginButton/>}/> */}
                <Route path='/users/:id' element={<UserProfile />} />
            </Routes>
        </div>
    )
}