const Footer = () => {
    return (
        <footer className="font-extralight text-white news text-center py-16">
            Copyright &copy; { (new Date()).getFullYear() }, Made by <a href="http://twitter.com/hodJosias" className="text-blue-300" target="_blank" rel="noopener noreferrer">@Josias</a>
        </footer>
    )
}

export default Footer;