import { Injectable } from '@angular/core';
import { Frame } from './frame';
import { FRAMES } from './group-frames';
import { TEMPLATES } from './group-frames';
import { FramesTemplate } from './framesTemplate';

@Injectable({
  providedIn: 'root'
})
export class FramesService {

  constructor() { }

  getRandomFrames(difficult: string, count: number = 20): Frame[] {
    let given: Frame[] = FRAMES.filter(frame => frame.difficult === difficult);
    let complete: Frame[] = [];
    complete.push(this.randomFrame(given))
    for (let i = 0; i < count - 1; i++){
      let temp = this.randomFrame(given);
      if (temp !== complete[i])
        complete.push(temp)
      else
        i--
    }
    console.log(complete);
    return complete;
  }

  getFramesTemplate(name: string): Frame[] {
    return TEMPLATES.find(template => template.name === name).frames;
  }

  getTemplateNames(): string[] {
    return TEMPLATES.map(frame => frame.name);
  }

  getTemplateDifficult(name: string): string {
    return TEMPLATES.find(template => template.name === name).difficult;
  }

  private randomFrame(arr): Frame {
    return arr[Math.floor(Math.random() * arr.length)];
  }

}
