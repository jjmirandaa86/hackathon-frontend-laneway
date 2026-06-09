import React, { useState } from "react";
import {
  MantineProvider,
  AppShell,
  Header,
  Container,
  Title,
  Group,
  Button,
} from "@mantine/core";
import { Form } from "./components/Form.jsx";
import { Details } from "./components/Details.jsx";
import { Historical } from "./components/Historical.jsx";
import { AirQualityInfo } from "./components/AirQualityInfo.jsx";
import { AqiBackground } from "./components/AqiBackground.jsx";
import { Weather } from "./components/Weather.jsx";
import { semiTransparentPanel } from "./js/helpers";
import GeneralDetails from "./components/GeneralDetails.jsx";

function App() {
  const [searchedCity, setSearchedCity] = useState("");

  const [showData, setShowData] = useState(null); //show all cards

  const [cityData, setCityData] = useState(null);
  const [airData, setAirData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(null);

  const [showInfoAirData, setShowInfoAirData] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding={0}
        styles={{
          main: {
            background: "transparent",
            position: "relative",
          },
        }}
        header={
          <Header height={70} p="md">
            <Group position="apart">
              <Title order={3}>Air Quality</Title>
            </Group>
          </Header>
        }
      >
        <AqiBackground aqi={airData?.data?.overall_aqi} />
        <div style={{ position: "relative", minHeight: "calc(100vh - 70px)" }}>
          <Container
            size="lg"
            p="md"
            style={{ position: "relative", zIndex: 1, ...semiTransparentPanel }}
          >
            <Form
              showData={showData}
              setShowData={setShowData}
              searchedCity={searchedCity}
              setSearchedCity={setSearchedCity}
              error={error}
              setError={setError}
              loading={loading}
              setLoading={setLoading}
              cityData={cityData}
              setCityData={setCityData}
              weatherData={weatherData}
              setWeatherData={setWeatherData}
              airData={airData}
              setAirData={setAirData}
              apiUrl={apiUrl}
            />
            {showData && <GeneralDetails />}

            {/*
<Details
              airData={airData}
              status={status}
              searchedCity={searchedCity}
            />
            <Container fluid h={50} style={semiTransparentPanel}>
              <Button onClick={() => setShowInfo(!showInfo)}>
                {showInfo ? "Hide AQI guide" : "Show AQI guide"}
              </Button>
            </Container>

            {airData && weatherData && <Weather weatherData={weatherData} />}

            {showInfo && <AirQualityInfo />}
            <Historical
              history={history}
              setHistory={setHistory}
              apiUrl={apiUrl}
            />
              */}
          </Container>
        </div>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
