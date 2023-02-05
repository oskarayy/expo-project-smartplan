import { Colors } from './Colors';
import { Fonts } from './Fonts';

export const Styles = {
  root: {
    flex: 1,
    paddingTop: 45,
    paddingHorizontal: 20
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 16,
    marginVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.gray10
  },
  title: {
    ...Fonts.h4,
    fontSize: 15,
    color: Colors.white
  },
  date: {
    ...Fonts.text300,
    color: Colors.gray300,
    fontSize: 9
  },
  category: {
    ...Fonts.text300,
    color: Colors.gray300,
    fontSize: 10
  },
  desc: {
    ...Fonts.text300,
    color: Colors.gray400,
    fontSize: 13,
    marginBottom: 20
  }
};
