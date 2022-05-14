import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsHeart, BsHeartFill} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import './index.css'

class UsersPostsCard extends Component {
  state = {isLiked: false, likeCount: 0, likedStatus: false}

  componentDidMount() {
    this.getLikeStatus()
  }

  getLikeStatus = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {likedStatus} = this.state
    const {usersPostsDetails} = this.props
    const {postId} = usersPostsDetails.post_id
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({like_status: likedStatus}),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
  }

  onClickLikeBtn = () => {
    this.setState({isLiked: true})
    this.setState(prevState => ({likeCount: prevState.likeCount + 1}))
    this.setState({likedStatus: true}, this.getLikeStatus)
  }

  onClickDisLikeBtn = () => {
    this.setState({isLiked: false})
    this.setState(prevState => ({likeCount: prevState.likeCount - 1}))
    this.setState({likedStatus: false}, this.getLikeStatus)
  }

  render() {
    const {usersPostsDetails} = this.props
    const {likeCount, isLiked} = this.state
    return (
      <li
        className="userPostsCard-container"
        testid="postCard"
        key={usersPostsDetails.post_id}
      >
        <div className="UsersPostsCard-profile">
          <img
            src={usersPostsDetails.profile_pic}
            alt="UsersPostsCard-profile"
            className="UsersPostsCard-profile-img"
          />

          <Link
            to={`/users/${usersPostsDetails.user_id}`}
            className="nav-logo-link"
          >
            <h1 className="UsersPostsCard-name">
              {usersPostsDetails.user_name}
            </h1>
          </Link>
        </div>

        <img
          src={usersPostsDetails.post_details.image_url}
          alt="post details"
          className="post-details-img"
        />

        <div className="below-container">
          <div className="like-comment-share-container">
            {isLiked ? (
              <button
                type="button"
                className="like-btn"
                onClick={this.onClickDisLikeBtn}
                testid="unLikeIcon"
              >
                <BsHeart className="icon-btn-cls" />
              </button>
            ) : (
              <button
                type="button"
                className="like-btn"
                onClick={this.onClickLikeBtn}
                testid="likeIcon"
              >
                <BsHeartFill className="icon-btn-cls active-like" />
              </button>
            )}
            <FaRegComment className="icon-btn-cls" />
            <BiShareAlt className="icon-btn-cls" />
          </div>
          <p className="likes-count-cls">
            {usersPostsDetails.likes_count + likeCount} likes
          </p>
          <p className="post-details-caption">
            {usersPostsDetails.post_details.caption}
          </p>
          <ul className="comments-detail-container">
            {usersPostsDetails.comments.map(eachItem => (
              <li key={eachItem.user_id} className="comment-list-item">
                <p className="commented-user-name">{eachItem.user_name}</p>
                <p className="commented-text">{eachItem.comment}</p>
              </li>
            ))}
          </ul>
          <p className="created-at">{usersPostsDetails.created_at}</p>
        </div>
      </li>
    )
  }
}
export default UsersPostsCard
