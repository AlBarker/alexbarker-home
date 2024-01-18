import { Component } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subject } from 'rxjs';

export interface TrackModel {
  name: string;
  artist: string;
  position: number;
  addedByName: string;
  addedByImage: string;
  albumArt: string;
}

@Component({
  selector: 'app-countdown2020',
  templateUrl: './countdown2020.component.html',
  styleUrls: ['./countdown2020.component.scss']
})
export class Countdown2020Component {
  public tracks$: Observable<TrackModel[]>;
  public nowPlayingTrack$: Observable<TrackModel | undefined>;
  public noTracksToShow$ = new BehaviorSubject<boolean>(false);
  public error$ = new Subject<string>;

  private readonly trackListResponse = [
    {
      "name": "Kyoto",
      "artist": "Phoebe Bridgers",
      "position": 1,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733040ca980277cf1445934add"
    },
    {
      "name": "A Hero's Death",
      "artist": "Fontaines D.C.",
      "position": 2,
      "addedByName": "Griffyn Heels",
      "addedByImage": "gh",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27338b3e6c2fa94fc0b9ba0f187"
    },
    {
      "name": "The One",
      "artist": "The Lemon Twigs",
      "position": 3,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732d022312bf5a9bb939ca88b5"
    },
    {
      "name": "Rain",
      "artist": "Aitch, AJ Tracey, Tay Keith",
      "position": 4,
      "addedByName": "Griffyn Heels",
      "addedByImage": "gh",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736889b9cce35ba7035d236010"
    },
    {
      "name": "You Are Going To Miss Me (When I Am Gone)",
      "artist": "Kirin J Callinan",
      "position": 5,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733a9a2a4e279eefb358030fe0"
    },
    {
      "name": "Ain't It Different (feat. AJ Tracey, Stormzy & ONEFOUR)",
      "artist": "Headie One, Stormzy, ONEFOUR, AJ Tracey",
      "position": 6,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b7aaedf2f728d36f143c5377"
    },
    {
      "name": "Momentary Bliss (feat. slowthai and Slaves)",
      "artist": "Gorillaz, slowthai, SOFT PLAY",
      "position": 7,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738698938a0982bf0d6d5af354"
    },
    {
      "name": "Criminals",
      "artist": "DMA'S",
      "position": 8,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2739f671f52d4cd772b103e1d63"
    },
    {
      "name": "I Know The End",
      "artist": "Phoebe Bridgers",
      "position": 9,
      "addedByName": "Griffyn Heels",
      "addedByImage": "gh",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733040ca980277cf1445934add"
    },
    {
      "name": "Daylight",
      "artist": "Joji, Diplo",
      "position": 10,
      "addedByName": "Griffyn Heels",
      "addedByImage": "gh",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2730e991b59cee17246a5e604d0"
    },
    {
      "name": "Parasite Eve",
      "artist": "Bring Me The Horizon",
      "position": 11,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27386bd44e4b3e2eb335c17c625"
    },
    {
      "name": "Afterthought",
      "artist": "Joji, BENEE",
      "position": 12,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27353f6fa0d2589c6a7174f4b81"
    },
    {
      "name": "Cars In Space",
      "artist": "Rolling Blackouts Coastal Fever",
      "position": 13,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2730ad89f8042b20d0dc8cf80c3"
    },
    {
      "name": "Aries (feat. Peter Hook and Georgia)",
      "artist": "Gorillaz, Peter Hook, Georgia",
      "position": 14,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27305a3c11cb2cb7c60d30316a3"
    },
    {
      "name": "In Your Eyes (with Doja Cat) - Remix",
      "artist": "The Weeknd, Doja Cat",
      "position": 15,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27359612a59ef333109d15faa8d"
    },
    {
      "name": "Akudama",
      "artist": "Alpha Wolf",
      "position": 16,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27312167eadd5f2ec2c99fc6fc5"
    },
    {
      "name": "Dynamite",
      "artist": "BTS",
      "position": 17,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732f86d9710377e63bfbc82ba8"
    },
    {
      "name": "Kingslayer (feat. BABYMETAL)",
      "artist": "Bring Me The Horizon, BABYMETAL",
      "position": 18,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2735149c948fde506624246a684"
    },
    {
      "name": "Deja Vu",
      "artist": "Lastlings",
      "position": 19,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2739b4609a78a41341108a85508"
    },
    {
      "name": "Love Again",
      "artist": "Dua Lipa",
      "position": 20,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946"
    },
    {
      "name": "Genesis",
      "artist": "Deftones",
      "position": 21,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27366c9f5d6f13bfc9abedc1056"
    },
    {
      "name": "Levitating (feat. DaBaby)",
      "artist": "Dua Lipa, DaBaby",
      "position": 22,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273d4daf28d55fe4197ede848be"
    },
    {
      "name": "Roses - Imanbek Remix",
      "artist": "SAINt JHN, Imanbek",
      "position": 23,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b340b496cb7c38d727ff40be"
    },
    {
      "name": "Guns Up",
      "artist": "Bad Boy Chiller Crew",
      "position": 24,
      "addedByName": "Billy S",
      "addedByImage": "bs",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273cc2c9b4816fcec4b2ad6486b"
    },
    {
      "name": "Dynasty",
      "artist": "Rina Sawayama",
      "position": 25,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273d45ec625186030e62d5c14b4"
    },
    {
      "name": "Dawn",
      "artist": "Bad Juju",
      "position": 26,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273dcbdfe5c52ea3d6715755ada"
    },
    {
      "name": "Brooklyn Bridge To Chorus",
      "artist": "The Strokes",
      "position": 27,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273bfa99afb5ef0d26d5064b23b"
    },
    {
      "name": "Obey (with YUNGBLUD)",
      "artist": "Bring Me The Horizon, YUNGBLUD",
      "position": 28,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27372da128027e194d8585cf62a"
    },
    {
      "name": "Time (You and I)",
      "artist": "Khruangbin",
      "position": 29,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2734f65cbac819d0b2d34dd923e"
    },
    {
      "name": "Ooh La La",
      "artist": "Jessie Ware",
      "position": 30,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27315a8ce875e83f1134d225aab"
    },
    {
      "name": "Life is An RPG and I Fucked Up My Build",
      "artist": "Negative XP",
      "position": 31,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732f2a185a2f817c35d8dfacf7"
    },
    {
      "name": "ringtone (Remix) [feat. Charli XCX, Rico Nasty, Kero Kero Bonito]",
      "artist": "100 gecs, Charli XCX, Rico Nasty, Kero Kero Bonito",
      "position": 32,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f91a3040f0be854026ad2dd0"
    },
    {
      "name": "Good News",
      "artist": "Mac Miller",
      "position": 33,
      "addedByName": "Griffyn Heels",
      "addedByImage": "gh",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27326b7dd89810cc1a40ada642c"
    },
    {
      "name": "XS",
      "artist": "Rina Sawayama",
      "position": 34,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273d45ec625186030e62d5c14b4"
    },
    {
      "name": "Tombstone",
      "artist": "Ocean Alley",
      "position": 35,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273dbd36036e239e809541b0e5c"
    },
    {
      "name": "pporappippam",
      "artist": "SUNMI",
      "position": 36,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731cc9a4020b295d45b7255267"
    },
    {
      "name": "Screaming",
      "artist": "Loathe",
      "position": 37,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273101232ffd5af0e3c37e2c528"
    },
    {
      "name": "Cash Machine",
      "artist": "Oliver Tree",
      "position": 38,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273bf5af474b6ed745faf53f508"
    },
    {
      "name": "The Beauty Of Breathing",
      "artist": "Jeff Rosenstock",
      "position": 39,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273207b18558a2e261899d950b0"
    },
    {
      "name": "450",
      "artist": "Bad Boy Chiller Crew, S Dog",
      "position": 40,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c1ddfb80737e8ce407427e2c"
    },
    {
      "name": "Say It Again",
      "artist": "ONEFOUR, A$AP Ferg",
      "position": 41,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273d0e878a4974f8c608e3d6233"
    },
    {
      "name": "When We Disco (Duet with SUNMI)",
      "artist": "J.Y. Park, SUNMI",
      "position": 42,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731a984930c218438701634e11"
    },
    {
      "name": "claws",
      "artist": "Charli XCX",
      "position": 43,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273664e38c99d077cc52ab48914"
    },
    {
      "name": "1x1 (feat. Nova Twins)",
      "artist": "Bring Me The Horizon, Nova Twins",
      "position": 44,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2735149c948fde506624246a684"
    },
    {
      "name": "Swim",
      "artist": "Avenade",
      "position": 45,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273176b3ad15e9cf9f1d3bd5f1a"
    },
    {
      "name": "ALWAYS",
      "artist": "Tia Gostelow, Holy Holy",
      "position": 46,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273071c57aadda2ea28f4aded7c"
    },
    {
      "name": "Wash Us In The Blood",
      "artist": "Kanye West, Travis Scott",
      "position": 47,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732b2de7835bc93f1e368cee6d"
    },
    {
      "name": "AMPM Truck",
      "artist": "The Garden",
      "position": 48,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27357044bed4ce5179bc2502992"
    },
    {
      "name": "Say the Name",
      "artist": "clipping.",
      "position": 49,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b63780c667c5cc123273294b"
    },
    {
      "name": "Lexapro Delirium",
      "artist": "Sewerslvt",
      "position": 50,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273647e8069c98c7b23b6c80648"
    },
    {
      "name": "Run",
      "artist": "Joji",
      "position": 51,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2734896429a87abfacd5d90587b"
    },
    {
      "name": "Held Down",
      "artist": "Laura Marling",
      "position": 52,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27312af95d19f192a5e11be5e25"
    },
    {
      "name": "Melt!",
      "artist": "Kelly Lee Owens",
      "position": 53,
      "addedByName": "Griffyn Heels",
      "addedByImage": "gh",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b77946b57299698e3ef1a6ee"
    },
    {
      "name": "The Valley of The Pagans (feat. Beck)",
      "artist": "Gorillaz, Beck",
      "position": 54,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27305a3c11cb2cb7c60d30316a3"
    },
    {
      "name": "Savage Love (Laxed - Siren Beat)",
      "artist": "Jawsh 685, Jason Derulo",
      "position": 55,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e3eb3b8feeafb746ecf659e7"
    },
    {
      "name": "After Hours",
      "artist": "The Weeknd",
      "position": 56,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36"
    },
    {
      "name": "Describe",
      "artist": "Perfume Genius",
      "position": 57,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27343f44b90dd0a223b06aba994"
    },
    {
      "name": "Papi Chulo",
      "artist": "Octavian, Skepta",
      "position": 58,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2735c6f5a61cfefe5e0bc20f131"
    },
    {
      "name": "Life Is Good (feat. Drake)",
      "artist": "Future, Drake",
      "position": 59,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738a01c7b77a34378a62f46402"
    },
    {
      "name": "POPSTAR (feat. Drake)",
      "artist": "DJ Khaled, Drake",
      "position": 60,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273efaecb4b9cbae7c120d14617"
    },
    {
      "name": "German Engineering",
      "artist": "Bad Boy Chiller Crew",
      "position": 61,
      "addedByName": "Billy S",
      "addedByImage": "bs",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273cc2c9b4816fcec4b2ad6486b"
    },
    {
      "name": "FRANCHISE (feat. Young Thug & M.I.A.)",
      "artist": "Travis Scott, Young Thug, M.I.A.",
      "position": 62,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27370f2ab5608885749f7210b5f"
    },
    {
      "name": "Is It True",
      "artist": "Tame Impala",
      "position": 63,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27358267bd34420a00d5cf83a49"
    },
    {
      "name": "Caution",
      "artist": "The Killers",
      "position": 64,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e4d788e99eabbc369179072d"
    },
    {
      "name": "Bad Decisions",
      "artist": "The Strokes",
      "position": 65,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273bfa99afb5ef0d26d5064b23b"
    },
    {
      "name": "Désolé (feat. Fatoumata Diawara) - Extended Version",
      "artist": "Gorillaz, Fatoumata Diawara",
      "position": 66,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27305a3c11cb2cb7c60d30316a3"
    },
    {
      "name": "The Glow",
      "artist": "DMA'S",
      "position": 67,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27305caef90e3ab808db79695c8"
    },
    {
      "name": "No Time To Die",
      "artist": "Billie Eilish",
      "position": 68,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f7b7174bef6f3fbfda3a0bb7"
    },
    {
      "name": "Blue World",
      "artist": "Mac Miller",
      "position": 69,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27326b7dd89810cc1a40ada642c"
    },
    {
      "name": "Chicken Tenders",
      "artist": "Dominic Fike",
      "position": 70,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273cfc824b65a3b1755d98a7e23"
    },
    {
      "name": "Bando Diaries (Remix) [feat. ONEFOUR, Kekra, Noizy & DIVINE]",
      "artist": "dutchavelli, ONEFOUR, Kekra, Noizy, DIVINE",
      "position": 71,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2734fe94d92966ad84746a35bea"
    },
    {
      "name": "Latin Grammys",
      "artist": "Action Bronson",
      "position": 72,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27368c051fd02c0fa0118fe2bb7"
    },
    {
      "name": "out of control",
      "artist": "ceo@business.net, lentra, bbno$",
      "position": 73,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273ef1c83f51f318fcc7e8f110e"
    },
    {
      "name": "Save Your Tears",
      "artist": "The Weeknd",
      "position": 74,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36"
    },
    {
      "name": "WHATS POPPIN",
      "artist": "Jack Harlow",
      "position": 75,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27305a448540b069450ccfba889"
    },
    {
      "name": "Heat Waves",
      "artist": "Glass Animals",
      "position": 76,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2739e495fb707973f3390850eea"
    },
    {
      "name": "WRITING ON THE WALLS - LIVE RECORDING FROM THE OBSERVATORY, TAMPA, FL, 2020",
      "artist": "Underoath",
      "position": 77,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b3b22bc55768f1341c9861a0"
    },
    {
      "name": "The Pink Phantom (feat. Elton John and 6LACK)",
      "artist": "Gorillaz, Elton John, 6LACK",
      "position": 78,
      "addedByName": "Griffyn Heels",
      "addedByImage": "gh",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27305a3c11cb2cb7c60d30316a3"
    },
    {
      "name": "Gimme Love",
      "artist": "Joji",
      "position": 79,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27323c552a7a4fdafac02e08c34"
    },
    {
      "name": "Dying Breed",
      "artist": "The Killers",
      "position": 80,
      "addedByName": "Griffyn Heels",
      "addedByImage": "gh",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f08d82ff69ae975e6e5f395e"
    },
    {
      "name": "Interstellar Love",
      "artist": "The Avalanches, Leon Bridges",
      "position": 81,
      "addedByName": "Griffyn Heels",
      "addedByImage": "gh",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b0b3bd1a5f3967705579e6f1"
    },
    {
      "name": "People, I've been sad",
      "artist": "Christine and the Queens",
      "position": 82,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27382c12a427c72396dc0bc3d4f"
    },
    {
      "name": "Break My Heart",
      "artist": "Dua Lipa",
      "position": 83,
      "addedByName": "Billy S",
      "addedByImage": "bs",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946"
    },
    {
      "name": "Complicated",
      "artist": "Mac Miller",
      "position": 84,
      "addedByName": "Billy S",
      "addedByImage": "bs",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738cbe65eb023c2f2b5cdf5a91"
    },
    {
      "name": "Audacity (feat. Headie One)",
      "artist": "Stormzy, Headie One",
      "position": 85,
      "addedByName": "Griffyn Heels",
      "addedByImage": "gh",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a1e8b73748ee972a4c22be16"
    },
    {
      "name": "***BNB",
      "artist": "Jeff Rosenstock",
      "position": 86,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273207b18558a2e261899d950b0"
    },
    {
      "name": "Hallucinogenics (feat. Lana Del Rey)",
      "artist": "Matt Maeson, Lana Del Rey",
      "position": 87,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273789c5d973cfb96774329c501"
    },
    {
      "name": "Right",
      "artist": "Mac Miller",
      "position": 88,
      "addedByName": "Billy S",
      "addedByImage": "bs",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738cbe65eb023c2f2b5cdf5a91"
    },
    {
      "name": "Think About Things",
      "artist": "Daði Freyr",
      "position": 89,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27304c7f62f1ecf29cfc4c1df3b"
    },
    {
      "name": "On the Floor",
      "artist": "Perfume Genius",
      "position": 90,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e9a375a80097985178b73c4d"
    },
    {
      "name": "Let Me Love You Like A Woman",
      "artist": "Lana Del Rey",
      "position": 91,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273ef0340bfdded1253a0531ee5"
    },
    {
      "name": "Pac-Man (feat. ScHoolboy Q)",
      "artist": "Gorillaz, ScHoolboy Q",
      "position": 92,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732c8c645118a69c27ce3692d5"
    },
    {
      "name": "Physical",
      "artist": "Dua Lipa",
      "position": 93,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273d4daf28d55fe4197ede848be"
    },
    {
      "name": "E-GIRLS ARE RUINING MY LIFE!",
      "artist": "CORPSE, Savage Ga$p",
      "position": 94,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733cfbb809971b6da51daf254e"
    },
    {
      "name": "WITHOUT YOU",
      "artist": "The Kid LAROI",
      "position": 95,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273df16d539f508603bfb1efe02"
    },
    {
      "name": "The Adults Are Talking",
      "artist": "The Strokes",
      "position": 96,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273bfa99afb5ef0d26d5064b23b"
    },
    {
      "name": "Alight",
      "artist": "Ninajirachi",
      "position": 97,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273df93daabb783eb90a9cf1f28"
    },
    {
      "name": "On Our Own",
      "artist": "Lime Cordiale",
      "position": 98,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27321aee9c970bc81db9cc46ab1"
    },
    {
      "name": "My City",
      "artist": "ONEFOUR, The Kid LAROI",
      "position": 99,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273572c97a32aa152f7ee4bc19a"
    },
    {
      "name": "Heavy Balloon",
      "artist": "Fiona Apple",
      "position": 100,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273841292c1316c4bf85447bcd9"
    }
  ];

  constructor() {
    this.nowPlayingTrack$ = this.getTracks().pipe(map((tracks) => tracks.shift()));
    this.tracks$ = this.getTracks().pipe(map((tracks) => { 
      if (tracks.length === 0) {
        this.noTracksToShow$.next(true);
      }
      return tracks
    }),
    catchError((err) => { 
      this.error$.next(err.message);
      return of();
    }));
  }

  private getTracks(): Observable<TrackModel[]> {
    return of(this.trackListResponse);
  }

  getHeadImage(fileName: string) {
    return `/assets/images/${fileName}.png`;
  }

  getAlbumArt(fileName: string) {
    return `${fileName}`;
  }
}
