import React from 'react';
import { Snackbar } from 'react-native-paper';

function SnackBar(props: any) {
  return (
    <Snackbar
      visible={props.snackBarStatus}
      onDismiss={props.handleSnackBarDismiss()}
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
