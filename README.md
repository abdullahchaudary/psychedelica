# Psychedelica

A generative visual and audio experience: twelve [Three.js](https://threejs.org/) scenes,
each with its own randomly generated geometry, colour and motion, scored by randomly
generated [Tone.js](https://tonejs.github.io/) music. Watch it in Randomize mode and no two
sessions look or sound the same. Watch it in Story mode and the same twelve scenes play in a
fixed, narrated order.

**Live demo:** [psychedelica.abchaudary.me](https://psychedelica.abchaudary.me)
**Full write-up:** [abchaudary.me/projects/psychedelica](https://abchaudary.me/projects/psychedelica)

## Features

- **Twelve procedurally random scenes**, each its own field of Three.js geometry (boxes,
  spheres, cones, tori, dodecahedra, octahedra), rebuilt from scratch every three seconds
- **Randomize mode**: picks the next scene on a 20-second timer with no fixed sequence
- **Story mode**: the identical twelve scenes played in order, each introduced by its own
  title card and pre-recorded narration track
- **Generative music, not just reactive**: melody and bassline notes are picked at random
  from a set of custom scales, so the score never repeats exactly the way it did before
- **3D spatial audio**: music and narration are routed through `Tone.Panner3D` in HRTF mode,
  drifting to a new random position in space every 1-5 seconds
- **Photosensitivity warning gate** before anything plays, flashing lights, colour changes
  and intense audio named up front
- **Installable as a PWA**, full-screen display mode

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Vue 3, Vite, Pinia, vue-router |
| Visuals | [Three.js](https://threejs.org/), one WebGL scene per mode |
| Audio | [Tone.js](https://tonejs.github.io/), procedurally generated |
| Styling | Tailwind CSS |
| Deployment | Installable PWA (`vite-plugin-pwa`) |

## Running it locally

```sh
npm install
npm run dev      # dev server with hot reload
npm run build     # production build
npm run lint      # ESLint
```

## Recommended IDE setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
(with Vetur disabled).

## By

[Abdullah Chaudary](https://abchaudary.me).
