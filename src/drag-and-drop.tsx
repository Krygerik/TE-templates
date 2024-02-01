import * as React from "react";
import { Message, Ref } from "semantic-ui-react";

type TDragAndDropProps = {
  handleDrop: (files: FileList) => void;
};

export const DragAndDrop = (props: TDragAndDropProps) => {
  const [isDragging, setDraggingStatus] = React.useState(false);

  const dropRef = React.createRef<any>();
  let dragCounter = 0;

  const handleDragEnter = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    dragCounter++;

    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setDraggingStatus(true);
    }
  };
  const handleDragLeave = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    dragCounter--;

    if (dragCounter > 0) return;

    setDraggingStatus(false);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setDraggingStatus(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      props.handleDrop(event.dataTransfer.files)
      event.dataTransfer.clearData()
      dragCounter = 0;
    }
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  }

  React.useEffect(() => {
    const div = dropRef.current;

    div.addEventListener('dragenter', handleDragEnter);
    div.addEventListener('dragleave', handleDragLeave);
    div.addEventListener('dragover', handleDragOver);
    div.addEventListener('drop', handleDrop);

    return () => {
      div.removeEventListener('dragenter', handleDragEnter);
      div.removeEventListener('dragleave', handleDragLeave);
      div.removeEventListener('dragover', handleDragOver);
      div.removeEventListener('drop', handleDrop);
    }
  }, [])

  return (
    <Ref innerRef={dropRef}>
      <Message
        icon='inbox'
        color={isDragging ? 'teal' : 'blue'}
        content={isDragging ? 'Бросай сюда' : 'Сюда можно перетащить шаблон'}
      />
    </Ref>
  )
}
