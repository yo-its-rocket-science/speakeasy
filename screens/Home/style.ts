import { StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  appbar: {
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    height: 128,
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
  listContainer: {
    backgroundColor: theme.colors.background,
  },
  createRoomFab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  card: {
    marginBottom: 16,
    marginHorizontal: 8,
  }
});
