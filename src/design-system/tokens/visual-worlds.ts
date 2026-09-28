import rawDefinitions from "./visual-worlds.json";

export const COLOR_ROLES = [
  "canvas",
  "surface",
  "surfaceSubtle",
  "surfaceStrong",
  "surfaceInverse",
  "surfaceElevated",
  "textPrimary",
  "textSecondary",
  "textMuted",
  "textInverse",
  "borderSubtle",
  "borderDefault",
  "borderStrong",
  "actionPrimary",
  "actionPrimaryText",
  "actionPrimaryHover",
  "actionPrimaryActive",
  "actionSecondary",
  "actionSecondaryText",
  "actionSecondaryHover",
  "actionSecondaryActive",
  "focusRingLight",
  "focusRingDark",
  "success",
  "successSurface",
  "warning",
  "warningSurface",
  "danger",
  "dangerSurface",
  "information",
  "informationSurface",
  "brandPrimary",
  "brandSecondary",
  "accent",
] as const;

export type ColorRole = (typeof COLOR_ROLES)[number];
export type SemanticColorMapping = Record<ColorRole, `#${string}`>;

export type VisualWorldDefinition = {
  id: string;
  label: string;
  character: string;
  direction: string;
  colors: SemanticColorMapping;
  expressionMetadata?: Record<string, string>;
};

export type VisualWorldRegistry = Record<string, VisualWorldDefinition>;

const definitions = rawDefinitions as Record<
  string,
  Omit<VisualWorldDefinition, "id">
>;

export const VISUAL_WORLDS: VisualWorldRegistry = Object.fromEntries(
  Object.entries(definitions).map(([id, definition]) => [id, { id, ...definition }]),
);

export const INITIAL_WORLD_ID = "dark-cinematic";

export function registerVisualWorld(
  registry: VisualWorldRegistry,
  world: VisualWorldDefinition,
): VisualWorldRegistry {
  if (registry[world.id]) {
    throw new Error(`Visual World "${world.id}" is already registered.`);
  }

  const missingRoles = COLOR_ROLES.filter((role) => !world.colors[role]);
  if (missingRoles.length > 0) {
    throw new Error(`Visual World is missing semantic roles: ${missingRoles.join(", ")}`);
  }

  return { ...registry, [world.id]: world };
}

export function worldStyleVariables(
  world: VisualWorldDefinition,
): Record<`--cdi-${string}`, string> {
  return Object.fromEntries(
    Object.entries(world.colors).map(([role, value]) => [
      `--cdi-${role.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
      value,
    ]),
  ) as Record<`--cdi-${string}`, string>;
}

export function listVisualWorlds(registry: VisualWorldRegistry = VISUAL_WORLDS) {
  return Object.values(registry);
}
