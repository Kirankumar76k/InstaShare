import Slider from 'react-slick'
import './index.css'

const StoriesCard = props => {
  const {slidesToShow, userStories} = props

  const settings = {
    dots: false,
    infinite: false,
    speed: 100,
    slidesToScroll: 1,
  }

  return (
    <div className="user-stories-list-items">
      <Slider {...settings} slidesToShow={slidesToShow}>
        {userStories.map(eachItem => (
          <div key={eachItem.userId}>
            <div className="main-container">
              <img
                src={eachItem.storyUrl}
                alt="user story"
                className="story-img"
              />
              <p className="story-user-name">{eachItem.userName}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}
export default StoriesCard
