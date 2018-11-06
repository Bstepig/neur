import { Component, ViewChild } from '@angular/core';
import { FrameComponent } from './frame/frame.component';
import { MusicService } from './music.service';
import { FramesService } from './frames.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  bgSrc:string = "/assets/img/backgrounds/bg_" + randomInteger(1, 6) + ".jpg";
  started:boolean = false;
  timer;
  audio = new Audio();

  mucisNames:string[] = this.musicService.getNames();
  selectMusic:string = this.mucisNames[0];
  
  exerciseNames:string[] = ['Случайно'].concat(this.framesService.getTemplateNames());
  selectExercise:string = this.exerciseNames[0];

  difficults:string[] = ["легко", "сложно"];
  difficult:string = this.difficults[0];

  @ViewChild(FrameComponent)
  public fr: FrameComponent;

  constructor (
    private musicService: MusicService,
    private framesService: FramesService
    ) { }

  ngOnInit() { this.getFrames() }

  start() {
    if (this.started) {
      if (this.timer)
        clearTimeout(this.timer);

      this.started = false;
      this.fr.pause();
      this.audio.pause();
    }
    else {
      if (this.timer)
        clearTimeout(this.timer);

      
      this.started = true;
      this.fr.start();
      this.timer = setTimeout( () => {
        this.started = false;
        this.fr.pause();
        this.audio.pause();
        this.audio.currentTime = 0.0;
      }, (this.fr.frames.length - this.fr.f) * this.fr.deltaSpeed / this.fr.speed)

      this.audio.src = this.musicService.getMusic(this.fr.speed - 1, this.selectMusic); // Указываем путь к звуку "клика"
      this.audio.currentTime = this.fr.f * this.fr.deltaSpeed / this.fr.speed / 1000;
      this.audio.autoplay = true;
    }
  }

  incSpeed() {
    if (this.fr.speed < 6)
        this.fr.speed++;
  }

  decSpeed() {
    if (this.fr.speed > 1)
        this.fr.speed--;
  }

  changeBg() {
    this.bgSrc = "/assets/img/backgrounds/bg_" + randomInteger(1, 6) + ".jpg";
  }

  changeMusic($event) {
    this.selectMusic = $event.target.value;
    this.audio.src = this.musicService.getMusic(this.fr.speed - 1, this.selectMusic); // Указываем путь к звуку "клика"
  }

  getFrames() {
    if (this.selectExercise === 'Случайно')
      this.fr.getRandomFrames(this.difficult);
    else
      this.fr.getFramesTemplate(this.selectExercise);
  }

  changeExercise($event) {
    this.selectExercise = $event.target.value;
    this.getFrames();
  }

  changeDifficult($event) {
    this.difficult = $event.target.value;
    this.getFrames();
  }

  // incBodyCode() {
  //   if (this.fr.bodyCode < 6)
  //       this.fr.bodyCode++;
  //   this.changeBodyCode()
  // }

  // decBodyCode() {
  //   if (this.fr.bodyCode > 1)
  //       this.fr.bodyCode--;
  //   this.changeBodyCode()
  // }
  
  // changeBodyCode() {
  //   if (this.timer) {
  //     clearTimeout(this.timer);
  //     this.started = false;
  //     this.fr.pause();
  //   }
  //   this.getFrames();
  //   this.fr.pause();
  //   this.fr.f = 0;
  //   this.audio.pause();
  //   this.audio.currentTime = 0.0;
  // }

}

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}