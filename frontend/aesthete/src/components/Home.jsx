import { Link } from 'react-router-dom'
import 'bulma/css/bulma.min.css';
import '../Aesthete CSS/home.css'

export default function Home () {
return (
    <div className="hero is-fullheight custom-fullheight">
        <h1 className='home-title'>Aesthete</h1>
        <h2 className='home-subtitle'>A place where artists connect</h2>
        <div className = 'home-buttons'>
        <Link to={`/login`}><button className = 'login'>Login</button></Link>
        <Link to={`/signup`}><button className = 'signup'>Sign Up</button></Link>
        </div>

    </div>
)
}