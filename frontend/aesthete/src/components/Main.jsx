import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import UserProfile from './UserProfile'
import LoginPage from './LoginPage'
import Projects from './Projects'
import ProjectForm from './ProjectForm'
import CreateProjectForm from './CreateProjectForm';
import { useState } from 'react'


export default function Main() {
    const [user, setUser] = useState(null);
    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path="/username/:username" element={<UserProfile user={user} setUser={setUser} />} />
                <Route path='/projects' element ={<Projects />} />
                <Route path='/projects/edit/:id' element={<ProjectForm  user={user} />} />
                <Route path='/create-project/:username' element={<CreateProjectForm user={user} />} />

            </Routes>
        </div>
    )
}