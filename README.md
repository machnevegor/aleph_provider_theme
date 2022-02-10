### Just a theme provider for [Aleph.js](https://alephjs.org).

```tsx
// app.tsx
import React, { FC } from "react";
import ThemeProvider, { Mode } from "https://deno.land/x/aleph_provider_theme@v1.1.0/mod.tsx";

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
import { Mode, useTheme } from "theme";

const settings = [
  {
    label: "Light Mode",
    value: Mode.LIGHT,
    emoji: "⛅",
  },
  {
    label: "Dark Mode",
    value: Mode.DARK,
    emoji: "🌑",
  },
  {
    label: "System Mode",
    value: Mode.SYSTEM,
    emoji: "⚡",
  },
];

export default function ThemeToggler() {
  const { mode, setMode } = useTheme();

  const toggleTheme = useCallback(
    ({ target }) => setMode(target.value),
    [],
  );

  return (
    <select onChange={toggleTheme}>
      {settings.map(({ label, value, emoji }) => (
        <option value={value} selected={value === mode} key={value}>
          {emoji} {label}
        </option>
      ))}
    </select>
  );
}
```

```css
/* style/reset.css */
:root
{
    --text-color: #000;
    --bg-color: #fff;
}

:root[class="dark"]
{
    --text-color: #fff;
    --bg-color: #000;
}
```
