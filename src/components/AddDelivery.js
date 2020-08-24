import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import SweetAlert from "sweetalert2-react";
import axios from "axios";

const AddDelivery = () => {
  const [client, setClient] = useState("");
  const [weight, setWeight] = useState("");
  const [addressText, setAddressText] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [showAlert, setAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    text: "",
    type: "",
  });

  const { addDelivery, getDeliveries } = useContext(GlobalContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!latitude || !longitude) {
      return;
    }

    const newDelivery = {
      client,
      weight,
      address,
    };

    try {
      const res = await addDelivery(newDelivery);

      getDeliveries();
      setClient("");
      setWeight("");
      setAddressText("");
      setLatitude("");
      setLongitude("");
      setAddress({});
      setAlertData({
        title: "Sucesso!",
        text: res.data.msg,
        type: "success",
      });
      setAlert(true);
    } catch (err) {
      const { response } = err;
      setAlertData({
        title: "Ops...",
        text: response.data.errors[0].msg,
        type: "error",
      });
      setAlert(true);
      getDeliveries();
    }
  };

  const onSearch = async () => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${addressText.replace(
          /[ ,.]/g,
          "+"
        )}&key=AIzaSyBc4xS8_2RCAI84-0ooj1eJc9Unpd7Dil8`
      );

      let number = null;
      let street = null;
      let district = null;
      let adjunct = null;
      let city = null;
      let state = null;
      let country = null;

      res.data.results[0].address_components.map((component) => {
        if (component.types.includes("street_number")) {
          number = component.long_name;
        } else if (component.types.includes("route")) {
          street = component.long_name;
        } else if (component.types.includes("sublocality_level_1")) {
          district = component.long_name;
        } else if (component.types.includes("administrative_area_level_2")) {
          city = component.long_name;
        } else if (component.types.includes("administrative_area_level_1")) {
          state = component.long_name;
        } else if (component.types.includes("country")) {
          country = component.long_name;
        } else if (component.types.includes("subpremise")) {
          adjunct = component.long_name;
        }
        return true;
      });
      setAddress({
        geolocation: {
          latitude: res.data.results[0].geometry.location.lat,
          longitude: res.data.results[0].geometry.location.lng,
        },
        street,
        number,
        district,
        adjunct,
        city,
        state,
        country,
      });
      setLatitude(res.data.results[0].geometry.location.lat);
      setLongitude(res.data.results[0].geometry.location.lng);
    } catch (err) {
      setAlertData({
        title: "Ops...",
        text: "Não encontramos nenhum resultado.",
        type: "error",
      });
      setAlert(true);
    }
  };

  return (
    <div className="card">
      <SweetAlert
        show={showAlert}
        title={alertData.title}
        text={alertData.text}
        type={alertData.type}
        onConfirm={() => setAlert(false)}
      />
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-12 mb-3">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Nome do Cliente"
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />
            </div>
            <div className="col-12 mb-3">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Peso da Entrega"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="col-12 mb-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Endereço Cliente"
                  value={addressText}
                  onChange={(e) => setAddressText(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    type="button"
                    disabled={!addressText}
                    onClick={() => onSearch()}
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <input
                type="text"
                disabled
                className="form-control form-control-sm"
                placeholder="Latitude"
                value={latitude}
              />
            </div>
            <div className="col-md-6 mb-4">
              <input
                type="text"
                disabled
                className="form-control form-control-sm"
                placeholder="Longitude"
                value={longitude}
              />
            </div>
            <div className="col-12">
              <button
                className="btn btn-success btn-sm w-100"
                disabled={!latitude || !longitude || !client || !weight}
              >
                CADASTRAR CLIENTE
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDelivery;
