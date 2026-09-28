import { COLOR_ROLES, type ColorRole, type VisualWorldDefinition } from "./visual-worlds";

export type ContrastCheck = {
  world: string;
  pairing: string;
  ratio: number;
  minimum: number;
};

function linearChannel(value: number) {
  const normalized = value / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex: string) {
  const normalized = hex.replace("#", "");
  const full = normalized.length === 3
    ? normalized.split("").map((channel) => channel + channel).join("")
    : normalized;

  if (!/^[\da-f]{6}$/i.test(full)) throw new Error(`Invalid color: ${hex}`);

  const [red, green, blue] = [0, 2, 4].map((index) =>
    linearChannel(Number.parseInt(full.slice(index, index + 2), 16)),
  );

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function contrastRatio(foreground: string, background: string) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

type Pair = { foreground: ColorRole; background: ColorRole; minimum: number };
const textSurfaces = ["canvas", "surface", "surfaceSubtle", "surfaceElevated"] as const;
const controlSurfaces = ["canvas", "surface", "surfaceElevated"] as const;

const textPairs: Pair[] = [
  ...(["textPrimary", "textSecondary", "textMuted"] as const).flatMap((foreground) =>
    textSurfaces.map((background) => ({ foreground, background, minimum: 4.5 })),
  ),
  ...textSurfaces.map((background) => ({ foreground: "actionPrimary" as const, background, minimum: 4.5 })),
  ...textSurfaces.map((background) => ({ foreground: "brandPrimary" as const, background, minimum: 3 })),
  { foreground: "textInverse", background: "surfaceStrong", minimum: 4.5 },
  ...(["actionPrimary", "actionPrimaryHover", "actionPrimaryActive"] as const).map(
    (background) => ({ foreground: "actionPrimaryText" as const, background, minimum: 4.5 }),
  ),
  ...(["actionSecondary", "actionSecondaryHover", "actionSecondaryActive"] as const).map(
    (background) => ({ foreground: "actionSecondaryText" as const, background, minimum: 4.5 }),
  ),
  { foreground: "success", background: "successSurface", minimum: 4.5 },
  { foreground: "warning", background: "warningSurface", minimum: 4.5 },
  { foreground: "danger", background: "dangerSurface", minimum: 4.5 },
  { foreground: "information", background: "informationSurface", minimum: 4.5 },
];

const uiBoundaryPairs: Pair[] = [
  ...(["borderDefault", "borderStrong"] as const).flatMap((foreground) => [
    ...controlSurfaces.map((background) => ({ foreground, background, minimum: 3 })),
  ]),
];

export function inspectWorldContrast(world: VisualWorldDefinition): ContrastCheck[] {
  const regular = [...textPairs, ...uiBoundaryPairs].map((pair) => ({
    world: world.label,
    pairing: `${pair.foreground} / ${pair.background}`,
    ratio: contrastRatio(world.colors[pair.foreground], world.colors[pair.background]),
    minimum: pair.minimum,
  }));

  const focusSurfaces: ColorRole[] = [
    "canvas",
    "surface",
    "surfaceSubtle",
    "surfaceElevated",
    "actionPrimary",
    "actionSecondary",
    "actionSecondaryHover",
    "actionSecondaryActive",
  ];

  const focus = focusSurfaces.map((background) => ({
    world: world.label,
    pairing: `dual focus ring / ${background}`,
    ratio: Math.max(
      contrastRatio(world.colors.focusRingLight, world.colors[background]),
      contrastRatio(world.colors.focusRingDark, world.colors[background]),
    ),
    minimum: 3,
  }));

  return [...regular, ...focus];
}

export function contrastReport(worlds: VisualWorldDefinition[]) {
  const checks = worlds.flatMap(inspectWorldContrast);
  const failures = checks.filter((check) => check.ratio < check.minimum);
  return {
    passed: failures.length === 0,
    checks,
    failures,
    minimumRatio: Math.min(...checks.map((check) => check.ratio)),
  };
}

export function roleEntries(world: VisualWorldDefinition) {
  return COLOR_ROLES.map((role) => ({ role, value: world.colors[role] }));
}
