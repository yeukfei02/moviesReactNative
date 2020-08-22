import React from 'react';
import { Snackbar } from 'react-native-paper';

function SnackBar(props: any) {
  let color = '';

  if (props.snackBarType) {
    switch (props.snackBarType) {
      case 'success':
        color = '#4caf50';
        break;
      case 'info':
        color = '#2196f3';
        break;
      case 'warning':
        color = '#f9ec14';
        break;
      case 'error':
        color = '#f44336';
        break;
    }
  }

  return (
    <Snackbar
      style={{ backgroundColor: color }}
      theme={{ colors: { accent: 'white' } }}
      visible={props.snackBarStatus}
      onDismiss={props.handleSnackBarDismiss}
      action={{
        label: 'Close',
        onPress: () => {
          props.handleSnackBarDismiss();
        },
      }}
    >
      {props.snackBarMessage}
    </Snackbar>
  );
}

export default SnackBar;
