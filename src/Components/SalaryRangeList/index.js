import './index.css'

const SalaryRangeList = props => {
  const {salaryRanges} = props
  const {label} = salaryRanges
  return (
    <li className="list-item">
      <input id="radio" name={label} value={label} type="radio" />
      <label htmlFor="radio">{label}</label>
    </li>
  )
}

export default SalaryRangeList
