
function getAirQualityStatus(aqi) {
    if (aqi <= 50) {
      return {
        label: "Good",
        color: "green",
        risk: "Air quality is safe. There is little or no health risk.",
      };
    }
  
    if (aqi <= 100) {
      return {
        label: "Moderate",
        color: "yellow",
        risk: "Acceptable air quality. Sensitive people should be careful.",
      };
    }
  
    if (aqi <= 150) {
      return {
        label: "Unhealthy for Sensitive Groups",
        color: "orange",
        risk: "Children, older adults, and people with asthma may be affected.",
      };
    }
  
    if (aqi <= 200) {
      return {
        label: "Unhealthy",
        color: "red",
        risk: "Everyone may start to experience health effects.",
      };
    }
  
    if (aqi <= 300) {
      return {
        label: "Very Unhealthy",
        color: "grape",
        risk: "Health alert. Everyone should reduce outdoor activities.",
      };
    }
  
    return {
      label: "Hazardous",
      color: "dark",
      risk: "Serious health warning. Avoid outdoor activities.",
    };
  }

function getAqiBackgroundImage(aqi) {
  if (aqi <= 50) return "/assets/1good.png";
  if (aqi <= 100) return "/assets/2moderate.png";
  if (aqi <= 150) return "/assets/3unhealthy.png";
  if (aqi <= 200) return "/assets/4unhealthy.png";
  if (aqi <= 300) return "/assets/5veryunhealthy.png";
  return "/assets/6hazardous.png";
}

const semiTransparentPanel = {
  backgroundColor: "rgba(255, 255, 255, 0.5)",
};

export { getAirQualityStatus, getAqiBackgroundImage, semiTransparentPanel };