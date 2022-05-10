import {Component} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import LoginForm from './components/LoginForm'

import Home from './components/Home'
import NotFound from './components/NotFound'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import SearchContext from './Context/SearchContext'

const constantApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class App extends Component {
  state = {
    apiStatus: constantApiStatus.initial,
    searchInput: '',
    showSearchComponent: false,
    userPosts: [],
  }

  getUserPostsBySearching = async () => {
    this.setState({apiStatus: constantApiStatus.inProgress})
    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.setState({
        apiStatus: constantApiStatus.success,
        userPosts: data.posts,
      })
    } else {
      this.setState({apiStatus: constantApiStatus.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  render() {
    const {searchInput, userPosts, apiStatus, showSearchComponent} = this.state
    return (
      <div className="app-container">
        <SearchContext.Provider
          value={{
            showSearchComponent,
            searchInput,
            userPosts,
            apiStatus,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </SearchContext.Provider>
      </div>
    )
  }
}

export default App
