import { Injectable } from '@angular/core';
import { MUSICS } from './group-musics'

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor() { }

  getMusic(speed: number = 1, name: string = 'Переживем'): string {
    return MUSICS.find(music => music.name === name).speeds[speed];
  }

  getNames(): string[] {
    return MUSICS.map(music => music.name);
  }
}
