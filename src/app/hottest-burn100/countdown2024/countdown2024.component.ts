import { Component } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, shareReplay, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface TrackModel {
  name: string;
  artist: string;
  position: number;
  addedByName: string;
  addedByImage: string;
  albumArt: string;
  popularity: number;
}

@Component({
  selector: 'app-countdown2024',
  templateUrl: './countdown2024.component.html',
  styleUrls: ['./countdown2024.component.scss']
})
export class Countdown2024Component {
  public tracks$: Observable<TrackModel[]>;
  public tracksByUser$: Observable<Record<string, number>>;
  public nowPlayingTrack$: Observable<TrackModel | undefined>;
  public noTracksToShow$ = new BehaviorSubject<boolean>(false);
  public error$ = new Subject<string>;
  
  private apiUrl = 'http://Online-Recip-bbJ0iCAXCY7e-1619049089.ap-southeast-2.elb.amazonaws.com/track/'

  constructor(private httpClient: HttpClient) {
    this.nowPlayingTrack$ = this.getTracks().pipe(map((tracks) => tracks.shift()));
    this.tracks$ = this.getTracks().pipe(map((tracks) => { 
      if (tracks.length === 0) {
        this.noTracksToShow$.next(true);
      }
      tracks.shift();
      return tracks;
    }),
    catchError((err) => { 
      this.error$.next(err.message);
      return of();
    }));
    this.tracksByUser$ = this.getTracksByUser();
  }

  private getTracks(): Observable<TrackModel[]> {
    return this.httpClient.get<TrackModel[]>(`${this.apiUrl}list`).pipe(shareReplay(1));;
  }

  private getTracksByUser(): Observable<Record<string, number>> {
    return this.httpClient.get<Record<string, number>>(`${this.apiUrl}usersummary`).pipe(shareReplay(1));
  }

  getHeadImage(fileName: string) {
    return `/assets/images/${fileName}.png`;
  }

  getAlbumArt(fileName: string) {
    return `${fileName}`;
  }
}
