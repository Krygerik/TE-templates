import {Divider, Modal, Table} from "semantic-ui-react";
import * as React from "react";
import { ZoneTown } from "./components/zone-town";
import { ZoneMines } from "./components/zone-mines";
import { ZoneAttributes } from "./components/zone-attributes";
import { ZoneObjectSet } from "./components/zone-object-set";

export const ZoneRow = (props: { zone: any; data: Record<any, any> }) => {
  const [isOpen, setOpenZoneStatus] = React.useState(false);

  return (
    <Table.Row onClick={() => setOpenZoneStatus(true)}>
      <Table.Cell content={props.zone.zoneId} />
      <Table.Cell>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell content="Соседняя зона" />
              <Table.HeaderCell content="Охрана перехода" />
              <Table.HeaderCell content="Тип пробивки" />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              props.zone.connections.map((connection: any) => (
                <Table.Row key={connection.connect_to}>
                  <Table.Cell content={connection.connect_to} />
                  <Table.Cell content={connection.guard} />
                  <Table.Cell content={connection.guard_type} />
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
        <Modal
          closeIcon
          onClose={() => setOpenZoneStatus(false)}
          open={isOpen}
        >
          <Modal.Header>Объекты в зоне</Modal.Header>
          <Modal.Content>
            <ZoneMines data={props.data} />
            <Divider hidden />
            <ZoneTown data={props.data.Towns.Town1} />
            <Divider hidden />
            <ZoneAttributes data={props.data} />
            <Divider hidden />
            <ZoneObjectSet data={props.data.ObjectsSet1} />
          </Modal.Content>
        </Modal>
      </Table.Cell>
    </Table.Row>
  );
}
