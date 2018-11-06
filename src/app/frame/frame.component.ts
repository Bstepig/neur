import { Component, OnInit, Input } from '@angular/core';
import { Frame } from '../frame';
import { FramesService } from '../frames.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {
  
  f:number = 0;
  frames: Frame[];

  speed:number = 1;
  deltaSpeed:number = 3000;
  bodyCode:number = 1;

  paused:boolean = true;
  cycleTimer;

  @Input() isStarted:boolean;

  if (isStarted) {
    console.log('started!');
    this.start();
  }

  constructor(private frameService: FramesService) { }

  ngOnInit() { }

  start(this) {
    console.log('start');
    if (this.f >= this.frames.length - 1) {
      this.f = 0;
    }
    this.paused = false;
    this.cycle();
  }

  cycle() {
    if (this.paused) {
      console.log("!Didn't before");
      this.f--;
      return;
    }

    if (this.f >= this.frames.length - 1) {
      return;
    }

    console.log("is frame №" + (this.f + 1)) ;

    this.cycleTimer = setTimeout( () => {
      if (this.paused) {
        // this.f--;
        console.log("!Didn't");
        return;
      }
      this.f++;
      this.cycle();
      console.log("!Did");
    }, this.deltaSpeed / this.speed);
  }

  pause() {
    console.log('paused');
    this.paused = true;
    clearInterval(this.cycleTimer);
  }

  getRandomFrames(difficult): void {
    this.frames = this.frameService.getRandomFrames(difficult);
  }

  getFramesTemplate(name: string): void {
    this.frames = this.frameService.getFramesTemplate(name);
  }

  getTemplateDifficult(name: string): string {
    return this.frameService.getTemplateDifficult(name);
  }

}
