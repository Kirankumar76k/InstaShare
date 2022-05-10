import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

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
    userPosts: [],
    usersStoriesApiStatus: constantApiStatus.initial,
    usersPostsApiStatus: constantApiStatus.initial,
  }

  componentDidMount() {
    this.getUserStories()
    this.getUserPosts()
  }

  getUserStoriesFormattedData = eachItem => ({
    userId: eachItem.user_id,
    storyUrl: eachItem.story_url,
    userName: eachItem.user_name,
  })

  getUserPosts = async () => {
    this.setState({usersPostsApiStatus: constantApiStatus.inProgress})

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
      console.log(data)
      const updatedData = data.users_posts.map(eachItem =>
        this.getUserStoriesFormattedData(eachItem),
      )
      this.setState({
        usersPostsApiStatus: constantApiStatus.success,
        userPosts: updatedData,
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
      console.log(data)
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

  render() {
    return (
      <>
        <Header />
        {this.renderUserStories()}
      </>
    )
  }
}
export default Home
