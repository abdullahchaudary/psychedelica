<script>
import Psychedelica from '../helpers/Psychedelica';

export default {
    data() {
        return {
            showSideBar: false,
            viz: null,
            mode: 'randomize',
            timeOuts: [],
            music: -10,
            narration: -5,
            consentShow: true
        }
    },
    unmounted(){
      if(this.viz){
        delete this.viz.deconstruct();
      }
    },
    mounted(){

    },
    methods: {
        initPsy(){
          const canvas = document.getElementById("cnvs");
          this.viz = new Psychedelica(canvas);
          this.viz.modeSelect("mode2");
          this.consentShow = false;
          this.randomize();
        },
        modeSelect(e){
          if(e.target.value !== 'randomize'){
            for(let i=0; i<this.timeOuts.length; i++){
              clearTimeout(this.timeOuts[i]);
            }
            this.timeOuts = [];
            this.viz.modeSelect(e.target.value)
          } else {
              this.randomize();
          }
        },
        randomize(){
            if(this.mode === 'randomize'){
                this.timeOuts.push(setTimeout(()=>{
                    this.randomModeSelect();
                    this.randomize()
                },20000));
            }
        },
        randomModeSelect(){
            let no = Math.floor(Math.random() * (12-1+1) + 1);
            let mode = 'mode'+no;
            this.viz.modeSelect(mode);
        },
        changeVolume(e){
          this.music = e.target.value;
          this.viz.musicGen.setVolume(this.music);
        }
    },
}
</script>

<template>
  <main>
    <div id="consent" v-show="consentShow">
      <div class="p-5 m-5">
        <p class="m-3 text-5xl">Warning</p>
        <p class="m-3 text-sm">This application provides an immersive simulation through vivid visual and audio outputs. It includes flashing lights, rapidly changing colors, dynamic objects, and intense audio effects designed to simulate a psychedelic experience.</p>
        <p class="m-3 text-lg">Please be aware:</p>
        <ul class="m-3 text-center text-sm">
          <li>The use of this app may trigger photosensitive seizures in individuals prone to epilepsy or other visual sensitivities.</li>
          <li>If you experience dizziness, disorientation, or discomfort, discontinue use immediately.</li>
          <li>This app is intended for entertainment purposes only and should not be used while driving, operating machinery, or in situations requiring full attention.</li>
        </ul>
        <p class="m-3 text-lg">Viewer discretion is advised.</p>
        <p>
          <button class="rounded-full py-2 px-4 bg-gray-500 hover:bg-red-600" @click="this.initPsy">Proceed</button>
        </p>
      </div>
    </div>
    <div id="storyTitleDiv"><p id="storyTitle"></p></div>
    <canvas id="cnvs"></canvas>
    <button class="sideBarBTN fadedControls" type="button" @click="showSideBar = !showSideBar">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="48" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/><path d="M197.4,80.7a73.6,73.6,0,0,1,6.3,10.9L229.6,106a102,102,0,0,1,.1,44l-26,14.4a73.6,73.6,0,0,1-6.3,10.9l.5,29.7a104,104,0,0,1-38.1,22.1l-25.5-15.3a88.3,88.3,0,0,1-12.6,0L96.3,227a102.6,102.6,0,0,1-38.2-22l.5-29.6a80.1,80.1,0,0,1-6.3-11L26.4,150a102,102,0,0,1-.1-44l26-14.4a73.6,73.6,0,0,1,6.3-10.9L58.1,51A104,104,0,0,1,96.2,28.9l25.5,15.3a88.3,88.3,0,0,1,12.6,0L159.7,29a102.6,102.6,0,0,1,38.2,22Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/></svg>
    </button>
    <div class="sideBar fadedControls" v-show="showSideBar">
      <select :value="this.mode" @change="this.modeSelect" class="mb-3 appearance-dark block w-full px-3 py-1 text-base font-normal text-white-700 bg-grey-900 dark:bg-grey-900 bg-clip-padding bg-no-repeat border border-solid border-black-700 rounded transition ease-in-out m-0 focus:text-white-700 focus:bg-red focus:border-gray-300 focus:outline-none" aria-label="Select Wave Type">
        <option value="story">Story</option>
        <option selected value="randomize">Randomize</option>
        <option value="mode1">Mode 1</option>
        <option value="mode2">Mode 2</option>
        <option value="mode3">Mode 3</option>
        <option value="mode4">Mode 4</option>
        <option value="mode5">Mode 5</option>
        <option value="mode6">Mode 6</option>
        <option value="mode7">Mode 7</option>
        <option value="mode8">Mode 8</option>
        <option value="mode9">Mode 9</option>
        <option value="mode10">Mode 10</option>
        <option value="mode11">Mode 11</option>
        <option value="mode12">Mode 12</option>
      </select>
      <label htmlFor="music" class="form-label text-white small">Music: {{this.music}}</label>
      <input type="range" @input="this.changeVolume" class="form-range appearance-none w-full h-1 p-0 dark:bg-white-500 focus:outline-none focus:ring-0 focus:shadow-none" min="-50" max="-5" :value="this.music" id="music" />
      <!-- <label htmlFor="narration" class="form-label text-white">Narration: {{this.narration}}</label> -->
      <!-- <input type="range" @input="this.changeBoost" class="form-range appearance-none w-full h-1 p-0 dark:bg-white-500 focus:outline-none focus:ring-0 focus:shadow-none" min="-30" max="0" :value="this.narration" id="narration" /> -->
    </div>
  </main>
</template>
