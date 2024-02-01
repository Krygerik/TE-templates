import * as React from 'react';
import { Grid, Header, Message } from 'semantic-ui-react';
import { DragAndDrop } from './drag-and-drop';
import { Template } from './template';

export const App: React.FC<{}> = () => {
  const [file, setFile] = React.useState<File>();

  const handleDrop = (files: FileList) => {
    setFile(files[0]);
  }

  return (
    <Grid
      container
      style={{ padding: '5em 0em' }}
    >
      <Grid.Row>
        <Grid.Column>
          <Header
            as='h1'
            dividing
            content="HoMM V Tournament Edition templates"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Message>
            <Header as='h2'>Приветствую на сайте!</Header>
            <p>
              Этот сайт предназначен для изучения шаблонов карт для модификации "Tournament Edition".
              Для того, чтобы изучить нужный вам шаблон - загрузите его на этот сайт.
            </p>
          </Message>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <DragAndDrop handleDrop={handleDrop} />
        </Grid.Column>
      </Grid.Row>
      {
        file && (
          <Grid.Row>
            <Grid.Column>
              <Template file={file} />
            </Grid.Column>
          </Grid.Row>
        )
      }
    </Grid>
  );
}
