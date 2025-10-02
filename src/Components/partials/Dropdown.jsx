 
export default function Dropdown({ func, options, title ,value }) {
  return (
    // <div className='inline-block  flex-wrap '>
      <div className='flex flex-wrap w-[120px]'>
        <select value={value}   onChange={func}>
          <option  disabled>{title}</option>
          {options.map((o, i) => (
            <option key={i} value={o}>{o.toUpperCase()}</option>
          ))}
        </select>
        {/* <span className='custom-arrow'></span> */}
      </div>
    // </div>
  )
}



 