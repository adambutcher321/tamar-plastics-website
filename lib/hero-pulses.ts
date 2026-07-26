/**
 * Timing/geometry for the homepage hero film's product "pulse" overlays.
 *
 * Coordinates are in the source video's native frame space (see VIDEO_W/H —
 * matches public/videos/hero-film.mp4) and get mapped to on-screen pixels by
 * `mapPoint`, which replicates the CSS `object-fit: cover; object-position:
 * 50% 60%` math applied to `.home-bg` so overlays track the video exactly at
 * any viewport size. Points were read off exported video frames against a
 * 100px reference grid — see docs/superpowers if these ever need re-deriving
 * after a new hero film generation.
 */

export const VIDEO_W = 1280;
export const VIDEO_H = 720;
export const OBJECT_POSITION = { x: 0.5, y: 0.6 };
export const LOOP_DURATION = 8;

export function mapPoint(px: number, py: number, containerW: number, containerH: number) {
  const scale = Math.max(containerW / VIDEO_W, containerH / VIDEO_H);
  const renderedW = VIDEO_W * scale;
  const renderedH = VIDEO_H * scale;
  const offsetX = (containerW - renderedW) * OBJECT_POSITION.x;
  const offsetY = (containerH - renderedH) * OBJECT_POSITION.y;
  return { x: offsetX + px * scale, y: offsetY + py * scale, scale };
}

export interface RingPulse {
  id: string;
  kind: 'ring';
  label: string;
  center: [number, number];
  size: [number, number];
  start: number;
  end: number;
}

export interface PathPulse {
  id: string;
  kind: 'path';
  label: string;
  points: [number, number][];
  start: number;
  end: number;
}

export type Pulse = RingPulse | PathPulse;

/** Sequential product highlights across the 8s loop. Gaps between windows are intentional — each effect gets room to read before the next begins. */
export const PULSES: Pulse[] = [
  { id: 'door', kind: 'ring', label: 'entrance door', center: [615, 480], size: [112, 210], start: 1.2, end: 2.3 },
  { id: 'window', kind: 'ring', label: 'principal window', center: [1008, 448], size: [252, 148], start: 2.3, end: 3.4 },
  { id: 'fascia', kind: 'path', label: 'fascia & soffit', points: [[700, 205], [1230, 205]], start: 3.4, end: 4.6 },
  { id: 'guttering', kind: 'path', label: 'guttering & downpipe', points: [[1200, 193], [1200, 340]], start: 4.6, end: 5.8 },
  {
    id: 'roofline',
    kind: 'path',
    label: 'roofline',
    points: [
      [190, 300],
      [290, 300],
      [290, 248],
      [440, 248],
      [460, 210],
      [590, 95],
      [720, 210],
      [1230, 205],
    ],
    start: 5.8,
    end: 7.0,
  },
];

/** Envelope: 0 before `start`; fades in over the first 18% of the window, holds, fades out over the last 35%; 0 after `end`. */
export function pulseEnvelope(t: number, start: number, end: number) {
  if (t < start || t > end) return { opacity: 0, draw: 0 };
  const dur = end - start;
  const local = t - start;
  const fadeIn = dur * 0.18;
  const fadeOutStart = dur * 0.65;

  const draw = Math.min(1, local / fadeIn);
  let opacity = 1;
  if (local < fadeIn) {
    opacity = local / fadeIn;
  } else if (local > fadeOutStart) {
    opacity = Math.max(0, 1 - (local - fadeOutStart) / (dur - fadeOutStart));
  }
  return { opacity, draw };
}
