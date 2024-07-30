import Header from "./Header";
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';






export default function Projects () {
const [projects, setProjects] = useState([])
const [users, setUsers] = useState([])

useEffect(() => {
    const getProjectInfo = async () => {
        try {
            const projectResponse = await axios.get(`http://localhost:8000/projects`)
            const projectsData = projectResponse.data;
                    setProjects(projectsData);
                    console.log(projectsData);

                    const usersResponse = await axios.get('http://localhost:8000/users');
                    const usersData = usersResponse.data.reduce((acc, user) => {
                        acc[user.id] = user;
                        return acc;
                    }, {});
                    setUsers(usersData);

        }catch (error) {
            console.error('Error fetching data:', error);
        }
    } ;
    getProjectInfo()
}, [])


return (
    <div className='Projects'>
        <h1>Upcoming Projects</h1>
        {projects.map(project => {
            const user = users[project.user];
            return (
                <div key={project.id} className='project'>
                    <h2>{project.name}</h2>
                    <p><strong>Start Date:</strong> {project.start_date}</p>
                    <p><strong>End Date:</strong> {project.end_date}</p>
                    <h2>Inspiration:</h2>
                    <img src={project.inspiration} alt={project.name} />
                    <p>{project.description}</p>
                    {/* Link to UserProfile with username */}
                    {user && (
                        <Link to={`/username/${user.username}`}>
                            <button>View {user.username}'s Portfolio</button>
                        </Link>
                    )}
                </div>
            );
        })}
    </div>
);
    }