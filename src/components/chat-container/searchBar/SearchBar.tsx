import { FaMinus, FaPlus, FaSearch  } from 'react-icons/fa'
import './index.css'
import { useAppDispatch, useAppSelector } from '../../../store/typedHook'
import { setAddUser } from '../../../actions/appAction';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  handleSearch: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  const [ searchtext, setSearchText ] = useState("");

  const addUser = useAppSelector((state) => state.appReducer.addUser);
  const dispatch = useAppDispatch();

  const handleAddUser = () => {
    dispatch(setAddUser(!addUser));
  }

  useEffect(() => {
    handleSearch(searchtext);
  }, [searchtext, handleSearch]);

  return (
    <>
      <div className='searchbar-container'>
        <div className="searchbar">
            <input className='search-input' placeholder='Search' onChange={(e) => setSearchText(e.target.value)}/>
            <FaSearch color='#fff' size={15} className='search-icon icon'/>
        </div>
        <div className='plus' onClick={handleAddUser}>
          { addUser ? <FaMinus color='#fff' size={20} className='icon'/> : <FaPlus color='#fff' size={20}  className="icon" /> }
        </div>
      </div>
    </>
  )
}