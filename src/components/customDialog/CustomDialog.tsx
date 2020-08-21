import React from 'react';
import { Button, Paragraph, Dialog } from 'react-native-paper';

function CustomDialog(props: any) {
  return (
    <Dialog visible={props.dislogStatus} onDismiss={props.hideDialog}>
      <Dialog.Title>{props.dialogTitle}</Dialog.Title>
      <Dialog.Content>
        <Paragraph>{props.dialogDescription}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={props.hideDialog}>CLOSE</Button>
      </Dialog.Actions>
    </Dialog>
  );
}

export default CustomDialog;
