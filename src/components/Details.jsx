import React from 'react'
import { Card, Group, Title, Text, Badge, Paper, Grid } from '@mantine/core'

export const Details = ({ airData, status, searchedCity }) => {
  return (
    <>{airData && status && (
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
                    Concentration: {airData.data[item]?.concentration} µg/m³
                  </Text>
                  <Text size="sm">AQI: {airData.data[item]?.aqi}</Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Card>
      )}</>
  )
}
