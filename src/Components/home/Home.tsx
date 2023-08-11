import React, { useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Navbar from "../navbar/Navbar";
import citydata from "../../assets/indian.cities.json";
import styles from "./Home.module.scss";
import { WeatherInfo } from "./WeatherInfo";
import {getSearchValue,setCityList,setCityName,setIsAddToList,setIsEmpty,setIsFound,setIsSearched,setSearch,setTemperature,setWeatherDescription,setWeatherIconId,setWeatherMain,
} from "../../app/reducers/weatherreport/weatherReportSlice";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import axios from "axios";
import Card from "./Cards";
import Carusel from "./Carusel";
import EmptyWhishlist from "./EmptyWhishlist";

const Home = () => {
  const apiKey = "019bbaf0caaa302418a19bbe6cb2ff84";
  const isSearched = useAppSelector((state) => state.search.isSearched);
  const isEmpty = useAppSelector((state) => state.search.isEmpty);
  const caruselList = useAppSelector((state) => state.search.caruselList);
  const isFound = useAppSelector((state) => state.search.isFound);
  const { WeatherInfo: curWeather } = useAppSelector((state) => state.search);
  const handleClick = async () => {
    try {
      dispatcher(setIsSearched(true));
      let res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}`
      );
      const data: WeatherInfo = await res.data;
      dispatcher(setIsFound(true));
      dispatcher(setIsAddToList(false));
      console.log(data);
      dispatcher(setWeatherIconId(data.weather[0].icon));
      dispatcher(setWeatherDescription(data.weather[0].description));
      dispatcher(setWeatherMain(data.weather[0].main));
      dispatcher(setCityName(data.name));
      dispatcher(setTemperature(data.main.temp));
    } catch (error: any) {
      console.warn(error);
      dispatcher(setIsSearched(false));
      dispatcher(setIsFound(false));
    }
  };

  const dispatcher = useAppDispatch();
  const cityList = useAppSelector((state) => state.search.cityList);
  const searchValue = useAppSelector(getSearchValue);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatcher(setSearch(e.target.value));
  };
  const getCityList = (data: any) => {
    let list = data.map((item: any) => {
      return item.name;
    });

    dispatcher(setCityList(list));
  };

  useEffect(() => {
    getCityList(citydata);
    if (caruselList.length > 0) {
      dispatcher(setIsEmpty(false));
    } else {
      dispatcher(setIsEmpty(true));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchValue === "") {
      dispatcher(setIsSearched(false));
      dispatcher(setIsFound(false));
    }
    if (caruselList.length > 0) {
      dispatcher(setIsEmpty(false));
    } else {
      dispatcher(setIsEmpty(true));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, useAppDispatch]);
  return (
    <>
      <Navbar />
      <div className={styles.container} data-testid="home">
        <div className={styles.search_wrap}>
          <InputGroup className={`mb-2 ${styles.input_grp}`}>
            <Form.Control
              data-testid="search-bar"
              type="text"
              name="search"
              autoComplete="off"
              value={searchValue}
              onChange={handleChange}
              placeholder="Search Loaction"
              className={styles.input}
            />
            <InputGroup.Text className={styles.search_logo} id="basic-addon2">
              <button className={styles.search_button} onClick={handleClick} data-testid="search-btn">
                go
              </button>
            </InputGroup.Text>
          </InputGroup>
          {searchValue.length > 0 && (
            <div className={styles.suggestions}>
              {cityList
                .filter((name: string) => {
                  return name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
                })
                .map((item: string, index: number) => {
                  return (
                    <div
                      className={styles.chip}
                      key={index}
                      onClick={() => dispatcher(setSearch(item))}
                    >
                      {item}
                    </div>
                  );
                })
                .slice(0, 5)}
            </div>
          )}
        </div>
        {isEmpty && !isSearched && !isFound === true && (
          <div className={styles.empty_wishlist}>
            <EmptyWhishlist />
          </div>
        )}
        {isSearched && isFound === true && (
          <div className={styles.weather_card}>
            <Card
              iconID={curWeather.weather[0].icon}
              weatherMain={curWeather.weather[0].main}
              weatherDescription={curWeather.weather[0].description}
              city={curWeather.name}
              temp={curWeather.main.temp}
            />
          </div>
        )}
        {!isEmpty && !isSearched && !isFound === true && (
          <div className={styles.carousel}>
            <Carusel caruselList={caruselList} />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
