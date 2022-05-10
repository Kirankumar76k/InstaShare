import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'

import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

class Header extends Component {
  state = {searchInput: ''}

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickLogout = () => {
    const {history} = this.props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {searchInput} = this.state

    return (
      <nav className="nav-container">
        <div className="logo-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dpj2drryk/image/upload/v1651904777/Standard_Collection_8_lvuxdc.png"
              className="nav-logo-desktop-img"
              alt="website logo"
            />
          </Link>
          <h1 className="nav-title-head">Insta Share</h1>
        </div>
        <button
          type="button"
          className="hamburger-btn"
          onClick={this.onClickHamBtn}
          testid="hamburgerMenuIcon"
        >
          <GiHamburgerMenu className="ham-icon" />
        </button>
        <div className="menu-container">
          <div className="nav-input-container">
            <input
              type="search"
              value={searchInput}
              className="inputCls"
              onChange={this.onChangeSearchInput}
              placeholder="Search Caption"
            />
            <button
              type="button"
              className="search-icon-btn"
              testid="searchIcon"
              onClick={this.onClickSearchIcon}
            >
              <FaSearch className="search-icon" />
            </button>
          </div>
          <ul className="nav-list">
            <li>
              <Link to="/" className="nav-link">
                <p className="nav-name">Home</p>
              </Link>
            </li>
            <li>
              <Link to="/my_profile" className="nav-link">
                <p className="nav-name">Profile</p>
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={this.onClickLogout}
                className="logoutBtn"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
export default Header
