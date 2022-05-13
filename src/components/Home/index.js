import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import UsersPostsCard from '../UsersPostsCard'
import SearchPostsCard from '../SearchPostsCard'
import Header from '../Header'

import StoriesCard from '../StoriesCard'
import './index.css'

const constantApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    userStories: [],
    usersPosts: [],
    searchPostsList: [],
    searchInput: '',
    searchPostsApiStatus: constantApiStatus.initial,
    usersStoriesApiStatus: constantApiStatus.initial,
    usersPostsApiStatus: constantApiStatus.initial,
  }

  componentDidMount() {
    this.getSearchResults()
    this.getUserStories()
    this.getUserPosts()
  }

  getSearchResults = async () => {
    this.setState({searchPostsApiStatus: constantApiStatus.inProgress})
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
        searchPostsApiStatus: constantApiStatus.success,
        searchPostsList: data.posts,
      })
    } else {
      this.setState({searchPostsApiStatus: constantApiStatus.failure})
    }
  }

  getUserStoriesFormattedData = eachItem => ({
    userId: eachItem.user_id,
    storyUrl: eachItem.story_url,
    userName: eachItem.user_name,
  })

  getUserPosts = async () => {
    this.setState({usersPostsApiStatus: constantApiStatus.inProgress})

    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
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

      this.setState({
        usersPostsApiStatus: constantApiStatus.success,
        usersPosts: data.posts,
      })
    } else {
      this.setState({usersPostsApiStatus: constantApiStatus.failure})
    }
  }

  getUserStories = async () => {
    this.setState({usersStoriesApiStatus: constantApiStatus.inProgress})

    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
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

      const updatedData = data.users_stories.map(eachItem =>
        this.getUserStoriesFormattedData(eachItem),
      )
      this.setState({
        usersStoriesApiStatus: constantApiStatus.success,
        userStories: updatedData,
      })
    } else {
      this.setState({usersStoriesApiStatus: constantApiStatus.failure})
    }
  }

  renderSuccessViewOfUserStories = () => {
    const {userStories} = this.state
    return (
      <>
        <div className="user-stories-mobile-view">
          <StoriesCard slidesToShow={4} userStories={userStories} />
        </div>
        <div className="user-stories-desktop-view">
          <StoriesCard slidesToShow={7} userStories={userStories} />
        </div>
      </>
    )
  }

  renderSuccessViewOfUserPosts = () => {
    const {usersPosts} = this.state
    return (
      <div className="user-posts-detailed-view">
        <ul className="user-posts-list-items">
          {usersPosts.map(eachItem => (
            <UsersPostsCard
              key={eachItem.post_id}
              usersPostsDetails={eachItem}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderSuccessViewOfSearchPosts = () => {
    const {searchPostsList} = this.state
    return (
      <>
        {searchPostsList.length === 0 ? (
          <div className="search-fail-container">
            <img
              src="https://res.cloudinary.com/dpj2drryk/image/upload/v1652192630/Group_1_dwo6su.png"
              alt="search not found"
              className="search-fail-img"
            />
            <h1 className="search-fail-heading">Search Not Found</h1>
            <p className="search-fail-description">
              Try different keyword or search again
            </p>
          </div>
        ) : (
          <div className="user-posts-detailed-view">
            <h1 className="search-heading">Search Results</h1>
            <ul className="user-posts-list-items">
              {searchPostsList.map(eachItem1 => (
                <SearchPostsCard
                  key={eachItem1.post_id}
                  searchPostsDetails={eachItem1}
                />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderUserStories = () => {
    const {usersStoriesApiStatus} = this.state
    switch (usersStoriesApiStatus) {
      case constantApiStatus.inProgress:
        return this.renderLoaderView()
      case constantApiStatus.success:
        return this.renderSuccessViewOfUserStories()
      case constantApiStatus.failure:
        return this.renderFailureViewOfUserStories()
      default:
        return null
    }
  }

  renderUserPosts = () => {
    const {usersPostsApiStatus} = this.state
    switch (usersPostsApiStatus) {
      case constantApiStatus.inProgress:
        return this.renderLoaderView()
      case constantApiStatus.success:
        return this.renderSuccessViewOfUserPosts()
      case constantApiStatus.failure:
        return this.renderFailureViewOfUserPosts()
      default:
        return null
    }
  }

  renderSearchResultsPosts = () => {
    const {searchPostsApiStatus} = this.state
    switch (searchPostsApiStatus) {
      case constantApiStatus.inProgress:
        return this.renderLoaderView()
      case constantApiStatus.success:
        return this.renderSuccessViewOfSearchPosts()
      case constantApiStatus.failure:
        return this.renderFailureViewOfSearchPosts()
      default:
        return null
    }
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  enterSearchInput = () => {
    this.getSearchResults()
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          searchInput={searchInput}
        />
        {searchInput !== '' ? (
          <>{this.renderSearchResultsPosts()}</>
        ) : (
          <>
            {this.renderUserStories()}
            {this.renderUserPosts()}
          </>
        )}
      </>
    )
  }
}
export default Home
