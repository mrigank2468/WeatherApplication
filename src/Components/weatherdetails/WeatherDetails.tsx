import  { useEffect } from "react";
import { Navbar } from "react-bootstrap";
import styles from "./WeatherDetails.module.scss";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ControlPointOutlinedIcon from "@material-ui/icons/ControlPointOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import degree from "../../assets/Ellipse 1icon.png";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useNavigate, useParams } from "react-router-dom";
import { setList } from "../../app/reducers/weatherreport/graphSlice";
import {setCaruselList,setIsAddToList,setCityName,setTemperature,setWeatherDescription,setWeatherIconId,setWeatherMain,setHumidity,setPressure,setSunrise,setSunset,setDt,setRain,
} from "../../app/reducers/weatherreport/weatherReportSlice";
import { WeatherInfo } from "../home/WeatherInfo";
import axios from "axios";
import Graph from "./Graph";
import { ICarousel } from "../home/ICarusel";
import { IGraph } from "./Igraph";
const WeatherDetails = () => {
  const isAddToList = useAppSelector((state) => state.search.isAddToList);
  const apiKey = "019bbaf0caaa302418a19bbe6cb2ff84";
  const curweath = useAppSelector((state) => state.search.WeatherInfo);
  const navigate = useNavigate();
  const { caruselList } = useAppSelector((state) => state.search);
  const list = useAppSelector((state) => state.graph.list);
  const dispatcher = useAppDispatch();
  const params = useParams();
  
  const goBack = () => {
    navigate("../");
  };
  const fiveDayForecast = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${params.city}&appid=${apiKey}`
      );
      let data: IGraph = res.data;
      dispatcher(setList(data.list));
    } catch (error) {
      console.log(error);
    }
  };
  
  const WeatherDetails = async () => {
    try {
      let res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=${apiKey}`
      );

      const data: WeatherInfo = await res.data;
      dispatcher(setWeatherIconId(data.weather[0].icon));
      dispatcher(setWeatherDescription(data.weather[0].description));
      dispatcher(setWeatherMain(data.weather[0].main));
      dispatcher(setCityName(data.name));
      dispatcher(setTemperature(data.main.temp));
      dispatcher(setHumidity(data.main.humidity));
      dispatcher(setPressure(data.main.pressure));
      dispatcher(setSunrise(data.sys.sunrise));
      dispatcher(setSunset(data.sys.sunset));
      dispatcher(setDt(data.dt));
      if (data.rain !== undefined) {
        dispatcher(setRain(data.rain["1h"]));
      } else {
        dispatcher(setRain(0));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    WeatherDetails();
    fiveDayForecast();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getTime = (Time: number) => {
    const date = new Date(Time * 1000);
    const zone = date.getHours() >= 12 ? "PM" : "AM";
    const time = date.getHours() + ":" + date.getMinutes() + " " + zone;
    return time;
  };
  useEffect(() => {
    getTime(curweath.dt);
  }, );
  const lengthOfDay = (rise: number, set: number) => {
    const sunrise = new Date(rise * 1000);
    const sunset = new Date(set * 1000);
    let difference = sunrise.getTime() - sunset.getTime();
    let hourDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hourDifference * 1000 * 60 * 60;
    let minuteDifference = Math.floor(difference / 1000 / 60);
    difference -= minuteDifference * 1000 * 60;
    return hourDifference + "H " + minuteDifference + "M";
  };
  const Addbutton = () => {
    dispatcher(setIsAddToList(true));
    let newWishlist: ICarousel[] = caruselList.map((item) => item);
    if (newWishlist.find((item) => item.name === curweath.name) === undefined) {
      newWishlist.push({
        icon: `https://openweathermap.org/img/wn/${curweath.weather[0].icon}@2x.png`,
        name: curweath.name,
        temperature: parseFloat((curweath.main.temp - 273.15).toFixed(1)),
        time: getTime(curweath.dt),
        pressure: curweath.main.pressure,
        rain:
          curweath.rain !== undefined
            ? curweath.rain["1h"].toFixed(1).toString()
            : "--",
        humidity: curweath.main.humidity,
        lengthofday: lengthOfDay(curweath.sys.sunset, curweath.sys.sunrise),
        remainday: lengthOfDay(curweath.sys.sunset, curweath.dt),
        yaxis: list.map((item) =>
          parseFloat((item.main.temp - 273.15).toFixed(1))
        ),
        xaxis: list.map((item) => {
          const date = new Date(item.dt * 1000);
          return (
            date.toLocaleString("en-US", { day: "numeric" }) +
            " " +
            date.toLocaleString("en-US", { month: "long" })
          );
        }),
      });
      dispatcher(setCaruselList(newWishlist));
    }
    console.log(newWishlist);
  };
  const Removebutton = () => {
    let newWishlist: ICarousel[] = caruselList.filter(
      (name) => name.name !== curweath.name
    );
    dispatcher(setCaruselList(newWishlist));
    console.log(newWishlist);
    dispatcher(setIsAddToList(false));
  };
  return (
    <>
      <Navbar />
      <div className={styles.details_container}>
        <div className={styles.left_side}>
          <div className={styles.icon_back_button}>
            <ArrowBackIosIcon className={styles.icon_back} onClick={goBack} />
            <button className={styles.back_button} onClick={goBack}>
              Back
            </button>
          </div>
          <div className={styles.right_side}>
            {isAddToList ? (
              <div className={styles.add_to_list_button}>
                <div className={styles.add_to_list}>
                  Added to list{" "}
                  <span>
                    <CheckOutlinedIcon className={styles.check_icon} />
                  </span>
                </div>
                <button className={styles.remove_button} onClick={Removebutton}>
                  Remove
                </button>
              </div>
            ) : (
              <div className={styles.button_container}>
                <p>Add to list</p>
                <button className={styles.add_button} onClick={Addbutton}>
                  <ControlPointOutlinedIcon />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.basic_info}>
            <img
              src={`https://openweathermap.org/img/wn/${curweath.weather[0].icon}@2x.png`}
              alt="weather-logo"
              className={styles.weather_icon}
            />
            <p className={styles.city}>{curweath.name}</p>
            <p className={styles.temp}>
              {(curweath.main.temp - 273.15).toFixed(1)}{" "}
              <sup>
                <img src={degree} alt="degree-logo" />
              </sup>
            </p>
          </div>
          <div className={styles.details}>
            <div className={styles.item}>
              <p>Time</p>
              <p>{getTime(curweath.dt)}</p>
            </div>
            <div className={styles.item}>
              <p>PRESSURE</p>
              <p>{curweath.main.pressure}</p>
            </div>
            <div className={styles.item}>
              <p>% RAIN</p>
              {curweath.rain["1h"] === 0 ? (
                <p>--</p>
              ) : (
                <p>{curweath.rain["1h"].toFixed(2)} %</p>
              )}
            </div>
            <div className={styles.item}>
              <p>HUMIDITY</p>
              <p>{curweath.main.humidity}</p>
            </div>
          </div>
          <div className={styles.graph_wrap}>
            <div className={styles.day_info}>
              <p>SUNRISE & SUNSET</p>
              <p className={styles.content}>
                Length of day:{" "}
                <span >
                  {lengthOfDay(curweath.sys.sunset, curweath.sys.sunrise)}
                </span>
              </p>
              <p className={styles.bottom_left_text}>
                Remaining daylight:{" "}
                <span>{lengthOfDay(curweath.sys.sunset, curweath.dt)}</span>
              </p>
            </div>
            <div className={styles.graph}>
            <Graph
                yaxis={list.map((item) =>
                  parseFloat((item.main.temp - 273.15).toFixed(1))
                )}
                xaxis={list.map((item) => {
                  const date = new Date(item.dt * 1000);
                  return (
                    date.toLocaleString("en-US", { day: "numeric" }) +
                    " " +
                    date.toLocaleString("en-US", { month: "long" })
                  );
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherDetails;
