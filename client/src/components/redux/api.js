import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),

  endpoints: (builder) => ({

    // Third-party weather API
    getWeather: builder.query({
      query: ({ latitude, longitude }) => ({
        url: "https://api.open-meteo.com/v1/forecast",
        params: {
          latitude,
          longitude,
          current: "temperature_2m,wind_speed_10m",
        },
      }),
    }),

  }),
});

export const { useGetWeatherQuery } = api;