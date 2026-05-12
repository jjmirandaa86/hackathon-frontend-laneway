import React, { useEffect } from "react";
import axios from "axios";

import { Card, Title, Text, Table } from "@mantine/core";

export const Historical = ({ history, setHistory, apiUrl }) => {
  useEffect(() => {
    axios.get(`${apiUrl}/api/air-quality-historical`).then((response) => {
      console.log(response.data);
      setHistory(response.data.data);
    });
  }, []);

  return (
    <>
      <Card shadow="md" radius="lg" p="xl" withBorder>
        <Title order={3} mb="md">
          Search History (Last 10 searches)
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
                  <td>{item.overall_aqi}</td>
                  <td>{item.status}</td>
                  <td>{item.risk}</td>
                  <td>{item.created_at}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </>
  );
};
