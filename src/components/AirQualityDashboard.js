import React, { useState } from "react";
import {
  AppShell,
  Header,
  Container,
  Title,
  Text,
  TextInput,
  Button,
  Card,
  Badge,
  Grid,
  Group,
  Stack,
  Paper,
  Loader,
  Alert,
} from "@mantine/core";

import PollutantCard from "./PollutantCard";
import SearchHistoryTable from "./SearchHistoryTable";

const API_KEY = "PASTE_YOUR_API_KEY_HERE";

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

function AirQualityDashboard() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [airData, setAirData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAirData(null);

      const response = await fetch(
        `https://api.api-ninjas.com/v1/airquality?city=${city}`,
        {
          headers: {
            "X-Api-Key": API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to fetch air quality data.");
      }

      const data = await response.json();
      const status = getAirQualityStatus(data.overall_aqi);

      setAirData(data);
      setSearchedCity(city);

      const newHistoryItem = {
        city: city,
        aqi: data.overall_aqi,
        status: status.label,
        color: status.color,
        risk: status.risk,
        date: new Date().toLocaleString(),
      };

      setHistory([newHistoryItem, ...history]);
      setCity("");
    } catch (err) {
      setError("Something went wrong. Please try another city.");
    } finally {
      setLoading(false);
    }
  };

  const status = airData ? getAirQualityStatus(airData.overall_aqi) : null;

  const pollutants = airData
    ? [
        { name: "CO", data: airData.CO },
        { name: "NO2", data: airData.NO2 },
        { name: "O3", data: airData.O3 },
        { name: "SO2", data: airData.SO2 },
        { name: "PM2.5", data: airData["PM2.5"] },
        { name: "PM10", data: airData.PM10 },
      ]
    : [];

  return (
    <AppShell
      padding="md"
      header={
        <Header height={70} p="md">
          <Group position="apart">
            <Title order={3}>Air Quality</Title>
            <Badge color="blue" size="lg">
              Frontend React App
            </Badge>
          </Group>
        </Header>
      }
    >
      <Container size="lg">
        <Paper shadow="md" radius="lg" p="xl" mb="xl">
          <Stack align="center" spacing="md">
            <Title align="center" order={1}>
              Air Quality Checker
            </Title>

            <Text align="center" size="lg" color="dimmed">
              Select a city and check the air quality, health risk, and pollutant levels.
            </Text>

            <Group>
              <TextInput
                label="City"
                placeholder="Example: Sydney, Tokyo, Lima"
                value={city}
                onChange={(event) => setCity(event.currentTarget.value)}
                style={{ width: 300 }}
              />

              <Button mt={25} onClick={handleSearch}>
                Show Detail
              </Button>
            </Group>

            {loading && <Loader />}

            {error && (
              <Alert color="red" title="Error">
                {error}
              </Alert>
            )}
          </Stack>
        </Paper>

        {airData && status && (
          <Card shadow="lg" radius="lg" p="xl" mb="xl" withBorder>
            <Group position="apart" mb="md">
              <div>
                <Title order={2}>{searchedCity}</Title>
                <Text color="dimmed">Current air quality information</Text>
              </div>

              <Badge color={status.color} size="xl">
                {status.label}
              </Badge>
            </Group>

            <Paper p="lg" radius="md" bg={`${status.color}.1`} mb="lg">
              <Title order={3}>AQI: {airData.overall_aqi}</Title>

              <Text size="lg" weight={700}>
                Human Health Risk
              </Text>

              <Text>{status.risk}</Text>
            </Paper>

            <Title order={3} mb="md">
              Pollutant Details
            </Title>

            <Grid>
              {pollutants.map((pollutant) => (
                <Grid.Col xs={12} sm={6} md={4} key={pollutant.name}>
                  <PollutantCard
                    name={pollutant.name}
                    concentration={pollutant.data?.concentration}
                    aqi={pollutant.data?.aqi}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </Card>
        )}

        <SearchHistoryTable history={history} />
      </Container>
    </AppShell>
  );
}

export default AirQualityDashboard;