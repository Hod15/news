import React , { Component, Fragment } from 'react'
import {
    Link,
    withRouter
} from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import request, { apiKey } from './../../api/newsApiAxios'
import NewsCard from './../../Components/NewsCard'
import Error from '../Errors/Error';
import { Redirect } from 'react-router';

class SearchNews extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            search: '',
            redirect: false,
            articles: Array.from({length: 12}),
            pages: 0,
            page: 1,
            status: 200,
        }
    }

    handleSearch = (event) => {
        if(this.state.redirect)
            this.setState({ search : event.target.value, redirect: false })
        else
            this.setState({ search : event.target.value })
    }

    handleSearchSubmit = (event) => {
        event.preventDefault()
        if(this.state.search.length > 0){
            this.setState({ redirect: true, page: 1, articles: Array.from({length: 12}) })
            request({
                method: 'get',
                url: 'everything',
                params: {
                  language:'fr',
                  apiKey: apiKey,
                  q: this.state.search,
                  pageSize:12,
                  page:this.state.page
                }
            })
            .then((response) => {
                let nb_page = ((response.data.totalResults % 12) > 0) ? Math.floor(response.data.totalResults / 12) + 1 : Math.floor(response.data.totalResults / 10)
                this.setState((state) => {
                    return {
                        pages: nb_page,
                        articles: response.data.articles,
                        status: response.status
                    }
                })
            })
            .catch((error) => {
                this.setState((state) => {
                  return {
                    status : error
                  }
                })
              })
        }
    }

    useQuery = () => {
        return new URLSearchParams(this.props.location.search)
    }


    componentWillMount()
    {
        this.setState((prevState) => {
            return { search : this.useQuery().get('q') }
        })
    }

    componentDidMount()
    {
        request({
            method: 'get',
            url: 'everything',
            params: {
              language:'fr',
              apiKey: apiKey,
              q: this.state.search,
              pageSize:12,
              page:this.state.page
            }
        })
        .then((response) => {
            let nb_page = ((response.data.totalResults % 12) > 0) ? Math.floor(response.data.totalResults / 12) + 1 : Math.floor(response.data.totalResults / 10)
            this.setState((state) => {
                return {
                    pages: nb_page,
                    articles: response.data.articles,
                    status: response.status
                }
            })
        })
        .catch((error) => {
            this.setState((state) => {
              return {
                status : error
              }
            })
          })
    }

    fetchMoreData = () => {
        this.setState((state) => {
          return { page: state.page + 1 }
        })
        console.log(this.state.page)
    
        request({
          method: 'get',
          url: 'everything',
          params: {
            language:'fr',
            apiKey: apiKey,
            q: this.state.search,
            pageSize:12,
            page:this.state.page
          }
        })
        .then((response) => {
            this.setState((prevState) => {
              return {
                articles: prevState.articles.concat(response.data.articles),
                status: response.status
              }
            })
        })
        .catch((error) => {
            this.setState((state) => {
              return {
                status : error
              }
            })
          })
      }
    
    render(){
        const { redirect,articles, pages, page, status, search } = this.state
        // if(redirect)
        // {
        //     <Redirect to={{
        //         pathname: "/search",
        //         search: `?q=${search}`,
        //     }} />
        // }

        return (
            <>
                {redirect ? <Redirect to={{
                    pathname: "/search",
                    search: `?q=${search}`,
                }} /> : null}
                <div className="flex justify-around space-x-3 mt-6">
                    <Link to="/" className="self-center text-news font-extralight underline hover:no-underline">Retour à l'accueil</Link>
                    <form onSubmit={this.handleSearchSubmit} className="mt-1 h-10 relative w-3/5 rounded-full shadow-sm">
                        <input 
                            className="h-full rounded-full focus:outline-none border border-news block w-full pl-7 pr-16 sm:text-sm text-md rounded-md" 
                            placeholder="Rechercher par mot clé" 
                            value={search}
                            onChange={this.handleSearch}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                            <button className="focus:outline-none px-2 rounded-r-full news h-full py-0 pl-3 pr-4 border-transparent text-white sm:text-sm rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" fill="none" 
                                stroke="currentColor" 
                                strokeWidth={2} strokeLinecap="round"
                                strokeLinejoin="round" 
                                className="text-white w-4 h-4 feather feather-search"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="ml-4 mt-8">
                    <h1 className="px-2 text-3xl font-thin text-news mb-4">Resultats de <span className="font-medium">{`"${this.useQuery().get('q')}"`}</span></h1>
                    <InfiniteScroll
                        dataLength={articles.length}
                        hasMore={(pages >= page) ? true : false}
                        loader={
                            <div className="flex justify-center mt-3 mb-3">
                            <span>
                                <img className="animate-spin w-12 h-12" src="https://img.icons8.com/carbon-copy/100/000000/loading.png" alt="loader img" />
                            </span>
                            </div>
                        }
                        next={this.fetchMoreData}
                    >
                        {(status === 200) ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6 px-4">
                                {
                                    (articles.length > 0) ? articles.map((item, index) => (
                                        <Fragment key={index} >
                                            <NewsCard article={item}/>
                                        </Fragment>
                                    )) : <p>Aucune données trouvées</p>
                                }
                            </div>
                            ): <Error status={500} />
                        }
                    </InfiniteScroll>
                </div>
            </>
        )
    }
}

export default withRouter(SearchNews)