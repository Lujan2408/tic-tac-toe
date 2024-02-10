/* eslint-disable react/prop-types */
export const Square = ({ children, isSelected, uptadeBoard, index  }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}` 
  
    const handleClick = () => {
      uptadeBoard(index)
    }
  
    return (
      <div onClick={handleClick} className={className}>
          {children}
      </div>
    )
  }