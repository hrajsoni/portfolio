import {
  siCss,
  siDocker,
  siGit,
  siGoogleanalytics,
  siHtml5,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siShopify,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

export type SkillIcon = {
  title: string;
  slug: string;
  path: string;
  hex: string;
};

// 3×5 grid — consumed by the 3D keyboard (one icon per keycap) and, on mobile,
// by the flat list for the static skills grid.
export const SKILLS_GRID: readonly (readonly SkillIcon[])[] = [
  [siShopify, siNextdotjs, siReact, siTypescript, siJavascript],
  [siTailwindcss, siNodedotjs, siMongodb, siPostgresql, siHtml5],
  [siCss, siGoogleanalytics, siGit, siPython, siDocker],
] as const;

export const SKILLS_FLAT: readonly SkillIcon[] = SKILLS_GRID.flat();
