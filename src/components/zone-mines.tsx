import {Container, Header, Table} from "semantic-ui-react";
import * as React from "react";


enum EMineNames {
  Sawmill = "Sawmill",
  Ore_Pit = "Ore_Pit",
  Gold_Mine = "Gold_Mine",
  Sulfur_Dune = "Sulfur_Dune",
  Crystal_Cavern = "Crystal_Cavern",
  Gem_Pond = "Gem_Pond",
  Alchemist_Lab = "Alchemist_Lab",
  Abandoned_Mine = "Abandoned_Mine",
  Player_Related = "Player_Related",
}

const minesNameList = [
  EMineNames.Sawmill,
  EMineNames.Ore_Pit,
  EMineNames.Gold_Mine,
  EMineNames.Sulfur_Dune,
  EMineNames.Crystal_Cavern,
  EMineNames.Gem_Pond,
  EMineNames.Alchemist_Lab,
  EMineNames.Abandoned_Mine,
  EMineNames.Player_Related,
];

const MAP_MINE_NAME_TO_LABEL = {
  [EMineNames.Sawmill]: 'Лесопилка',
  [EMineNames.Ore_Pit]: 'Каменная шахта',
  [EMineNames.Gold_Mine]: 'Золотая шахта',
  [EMineNames.Sulfur_Dune]: 'Серная шахта',
  [EMineNames.Crystal_Cavern]: 'Кристаллическая шахта',
  [EMineNames.Gem_Pond]: 'Шахта самоцветов',
  [EMineNames.Alchemist_Lab]: 'Алхимическая лаборатория',
  [EMineNames.Abandoned_Mine]: 'Затерянная шахта',
  [EMineNames.Player_Related]: 'Неизвестный объект',
};

export const ZoneMines = (props: { data: Record<any, any> }) => (
  <Container>
    <Header as={'h2'} content="Шахты" />
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell content='Название' />
          <Table.HeaderCell content='Наличие' />
          <Table.HeaderCell content='Охрана' />
          <Table.HeaderCell content='Шанс появления' />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          minesNameList.map(mineName => (
            <Table.Row key={mineName}>
              <Table.Cell content={MAP_MINE_NAME_TO_LABEL[mineName]} />
              <Table.Cell content={Boolean(Number(props.data.Mines._attributes[mineName])) ? 'Да' : 'Нет'} />
              <Table.Cell content={props.data.MinesData._attributes[`${mineName}Value`]} />
              <Table.Cell content={props.data.MinesData._attributes[`${mineName}Chance`]} />
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table>
  </Container>
)
