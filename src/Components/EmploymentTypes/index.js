import './index.css'

const EmploymentTypes = props => {
  const {employmentTypes, updateCheckboxEvents} = props
  const {label} = employmentTypes
  const onChangeCheckbox = event => {
    updateCheckboxEvents(event)
  }

  return (
    <li className="list-item">
      <input
        type="checkbox"
        onChange={onChangeCheckbox}
        id="checkbox"
        name={label}
        value={label}
      />{' '}
      <label htmlFor="checkbox">{label}</label>
    </li>
  )
}

export default EmploymentTypes
