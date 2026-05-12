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

function App() {
  const [city, setCity] = useState("");
  const [airData, setAirData] = useState(null);
  const [searchedCity, setSearchedCity] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        header={
          <Header height={70} p="md">
            <Group position="apart">
              <Title order={3}>Air Quality</Title>
            </Group>
          </Header>
        }
      >
        <Container size="lg">
          <Form
            city={city}
            setCity={setCity}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            airData={airData}
            setAirData={setAirData}
            setSearchedCity={setSearchedCity}
            history={history}
            setHistory={setHistory}
            apiUrl={apiUrl}
            setStatus={setStatus}
          />

          <Details
            airData={airData}
            status={status}
            searchedCity={searchedCity}
          />
          <Button onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? "Hide AQI guide" : "Show AQI guide"}
          </Button>
          {showInfo && <AirQualityInfo />}
          <Historical
            history={history}
            setHistory={setHistory}
            apiUrl={apiUrl}
          />
        </Container>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
