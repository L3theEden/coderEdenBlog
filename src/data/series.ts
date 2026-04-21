import type { SeriesId } from '~/content/config';

export interface SeriesMeta {
  id: SeriesId;
  label_en: string;
  label_zh: string;
  tagline_en: string;
  tagline_zh: string;
  epigraph_en: string;
  epigraph_zh: string;
  source: string;
}

export const SERIES_META: Record<SeriesId, SeriesMeta> = {
  'prometheus-fire': {
    id: 'prometheus-fire',
    label_en: "Prometheus' Fire",
    label_zh: '普罗米修斯之火',
    tagline_en: 'Audacity, stolen capability, the burn of power.',
    tagline_zh: '大胆、偷来的能力、权力灼手的温度。',
    epigraph_en: 'The fire that was stolen is still warm in our hands.',
    epigraph_zh: '被盗的火，至今仍在我们手中发烫。',
    source: 'After Aeschylus, Prometheus Bound',
  },
  'fausts-pact': {
    id: 'fausts-pact',
    label_en: "Faust's Pact",
    label_zh: '浮士德之契',
    tagline_en: 'Trade-offs, technical debt, the velocity-price.',
    tagline_zh: '权衡、技术债、速度的代价。',
    epigraph_en: 'Zwei Seelen wohnen, ach! in meiner Brust.',
    epigraph_zh: '两个灵魂啊，居于我胸中。',
    source: 'Goethe, Faust I',
  },
  'daedalus-labyrinth': {
    id: 'daedalus-labyrinth',
    label_en: "Daedalus' Labyrinth",
    label_zh: '代达罗斯之迷宫',
    tagline_en: 'Architecture, abstractions, remembered exits.',
    tagline_zh: '架构、抽象、记得来路。',
    epigraph_en: 'He who builds the maze must also remember the way out.',
    epigraph_zh: '造迷宫的人，也要记得来路。',
    source: 'After Ovid, Metamorphoses VIII',
  },
  'sisyphus-stone': {
    id: 'sisyphus-stone',
    label_en: "Sisyphus' Stone",
    label_zh: '西西弗斯之石',
    tagline_en: 'Refactoring, routine, the meditation of repetition.',
    tagline_zh: '重构、日常、重复的冥想。',
    epigraph_en: 'One must imagine Sisyphus happy.',
    epigraph_zh: '应当想象西西弗斯是幸福的。',
    source: 'Camus, Le Mythe de Sisyphe',
  },
  'orphic-descent': {
    id: 'orphic-descent',
    label_en: 'Orphic Descent',
    label_zh: '俄耳甫斯下降',
    tagline_en: 'Debugging, retrieval, the peril of looking back.',
    tagline_zh: '调试、追溯、回首的危险。',
    epigraph_en: 'Look not back, lest the truth dissolve.',
    epigraph_zh: '莫回首，否则真相消散。',
    source: 'After Rilke',
  },
};

export const SERIES_ORDER: SeriesId[] = [
  'prometheus-fire',
  'fausts-pact',
  'daedalus-labyrinth',
  'sisyphus-stone',
  'orphic-descent',
];
