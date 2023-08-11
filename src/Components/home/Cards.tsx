import  { useEffect } from "react";
import styles from "./Cards.module.scss";
import { ChevronRightOutline } from "heroicons-react";
import degree from "../../assets/Ellipse 1icon.png";
import warningicon from "../../assets/Vectorwarninngicon.png";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { setToWarning } from "../../app/reducers/weatherreport/weatherReportSlice";
import { useNavigate } from "react-router-dom";

interface props {
  iconID: string;
  weatherMain: string;
  weatherDescription: string;
  city: string;
  temp: number;
}

const Card = (props: props) => {
  const iconUrl = `https://openweathermap.org/img/wn/${props.iconID}@2x.png`;

  const navigate = useNavigate();
  const dispatcher = useAppDispatch();
  const toWarn = useAppSelector((state) => state.search.toWarning);

  const handleNav = () => {
    navigate(`/weatherdetails/${props.city}`);
  };

  useEffect(() => {
    if (props.weatherMain !== "clear") dispatcher(setToWarning(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.card_container}>
      <header className={styles.card_header}>
        <p className={styles.text}>{props.city}</p>
        <button className={styles.next_button} onClick={handleNav}>
          <ChevronRightOutline />
        </button>
      </header>

      <div className={styles.card_content}>
        <p className={styles.temperature}>
          {(props.temp - 273.15).toFixed(1)}{" "}
          <sup>
            <img src={degree} alt="celsius" />
          </sup>
        </p>

        <img src={iconUrl} alt="icon" className={styles.weather_icon} />
      </div>

      {toWarn && (
        <footer className={styles.card_footer}>
          <div className={styles.warning}>
            <img src={warningicon} alt="warn_icon" />
            <p className={styles.warning_text}>WARNING</p>
          </div>
          <div className={styles.warning_description}>
            <p>{props.weatherDescription}</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Card;
