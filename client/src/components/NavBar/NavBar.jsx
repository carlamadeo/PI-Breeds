import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import Logo from '../../img/doggies-logo-yellow.png';

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to={'/'}><img src={Logo} alt='doggies' className={styles.logo} /></NavLink>
      <div className={styles.links}>
        <NavLink exact to={'/breeds'} className={styles.list} activeClassName={styles.active}>Home</NavLink>
        <NavLink exact to={'/create'} className={styles.list} activeClassName={styles.active}>Create Breed</NavLink>
      </div>
    </nav >
  )
};

export default NavBar;