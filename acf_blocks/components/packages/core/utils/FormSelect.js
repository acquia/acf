import React from 'react'

export default ({value, onChange, options}) => {
  if (!options) {
    return null
  }

  return (
    <div className="acf-form-select">
      <select value={value} onChange={onChange}>
        {
          options.map(val => (
            <option value={val} key={val}>{val}</option>
          ))
        }
      </select>
    </div>
  )
}
