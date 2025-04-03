import { FaPlus, FaSearch  } from 'react-icons/fa'
import './index.css'

export const SearchBar = () => {
  return (
    <>
      <div className='searchbar-container'>
        <div className="searchbar">
            <input className='search-input' placeholder='Search'/>
            <FaSearch color='#fff' size={15} className='search-icon'/>
        </div>
        <div className='plus'>
              <FaPlus color='#fff' size={20} />
            </div>
      </div>
    </>
  )
}