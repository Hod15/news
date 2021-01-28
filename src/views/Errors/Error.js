import error from './error.jpg'
import { Link } from 'react-router-dom'

const Error = ({ status }) => (
        <div 
            style={{
                backgroundImage: `url(${error})`,
                backgroundClip: 'text',
                color: 'transparent',
                backgroundSize: 'cover',
                backgroundOrigin: 'content-box',
                backgroundPosition: 'top',
                WebkitBackgroundClip: 'text'
            }}
            className="text-center py-32"
        >
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black">Ooops :(</h1>
            {(status === 404) &&
                <div className="font-light">
                    <p className="text-2xl text-news mt-6 mb-6">404 Page introuvable</p>
                    <Link to='/' className="news text-white w-48 px-4 rounded-lg text-center py-2">Retourner à l'àccueil</Link>
                </div>
            }
            { (status === 500) &&
                <p className="font-light text-2xl text-news mt-6 mb-6">500 Something went wrong, Please try later</p>
            }
            { (typeof(status) === 'object') &&
                <p className="font-light text-2xl text-news mt-6 mb-6">You do not have connection, <button className="underline hover:text-blue-300" onClick={(event) => {event.preventDefault();window.location.reload()}} >refresh</button></p>
            }
        </div>
)

export default Error