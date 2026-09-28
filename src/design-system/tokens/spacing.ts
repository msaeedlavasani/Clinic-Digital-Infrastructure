export const SPACE = {
  50: 4,
  100: 8,
  200: 12,
  300: 16,
  400: 24,
  500: 32,
  600: 48,
  700: 64,
  800: 96,
  900: 128,
  1000: 160,
} as const;

export const RELATIONSHIPS = {
  mobile: {
    pageInline: SPACE[300],
    stageBlock: SPACE[600],
    section: SPACE[700],
    scene: SPACE[300],
    contentGroup: SPACE[400],
    copy: SPACE[300],
    mediaCopy: SPACE[400],
    action: SPACE[400],
    control: SPACE[100],
    safeAction: SPACE[400],
  },
  desktop: {
    pageInline: SPACE[400],
    stageBlock: SPACE[700],
    section: SPACE[800],
    scene: SPACE[500],
    contentGroup: SPACE[500],
    copy: SPACE[300],
    mediaCopy: SPACE[500],
    action: SPACE[400],
    control: SPACE[100],
    safeAction: SPACE[300],
  },
} as const;

export const SIZE = {
  interactionFloor: 44,
  preferredTouchEnvelope: 48,
  inputMinimum: 48,
  contentMeasure: "min(100%, 44rem)",
  defaultContainer: "min(100%, 80rem)",
  editorialContainer: "min(100%, 90rem)",
} as const;

export const RADIUS = {
  none: 0,
  small: 6,
  medium: 10,
  large: 18,
  expressive: 24,
  pill: 999,
} as const;
