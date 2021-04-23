import React from 'react'

export const ImageCardTag = ( { tag }) => {
    return (
        <span className="inline-block bg-gray-300 rounded-full px-5 py-2 text-sm 
              font-semibold text-gray-700 mr-4 mb-2">
            #{tag.trim()}
          </span>
    )
}
