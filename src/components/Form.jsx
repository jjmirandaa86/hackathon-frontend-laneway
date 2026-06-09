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
import { getAirQualityStatus, semiTransparentPanel } from "../js/helpers";

export const Form = ({
  showData,
  setShowData,
  searchedCity,
  setSearchedCity,
  error,
  setError,
  loading,
  setLoading,
  cityData,
  setCityData,
  weatherData,
  setWeatherData,
  airData,
  setAirData,
  apiUrl,
}) => {
  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setCityData(null);
    setAirData(null);
    setWeatherData(null);
    setShowData(false);

    if (!searchedCity.trim()) {
      setError("Please enter a city name.");
      return;
    }

    const url = `${apiUrl}/api/external?city=${encodeURIComponent(searchedCity)}`;

    axios
      .get(url)
      .then((response) => {
        setWeatherData(response.data.dataWeather);
        setAirData(response.data.dataAirQuality);
        setCityData(response.data.dataCity);
        console.log(response.data.dataCity);
        return response.data.dataCity;
      })
      .then((dataToSaveCities) => {
        console.log(dataToSaveCities);
        return axios.post(`${apiUrl}/api/cities`, dataToSaveCities); //Save City
      })
      .then((responseSaveCities) => {
        console.log(responseSaveCities);
        //if save responseSaveCities
        return axios.post(`${apiUrl}/api/cities`, weatherData); //Save weather
      })
      .then((responseSaveWeather) => {
        console.log(responseSaveWeather);
        //if save responseSaveWeather
        return axios.post(`${apiUrl}/api/air-quality`, airData); //Save air-quality
      })
      .then((responseSaveAirQuality) => {
        console.log(responseSaveAirQuality);
        //All Ok
        setShowData(true);
        return;
      })
      .catch((error) => {
        setError("Something went wrong.");
        setShowData(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Paper
        shadow="md"
        radius="lg"
        p="xl"
        mb="xl"
        style={semiTransparentPanel}
      >
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
              value={searchedCity}
              onChange={(event) => setSearchedCity(event.currentTarget.value)}
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
