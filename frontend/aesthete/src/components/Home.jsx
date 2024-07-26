import { Link } from 'react-router-dom'

export default function Home () {
return (
    <div className = 'home'>
        <h1 className='home-title'>Aesthete</h1>
        <h2 className='home-subtitle'>A place where artists connect</h2>
        <div className = 'home-buttons'>
        <Link to={`/login`}><button className = 'login'>Login</button></Link>
        <Link to={`/signup`}><button className = 'signup'>Sign Up</button></Link>
        </div>

    </div>
)
}