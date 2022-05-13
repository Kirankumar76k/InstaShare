import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsHeart, BsHeartFill} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import './index.css'

class UsersPostsCard extends Component {
  getName = () => {
    const {usersPostsDetails} = this.props
    console.log(usersPostsDetails)
  }

  render() {
    const {usersPostsDetails} = this.props

    return (
      <div className="userPostsCard-container" key={usersPostsDetails.post_id}>
        <div className="UsersPostsCard-profile">
          <Link to={`/users/${usersPostsDetails.user_id}`}>
            <div className="img-container">
              <img
                src={usersPostsDetails.profile_pic}
                alt="UsersPostsCard-profile"
                className="UsersPostsCard-profile-img"
              />
            </div>
          </Link>
          <p className="UsersPostsCard-name"> {usersPostsDetails.user_name}</p>
        </div>
        <div className="post-details-container">
          <img
            src={usersPostsDetails.post_details.image_url}
            alt="post details"
            className="post-details-img"
          />
        </div>
        <div className="below-container">
          <div className="like-comment-share-container">
            <button type="button" className="like-btn">
              <BsHeart className="icon-btn-cls" />
              {/* <BsHeartFill className="icon-btn-cls active-like" /> */}
            </button>
            <FaRegComment className="icon-btn-cls" />
            <BiShareAlt className="icon-btn-cls" />
          </div>
          <p className="likes-count-cls">
            {usersPostsDetails.likes_count} likes
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
      </div>
    )
  }
}
export default UsersPostsCard
