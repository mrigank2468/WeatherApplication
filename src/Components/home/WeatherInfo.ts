import { ICarousel } from "./ICarusel";

export interface WeatherInfo {
  weather: [
    {
      description: string;
      icon: string;
      id: number;
      main: string;
    }
  ];
  name: string;
  id: number;
  dt: number;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  rain: {
    "1h": number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
}
export interface InitState {
  searchValue: string;
  isEmpty: boolean;
  caruselList: ICarousel[];
  isActive: boolean;
  isSearched: boolean;
  isFound: boolean;
  cityList: string[];
  toWarning: boolean;
  isAddToList: boolean;
  WeatherInfo: {
    weather: [
      {
        description: string;
        icon: string;
        id: number;
        main: string;
      }
    ];
    name: string;
    id: number;
    dt: number;
    main: {
      temp: number;
      humidity: number;
      pressure: number;
    };
    rain: {
      "1h": number;
    };
    sys: {
      sunrise: number;
      sunset: number;
    };
  };
}
