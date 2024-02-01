import {Container, Header, Table} from "semantic-ui-react";
import * as React from "react";

enum EZoneAttributes {
  MonsterStrength = 'MonsterStrength',
  TerrainType = 'TerrainType',
  IsStartingZone = 'IsStartingZone',
  SizePrecentage = 'SizePrecentage',
}

const MAP_ZONE_ATTR_TO_LABEL = {
  [EZoneAttributes.MonsterStrength]: 'Сила нейтралов',
  [EZoneAttributes.TerrainType]: 'Поверхность',
  [EZoneAttributes.IsStartingZone]: 'Стартовая зона',
  [EZoneAttributes.SizePrecentage]: 'Размер зоны',
}

export const ZoneAttributes = (props: { data: Record<any, any> }) => (
  <Container>
    <Header as={'h2'} content="Аттрибуты зоны" />
    <Table>
      <Table.Header>
        <Table.Row>
          {
            Object.values(EZoneAttributes).map(attr => (
              <Table.HeaderCell key={attr} content={MAP_ZONE_ATTR_TO_LABEL[attr]} />
            ))
          }
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>

        </Table.Row>
        {
          Object.values(EZoneAttributes).map(attr => (
            <Table.Cell content={props.data[attr]._text} />
          ))
        }
      </Table.Body>
    </Table>
  </Container>
)
