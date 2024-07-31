import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../Aesthete CSS/login.css'
import 'bulma/css/bulma.min.css';

export default function LoginPage () {
    const initialState = {
      username: '',
      password: '',
      error: ''
    }
  
    const [formState, setFormState] = useState(initialState)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        const getUsers = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/users`)
            setUsers(response.data)
            console.log(response.data)
          } catch (error) {
            console.error('User does not exist', error)
          }
        }
        getUsers()
      }, [])
      
      useEffect(() => {
      const loggedInUser = localStorage.getItem('loggedInUser');
      console.log(loggedInUser)
      if (loggedInUser) {
          const goToUserProfile = async () => {
              try {
                  console.log('Fetching user profile for:', loggedInUser);
                  const userResponse = await axios.get(`http://localhost:8000/users/${loggedInUser}`);
                  navigate(`/username/${userResponse.data.username}`);
              } catch (error) {
                  console.error('Error fetching user profile:', error);
              }
          };
          goToUserProfile();
      }
  }, [navigate]);

          const getUserId = async (username) => {
            try {
              const response = await axios.get(`http://localhost:8000/users/username/${username}`)
              
              localStorage.setItem('loggedInUser', response.data._id)
              navigate(`/username/${username}`)
            } catch (error) {
              console.error("Error fetching data:", error)
            }
          }


  
  
    const handleSubmit = (e) => {
      e.preventDefault()
  
      const user = users.find(user => user.username === formState.username)
  
    //   // Checks if user exists
      if (!user) {
        setFormState({
          ...formState,
          error: 'Username does not exist'
        })
        return
      }
    //   // Checks Password
      if (user.password !== formState.password) {
        setFormState({
          ...formState,
          error: 'Please enter a valid password'
        })
        return
      }
      getUserId(formState.username)
    }
    const handleChange = (e) => {
      setFormState({...formState,
        [e.target.id] : e.target.value,
        error:''
      })
    }
    return (
      <div className="loginpage">
        <div className="has-text-centered">
          <h1 className="title is-1">Aesthete</h1>
          <p className="subtitle is-4">Where Artists Connect</p>
        </div>
  
        <form className="box" onSubmit={handleSubmit}>
          <h3 className="title is-4">Log in</h3>
  
          <div className="field">
            <label className="label" htmlFor="username">Username</label>
            <div className="control">
              <input
                type="text"
                id="username"
                className="input"
                placeholder="User Name"
                onChange={handleChange}
                value={formState.username}
              />
            </div>
          </div>
  
          <div className="field">
            <label className="label" htmlFor="password">Password</label>
            <div className="control">
              <input
                type="password"
                id="password"
                className="input"
                placeholder="Enter your password"
                onChange={handleChange}
                value={formState.password}
              />
            </div>
          </div>
  
          {formState.error && <p className="has-text-danger">{formState.error}</p>}
  
          <div className="field is-grouped is-grouped-centered mt-4">
            <div className="control">
              <button className="button is-primary" type="submit">Log in</button>
            </div>
          </div>
  
          <div className="field is-grouped is-grouped-centered mt-4">
            <hr className="my-4"/>
            <p className="control">
              
            </p>
            <div className="control">
              <Link to="/signup" className="button is-link">Sign up</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }