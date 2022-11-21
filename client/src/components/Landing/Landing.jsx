import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Landing.module.css';
import background from '../../img/background.png'

const Landing = () => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.textButton}>
          <h1>Welcome to <i>doggies</i></h1>
          <h3>Curious about dog breeds?</h3>
          <p>Browse our full list of pedigree breeds. Use the filters to find a breed best suited to you.</p>
          <p>Check out information on temperament, cute photos, and more to see what makes each dog breed unique.</p>
          <p> <i>You can even create your own breed!</i> </p>
          <div className={styles.button}>
            <NavLink to='/breeds'><button className={styles.buttonTop}>Learn More</button></NavLink>
          </div>
        </div>
        <div className={styles.image}>
          <img src={background} alt='background' />
        </div>
        <footer className={styles.footer}></footer>
      </div>
    </>
  )
};

export default Landing;