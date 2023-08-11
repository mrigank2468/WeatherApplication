import React from "react";
import styles from "./Carousel.module.scss";
import degree from "../../assets/Ellipse 1icon.png";
import { ICarousel } from "./ICarusel";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { Carousel } from "react-bootstrap";
import {setCaruselList,setIsAddToList,setIsEmpty,setIsFound,setIsSearched,} from "../../app/reducers/weatherreport/weatherReportSlice";
import Graph from "../weatherdetails/Graph";
interface Iprops {
  caruselList: ICarousel[];
}
const Carusel = ({ caruselList }: Iprops) => {
  return (
    <div className={styles.Carousel_container}>
      <Carousel variant="dark">
        {caruselList.map((item) => {
          return (
            <Carousel.Item className={` ${styles.carusel_item}`} key={item.name}>
              <div className="d-block">
                <CarouselItem {...item} />
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};
const CarouselItem = (data: ICarousel) => {
  const dispatch = useAppDispatch();
  const { caruselList } = useAppSelector((state) => state.search);
  const handleRemove = (city: string) => {
    let newWishlist: ICarousel[] = caruselList.filter(
      (item) => item.name !== city
    );
    console.log(newWishlist);
    if (newWishlist.length === 0) {
      dispatch(setIsEmpty(true));
      dispatch(setIsSearched(false));
      dispatch(setIsFound(false));
    } else {
      dispatch(setIsSearched(false));
      dispatch(setIsFound(false));
    }
    dispatch(setCaruselList(newWishlist));
    dispatch(setIsAddToList(false));
  };
  useEffect(() => {
    console.log(caruselList);
  }, [caruselList]);
  return (
    <div className={styles.detail_container}>
      <div className={styles.button_container}>
        <div className={styles.right}>
          <button
            className={styles.remove_buton}
            onClick={() => handleRemove(data.name)}
          >
            Remove
          </button>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.introduction}>
          <img
            src={data.icon}
            alt="weather-logo"
            className={styles.weath_icon}
          />
          <p className={styles.city}>{data.name}</p>
          <p className={styles.temperature}>
            {data.temperature}{" "}
            <sup>
              <img src={degree} alt="celsius-logo" />
            </sup>
          </p>
        </div>
        <div className={styles.details}>
          <div className={styles.item}>
            <p>Time</p>
            <p>{data.time}</p>
          </div>
          <div className={styles.item}>
            <p>PRESSURE</p>
            <p>{data.pressure}</p>
          </div>
          <div className={styles.item}>
            <p>% RAIN</p>
            <p>{data.rain === "0.0" ? "--" : data.rain + "%"}</p>
          </div>
          <div className={styles.item}>
            <p>HUMIDITY</p>
            <p>{data.humidity}</p>
          </div>
        </div>
        <div className={styles.graph_container}>
          <div className={styles.day_info}>
            <p>SUNRISE & SUNSET</p>
            <p className={styles.content}>
              Length of day:{" "}
              <span style={{ color: "#2c2c2c" }}> {data.lengthofday}</span>
            </p>
            <p>
              Remaining daylight:{" "}
              <span style={{ color: "#2c2c2c" }}>{data.remainday}</span>
            </p>
          </div>
          <div className={styles.graph}>
          <Graph yaxis={data.yaxis} xaxis={data.xaxis} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Carusel;
