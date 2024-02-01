import * as React from "react";
import {Container, Header, Loader, Table} from "semantic-ui-react";
import {xml2js} from 'xml-js';
import { TemplateSchema } from "./components/template-schema";
import { ZoneRow } from "./zone-row";

export const Template = (props: { file: File }) => {
  const [isLoading, setLoadingStatus] = React.useState(true);
  const [fileData, setFileData] = React.useState<Record<any, any>>();

  React.useEffect(() => {
    props.file.text().then((result: string) => {
      setFileData(xml2js(result, {compact: true}));

      setLoadingStatus(false);
    })
  }, []);

  const connections = () => {
    const connectionList = [];

    for (let i = 1; i <= Number(fileData.IRMG.Connections._attributes.Number); i++) {
      const connection = fileData.IRMG.Connections[`Connection${i}`];

      connectionList.push({
        zone: Number(connection._attributes.Zone),
        connect_to: Number(connection._attributes.Connects_To),
        guard: connection.Guards._attributes.Value,
        guard_type: connection.Guards._attributes.Type,
      })
    }

    return connectionList;
  }

  const zones = () => {
    const zoneList: any[] = [];
    const connectionList = connections();

    for (let zoneId = 1; zoneId <= Number(fileData.IRMG.Zones._attributes.Number); zoneId++) {
      connectionList.forEach((connection) => {
        if (connection.zone === zoneId) {
          const zoneIndex = zoneList.findIndex((item) => item.zoneId === connection.zone);

          if (zoneIndex !== -1) {
            zoneList[zoneIndex].connections.push({
              connect_to: connection.connect_to,
              guard: connection.guard,
              guard_type: connection.guard_type,
            })
          } else {
            zoneList.push({
              zoneId,
              connections: [{
                connect_to: connection.connect_to,
                guard: connection.guard,
                guard_type: connection.guard_type,
              }]
            });
          }

          const nearZoneIndex = zoneList.findIndex((item) => item.zoneId === connection.connect_to);

          if (nearZoneIndex !== -1) {
            zoneList[nearZoneIndex].connections.push({
              connect_to: connection.zone,
              guard: connection.guard,
              guard_type: connection.guard_type,
            })
          } else {
            zoneList.push({
              zoneId: connection.connect_to,
              connections: [{
                connect_to: connection.zone,
                guard: connection.guard,
                guard_type: connection.guard_type,
              }]
            });
          }
        }
      });
    }

    return zoneList;
  }

  if (isLoading) {
    return (
      <Loader
        active
        inline='centered'
        content="Пожалуйста, подождите. Файл обрабатывается"
      />
    );
  }

  return (
    <Container>
      <Header
        as={'h2'}
        subheader={`Дата последнего изменения: ${new Date(props.file.lastModified).toLocaleString()}`}
        content={props.file.name}
      />
      <TemplateSchema zoneList={zones()} />
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Номер зоны</Table.HeaderCell>
            <Table.HeaderCell>Соединения</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            zones().map((zone) => (
              <ZoneRow
                zone={zone}
                key={zone.zoneId}
                data={fileData.IRMG.Zones[`Zone${zone.zoneId}`]}
              />
            ))
          }
        </Table.Body>
      </Table>
    </Container>
  );
}
