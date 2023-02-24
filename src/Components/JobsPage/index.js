import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import EmploymentTypes from '../EmploymentTypes'
import SalaryRangeList from '../SalaryRangeList'
import JobItem from '../JobItem'

import './index.css'

const apiResponse = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsPage extends Component {
  state = {
    profileDetails: {},
    jobsList: [],
    apiStatus: apiResponse.initial,
    jobsStatus: apiResponse.initial,
    checkBoxEvents: [],
    searchInput: '',
    searchInput2: '',
    radioSearch: '',
  }

  componentDidMount() {
    this.getUserProfileDetails()
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({jobsStatus: apiResponse.loading})
    const token = Cookies.get('jwt_token')
    const {checkBoxEvents, searchInput2, radioSearch} = this.state
    const checkboxEventItems = checkBoxEvents.join(',')
    console.log(checkboxEventItems)
    const url = `https://apis.ccbp.in/jobs?employment_type=${checkboxEventItems}&minimum_package=${radioSearch}&search=${searchInput2}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const {jobs} = data
    if (response.ok === true) {
      const updatedJobsList = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        id: each.id,
        packagePerAnnum: each.package_per_annum,
        location: each.location,
        rating: each.location,
        title: each.title,
      }))
      this.setState({
        jobsList: updatedJobsList,
        jobsStatus: apiResponse.success,
      })
    } else {
      this.setState({jobsStatus: apiResponse.failure})
    }
  }

  updateCheckboxEvents = event => {
    const {value, checked} = event.target
    const {checkBoxEvents} = this.state
    const filterValue = employmentTypesList.filter(each => each.label === value)
    if (checked) {
      this.setState(prev => ({
        checkBoxEvents: [
          ...prev.checkBoxEvents,
          filterValue[0].employmentTypeId,
        ],
      }))
    } else {
      const unCheckFilter = checkBoxEvents.filter(
        each => each !== filterValue[0].employmentTypeId,
      )
      this.setState({checkBoxEvents: unCheckFilter})
    }
  }

  getUserProfileDetails = async () => {
    this.setState({apiStatus: apiResponse.loading})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const details = data.profile_details
    if (response.ok === true) {
      const updatedProfileDetails = {
        name: details.name,
        profileImageUrl: details.profile_image_url,
        shortBio: details.short_bio,
      }
      this.setState({
        profileDetails: updatedProfileDetails,
        apiStatus: apiResponse.success,
      })
    } else {
      this.setState({apiStatus: apiResponse.failure})
    }
  }

  renderUserProfile = () => {
    const {profileDetails, searchInput2} = this.state

    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-bg">
        <img className="profile" src={profileImageUrl} alt="profile" />
        <h1 className="user-name">{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    const {searchInput} = this.state
    this.setState({searchInput2: searchInput})
  }

  renderLoader = () => (
    <div className="profile-bg2" data-testid="loader">
      <Loader
        type="ThreeDots"
        className="profile-loader"
        color="#ffffff"
        height="50"
        width="50"
      />
    </div>
  )

  onClickProfileView = () => this.getJobsList()

  renderProfileFailure = () => (
    <div className="profile-bg2">
      <button
        onClick={this.onClickProfileView}
        type="button"
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  renderProfileSection = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiResponse.success:
        return this.renderUserProfile()
      case apiResponse.failure:
        return this.renderProfileFailure()
      case apiResponse.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderJobCardsSection = () => {
    const {jobsStatus} = this.state

    switch (jobsStatus) {
      case apiResponse.success:
        return this.renderJobCard()
      case apiResponse.failure:
        return this.renderJobCardsFailure()
      case apiResponse.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  onClickRetryProfile = () => {
    this.getUserProfileDetails()
  }

  renderJobCardsFailure = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={this.onClickRetryProfile}
        type="button"
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  renderJobCard = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return (
        <div className="failure-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
            alt="no jobs"
          />
          <h1 className="failure-heading">No Jobs Found</h1>
          <p className="failure-description">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }
    return (
      <ul className="ul-list">
        {jobsList.map(each => (
          <JobItem jobsList={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderJobsPage = () => {
    const {profileDetails, jobsList, searchInput} = this.state

    return (
      <div className="jobs-bg">
        <Header className="job-header" />
        <div className="jobs-card">
          <div className="jobs-left-container">
            <div className="search-container2 input-element">
              <input
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                className="search-input"
                type="search"
              />
              <button
                data-testid="searchButton"
                type="button"
                className="icon-container"
                onClick={this.onClickSearchIcon}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderProfileSection()}
            <hr />
            <div>
              <h1 className="employment-type-heading">Type of Employment</h1>
              <ul className="ul-list">
                {employmentTypesList.map(each => (
                  <EmploymentTypes
                    updateCheckboxEvents={this.updateCheckboxEvents}
                    employmentTypes={each}
                    key={each.label}
                  />
                ))}
              </ul>
            </div>
            <hr />
            <div>
              <h1 className="employment-type-heading">Salary Range</h1>
              <ul className="ul-list">
                {salaryRangesList.map(each => (
                  <SalaryRangeList salaryRanges={each} key={each.label} />
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-right-container">
            <div className="search-container input-element2">
              <input
                onChange={this.onChangeSearchInput}
                placeholder="Search"
                value={searchInput}
                className="search-input"
                type="search"
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onClickSearchIcon}
                className="icon-container"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobCardsSection()}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return this.renderJobsPage()
  }
}

export default JobsPage
