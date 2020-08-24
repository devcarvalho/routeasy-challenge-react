import React from "react";

import { GlobalProvider } from "./context/GlobalState";

import AddDelivery from "./components/AddDelivery";
import Deliveries from "./components/Deliveries";
import RemoveDeliveries from "./components/RemoveDeliveries";
import MapContainer from "./components/Map";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => (
  <GlobalProvider>
    <div className="container">
      <div className="row">
        <div className="col-md-4 pt-5 px-4 form-wrapper">
          <AddDelivery />
          <RemoveDeliveries />
        </div>
        <div className="col-md-8 pt-5">
          <div className="row">
            <div className="col-12">
              <div className="map-wrapper mb-4">
                <MapContainer />
              </div>
            </div>
            <div className="col-12">
              <Deliveries />
            </div>
          </div>
        </div>
      </div>
    </div>
  </GlobalProvider>
);

export default App;
