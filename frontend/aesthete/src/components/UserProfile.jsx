import Header from "./Header";
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../Aesthete CSS/userprofile.css';


export default function UserProfile() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [portfolios, setPortfolios]  = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [mediaFiles, setMediaFiles] = useState([])
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
                    setUser(loggedInUserData);
                    console.log(loggedInUserData);

                    const portfoliosResponse = await axios.get(`http://localhost:8000/portfolios`);
                    const portfoliosData = portfoliosResponse.data;
                    setPortfolios(portfoliosData);
                    console.log(portfoliosData);

                    const projectsResponse = await axios.get(`http://localhost:8000/projects`);
                    const projectsData = projectsResponse.data;
                    setProjects(projectsData);
                    console.log(projectsData);

                    const reviewsResponse = await axios.get(`http://localhost:8000/reviews`);
                    const reviewsData = reviewsResponse.data;
                    setReviews(reviewsData);
                    console.log(reviewsData);

                    const mediaResponse = await axios.get(`http://localhost:8000/media/?user=${loggedInUserResponse.data.id}`);
                    setMediaFiles(mediaResponse.data);
                    console.log(mediaResponse.data)

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            getUserInfo();
        }
    }, [username]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert('Select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        // Get the CSRF token from cookies
        const csrfToken = Cookies.get('csrftoken');

        try {
            const mediaResponse = await axios.post('http://localhost:8000/media/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken, 
                },
                withCredentials: true,
            });
            console.log('File upload successful', mediaResponse.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const userProject = projects.find(project => project.user === user?.id);
    const userReview = reviews.find(review => review.user === user?.id);
    const userPortfolio = portfolios.find(portfolio => portfolio.user === user?.id)
    
    return (
        <div className='userprofile'>
            <Header />
            <h2>Welcome {username}!</h2>
            {user && (
                <div>
                    {user.image_url ? (
                        <img className='profilepic' src={user.image_url} alt={user.name} />
                    ) : (
                        <p>No profile image available</p>
                    )}
                    <p>{user.location}</p>
                </div>
            )}
            <div className='portfolio-container'>
                <h2>Portfolio</h2>
                {userPortfolio ? (
                    <ul>
                        <li key={userPortfolio.id}>{userPortfolio.title}</li>
                        <p>{userPortfolio.description}</p>
                        <img src={userPortfolio.photo} alt={userPortfolio.title} />
                    </ul>
                ) : ( <p>No Portfolio available</p>
                )}
            </div>

            <div className='project-container'>
                <h2>Upcoming Projects</h2>
                {userProject ? (
                    <div key={userProject.id} className='project-info'>
                        <h2>{userProject.name}</h2> 
                        <img className = 'inspo' src={userProject.inspiration} alt ='lightbulb'></img>
                        <Link to={`/projects/edit/${userProject.id}`}>
                        <button>Edit Project</button>
                    </Link>

                    </div>
                ) : (
                    <p>No projects available</p>
                )}
            </div>
            <div className='reviews-container'>
                <h2>Reviews</h2>
                {userReview ? (
                    <ul>
                        <li key={userReview.id}>{userReview.name}</li> 
                        <li>{userReview.review_text}</li>
                        <li>{userReview.date}</li>
                    </ul>
                ) : (
                    <p>No reviews available</p>
                )}
            </div>
            {/* <div className="file-upload">
                <h2>Portfolio</h2>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleFileUpload}>Upload Portfolio</button>
            </div>
            <div className="media-files">
                <h2>Uploaded Media</h2>
                {mediaFiles.length > 0 ? (
                    <ul>
                        {mediaFiles.map((file) => (
                            <li key={file.id}>
                                <img src={`http://localhost:8000${file.file}`} alt="Portfolio" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No media files uploaded yet.</p>
                )}
            </div> */}
        </div>
    );
}
                        

