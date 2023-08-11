import { IGraph } from './../../../Components/weatherdetails/Igraph';
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState: IGraph = {
    list: [
        {
            dt: 0,
            main: {
              temp: 0,
              "feels_like": 0,
              "temp_min": 0,
              "temp_max": 0,
              "pressure": 0,
              "sea_level": 0,
              "grnd_level": 0,
              "humidity": 0,
              "temp_kf": 0,
            },
            "weather": [
              {
                "id": 0,
                "main": "",
                "description": "",
                "icon": "",
              }
            ],
            "clouds": {
              "all": 0,
            },
            "wind": {
              "speed": 0,
              "deg": 0,
              "gust": 0,
            },
            "visibility": 0,
            "pop": 0,
            "sys": {
              "pod": "",
            },
            dt_txt: "",
        }
    ],
  }
  

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setList: (state, { payload }) => {
      state.list = payload;
    },
  },
});

export const getList = (state: RootState) => state.graph.list;

export const { setList } = graphSlice.actions;

export default graphSlice.reducer;