import './index.css'

const Skills = props => {
  const {skills} = props
  const {imageUrl, name} = skills
  console.log(skills)
  return (
    <li className="skill-list-item">
      <img className="skill-logo" src={imageUrl} alt={name} />
      <p className="skill-name">{name}</p>
    </li>
  )
}
export default Skills
