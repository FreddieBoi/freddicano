import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import { FluentProvider, webDarkTheme } from '@fluentui/react-components';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <FluentProvider theme={webDarkTheme} style={{ height: '100vh' }}>
        <App />
      </FluentProvider>
    </StrictMode>,
  )
}
