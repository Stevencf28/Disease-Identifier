import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className='navHeader'>
      <NavLink className='navHeaderLink' to='/'>
        <span
          className='navHeaderText'
          >COMP-308 Emerging Technologies - Group1
        </span>
      </NavLink>
    </div>
  );
};

export default Header;
