import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Button } from '@mui/material';
import { UserContext } from '../../shared/UserContext';
import { useNavigate } from 'react-router-dom';
const Header = (props) => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  }
  return (
    <div className='navHeader'>
      <NavLink className='navHeaderLink' to='/'>
        <span
          className='navHeaderText'
          >COMP-308 Emerging Technologies - Group1
        </span>
      </NavLink>
      {
        user && user.auth &&
        <Button style={{ background: 'white'}}
          type="button"
          variant="outlined"
          onClick={(e) => handleLogout()}
        > Logout </Button>
      }
      
    </div>
  );
};

export default Header;
