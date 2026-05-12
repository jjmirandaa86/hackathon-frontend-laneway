import React from "react";
import { Badge, Card, Grid, Text, Title } from "@mantine/core";

const airQualityLevels = [
  {
    range: "0 - 50",
    label: "Good",
    color: "green",
    risk: "Air quality is safe. There is little or no health risk.",
  },
  {
    range: "51 - 100",
    label: "Moderate",
    color: "yellow",
    risk: "Acceptable air quality. Sensitive people should be careful.",
  },
  {
    range: "101 - 150",
    label: "Unhealthy for Sensitive Groups",
    color: "orange",
    risk: "Children, older adults, and people with asthma may be affected.",
  },
  {
    range: "151 - 200",
    label: "Unhealthy",
    color: "red",
    risk: "Everyone may start to experience health effects.",
  },
  {
    range: "201 - 300",
    label: "Very Unhealthy",
    color: "grape",
    risk: "Health alert. Everyone should reduce outdoor activities.",
  },
  {
    range: "301+",
    label: "Hazardous",
    color: "dark",
    risk: "Serious health warning. Avoid outdoor activities.",
  },
];

export const AirQualityInfo = () => {
  return (
    <div>
      <Card shadow="md" radius="lg" p="xl" mb="xl" withBorder>
        <Title order={3} mb="xs">
          Air Quality Index Guide
        </Title>

        <Text color="dimmed" mb="md">
          These categories explain the health risk based on the AQI value.
        </Text>

        <Grid>
          {airQualityLevels.map((level) => (
            <Grid.Col span={4} key={level.label}>
              <Card withBorder radius="md" p="md" h="100%">
                <Badge color={level.color} mb="sm">
                  AQI {level.range}
                </Badge>

                <Title order={5}>{level.label}</Title>
                <Text size="sm" mt="xs">
                  {level.risk}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Card>
    </div>
  );
};
