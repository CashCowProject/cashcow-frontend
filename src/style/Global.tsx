import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from 'cashcow-uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }

    #root {
      position: relative;
    }
  }
  .ReactModal__Overlay {
    z-index: 999;
  }
  iframe
  {
      display: none;
  }
  .LinkItemContainer {
    width: 25%;
    @media (max-width: 500px) {
      width: 100%;
    }
  }
`

export default GlobalStyle
