import React from "react";
import { getAqiBackgroundImage } from "../js/helpers";

const wrapperStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  margin: 0,
  padding: 0,
  zIndex: 0,
  overflow: "hidden",
  pointerEvents: "none",
};

const imageStyle = {
  display: "block",
  width: "100%",
  height: "100%",
  margin: 0,
  padding: 0,
  objectFit: "cover",
  opacity: 0.6,
};

export const AqiBackground = ({ aqi }) => {
  if (aqi == null) return null;

  const src = getAqiBackgroundImage(aqi);

  return (
    <div style={wrapperStyle} aria-hidden>
      <img src={src} alt="" style={imageStyle} />
    </div>
  );
};
