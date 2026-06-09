import React from "react";
import { Card, Text, Group, Stack, Badge, Divider } from "@mantine/core";
import {
  IconMapPin,
  IconTemperature,
  IconWind,
  IconCloud,
  IconLeaf,
} from "@tabler/icons-react";

const GeneralDetails = () => {
  const city = {
    name: "Guayaquil",
    country: "EC",
    region: "Guayas",
  };

  const weather = {
    temp: 24,
    feels_like: 25,
    humidity: 96,
    wind_speed: 0.78,
    cloud_pct: 98,
  };

  const airQuality = {
    overall_aqi: 42,
    status: "Good",
    risk: "Low",
  };

  return (
    <div>
      <Card shadow="sm" radius="lg" withBorder p="lg" maw={420}>
        <Stack gap="md">
          <Group justify="space-between">
            <Group gap="xs">
              <IconMapPin size={18} />
              <Text fw={600}>{city.name}</Text>
            </Group>

            <Badge variant="light">{city.country}</Badge>
          </Group>

          <Text size="sm" c="dimmed">
            {city.region}
          </Text>

          <Divider />

          <Group justify="space-between">
            <Group gap="xs">
              <IconTemperature size={18} />
              <Text size="xl" fw={700}>
                {weather.temp}°C
              </Text>
            </Group>

            <Text size="sm" c="dimmed">
              Feels like {weather.feels_like}°C
            </Text>
          </Group>

          <Group grow>
            <Group gap={6}>
              <IconCloud size={16} />
              <Text size="sm">{weather.cloud_pct}% Clouds</Text>
            </Group>

            <Group gap={6}>
              <IconWind size={16} />
              <Text size="sm">{weather.wind_speed} m/s</Text>
            </Group>
          </Group>

          <Text size="sm">
            Humidity: <b>{weather.humidity}%</b>
          </Text>

          <Divider />

          <Group justify="space-between">
            <Group gap="xs">
              <IconLeaf size={18} />
              <Text fw={600}>Air Quality</Text>
            </Group>

            <Badge color="green">AQI {airQuality.overall_aqi}</Badge>
          </Group>

          <Group>
            <Badge variant="light" color="green">
              {airQuality.status}
            </Badge>

            <Badge variant="outline" color="gray">
              Risk: {airQuality.risk}
            </Badge>
          </Group>
        </Stack>
      </Card>
    </div>
  );
};

export default GeneralDetails;
