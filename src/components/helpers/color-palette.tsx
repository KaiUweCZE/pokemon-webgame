import React from "react";

const colors = [
  {
    border: {
      DEFAULT: "rgba(var(--border))",
      secondary: "rgba(var(--border-secondary))",
    },
    input: "rgba(var(--input))",
    ring: "rgba(var(--ring))",
    background: "rgba(var(--background))",
    foreground: "rgba(var(--foreground))",
    content: {
      DEFAULT: "rgba(var(--content))",
      secondary: "rgba(var(--content-secondary))",
    },
    primary: {
      DEFAULT: "rgba(var(--primary))",
      dark: "rgba(var(--primary-dark))",
      accent: "rgba(var(--primary-accent))",
      foreground: "rgba(var(--primary-foreground))",

      text: "rgba(var(--primary-text))",
    },
    secondary: {
      DEFAULT: "rgba(var(--secondary))",
      text: "rgba(var(--secondary-text))",
    },
    destructive: {
      DEFAULT: "rgba(var(--destructive))",
      secondary: "rgba(var(--destructive-secondary))",
    },
    accent: {
      DEFAULT: "rgba(var(--accent))",
      secondary: "rgba(var(--accent-secondary))",
    },
    element: {
      DEFAULT: "rgba(var(--element))",
      light: "rgba(var(--element-light))",
    },
  },
];

const ColorPalette = () => {
  const flattenColors = (obj: (typeof colors)[0], prefix = "") => {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        if (typeof value === "string") {
          return [...acc, { name: key, value }];
        }
        return [
          ...acc,
          ...Object.entries(value).map(([subKey, subValue]) => ({
            name: `${key}-${subKey === "DEFAULT" ? "" : subKey}`.replace(/-$/, ""),
            value: subValue,
          })),
        ];
      },
      [] as { name: string; value: string }[]
    );
  };

  const colorEntries = flattenColors(colors[0]);

  return (
    <div className="grid w-full grid-cols-10 gap-1 p-2">
      {colorEntries.map(({ name, value }) => (
        <div key={name} className="group relative aspect-square">
          <div className="h-full w-full rounded" style={{ backgroundColor: value }} />
          <div className="absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 -translate-y-full group-hover:block">
            <div className="rounded bg-gray-800 px-2 py-1 text-xs text-white">{name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;
