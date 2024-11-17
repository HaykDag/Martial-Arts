import './formInput.css';
const FormInput = ({id,type,label,func, value, options})=>{
  
  if(type==='select') return(
    <div className='form-input-cnt'>
      <label htmlFor={id}>{label}:</label>
      <select id={id} value={value} onChange={(e)=>func(e.target.value)}>
      {options.map(option=>(
        <option key={option} value={option}>{option}</option>
      ))}
      </select>
    </div>
  )


  return(
    <div className='form-input-cnt'>
      <label htmlFor={id} >{label}:</label>
      <input
          id={id}
          type={type}
          onChange={(e)=>func(e.target.value)}
          value={value}
      />
    </div>
  )
}

export default FormInput;