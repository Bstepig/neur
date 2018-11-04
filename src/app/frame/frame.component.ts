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

  @Input() isStarted:boolean;

  if (isStarted) {
    console.log('started!');
    this.start();
  }

  constructor(private frameService: FramesService) { }

  ngOnInit() {
    this.getFrames();
    console.log("frames's count are " + this.frames.length);
  }

  start(this) {
    if (this.f >= this.frames.length - 1) {
      this.f = 0;
    }
    this.paused = false;
    this.cycle();
  }

  cycle() {
    if (this.paused) {
      this.f--;
      return;
    }

    if (this.f >= this.frames.length - 1) {
      return;
    }

    console.log("is frame №" + (this.f + 1)) ;

    setTimeout( () => {
      if (this.paused) {
        // this.f--;
        console.log("Didn't");
        return;
      }
      this.f++;
      this.cycle();
    }, this.deltaSpeed / this.speed);
  }

  pause() {
    console.log('paused');
    this.paused = true;
  }

  getFrames() {
    let temp = this.frameService.getFrames();
    this.frames = temp.filter(word => word.exercise === this.bodyCode);
  }

}
