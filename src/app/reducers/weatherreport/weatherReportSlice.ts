import { ICarousel } from './../../../Components/home/ICarusel';

import { createSlice } from "@reduxjs/toolkit";
import { InitState } from "../../../Components/home/WeatherInfo";
import { RootState } from "../../store";


const initialState: InitState ={
    searchValue: "",
    isEmpty: true,
  caruselList: [],
  isActive: false,
  isSearched: false,
  isFound: false,
  cityList: [],
  toWarning: false,
  isAddToList: false,
  WeatherInfo: {
    weather: [
      {
        description: "",
        icon: "",
        id: 0,
        main: "",
      },
    ],
    name: "",
    id: 0,
    dt: 0,
    main: {
      temp: 0,
      humidity: 0,
      pressure: 0,
    },
    rain: {
      "1h": 0,
    },
    sys: {
      sunrise: 0,
      sunset: 0,
    },
  },
}
 
const weatherReportSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, { payload }) => {
      state.searchValue = payload;
    },
    setIsEmpty: (state, { payload }) => {
      state.isEmpty = payload;
    },
    setCaruselList: (state, { payload }) => {
      state.caruselList = payload;
    },
    setIsActive: (state, { payload }) => {
      state.isActive = payload;
    },
    setIsSearched: (state, { payload }) => {
      state.isSearched = payload;
    },
    setIsFound: (state, { payload }) => {
      state.isFound = payload;
    },
    setCityList: (state, { payload }) => {
      state.cityList = payload;
    },
    setCityName: (state, { payload }) => {
      state.WeatherInfo.name = payload;
    },
    setTemperature: (state, { payload }) => {
      state.WeatherInfo.main.temp = payload;
    },
    setWeatherIconId: (state, { payload }) => {
      state.WeatherInfo.weather[0].icon = payload;
    },
    setToWarning: (state, { payload }) => {
      state.toWarning = payload;
    },
    setWeatherDescription: (state, { payload }) => {
      state.WeatherInfo.weather[0].description = payload;
    },
    setWeatherMain: (state, { payload }) => {
      state.WeatherInfo.weather[0].main = payload;
    },
    setIsAddToList: (state, { payload }) =>{
      state.isAddToList = payload;
    },
    setHumidity: (state, { payload }) => {
      state.WeatherInfo.main.humidity = payload;
    },
    setRain: (state, { payload }) => {
      state.WeatherInfo.rain["1h"] = payload * 100;
    },
    setPressure: (state, { payload }) => {
      state.WeatherInfo.main.pressure = payload;
    },
    setDt: (state, { payload }) => {
      state.WeatherInfo.dt = payload;
    },
    setSunrise: (state, { payload }) => {
      state.WeatherInfo.sys.sunrise = payload;
    },
    setSunset: (state, { payload }) => {
      state.WeatherInfo.sys.sunset = payload;
    },
  },

})
export const getSearchValue = (state: RootState) => state.search.searchValue;
export const {
    setSearch,
    setIsEmpty,
    setCaruselList,
    setIsActive,
    setIsSearched,
    setIsFound,
    setCityList,
    setWeatherIconId,
    setToWarning,
    setWeatherDescription,
    setWeatherMain,
    setCityName,
    setTemperature,
    setIsAddToList,
    setHumidity,
    setPressure,
    setSunrise,
    setSunset,
    setDt,
    setRain,

  } = weatherReportSlice.actions;

  export default weatherReportSlice.reducer;