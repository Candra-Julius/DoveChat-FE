import style from './input.module.css'

const Input = ({name,type, label, value, placeholder, onChange, min, max}) => {
  return (
    <div className={style.input}>
    <label htmlFor={label}>{label}</label>
      <input 
      name={name}
      id={label}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      min={min}
      max={max}
      required
      />
    </div>
  )
}

export default Input