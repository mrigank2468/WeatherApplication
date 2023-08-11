import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import graphSlice from "./reducers/weatherreport/graphSlice";
import weatherReportSliceReducer from "./reducers/weatherreport/weatherReportSlice";

export const store = configureStore({
  reducer: {
    search: weatherReportSliceReducer,
    graph : graphSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;