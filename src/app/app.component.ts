import { Component, ViewChild } from '@angular/core';
import { FrameComponent } from './frame/frame.component';

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


  @ViewChild(FrameComponent)
  public fr: FrameComponent;

  ngOnInit() { }

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

      this.audio.src = '../assets/audio/perelive_' + this.fr.speed + '.mp3'; // Указываем путь к звуку "клика"
        
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

  incBodyCode() {
    if (this.fr.bodyCode < 6)
        this.fr.bodyCode++;
    this.changeBodyCode()
  }

  decBodyCode() {
    if (this.fr.bodyCode > 1)
        this.fr.bodyCode--;
    this.changeBodyCode()
  }
  
  changeBodyCode() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.started = false;
      this.fr.pause();
    }
    this.fr.getFrames();
    this.fr.pause();
    this.fr.f = 0;
    this.audio.pause();
    this.audio.currentTime = 0.0;
  }

  changeBg() {
    this.bgSrc = "/assets/img/backgrounds/bg_" + randomInteger(1, 6) + ".jpg";
  }

}

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}