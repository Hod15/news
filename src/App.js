import React, { Component, Fragment } from 'react'
import './assets/css/App.css';
import './assets/css/tailwind.min.css';
import Header from './Components/Header'
import News from './views/News/News'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Error from './views/Errors/Error';
import SearchNews from './views/News/SearchNews';
import Footer from './Components/Footer';

class App extends Component{

  state = {

  }

  render(){
    return (
      <>
        {/* <News /> */}
        <Router>
          <Fragment>
            <Header />
            <Switch>
              <Route exact path="/" component={News} />
              <Route path="/search" component={SearchNews} />
              <Route path="*">
                  <Error  status={404} />
              </Route>
            </Switch>
            <Footer />
          </Fragment>
        </Router>
      </>
    );
  }
}

export default App;