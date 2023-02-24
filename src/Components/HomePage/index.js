import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

class HomePage extends Component {
  onClickFindJobs = () => {
    const {history} = this.props
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      history.replace('/jobs')
    }
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="home-bg">
        <Header />
        <div className="home-content-tab">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary information,
            company reviews, Find the job that fits your abilities and
            potential.
          </p>
          <br />
          <Link to="/jobs">
            <button
              className="find-jobs-btn"
              onClick={this.onClickFindJobs}
              type="button"
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default HomePage
