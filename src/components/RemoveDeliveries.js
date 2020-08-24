import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import SweetAlert from "sweetalert2-react";

const RemoveDeliveries = () => {
  let { deliveries, removeDeliveries, getDeliveries } = useContext(
    GlobalContext
  );
  const [showAlert, setAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    text: "",
    type: "",
  });

  return (
    <div className="card mt-3">
      <SweetAlert
        show={showAlert}
        title={alertData.title}
        text={alertData.text}
        type={alertData.type}
        onConfirm={() => setAlert(false)}
      />
      <div className="card-body">
        <button
          className="btn btn-danger btn-sm w-100"
          onClick={async () => {
            try {
              const res = await removeDeliveries();

              setAlertData({
                title: "Sucesso!",
                text: res.data.msg,
                type: "success",
              });
              setAlert(true);
              getDeliveries();
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
          }}
          disabled={!deliveries.length}
        >
          RESETAR CADASTRO
        </button>
      </div>
    </div>
  );
};

export default RemoveDeliveries;
