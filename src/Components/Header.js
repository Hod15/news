import logo from './../logo.svg';
import { /*NavLink,*/ Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="font-extralight text-white news flex sm:flex-row flex-col sm:justify-between px-2 sm:px-8">
          <Link to="/" className="focus:outline-none flex sm:justify-between self-center" >
            <img src={logo} className="App-logo w-20 h-20 mr-2" alt="logo" />
            <h1 className="self-center text-2xl">New's</h1>
          </Link>
          <span className="self-center mb-4 sm:mb-0" >The news like you never seen before</span>
        </header>
    )
}

export default Header;