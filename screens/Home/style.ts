import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appbar: {
    position: 'absolute',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    height: 128,
    left: 0,
    right: 0,
  },
  profilePic: {
    justifyContent: 'flex-start',
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    margin: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  createRoomFab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});
