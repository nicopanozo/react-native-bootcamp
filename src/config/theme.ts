import { colors } from './colors';

export const theme = {
  colors,
  fonts: {
    bold: 'Gilroy-Bold',
    semiBold: 'Gilroy-SemiBold',
    medium: 'Gilroy-Medium',
    regular: 'Gilroy-Regular',
  },
  fontSizes: {
    sm: 10,
    base: 14,
    md: 16,
    lg: 18,
  },
  textVariants: {
    h1: {
      fontFamily: 'Gilroy-SemiBold',
      fontSize: 22,
      lineHeight: 24,
    },
    h2: {
      fontFamily: 'Gilroy-SemiBold',
      fontSize: 16,
      lineHeight: 16,
    },
    body: {
      fontFamily: 'Gilroy-Medium',
      fontSize: 14,
      lineHeight: 14,
    },
    caption: {
      fontFamily: 'Gilroy-Medium',
      fontSize: 10,
      textAlign: 'right',
      lineHeight: 10,
    },
  },
};
