import React from "react";
import { Card, Text, Badge, Stack } from "@mantine/core";

function PollutantCard({ name, concentration, aqi }) {
  return (
    <Card shadow="sm" radius="md" p="md" withBorder>
      <Stack spacing="xs">
        <Badge color="blue" size="lg">
          {name}
        </Badge>

        <Text size="sm">
          <strong>Concentration:</strong> {concentration ?? "N/A"} µg/m³
        </Text>

        <Text size="sm">
          <strong>AQI:</strong> {aqi ?? "N/A"}
        </Text>
      </Stack>
    </Card>
  );
}

export default PollutantCard;