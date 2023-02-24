import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Skills from '../Skills'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiResponse = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobDetailsPage extends Component {
  state = {
    jobDetails: {},
    skillsList: [],
    lifeAtCompany: {},
    detailsStatus: apiResponse.initial,
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({detailsStatus: apiResponse.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const {jobDetails, similarJobs} = updatedData
      const updatedSimilarJobs = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
        id: each.id,
      }))
      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        packagePerAnnum: jobDetails.package_per_annum,
        location: jobDetails.location,
        skills: jobDetails.skills,
        rating: jobDetails.rating,
        id: jobDetails.id,
        title: jobDetails.title,
      }
      const {skills, lifeAtCompany} = updatedJobDetails
      const updatedSkills = skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      const updatedLifeAtCompany = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }
      this.setState({
        jobDetails: updatedJobDetails,
        skillsList: updatedSkills,
        lifeAtCompany: updatedLifeAtCompany,
        detailsStatus: apiResponse.success,
        similarJobs: updatedSimilarJobs,
      })
    } else {
      this.setState({detailsStatus: apiResponse.failure})
    }
  }

  renderJobDetailsFailure = () => (
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

  renderJobDetailsCard = () => {
    const {jobDetails, skillsList, lifeAtCompany, similarJobs} = this.state
    console.log(skillsList)
    const {
      companyLogoUrl,
      jobDescription,
      packagePerAnnum,
      employmentType,
      location,
      companyWebsiteUrl,
      rating,
      title,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <div>
        <div className="job-card-list-item job-card-list-item1">
          <div className="logo-title">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div>
              <h1 className="title">{title}</h1>
              <div className="rating-tab">
                <AiFillStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-details">
            <div className="location-type">
              <div className="location-container">
                <HiLocationMarker className="location-icon" />
                <p className="rating location-text">{location}</p>
              </div>

              <div className="location-container">
                <BsFillBriefcaseFill className="location-icon" />
                <p className="rating location-text">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <div className="description-visit">
            <h1 className="skills-heading">Description</h1>
            <a
              href={companyWebsiteUrl}
              className="visit-tab"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="visit-text">Visit</p>
              <BsBoxArrowUpRight className="visit-logo" />
            </a>
          </div>

          <p className="rating location-text">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skill-ul-list">
            {skillsList.map(each => (
              <Skills skills={each} key={each.name} />
            ))}
          </ul>
          <h1 className="skills-heading">Life At Company</h1>
          <div className="life-at-company-tab">
            <p className="life-description">{description}</p>
            <img className="life-image" src={imageUrl} alt="life at company" />
          </div>
        </div>
        <div className="similar-container">
          <h1 className="skills-heading">Similar Jobs</h1>
          <ul className="similar-job-ul-list">
            {similarJobs.map(each => (
              <SimilarJobItem similarJobs={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobDetailsPage = () => (
    <div className="job-details-bg">
      <Header />
      {this.renderJobDetailsSection()}
    </div>
  )

  renderJobDetailsSection = () => {
    const {detailsStatus} = this.state

    switch (detailsStatus) {
      case apiResponse.success:
        return this.renderJobDetailsCard()
      case apiResponse.failure:
        return this.renderJobDetailsFailure()
      case apiResponse.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return this.renderJobDetailsPage()
  }
}

export default JobDetailsPage
