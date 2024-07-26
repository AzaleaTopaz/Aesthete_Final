import Header from "./Header";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Aesthete CSS/userprofile.css'
export default function UserProfile() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedInUser) {
            navigate('/');
        }
    }, [loggedInUser, navigate]); 

    useEffect(() => {
        if (username) { 
            const getUserInfo = async () => {
                try {
                    const loggedInUserResponse = await axios.get(`http://localhost:8000/users/username/${username}`);
                    const loggedInUserData = loggedInUserResponse.data;
                    setUser(loggedInUserData)
                    console.log(loggedInUserData);

                    const projectsResponse = await axios.get(`http://localhost:8000/projects`);
                    const projectsData = projectsResponse.data;
                    setProjects(projectsData);
                    console.log(projectsData);

                    const reviewsResponse = await axios.get(`http://localhost:8000/reviews`);
                    const reviewsData = reviewsResponse.data;
                    setReviews(reviewsData);
                    console.log(reviewsData);

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            getUserInfo();
        }
    }, [username]);
     
    const userProject = projects.find(project => project.id === user?.id);
    return (
        <div className = 'userprofile'>
        <Header />
        <h2>Welcome {username}!</h2>
        {user && (
            <div>
                {user.image_url ? (
                    <img className ='profilepic'src={user.image_url} alt={user.name} />
                   
                ) : (
                    <p>No profile image available</p>
                )}
                 <p>{user.location}</p>
            </div>
        )}
          <div className='project-container'>
                <h1>Upcoming Project</h1>
                {userProject ? (
                    <ul>
                        <li key={userProject.id}>{userProject.name}</li> 
                        <li>{userProject.inspiration}</li>

                    </ul>
                ) : (
                    <p>No projects available</p>
                )}
            </div>
    </div>
);
}