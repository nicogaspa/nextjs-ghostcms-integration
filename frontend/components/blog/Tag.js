import React from 'react'

const Tag = ({ tag }) => {
  return (
    <div className="btn tag" style={{ background: tag.accent_color, color: tag.accent_color }}>
      {tag.name}
    </div>
  )
}

export default Tag
