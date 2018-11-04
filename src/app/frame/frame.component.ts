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

    setTimeout( () => {
      this.f++;
      console.log(this.f);
      this.cycle();
    }, this.deltaSpeed / this.speed);
  }

  pause() {
    console.log('paused');
    this.paused = true;
  }

  getFrames() {
    var temp = this.frameService.getFrames();
    var rtn = [];
    for (let i = 0; i < temp.length; i++){
      if (temp[i].exercise == this.bodyCode){
        rtn.push(temp[i]);
      }
    }
    this.frames = rtn;
    console.log(this.frames);
  }

}
