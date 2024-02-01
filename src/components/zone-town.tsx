import {Container, Header, Table} from "semantic-ui-react";
import * as React from "react";

enum ETownAttributes {
  Type = "Type",
  BlackSmith = "BlackSmith",
  Tavern = "Tavern",
  IsStartingTown = "IsStartingTown",
  MageGuildLevel = "MageGuildLevel",
  TownSpecialStracture = "TownSpecialStracture",
  TownWalls = "TownWalls",
  IncomeLevel = "IncomeLevel",
  DwellingLevel = "DwellingLevel",
  DwellingsUpgrades = "DwellingsUpgrades",
  ResourceLevel = "ResourceLevel"
}

export const ZoneTown = (props: { data: Record<any, any> }) => (
  <Container>
    <Header as={'h2'} content="Города" />
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell content='Фракция' />
          <Table.HeaderCell content='Кузница' />
          <Table.HeaderCell content='Таверна' />
          <Table.HeaderCell content='Старт. город' />
          <Table.HeaderCell content='ГМ' />
          <Table.HeaderCell content='Спец. строение' />
          <Table.HeaderCell content='Стены' />
          <Table.HeaderCell content='Доход' />
          <Table.HeaderCell content='Двеллы' />
          <Table.HeaderCell content='Ул. двеллы' />
          <Table.HeaderCell content='Ресурсы' />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          {
            Object.values(ETownAttributes).map(attrName => (
              <Table.Cell key={attrName} content={props.data._attributes[attrName]} />
            ))
          }
        </Table.Row>
      </Table.Body>
    </Table>
  </Container>
);
