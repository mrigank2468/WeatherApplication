import {  Typography } from "@mui/material";
import navlogo from '../../assets/nav.png';
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar} data-testid="navbar" >
      <img src={navlogo} alt="navbar-icon" data-testid="logo"/>
      <Typography sx={{ fontWeight: "bold" }} data-testid="title"> Weather Forecast</Typography>
      </nav>
  );
};

export default Navbar;