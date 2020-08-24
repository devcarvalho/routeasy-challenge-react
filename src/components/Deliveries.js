import React, { useContext, Fragment, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

const Deliveries = () => {
  const { deliveries, getDeliveries } = useContext(GlobalContext);

  useEffect(() => {
    return getDeliveries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let totalWeight = 0;

  deliveries.map((delivery) => {
    return (totalWeight += delivery.weight);
  });

  const averageTicket = totalWeight / deliveries.length || 0;
  return (
    <Fragment>
      <span className="text-muted d-block mb-1">
        Total de Clientes: {deliveries.length}; Peso Total: {totalWeight} kg;
        Ticket Médio*: {averageTicket}
      </span>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Rua</th>
              <th scope="col">Cidade</th>
              <th scope="col">País</th>
              <th scope="col">Peso</th>
              <th scope="col">Lat</th>
              <th scope="col">Lng</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery._id}>
                <td>{delivery.client}</td>
                <td>{delivery.address.street}</td>
                <td>{delivery.address.state}</td>
                <td>{delivery.address.country}</td>
                <td>{delivery.weight}</td>
                <td>{delivery.address.geolocation.latitude}</td>
                <td>{delivery.address.geolocation.longitude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <span className="text-muted d-block mt-2 text-sm mb-3">
        *Peso Total/Total de Clientes
      </span>
    </Fragment>
  );
};

export default Deliveries;
