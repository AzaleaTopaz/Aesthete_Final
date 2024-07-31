import Header from "./Header";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Aesthete CSS/projects.css'

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const getProjectInfo = async () => {
      try {
        const projectResponse = await axios.get('http://localhost:8000/projects/');
        const projectsData = projectResponse.data;
        setProjects(projectsData);

        const usersResponse = await axios.get('http://localhost:8000/users');
        const usersData = usersResponse.data.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getProjectInfo();
  }, []);

  return (
    <div className="Projects">
      <Header />
      <div className="container">
        <h1 className="title has-text-centered">Upcoming Projects</h1>
        <div className="columns is-multiline">
          {projects.map(project => {
            const user = users[project.user];
            return (
              <div key={project.id} className="column is-one-third">
                <div className="box">
                  <h2 className="subtitle">{project.name}</h2>
                  <p><strong>Start Date:</strong> {project.start_date}</p>
                  <p><strong>End Date:</strong> {project.end_date}</p>
                  <figure className="image is-4by3">
                    <img src={project.inspiration} alt={project.name} />
                  </figure>
                  <p>{project.description}</p>
                  {user && (
                    <Link to={`/user/${user.username}`}>
                      <button className="button is-link is-small mt-3">View {user.username}'s Portfolio</button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}



