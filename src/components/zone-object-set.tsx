import {Container, Header, Table} from "semantic-ui-react";
import * as React from "react";

type TProps = {
  data: Record<any, any>;
};

export const ZoneObjectSet = React.memo((props: TProps) => (
  <Container>
    <Header as={'h2'} content="Объекты зоны" />
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell content={`Шанс появления: ${props.data._attributes.Appear_Chance}`} />
          <Table.Cell content={`Уровни двеллов: ${props.data._attributes.Dwelling_Number}`} />
        </Table.Row>
      </Table.Body>
    </Table>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell content="Название" />
          <Table.HeaderCell content="Охрана" />
          <Table.HeaderCell content="Шанс появления" />
          <Table.HeaderCell content="Наличие охраны" />
          <Table.HeaderCell content="Макс. кол-во" />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          props.data.objects.BattleObjects.Object.map((object: any) => (
            <Table.Row>
              <Table.Cell content={object._attributes.Name} />
              <Table.Cell content={object._attributes.Value} />
              <Table.Cell content={object._attributes.Chance} />
              <Table.Cell content={object._attributes.ShouldBeGuarded} />
              <Table.Cell content={object._attributes.MaxNumber} />
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table>
  </Container>
));