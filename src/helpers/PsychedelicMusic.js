import * as Tone from "tone";

export default class PsychedelicMusicGenerator {
    constructor() {
        this.globalTempo = 120;
        this.volumeLevel = -20;
        this.volumeLevelNarration = -5;
        this.volumeLevelSynth = -20;
        this.volumeNode = new Tone.Volume(this.volumeLevel).toDestination();
        this.volumeNodeSynth = new Tone.Volume(this.volumeLevel-2).toDestination();
        this.volumeNodeNarration = new Tone.Volume(this.volumeLevelNarration).toDestination();
        // this.initializeSynths();
        this.currentLoops = {};
        this.sceneNarrations = [];
        this.initializeNarrations();
        
    }

    initializeNarrations(){
        let narration1 = new Tone.Player("/narrations/Scene1.wav").connect(this.volumeNodeNarration);
        this.sceneNarrations.push(narration1);
        let narration2 = new Tone.Player("/narrations/Scene2.wav").connect(this.volumeNodeNarration);
        this.sceneNarrations.push(narration2);
        let narration3 = new Tone.Player("/narrations/Scene3.wav").connect(this.volumeNodeNarration);
        this.sceneNarrations.push(narration3);
        let narration4 = new Tone.Player("/narrations/Scene4.wav").connect(this.volumeNodeNarration);
        this.sceneNarrations.push(narration4);
        let narration5 = new Tone.Player("/narrations/Scene5.wav").connect(this.volumeNodeNarration);
        this.sceneNarrations.push(narration5);
        let narration6 = new Tone.Player("/narrations/Scene6.wav").connect(this.volumeNodeNarration);
        this.sceneNarrations.push(narration6);
        let narration7 = new Tone.Player("/narrations/Scene7.wav").connect(this.volumeNodeNarration);
        this.sceneNarrations.push(narration7);
        let narration8 = new Tone.Player("/narrations/Scene8.wav").connect(this.volumeNodeNarration);
        this.sceneNarrations.push(narration8);
        let narration9 = new Tone.Player("/narrations/Scene9.wav").connect(this.volumeNodeNarration);
        this.sceneNarrations.push(narration9);
        let narration10 = new Tone.Player("/narrations/Scene10.wav").connect(this.volumeNodeNarration);
        this.sceneNarrations.push(narration10);
        let narration11 = new Tone.Player("/narrations/Scene11.wav").connect(this.volumeNodeNarration);
        this.sceneNarrations.push(narration11);
        let narration12 = new Tone.Player("/narrations/Scene12.wav").connect(this.volumeNodeNarration);
        this.sceneNarrations.push(narration12);
    }

    addRandomChannelShiftToSynthNode(node) {
        const panner3D = new Tone.Panner3D({
            panningModel: 'HRTF'
        });
        panner3D.connect(this.volumeNodeSynth);
        
        node.connect(panner3D);
        
        const smoothShift = () => {
            const randomPanX = (Math.random() - 0.5) * 2;
            const randomPanY = (Math.random() - 0.5) * 2;
            const randomPanZ = (Math.random() - 0.5) * 2;
            const randomDuration = Math.random() * 4 + 1;
            panner3D.positionX.rampTo(randomPanX, randomDuration);
            panner3D.positionY.rampTo(randomPanY, randomDuration);
            panner3D.positionZ.rampTo(randomPanZ, randomDuration);
            setTimeout(smoothShift, randomDuration * 1000);
        };
        smoothShift();
    }

    addRandomChannelShiftToMusicNode(node) {
        const panner3D = new Tone.Panner3D({
            panningModel: 'HRTF'
        });
        panner3D.connect(this.volumeNode);
        
        node.connect(panner3D);
        
        const smoothShift = () => {
            const randomPanX = (Math.random() - 0.5) * 2;
            const randomPanY = (Math.random() - 0.5) * 2;
            const randomPanZ = (Math.random() - 0.5) * 2;
            const randomDuration = Math.random() * 4 + 1;
            panner3D.positionX.rampTo(randomPanX, randomDuration);
            panner3D.positionY.rampTo(randomPanY, randomDuration);
            panner3D.positionZ.rampTo(randomPanZ, randomDuration);
            setTimeout(smoothShift, randomDuration * 1000);
        };
        smoothShift();
    }

    initializeSynths() {
        this.synth = new Tone.AMSynth({
            oscillator: { type: 'square' },
            envelope: { attack: 0.2, decay: 0.5, sustain: 0.8, release: 1.2 }
        }).connect(this.volumeNodeSynth);
        
        this.bass = new Tone.MonoSynth({
            oscillator: { type: 'square' },
            filter: { Q: 8, frequency: 200 },
            envelope: { attack: 0.2, decay: 0.3, sustain: 0.2, release: 1.2 }
        }).connect(this.volumeNode);
        
        this.kick = new Tone.MembraneSynth({
            envelope: { attack: 0.02, decay: 0.4, sustain: 0.3, release: 0.5 }
        }).connect(this.volumeNode);
        
        this.snare = new Tone.NoiseSynth({
            noise: { type: 'white' },
            envelope: { attack: 0.005, decay: 0.3, sustain: 0.2, release: 0.2 }
        }).connect(this.volumeNode);
        
        this.hiHat = new Tone.MetalSynth({
            envelope: { attack: 0.005, decay: 0.1, sustain: 0.1 }
        }).connect(this.volumeNode);
        
        this.reverb = new Tone.Reverb({ decay: 1, preDelay: 0.1 }).connect(this.volumeNode);
        this.delay = new Tone.FeedbackDelay(0.5, 0.5).connect(this.volumeNode);
        this.chorus = new Tone.Chorus(4, 2.5, 0.5).connect(this.volumeNode);

        this.addRandomChannelShiftToSynthNode(this.synth);
        this.addRandomChannelShiftToMusicNode(this.bass);
        this.addRandomChannelShiftToMusicNode(this.kick);
        this.addRandomChannelShiftToMusicNode(this.snare);
        this.addRandomChannelShiftToMusicNode(this.hiHat);
    }

    setVolume(volume) {
        this.volumeNode.volume.value = volume;
        this.volumeNodeSynth.volume.value = volume-2;
    }

    setTempo(bpm) {
        Tone.Transport.bpm.value = bpm;
    }

    getPsychedelicNote() {
        const scales = {
            scale1: ['C4', 'D4', 'E4', 'G4', 'A4', 'B4', 'D5', 'E5', 'F5', 'G#4', 'A#4'],
            scale2: ['D#4', 'F#4', 'A4', 'C5', 'E5', 'G5', 'A#5', 'C6', 'D6', 'F6', 'G6'],
            scale3: ['C3', 'D#3', 'F3', 'G#3', 'B3', 'C4', 'E4', 'F#4', 'G4', 'A3', 'B4'],
            scale4: ['A3', 'C4', 'E4', 'G4', 'B4', 'D5', 'F5', 'G#5', 'A5', 'C5', 'D#5']
        };
        const selectedScale = Object.values(scales)[Math.floor(Math.random() * Object.values(scales).length)];
        return selectedScale[Math.floor(Math.random() * selectedScale.length)];
    }

    createDrumLoop(variation) {
        if (this.currentLoops.drum) {
            this.currentLoops.drum.stop();
            this.currentLoops.drum.dispose();
        }

        const reverb = new Tone.Reverb({ decay: 1.5, preDelay: 0.2 });
        this.kick.connect(reverb);
        this.snare.connect(reverb);
        this.hiHat.connect(reverb);

        const drumLoop = new Tone.Loop((time) => {
            const eighthNote = Tone.Time("8n").toSeconds();
            const sixteenthNote = Tone.Time("16n").toSeconds();
            const thirtySecondNote = Tone.Time("32n").toSeconds();
            const now = Tone.now();
        
            switch (variation) {
                case 1:
                    this.kick.triggerAttackRelease("C1", "8n", time);
                    this.snare.triggerAttackRelease("8n", now + time + eighthNote + 0.01);
                    this.hiHat.triggerAttackRelease("16n", now + time + eighthNote - 0.01);
                    break;
                case 2:
                    this.kick.triggerAttackRelease("C1", "16n", time);
                    this.hiHat.triggerAttackRelease("16n", now + time + sixteenthNote + 0.03);
                    break;
                case 3:
                    this.snare.triggerAttackRelease("8n", now + time + eighthNote + 0.01);
                    this.hiHat.triggerAttackRelease("16n", now + time + eighthNote + 0.03);
                    break;
                case 4:
                    this.kick.triggerAttackRelease("C1", "16n", now + time + 0.01);
                    this.kick.triggerAttackRelease("C1", "16n", now + time + sixteenthNote + 0.03);
                    this.snare.triggerAttackRelease("8n", now + time + eighthNote + 0.19);
                    break;
                case 5:
                    this.kick.triggerAttackRelease("C1", "8n", now + time);
                    this.snare.triggerAttackRelease("16n", now + time + sixteenthNote + 0.03);
                    this.hiHat.triggerAttackRelease("16n", now + time + sixteenthNote + 0.06);
                    break;
                case 6:
                    // this.hiHat.triggerAttackRelease("32n", now + time + 0.01);
                    this.hiHat.triggerAttackRelease("32n", now + time + sixteenthNote + 0.15);
                    this.snare.triggerAttackRelease("8n", now + time + eighthNote + 0.07);
                    break;
                case 7:
                    this.snare.triggerAttackRelease("8n", now + time + eighthNote + 0.01);
                    this.kick.triggerAttackRelease("C1", "8n", now + time + eighthNote + 0.02);
                    this.hiHat.triggerAttackRelease("16n", now + time + sixteenthNote + 0.03);
                    break;
                case 8:
                    this.kick.triggerAttackRelease("C1", "8n", now + time);
                    this.snare.triggerAttackRelease("16n", now + time + sixteenthNote + 0.05);
                    this.hiHat.triggerAttackRelease("16n", now + time + sixteenthNote + 0.07);
                    break;
                case 9:
                    this.hiHat.triggerAttackRelease("32n", now + time + thirtySecondNote + 0.03);
                    // this.hiHat.triggerAttackRelease("32n", now + time + thirtySecondNote + 0.05);
                    this.snare.triggerAttackRelease("16n", now + time + sixteenthNote + 0.15);
                    break;
                case 10:
                    this.hiHat.triggerAttackRelease("8n", now + time);
                    // this.hiHat.triggerAttackRelease("16n", now + time + sixteenthNote + 0.04);
                    this.kick.triggerAttackRelease("C1", "8n", now + time + eighthNote + 0.08);
                    this.snare.triggerAttackRelease("16n", now + time + sixteenthNote + 0.12);
                    break;
                case 11:
                    this.snare.triggerAttackRelease("32n", now + time);
                    this.snare.triggerAttackRelease("32n", now + time + thirtySecondNote + 0.02);
                    this.hiHat.triggerAttackRelease("16n", now + time + sixteenthNote + 0.04);
                    break;
                case 12:
                    this.kick.triggerAttackRelease("32n", now + time);
                    this.snare.triggerAttackRelease("16n", now + time + sixteenthNote + 0.02);
                    this.hiHat.triggerAttackRelease("16n", now + time + sixteenthNote + 0.04);
                    break;
                default:
                    this.kick.triggerAttackRelease("C1", "8n", now + time);
                    this.snare.triggerAttackRelease("16n", now + time + sixteenthNote + 0.01);
                    break;
            }
        }, "1n").start(0);
        
        
        
        
        this.currentLoops.drum = drumLoop;
    }

    createBassLoop(variation) {
        if (this.currentLoops.bass) {
            this.currentLoops.bass.stop();
            this.currentLoops.bass.dispose();
        }

        const filter = new Tone.Filter(200, 'lowpass');
        const reverb = new Tone.Reverb({ decay: 1, preDelay: 0.2 });
        this.bass.connect(filter).connect(reverb);

        const bassLoop = new Tone.Loop((time) => {
            switch (variation) {
                case 1:
                    this.bass.triggerAttackRelease("C2", "16n", time + 0.125);
                    this.bass.triggerAttackRelease("G2", "16n", time + 0.5);
                    this.bass.triggerAttackRelease("C3", "8n", time + 0.75);
                    break;
                case 2:
                    this.bass.triggerAttackRelease("E2", "32n", time);
                    this.bass.triggerAttackRelease("F2", "32n", time + 0.25);
                    this.bass.triggerAttackRelease("G2", "16n", time + 0.5);
                    break;
                case 3:
                    this.bass.triggerAttackRelease("C2", "16n", time);
                    this.bass.triggerAttackRelease("A1", "16n", time + 0.375);
                    this.bass.triggerAttackRelease("C3", "16n", time + 0.625);
                    break;
                case 4:
                    this.bass.triggerAttackRelease("C2", "8n", time);
                    this.bass.triggerAttackRelease("G2", "8n", time + 0.25);
                    this.bass.triggerAttackRelease("D2", "16n", time + 0.75);
                    break;
                case 5:
                    this.bass.triggerAttackRelease("E1", "16n", time);
                    this.bass.triggerAttackRelease("E2", "16n", time + 0.25);
                    this.bass.triggerAttackRelease("F1", "16n", time + 0.625);
                    break;
                case 6:
                    this.bass.triggerAttackRelease("C2", "16n", time + 0.125);
                    this.bass.triggerAttackRelease("G2", "32n", time + 0.375);
                    this.bass.triggerAttackRelease("C2", "16n", time + 0.75);
                    break;
                case 7:
                    this.bass.triggerAttackRelease("D2", "16n", time + 0.25);
                    this.bass.triggerAttackRelease("A2", "16n", time + 0.5);
                    this.bass.triggerAttackRelease("C3", "8n", time + 0.875);
                    break;
                case 8:
                    this.bass.triggerAttackRelease("G1", "16n", time);
                    this.bass.triggerAttackRelease("D2", "16n", time + 0.125);
                    this.bass.triggerAttackRelease("C2", "32n", time + 0.625);
                    break;
                case 9:
                    this.bass.triggerAttackRelease("A1", "32n", time + 0.125);
                    this.bass.triggerAttackRelease("C2", "8n", time + 0.5);
                    this.bass.triggerAttackRelease("G2", "16n", time + 0.875);
                    break;
                case 10:
                    this.bass.triggerAttackRelease("E2", "16n", time + 0.25);
                    this.bass.triggerAttackRelease("C3", "16n", time + 0.5);
                    this.bass.triggerAttackRelease("G2", "32n", time + 0.75);
                    break;
                case 11:
                    this.bass.triggerAttackRelease("F2", "32n", time + 0.125);
                    this.bass.triggerAttackRelease("C2", "16n", time + 0.375);
                    this.bass.triggerAttackRelease("A2", "16n", time + 0.75);
                    break;
                case 12:
                    this.bass.triggerAttackRelease("C1", "8n", time);
                    this.bass.triggerAttackRelease("G1", "32n", time + 0.25);
                    this.bass.triggerAttackRelease("D1", "16n", time + 0.75);
                    break;
                default:
                    this.bass.triggerAttackRelease("C2", "8n", time);
                    this.bass.triggerAttackRelease("G2", "16n", time + 0.25);
                    break;
            }
        }, "2n").start(0);
        
        

        this.currentLoops.bass = bassLoop;
    }

    createMelodyLoop(variation) {
        if (this.currentLoops.melody) {
            this.currentLoops.melody.stop();
            this.currentLoops.melody.dispose();
        }
        let delay, chorus, reverb;
        
        switch (variation) {
            case 1:
                delay = new Tone.FeedbackDelay(0.3, 0.6);
                chorus = new Tone.Chorus(2, 2.5, 1);
                reverb = new Tone.Reverb({ decay: 2, wet: 0.4 });
                break;
            case 2:
                delay = new Tone.FeedbackDelay(0.4, 0.8);
                chorus = new Tone.Chorus(3, 3, 0.8);
                reverb = new Tone.Reverb({ decay: 1, wet: 0.5 });
                break;
            case 3:
                delay = new Tone.FeedbackDelay(0.5, 0.7);
                chorus = new Tone.Chorus(4, 3.5, 1.2);
                reverb = new Tone.Reverb({ decay: 4, wet: 0.6 });
                break;
            case 4:
                delay = new Tone.FeedbackDelay(0.6, 0.9);
                chorus = new Tone.Chorus(5, 4, 1.5);
                reverb = new Tone.Reverb({ decay: 5, wet: 0.7 });
                break;
            case 5:
                delay = new Tone.FeedbackDelay(0.3, 0.5);
                chorus = new Tone.Chorus(3, 3.5, 1.3);
                reverb = new Tone.Reverb({ decay: 3, wet: 0.6 });
                break;
            case 6:
                delay = new Tone.FeedbackDelay(0.5, 0.6);
                chorus = new Tone.Chorus(6, 5.5, 1.5);
                reverb = new Tone.Reverb({ decay: 6, wet: 0.7 });
                break;
            case 7:
                delay = new Tone.FeedbackDelay(0.4, 0.7);
                chorus = new Tone.Chorus(4, 4, 1.2);
                reverb = new Tone.Reverb({ decay: 4, wet: 0.6 });
                break;
            case 8:
                delay = new Tone.FeedbackDelay(0.5, 0.8);
                chorus = new Tone.Chorus(5, 5, 1.5);
                reverb = new Tone.Reverb({ decay: 5, wet: 0.7 });
                break;
            case 9:
                delay = new Tone.FeedbackDelay(0.3, 0.6);
                chorus = new Tone.Chorus(3, 3, 1.2);
                reverb = new Tone.Reverb({ decay: 3, wet: 0.5 });
                break;
            case 10:
                delay = new Tone.FeedbackDelay(0.6, 0.7);
                chorus = new Tone.Chorus(4, 4.5, 1.4);
                reverb = new Tone.Reverb({ decay: 4, wet: 0.6 });
                break;
            case 11:
                delay = new Tone.FeedbackDelay(0.4, 0.5);
                chorus = new Tone.Chorus(2, 3.5, 1);
                reverb = new Tone.Reverb({ decay: 2, wet: 0.4 });
                break;
            case 12:
                delay = new Tone.FeedbackDelay(0.5, 0.7);
                chorus = new Tone.Chorus(5, 5.5, 1.6);
                reverb = new Tone.Reverb({ decay: 5, wet: 0.6 });
                break;
        }
        this.synth.connect(delay).connect(chorus).connect(reverb);
    
        const melodyLoop = new Tone.Loop((time) => {
            let note;
            switch (variation) {
                case 1:
                    note = ["C4", "E4", "G4", "B4"][Math.floor(Math.random() * 4)];
                    this.synth.triggerAttackRelease(note, "8n", time);
                    break;
                case 2:
                    note = ["D4", "F4", "A4", "C5"][Math.floor(Math.random() * 4)];
                    this.synth.triggerAttackRelease(note, "16n", time + Tone.Time("16n").toSeconds());
                    break;
                case 3:
                    note = ["E4", "G4", "B4", "D5"][Math.floor(Math.random() * 4)];
                    this.synth.triggerAttackRelease(note, "32n", time + Tone.Time("8n").toSeconds());
                    break;
                case 4:
                    note = ["F4", "A4", "C5", "E5"][Math.floor(Math.random() * 4)];
                    this.synth.triggerAttackRelease(note, "8n", time + Tone.Time("4n").toSeconds() * Math.random());
                    break;
                case 5:
                    note = ["G4", "B4", "D5", "F5"][Math.floor(Math.random() * 4)];
                    this.synth.triggerAttackRelease(note, "16n", time);
                    break;
                case 6:
                    note = ["A4", "C5", "E5", "G5"][Math.floor(Math.random() * 4)];
                    this.synth.triggerAttackRelease(note, "32n", time + Tone.Time("32n").toSeconds());
                    break;
                case 7:
                    note = ["B4", "D5", "F5", "A5"][Math.floor(Math.random() * 4)];
                    this.synth.triggerAttackRelease(note, "8n", time + Tone.Time("16n").toSeconds());
                    break;
                case 8:
                    note = ["C4", "E4", "G4", "B4"][Math.floor(Math.random() * 4)];
                    this.synth.triggerAttackRelease(note, "8n", time + Tone.Time("4n").toSeconds() * Math.random());
                    break;
                case 9:
                    note = ["D4", "F4", "A4", "C5"][Math.floor(Math.random() * 4)];
                    this.synth.triggerAttackRelease(note, "16n", time + Tone.Time("16n").toSeconds());
                    break;
                case 10:
                    note = ["E4", "G4", "B4", "D5"][Math.floor(Math.random() * 4)];
                    this.synth.triggerAttackRelease(note, "32n", time + Tone.Time("8n").toSeconds());
                    break;
                case 11:
                    note = ["F4", "A4", "C5", "E5"][Math.floor(Math.random() * 4)];
                    this.synth.triggerAttackRelease(note, "8n", time);
                    break;
                case 12:
                    note = ["G4", "B4", "D5", "F5"][Math.floor(Math.random() * 4)];
                    this.synth.triggerAttackRelease(note, "8n", time + Tone.Time("16n").toSeconds());
                    break;
            }
        }, "4n").start(0);
        this.currentLoops.melody = melodyLoop;
    }

    
    
    

    playVariation(variation) {
        this.stop();
        this.initializeSynths();
        this.createDrumLoop(variation);
        this.createBassLoop(variation);
        this.createMelodyLoop(variation);
        // this.scheduleRandomChannelShifts();
        Tone.Transport.start();
    }

    stop() {
        Tone.Transport.stop();
        Tone.Transport.cancel();
        Object.values(this.currentLoops).forEach(loop => {
            loop.stop();
            loop.dispose();
        });

        this.currentLoops = {};
    }

    deconstruct = () => {
        this.sceneNarrations.forEach(narration => {
            narration.stop();
        });
        delete this.volumeNode
        delete this.volumeNodeSynth
        delete this.volumeNodeNarration
        this.stop();
    }
}




// const musicGen = new PsychedelicMusicGenerator();
// // musicGen.start(1);
// // musicGen.setGlobalTempo(140);
// // musicGen.setVolume(-100);
// // musicGen.stop();
// // musicGen.setTempo(90);

// document.querySelectorAll("#variation-buttons button").forEach((button) => {
//     button.addEventListener("click", (event) => {
//         const variation = parseInt(event.target.id.split("-")[1]);
//         // musicGenerator.playVariation(variation);
//         // musicGen.startVariation(variation, 'drum');
//         // musicGen.startVariation(variation, 'bass');
//         // musicGen.startVariation(variation, 'melody');
//         musicGen.stop();
//         musicGen.playVariation(parseInt(variation));

//     });
// });

// document.getElementById("volume-control").addEventListener("input", (event) => {
//     const volume = event.target.value;
//     musicGen.setVolume(volume);
// });
