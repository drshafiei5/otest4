import React from "react";
import { useMapEvents } from "react-leaflet/hooks";

const MapEvents = (props) => {
  useMapEvents({
    click: props.clickFn
  });
  return false;
};

export default MapEvents;
