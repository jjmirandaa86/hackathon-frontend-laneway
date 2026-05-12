import React from "react";
import { Card, Title, Text, Table, Badge } from "@mantine/core";

function SearchHistoryTable({ history }) {
  return (
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
                <td>
                  <Badge color={item.color}>{item.status}</Badge>
                </td>
                <td>{item.risk}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
}

export default SearchHistoryTable;