import React from "react";
import {
  Card,
  Group,
  Paper,
  Divider,
  Stack,
  Text,
  Badge,
  Button,
  SimpleGrid,
} from "@mantine/core";
import { semiTransparentPanel } from "../js/helpers";

export const Weather = ({ weatherData }) => {

    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      };

  return (
    <Paper shadow="md" radius="lg" p="xl" mb="xl" style={semiTransparentPanel}>
      >
        <Stack gap="md">
          {/* Header */}
          <Group justify="space-between">
            <div>
              <Text size="xl" fw={700}>
                ☁️ weatherData Today
              </Text>
              <Text size="sm" c="gray.3">
                Current conditions
              </Text>
            </div>

            <Badge color="cyan" size="lg" radius="md">
              🌡️ {weatherData.temp}°C
            </Badge>
          </Group>

          <Divider color="rgba(255,255,255,0.2)" />

          {/* Main Temperature */}
          <Group justify="center">
            <Text fz={60} fw={800}>
              🌤️ {weatherData.temp}°
            </Text>
          </Group>

          <Text ta="center" size="lg">
            Feels like {weatherData.feels_like}°C
          </Text>

          {/* Grid */}
          <SimpleGrid cols={2} spacing="md">
            <Card radius="lg" p="md" bg="rgba(255,255,255,0.08)">
              <Text size="sm">💧 Humidity</Text>
              <Text fw={700} size="xl">
                {weatherData.humidity}%
              </Text>
            </Card>

            <Card radius="lg" p="md" bg="rgba(255,255,255,0.08)">
              <Text size="sm">☁️ Clouds</Text>
              <Text fw={700} size="xl">
                {weatherData.cloud_pct}%
              </Text>
            </Card>

            <Card radius="lg" p="md" bg="rgba(255,255,255,0.08)">
              <Text size="sm">🌬️ Wind</Text>
              <Text fw={700} size="xl">
                {weatherData.wind_speed} m/s
              </Text>
              <Text size="xs">🧭 {weatherData.wind_degrees}°</Text>
            </Card>

            <Card radius="lg" p="md" bg="rgba(255,255,255,0.08)">
              <Text size="sm">🌡️ Min / Max</Text>
              <Text fw={700} size="xl">
                {weatherData.min_temp}° / {weatherData.max_temp}°
              </Text>
            </Card>
          </SimpleGrid>

          <Divider color="rgba(255,255,255,0.2)" />

          {/* Sunrise / Sunset */}
          <Group grow>
            <Card radius="lg" p="md" bg="rgba(255,255,255,0.08)">
              <Text size="sm">🌅 Sunrise</Text>
              <Text fw={700}>{formatTime(weatherData.sunrise)} </Text>
            </Card>

            <Card radius="lg" p="md" bg="rgba(255,255,255,0.08)">
              <Text size="sm">🌇 Sunset</Text>
              <Text fw={700}>{formatTime(weatherData.sunset)} </Text>
            </Card>
          </Group>
        </Stack>
    
    </Paper>
  );
};

/*
{
  cloud_pct: 75,
  temp: 21,
  feels_like: 21,
  humidity: 80,
  min_temp: 21,
  max_temp: 21,
  wind_speed: 5.66,
  wind_degrees: 160,
  sunrise: 1779103110,
  sunset: 1779144653
}
*/
