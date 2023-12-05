/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import sunny from '@/icons/sunny'
import dark from '@/icons/dark'
import { h } from 'vue'

// Composables
import {createVuetify, IconProps, IconSet, ThemeDefinition} from 'vuetify'

const myTheme : ThemeDefinition = {
    dark: false,
    colors: {
      // primary: '#1867C0',
      primary: 'white',
      secondary: '#D2AA45',
      background:  '#333333'
    },
  }

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

// export default createVuetify({
//   theme: {
    
//     defaultTheme: 'myTheme',
//     themes: {
//       myTheme
//     },
//   },
// })

const customIcons: any = {
  sunny,
  dark,
}
const custom: IconSet = {
  component: (props: IconProps) => h(customIcons[props.icon])
}
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#3F3F3F',
          secondary: '#A41C1C',
          background: '#FCFCEF'
        },
      },
      dark: {
        colors: {
          primary: '#FCFCEF',
          secondary: '#D2AA45',
          background: '#3F3F3F'
        },
      }
    }
  },
  
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      custom
    }
    
  }
})
  
