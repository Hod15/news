const Footer = () => {
    return (
        <footer className="absolute bottom-0 left-0 right-0 font-extralight text-white news text-center py-16">
            Copyright &copy; { (new Date()).getFullYear() }, Made by <a href="http://twitter.com/hodJosias" className="text-blue-300" target="_blank" rel="noopener noreferrer">@Josias</a>
        </footer>
    )
}

export default Footer;