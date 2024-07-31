import Header from "./Header";
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../Aesthete CSS/userprofile.css';

export default function UserProfile({ user, setUser }) {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
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

          const portfoliosResponse = await axios.get(`http://localhost:8000/portfolios`);
          const portfoliosData = portfoliosResponse.data;
          setPortfolios(portfoliosData);

          const projectsResponse = await axios.get(`http://localhost:8000/projects`);
          const projectsData = projectsResponse.data;
          setProjects(projectsData);

          const reviewsResponse = await axios.get(`http://localhost:8000/reviews`);
          const reviewsData = reviewsResponse.data;
          setReviews(reviewsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      getUserInfo();
    }
  }, [username]);

  const userProjects = projects.filter(project => project.user === user.id);
  const userReview = reviews.find(review => review.user === user?.id);
  const userPortfolio = portfolios.find(portfolio => portfolio.user === user?.id);

  return (
    <div className='userprofile'>
      <Header />
      <div className="container">
        <section className="section has-text-centered">
          <h2 className="title is-2">Welcome, {username}!</h2>
          {user && (
            <div className="box">
              {user.image_url ? (
                <figure className="image is-128x128 is-inline-block">
                  <img className="is-rounded" src={user.image_url} alt={user.name} />
                </figure>
              ) : (
                <p>No profile image available</p>
              )}
              <p className="is-size-5">{user.location}</p>
            </div>
          )}
        </section>

        <section className="section">
          <h2 className="title is-4">Portfolio</h2>
          {userPortfolio ? (
            <div className="box">
              <h3 className="subtitle is-5">{userPortfolio.title}</h3>
              <p>{userPortfolio.description}</p>
              <figure className="image">
                <img src={userPortfolio.photo} alt={userPortfolio.title} />
              </figure>
            </div>
          ) : (
            <p>No Portfolio available</p>
          )}
        </section>

        <section className="section">
          <h2 className="title is-4">Upcoming Projects</h2>
          {userProjects.length > 0 ? (
            userProjects.map(project => (
              <div key={project.id} className="box">
                <h3 className="subtitle is-5">{project.name}</h3>
                <figure className="image">
                  <img className="inspo" src={project.inspiration} alt="lightbulb" />
                </figure>
                <Link to={`/projects/edit/${project.id}`} className="button is-link is-small mt-2">
                  Edit Project
                </Link>
              </div>
            ))
          ) : (
            <p>No projects available</p>
          )}
          <Link to={`/create-project/${username}`} className="button is-primary mt-4">
            Create new Project
          </Link>
        </section>

        <section className="section">
          <h2 className="title is-4">Reviews</h2>
          {userReview ? (
            <div className="box">
              <ul>
                <li><strong>{userReview.name}</strong></li>
                <li>{userReview.review_text}</li>
                <li>{userReview.date}</li>
              </ul>
            </div>
          ) : (
            <p>No reviews available</p>
          )}
        </section>
      </div>
    </div>
  );
}


            


                        

