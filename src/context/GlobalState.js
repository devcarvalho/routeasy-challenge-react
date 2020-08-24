import React, { createContext, useReducer } from "react";
import appReducer from "./AppReducer";
import axios from "axios";

const InitialState = {
  deliveries: [],
  mapCenter: [-23.5502912, -46.760461],
  mapZoom: 16,
  loading: true,
};

export const GlobalContext = createContext(InitialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, InitialState);

  // ACTIONS
  async function getDeliveries() {
    dispatch({
      type: "SET_LOADER",
      payload: true,
    });
    try {
      const res = await axios.get("http://localhost:5000/api/deliveries");

      if (!res.data.length) {
        dispatch({
          type: "GET_DELIVERIES",
          payload: [],
        });
      }

      res.data.map((delivery, index) => {
        if (index === res.data.length - 1) {
          dispatch({
            type: "SET_MAP_CENTER",
            payload: [
              delivery.address.geolocation.latitude,
              delivery.address.geolocation.longitude,
            ],
          });
          dispatch({
            type: "GET_DELIVERIES",
            payload: res.data,
          });
        }
        return true;
      });

      dispatch({
        type: "SET_LOADER",
        payload: false,
      });
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: "DELIVERY_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function addDelivery(delivery) {
    dispatch({
      type: "SET_LOADER",
      payload: true,
    });
    try {
      return axios.post("http://localhost:5000/api/deliveries", delivery);
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: "DELIVERY_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function removeDeliveries() {
    dispatch({
      type: "SET_LOADER",
      payload: true,
    });
    return axios.delete("http://localhost:5000/api/deliveries");
  }

  return (
    <GlobalContext.Provider
      value={{
        deliveries: state.deliveries,
        mapCenter: state.mapCenter,
        loading: state.loading,
        mapZoom: state.mapZoom,
        getDeliveries,
        addDelivery,
        removeDeliveries,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
