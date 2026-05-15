import { extendTheme } from '@chakra-ui/react'
import chroma from 'chroma-js';


const generateColorScale = (color) => ({ 
  50: chroma(color).brighten(4).hex(),
  100: chroma(color).brighten(3).hex(),
  200: chroma(color).brighten(2).hex(),
  300: chroma(color).brighten(1).hex(),
  400: chroma(color).brighten(0.5).hex(),
  500: color,
  600: chroma(color).darken(0.5).hex(),
  700: chroma(color).darken(1).hex(),
  800: chroma(color).darken(2).hex(),
  900: chroma(color).darken(3).hex(),
});

const colors = {
  brand: generateColorScale("#1550d9ff"),
  red: generateColorScale("#FF0000"),
  blue: generateColorScale("#0000FF"),
}

const fonts = {
  heading: `'Playfair Display', serif`,
  body: `'Playfair Display', sans-serif`,
}

const theme = extendTheme({ colors, fonts });

export default theme;