import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../redux/actions";
import Head from "./head";
import Loader from "../loader";
import Error from "../error";
import Gallery from "./gallery";
import Aircraft from "./aircraft";
import Time from "./time";
import Airport from "./airport";

const Modal = () => {
  const { isLoading, error, flightId, info } = useSelector(
    (store) => store.detail
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!flightId) return;

    dispatch(getDetails(flightId));
  }, [flightId]);

  return (
    flightId && (
      <div className="detail-modal">
        <div className="modal-inner">
          <Head info={info} />

          {isLoading ? (
            <Loader />
          ) : error ? (
            <Error message={error} />
          ) : (
            info && (
              <div className="info-wrapper">
                <div className="info-box">
                  <div>
                    <Gallery images={info.aircraft.images} />
                    <Airport airportData={info.airport} />
                    <Time timeData={info.time} />
                  </div>
                  <Aircraft aircraftData={info.aircraft} />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    )
  );
};

export default Modal;
