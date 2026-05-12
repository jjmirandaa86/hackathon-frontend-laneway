import React from "react";
import axios from "axios";
import {
  Paper,
  Stack,
  Title,
  Text,
  Group,
  TextInput,
  Button,
  Loader,
  Alert,
} from "@mantine/core";
import { getAirQualityStatus } from "../js/helpers";

export const Form = ({
  city,
  setCity,
  loading,
  setLoading,
  error,
  setError,
  airData,
  setAirData,
  setSearchedCity,
  history,
  setHistory,
  apiUrl,
  setStatus,
}) => {
  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setAirData(null);

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    const url = `${apiUrl}/api/air-quality?city=${encodeURIComponent(city)}`;

    axios
      .get(url)
      .then((response) => {
        console.log(response.data.data);
        setAirData(response.data);
        setStatus(getAirQualityStatus(response.data.data.overall_aqi));
        setSearchedCity(city);
        setHistory([
          ...history,
          {
            city: city,
            aqi: response.data.overall_aqi,
            status: getAirQualityStatus(response.data.overall_aqi).label,
            risk: getAirQualityStatus(response.data.overall_aqi).risk,
            date: new Date().toLocaleString(),
          },
        ]);
        return {
          city,
          overall_aqi: response.data.data.overall_aqi,
          CO_concentration: response.data.data.CO.concentration,
          CO_aqi: response.data.data.CO.aqi,
          PM10_concentration: response.data.data.PM10.concentration,
          PM10_aqi: response.data.data.PM10.aqi,
          SO2_concentration: response.data.data.SO2.concentration,
          SO2_aqi: response.data.data.SO2.aqi,
          PM2_5_concentration: response.data.data["PM2.5"].concentration,
          O3_concentration: response.data.data.O3.concentration,
          O3_aqi: response.data.data.O3.aqi,
          NO2_concentration: response.data.data.NO2.concentration,
          NO2_aqi: response.data.data.NO2.aqi,
          status: getAirQualityStatus(response.data.data.overall_aqi).label,
          risk: getAirQualityStatus(response.data.data.overall_aqi).risk,
        };
      })
      .then((dataToSave) => {
        console.log(dataToSave);
        return axios.post(`${apiUrl}/api/air-quality`, dataToSave);
      })
      .then((saveResponse) => {
        console.log("guardado");
        return axios.get(`${apiUrl}/api/air-quality-historical`);
      })
      .then((historyResponse) => {
        setHistory(historyResponse.data.data);
      })
      .catch((error) => {
        setError("Something went wrong. Please try another city.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
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
    </>
  );
};
