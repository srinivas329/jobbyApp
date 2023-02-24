import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobs} = props
  const {
    companyLogoUrl,
    jobDescription,
    packagePerAnnum,
    employmentType,
    location,
    rating,
    title,
    id,
  } = similarJobs
  return (
    <li className="job-card-list-item job-card-list-item3">
      <div className="logo-title">
        <img
          className="company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
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
  )
}

export default SimilarJobItem
