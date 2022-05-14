import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Header from '../Header'
import SomethingWentWrongCard from '../SomethingWentWrongCard'
import './index.css'

const constantApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {
    myProfileList: [],

    myProfileApiStatus: constantApiStatus.initial,
  }

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    this.setState({myProfileApiStatus: constantApiStatus.inProgress})

    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
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
      console.log(data.profile)
      this.setState({
        myProfileApiStatus: constantApiStatus.success,
        myProfileList: data.profile,
      })
    } else {
      this.setState({myProfileApiStatus: constantApiStatus.failure})
    }
  }

  renderSuccessViewOfMyProfile = () => {
    const {myProfileList} = this.state
    return (
      <div className="my-profile-responsive">
        <div className="my-profile-container">
          <div className="top-profile-container">
            <img
              src={myProfileList.profile_pic}
              alt="my profile"
              className="my-profile-pic"
            />
            <div className="my-profile-name-container">
              <h1 className="my-profile-head">{myProfileList.user_name}</h1>
              <div className="my-profile-followers-container">
                <p className="my-profile-common">
                  {myProfileList.posts_count} posts
                </p>
                <p className="my-profile-common">
                  {myProfileList.followers_count} followers
                </p>
                <p className="my-profile-common">
                  {myProfileList.following_count} following
                </p>
              </div>
              <p className="my-profile-name">{myProfileList.user_id}</p>
              <p className="my-profile-bio">{myProfileList.user_bio}</p>
            </div>
          </div>
          <ul className="my-profile-user-stories-container">
            {myProfileList.stories.map(eachItem => (
              <li key={eachItem.id} className="my-profile-story-item">
                <img
                  src={eachItem.image}
                  alt="my story"
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
          {myProfileList.posts.length > 0 ? (
            <ul className="my-profile-post-list">
              {myProfileList.posts.map(eachItem => (
                <li key={eachItem.id} className="my-profile-post-list-item">
                  <img
                    src={eachItem.image}
                    alt="my post"
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
    this.getMyProfile()
  }

  renderFailureViewOfMyProfile = () => (
    <SomethingWentWrongCard retryFunction={this.retryFunction} />
  )

  renderMyProfileView = () => {
    const {myProfileApiStatus} = this.state
    switch (myProfileApiStatus) {
      case constantApiStatus.inProgress:
        return this.renderLoaderView()
      case constantApiStatus.success:
        return this.renderSuccessViewOfMyProfile()
      case constantApiStatus.failure:
        return this.renderFailureViewOfMyProfile()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderMyProfileView()}
      </>
    )
  }
}
export default MyProfile
