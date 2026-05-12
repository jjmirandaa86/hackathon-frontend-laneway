import React, { useState } from "react";
import {
  MantineProvider,
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
  Table,
  Stack,
  Paper,
  Loader,
  Alert,
} from "@mantine/core";

const API_KEY = "AOuaeqgtNIasG3ipYbrkraru84DjD3KXK6jnlM5R";

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

function App() {
  const [city, setCity] = useState("");
  const [airData, setAirData] = useState(null);
  const [searchedCity, setSearchedCity] = useState("");
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
        throw new Error("Unable to get air quality data.");
      }

      const data = await response.json();
      const status = getAirQualityStatus(data.overall_aqi);

      setAirData(data);
      setSearchedCity(city);

      const newSearch = {
        city: city,
        aqi: data.overall_aqi,
        status: status.label,
        risk: status.risk,
        date: new Date().toLocaleString(),
      };

      setHistory([newSearch, ...history]);
      setCity("");
    } catch (err) {
      setError("Something went wrong. Please try another city.");
    } finally {
      setLoading(false);
    }
  };

  const status = airData ? getAirQualityStatus(airData.overall_aqi) : null;

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        header={
          <Header height={70} p="md">
            <Group position="apart">
              <Title order={3}>Air Quality</Title>
              <Badge color="blue" size="lg">
                API Ninjas
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
                Search any city and check the air quality, health risk, and
                pollutant levels.
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
                <Text size="lg" weight={600}>
                  Human Health Risk:
                </Text>
                <Text>{status.risk}</Text>
              </Paper>

              <Title order={3} mb="md">
                Pollutant Details
              </Title>

              <Grid>
                {["CO", "NO2", "O3", "SO2", "PM2.5", "PM10"].map((item) => (
                  <Grid.Col span={4} key={item}>
                    <Card withBorder radius="md" p="md">
                      <Text weight={700}>{item}</Text>
                      <Text size="sm">
                        Concentration: {airData[item]?.concentration} µg/m³
                      </Text>
                      <Text size="sm">AQI: {airData[item]?.aqi}</Text>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </Card>
          )}

          <Card shadow="md" radius="lg" p="xl" withBorder>
            <Title order={3} mb="md">
              Search History
            </Title>

            {history.length === 0 ? (
              <Text color="dimmed">No searches yet.</Text>
            ) : (
              <Table striped highlightOnHover withBorder>
                <thead>
                  <tr>
                    <th>City</th>
                    <th>AQI</th>
                    <th>Air Quality</th>
                    <th>Human Risk</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((item, index) => (
                    <tr key={index}>
                      <td>{item.city}</td>
                      <td>{item.aqi}</td>
                      <td>{item.status}</td>
                      <td>{item.risk}</td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card>
        </Container>
      </AppShell>
    </MantineProvider>
  );
}

export default App;