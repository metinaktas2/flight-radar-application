import { divIcon } from "leaflet";

const getIcon = (direction, isActive, isDetail) => {
  return divIcon({
    html: `
        <div style="transform: rotate(${direction - 45}deg)">
        <img src="/plane.svg" width="30px" height="30px"/>
        </div>`,
    className: `marker ${isDetail && "passive"} ${isActive && "active-flight"}`,
    iconSize: [30, 30],
  });
};

export default getIcon;
