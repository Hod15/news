import './../assets/css/skeleton.css'

const NewsCard = ({ article }) => {
    const skeletonLoader = (
        <div className="cursor-pointer mb-3 flex flex-col md:shadow-none shadow-md rounded-sm md:hover:shadow-xl transition-shadow duration-400 pb-2">
            <div className="w-full skeleton-box" style={{ height:'10em' }}></div>
            <div className="px-4 w-full">
                <span className="w-full skeleton-box mt-2" style={{ height:'15px' }}></span>
                <span className="w-full skeleton-box mt-1" style={{ height:'15px' }}></span>
                <span className="w-full skeleton-box mt-1" style={{ height:'15px' }}></span>
                <span className="w-full skeleton-box mt-1" style={{ height:'15px' }}></span>
                <span className="w-full skeleton-box mt-1" style={{ height:'15px' }}></span>
                <div className="flex justify-between mt-3">
                    <span className="w-16 skeleton-box" style={{ height:'10px' }}></span>
                    <span className="w-16 skeleton-box" style={{ height:'10px' }}></span>
                </div>
            </div>
        </div>
    )
    const publishedSince = () => {
        let hours_left = ((new Date()).getTime() - (new Date(article.publishedAt)).getTime()) / 36e5
        if(Math.ceil(hours_left) > 24)
            return Math.ceil(hours_left / 24) + " jour(s)"
        else
            return Math.ceil(hours_left) + " heure(s)"
    }
    return (!article) ? skeletonLoader :
    (
        <a 
            href={article.url}
            target="_blank" 
            rel="noopener noreferrer"
            className="cursor-pointer mb-3 flex flex-col md:shadow-none shadow-md rounded-sm md:hover:shadow-xl transition-shadow duration-400 pb-2"
        >
            { (article.urlToImage) ?<img className="w-full h-52" src={article.urlToImage} alt={article.title} /> : <div className="w-full h-72 flex justify-center bg-gray-200"><img className="h-20 w-20 self-center" src="https://img.icons8.com/dotty/80/000000/no-image.png" alt={`no ${article.title} file`} /></div> }
            <div className="px-4 flex flex-col h-full">
                <span className="underline hover:no-underline mt-2 text-news font-medium mt-3 mb-3">
                    {article.title}
                </span>
                <p className="text-justify font-extralight">
                    {article.description}
                </p>
                <div className="flex flex-grow font-extralight justify-between mt-3">
                    <span className="text-gray-400 self-end text-xs">Publié il y'a { publishedSince() }</span>
                    <span className="text-news text-xs self-end font-light">{ article.source.name }</span>
                </div>
            </div> 
        </a>
    )
}

export default NewsCard