### Just a theme provider for [Aleph.js](https://alephjs.org).

```tsx
// app.tsx
import React, { FC } from "react";
import ThemeProvider, { Mode } from "https://deno.land/x/aleph_provider_theme@v0.2.0/mod.tsx";

export default function App(
  { Page, pageProps }: { Page: FC; pageProps: Record<string, unknown> },
) {
  return (
    <ThemeProvider initialMode={Mode.SYSTEM}>
      <Page {...pageProps} />
    </ThemeProvider>
  );
}
```

```tsx
// components/ThemeToggler.tsx
import React, { useCallback } from "react";
import { Mode, useTheme } from "https://deno.land/x/aleph_provider_theme@v0.2.0/mod.tsx";

export default function ThemeToggler() {
  const { mode, setMode } = useTheme();

  const toggleTheme = useCallback(
    () => setMode(mode === Mode.LIGHT ? Mode.DARK : Mode.LIGHT),
    [mode],
  );

  return (
    <button onClick={toggleTheme}>
      {mode === Mode.LIGHT ? "⛅" : "🌑"}
    </button>
  );
}
```

```css
/* style/reset.css */
.dark body
{
    background-color: #000;
}
```
