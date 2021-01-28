import React, { Component, Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import request, { apiKey } from './../../api/newsApiAxios'
import NewsCard from './../../Components/NewsCard'
import Error from '../Errors/Error';
import { Redirect } from 'react-router';

class News extends Component{

  state = {
    categories: [
      {
        key: "general",
        value: "Générale"
      },
      {
        key: "health",
        value: "Santé"
      },
      {
        key: "science",
        value: "Science"
      },
      {
        key: "sport",
        value: "sport"
      },
      {
        key: "technology",
        value: "technologie"
      },
    ],
    countries: [
      'us',
      'fr',
      'ca',
      'be',
      'gb',
    ],
    category :  "general",
    country:'fr',
    articles: Array.from({length: 12}),
    pages: 0,
    page: 1,
    status:200,
    search: '',
    redirect: false,
  }

  handleCategory = (category) => {
    this.setState((state) => {
      return { 
        category:category, 
        page:1, 
        articles: Array.from({length: 12})
      }
    })

    request({
      method: 'get',
      url: 'top-headlines',
      params: {
        language:'en',
        country: this.state.country,
        apiKey: apiKey,
        category: category,
        pageSize:12,
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

  handleSearch = (event) => {
    this.setState({ search : event.target.value })
  }

  handleSearchSubmit = (event) => {
    event.preventDefault()
    if(this.state.search.length > 0){
      this.setState({ redirect: true })
    }
  }

  handleCountry = (event) => {
    this.setState((state) => {
      return { 
        country: event.target.value, 
        page: 1, 
        articles: Array.from({length: 12})
      }
    })

    request({
      method: 'get',
      url: 'top-headlines',
      params: {
        language:'en',
        country: event.target.value,
        apiKey: apiKey,
        category: this.state.category,
        pageSize:12,
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

  componentDidMount()
  {
    this.handleCategory(this.state.category)
  }

  fetchMoreData = () => {
    this.setState((state) => {
      return { page: state.page + 1 }
    })
    console.log(this.state.page)

    request({
      method: 'get',
      url: 'top-headlines',
      params: {
        language:'fr',
        apiKey: apiKey,
        category: this.state.category,
        country: this.state.country,
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
    const { redirect, countries, articles, pages, page, categories, status, search } = this.state
    if(redirect)
    {
      <Redirect to={{
        pathname: "/search",
        search: `?q=${search}`,
      }} />
    }
    return (
      <>
        {redirect ? <Redirect to={{
          pathname: "/search",
          search: `?q=${search}`,
        }} /> : null}
        {(status === 200) ? 
        (
          <Fragment>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-12 px-4">
              <div className="flex flex-wrap mt-4 justify-between">
                {
                  categories.map( (category) => (
                    <Fragment key={ category.key } >
                      <span className={`cursor-pointer font-thin mb-2 text-news border border-news px-3 py-1 rounded-full ${(this.state.category === category.key) ? 'text-white news shadow-lg' : ''}`} onClick={() => this.handleCategory(category.key)}>{category.value}</span>
                    </Fragment>
                  ) )
                }
              </div>
              <div className="self-center flex space-x-3 mt-1">
                <form onSubmit={this.handleSearchSubmit} className="mt-1 relative w-3/5 rounded-full shadow-sm">
                  <input 
                    className="h-full rounded-full focus:outline-none border border-news block w-full pl-7 pr-16 sm:text-sm rounded-md" 
                    placeholder="Rechercher par mot clé" 
                    value={this.state.search}
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
                <select 
                  value={this.state.country} 
                  className="self-center uppercase w-20 h-10 py-0 pl-2 pr-7 border border-news focus:outline-none text-gray-500 sm:text-sm rounded-full" 
                  onChange={this.handleCountry}
                >
                  {countries.map((country) => (
                      <Fragment key={country}>
                        <option value={country} className="uppercase"> {country} </option>
                      </Fragment>
                    )
                  )} 
                </select>
              </div>
            </div>
            
            <h1 className="text-2xl font-normal text-news ml-4 mt-4 mb-4 uppercase">{ categories.filter((category) => { return category.key === this.state.category })[0].value }</h1>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6 px-4">
                {
                  articles.map((item, index) => (
                    <Fragment key={index} >
                      <NewsCard article={item}/>
                    </Fragment>
                  ))
                }
              </div>
            </InfiniteScroll>
          </Fragment>
        ):(
          <Error status={status} />
        )}
      </>
    );
  }
}

export default News;
