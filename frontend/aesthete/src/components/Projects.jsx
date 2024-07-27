import Header from "./Header";
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';






export default function Projects () {
const [projects, setProjects] = useState([])

useEffect(() => {
    const getProjectInfo = async () => {
        try {
            const projectResponse = await axios.get(`http://localhost:8000/projects`)
            const projectsData = projectResponse.data;
                    setProjects(projectsData);
                    console.log(projectsData);

        }catch (error) {
            console.error('Error fetching data:', error);
        }
    } ;
    getProjectInfo()
}, [])

    return (
        <div className = 'Projects'>
            {projects.map(project => (
               <div key = {project.id} className='project'>
                <h2>{project.name}</h2>
                <p><strong>Start Date:</strong> {project.start_date}</p>
                <p><strong>End Date:</strong> {project.end_date}</p>
                <h2>Inspiration:</h2>
                <img src={project.inspiration} alt={project.name} />
                <p>{project.description}</p>

               </div> 
            ))}
        </div>
    )
    }