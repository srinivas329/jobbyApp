import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {jobsList} = props
  const {
    companyLogoUrl,
    jobDescription,
    packagePerAnnum,
    employmentType,
    location,
    rating,
    title,
    id,
  } = jobsList
  return (
    <Link className="job-link-decoration" to={`/jobs/${id}`}>
      <li className="job-card-list-item">
        <div className="logo-title">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="description-heading">Description</h1>
        <p className="rating location-text">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
