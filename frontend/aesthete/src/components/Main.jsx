import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import UserProfile from './UserProfile'
import LoginPage from './LoginPage'
import Projects from './Projects'


export default function Main() {
    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path="/username/:username" element={<UserProfile />} />
                <Route path='/projects' element ={<Projects />} />

            </Routes>
        </div>
    )
}