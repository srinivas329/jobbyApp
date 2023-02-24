import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="header-ul-list">
      <div className="header-bg">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>

        <div className="links-tab">
          <li className="header-list-item">
            <Link to="/">
              <p className="nav-links">Home</p>
              <AiFillHome className="home-icon" />
            </Link>
          </li>
          <li className="header-list-item">
            <Link to="/jobs">
              <p className="nav-links">Jobs</p>
              <BsFillBriefcaseFill className="home-icon" />
            </Link>
          </li>
          <li className="header-list-item">
            <FiLogOut onClick={onClickLogout} className="home-icon" />
          </li>
        </div>
        <button className="logout-btn" onClick={onClickLogout} type="button">
          Logout
        </button>
      </div>
    </ul>
  )
}
export default withRouter(Header)
