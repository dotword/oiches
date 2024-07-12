

export const Input = ({type,className,placeholder,name}) => {
  
  return (
    <div>
      <input id={name} name={name} type={type} className={className} placeholder={placeholder} />
    </div>
  )
}
