'use client'

import { ThemeProvider } from 'next-themes'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

interface ProvidersProps {
  children: React.ReactNode
}

const progressBarCss = `
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background-color: #6A1DA0;
    background-image: linear-gradient(120deg, #6A1DA0 0%, #AB63DE 50%, #FCE202 100%);

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
  }

  /* Blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #6A1DA0, 0 0 5px #6A1DA0;
    opacity: 1.0;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
            transform: rotate(3deg) translate(0px, -4px);
  }
`

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ProgressBar
        style={progressBarCss}
        shallowRouting
        options={{ showSpinner: false }}
      />
      {children}
    </ThemeProvider>
  )
}
