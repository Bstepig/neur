import { Frame } from './frame';
import { FramesTemplate } from './framesTemplate';

export const FRAMES: Frame[] = [
  { path: '../assets/img/1.png', difficult: "легко" },
  { path: '../assets/img/2.png', difficult: "легко" },
  { path: '../assets/img/3.png', difficult: "легко" },
  { path: '../assets/img/4.png', difficult: "легко" },
  { path: '../assets/img/5.png', difficult: "легко" },
  { path: '../assets/img/6.png', difficult: "легко" },
  { path: '../assets/img/7.png', difficult: "легко" },
  { path: '../assets/img/8.png', difficult: "легко" },
  { path: '../assets/img/1 - копия.png', difficult: "сложно" },
  { path: '../assets/img/2 - копия.png', difficult: "сложно" },
  { path: '../assets/img/3 - копия.png', difficult: "сложно" },

]

export const TEMPLATES: FramesTemplate[] = [
  {
    name: 'simple',
    frames: [
      { path: '../assets/img/7.png', difficult: "легко" },
      { path: '../assets/img/2 - копия.png', difficult: "сложно" },
      { path: '../assets/img/9.png', difficult: "легко" },
    ],
    difficult: "средняя"
  }
]