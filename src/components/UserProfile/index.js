import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import SomethingWentWrongCard from '../SomethingWentWrongCard'
import Header from '../Header'

import './index.css'

const constantApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    userProfileList: [],

    userProfileApiStatus: constantApiStatus.initial,
  }

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({userProfileApiStatus: constantApiStatus.inProgress})
    console.log(this.props)
    const {match} = this.props
    const {userId} = match.params
    const apiUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
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
      console.log(data.user_details)
      this.setState({
        userProfileApiStatus: constantApiStatus.success,
        userProfileList: data.user_details,
      })
    } else {
      this.setState({userProfileApiStatus: constantApiStatus.failure})
    }
  }

  renderSuccessViewOfUserProfile = () => {
    const {userProfileList} = this.state

    return (
      <div className="my-profile-responsive">
        <div className="my-profile-container">
          <div className="top-profile-container">
            <img
              src={userProfileList.profile_pic}
              alt="user profile"
              className="user-profile-pic"
            />
            <div className="my-profile-name-container">
              <h1 className="my-profile-head">{userProfileList.user_name}</h1>
              <div className="user-profile-followers-container">
                <p className="my-profile-common">
                  {userProfileList.posts_count} posts
                </p>
                <p className="my-profile-common">
                  {userProfileList.followers_count} followers
                </p>
                <p className="my-profile-common">
                  {userProfileList.following_count} following
                </p>
              </div>
              <p className="my-profile-name">{userProfileList.user_id}</p>
              <p className="my-profile-bio">{userProfileList.user_bio}</p>
            </div>
          </div>
          <ul className="my-profile-user-stories-container">
            {userProfileList.stories.map(eachItem => (
              <li key={eachItem.id} className="my-profile-story-item">
                <img
                  src={eachItem.image}
                  alt="user story"
                  className="my-profile-story-img"
                />
              </li>
            ))}
          </ul>
          <hr />
          <div className="my-grid-container">
            <BsGrid3X3 size="24px" />
            <h1 className="my-grid-text">Posts</h1>
          </div>
          {userProfileList.posts.length > 0 ? (
            <ul className="my-profile-post-list">
              {userProfileList.posts.map(eachItem => (
                <li key={eachItem.id} className="my-profile-post-list-item">
                  <img
                    src={eachItem.image}
                    alt="user post"
                    className="my-profile-posts-img"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <BiCamera />
              <h1>No Posts</h1>
            </div>
          )}
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  retryFunction = () => {
    this.getUserProfile()
  }

  renderFailureViewOfUserProfile = () => (
    <SomethingWentWrongCard retryFunction={this.retryFunction} />
  )

  renderUserProfileView = () => {
    const {userProfileApiStatus} = this.state
    switch (userProfileApiStatus) {
      case constantApiStatus.inProgress:
        return this.renderLoaderView()
      case constantApiStatus.success:
        return this.renderSuccessViewOfUserProfile()
      case constantApiStatus.failure:
        return this.renderFailureViewOfUserProfile()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderUserProfileView()}
      </>
    )
  }
}
export default UserProfile
