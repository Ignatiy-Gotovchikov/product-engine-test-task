import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../app/providers/StoreProvider/store';
import { logout } from '../../../features/auth/model/slice';
import styles from './Navbar.module.scss';
import { useNavigate } from 'react-router-dom';
import { RiUser3Fill } from 'react-icons/ri';

export default function Navbar () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.linksContainer}>
        <Link to="/home">Home</Link>
        <Link to="/activation">Activation</Link>
        <Link to="/account">Account</Link>
      </div>

      <div className={styles.rightSide}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
        <RiUser3Fill className={styles.userIcon} />
      </div>
    </nav>
  );
};
