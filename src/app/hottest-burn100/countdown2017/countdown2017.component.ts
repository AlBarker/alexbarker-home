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
  selector: 'app-countdown2017',
  templateUrl: './countdown2017.component.html',
  styleUrls: ['./countdown2017.component.scss']
})
export class Countdown2017Component {
  public tracks$: Observable<TrackModel[]>;
  public nowPlayingTrack$: Observable<TrackModel | undefined>;
  public noTracksToShow$ = new BehaviorSubject<boolean>(false);
  public error$ = new Subject<string>;

  private readonly trackListResponse = [
    {
      "name": "rockstar",
      "artist": "Post Malone, 21 Savage",
      "position": 1,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273345f823b6c1dbd3b4cc7b382"
    },
    {
      "name": "Young Dumb & Broke",
      "artist": "Khalid",
      "position": 2,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273988ede5e1276e758b5f9e577"
    },
    {
      "name": "Fool's Gold",
      "artist": "Jack River",
      "position": 3,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737f5211f3632ca47af58ae72b"
    },
    {
      "name": "Hey",
      "artist": "Matthew Young",
      "position": 4,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273861ead4eabd71f273363f613"
    },
    {
      "name": "Half Sister",
      "artist": "Protomartyr",
      "position": 5,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27361494ad24ab9fe4e1fcf9182"
    },
    {
      "name": "Congratulations",
      "artist": "Post Malone, Quavo",
      "position": 6,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27309a51bd361845073cbd501b7"
    },
    {
      "name": "Not My Baby",
      "artist": "Alvvays",
      "position": 7,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a5d6b44fff32d68442e339d2"
    },
    {
      "name": "Marlon Brando",
      "artist": "Alex Cameron",
      "position": 8,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732f874bee036b29f2e6f956ac"
    },
    {
      "name": "Rolling Stone",
      "artist": "Ulver",
      "position": 9,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e013b415c63df52c08aa3094"
    },
    {
      "name": "My Old Man",
      "artist": "Mac DeMarco",
      "position": 10,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27398526846ff341ae71e5c3818"
    },
    {
      "name": "Los Ageless",
      "artist": "St. Vincent",
      "position": 11,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738a19cd17713c4aa4eeeb557d"
    },
    {
      "name": "Love",
      "artist": "Lana Del Rey",
      "position": 12,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2730ce29816dc0bf56f52ebde8f"
    },
    {
      "name": "True Lies",
      "artist": "Alex Cameron",
      "position": 13,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732f874bee036b29f2e6f956ac"
    },
    {
      "name": "Candy May",
      "artist": "Alex Cameron",
      "position": 14,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732f874bee036b29f2e6f956ac"
    },
    {
      "name": "Treetops",
      "artist": "Cloud Control",
      "position": 15,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273239376bf789ff8a9e32f1703"
    },
    {
      "name": "Pool",
      "artist": "Paramore",
      "position": 16,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273dbd83e179619408e5d05cc99"
    },
    {
      "name": "Hard Times",
      "artist": "Paramore",
      "position": 17,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273dbd83e179619408e5d05cc99"
    },
    {
      "name": "Something For Your M.I.N.D.",
      "artist": "Superorganism",
      "position": 18,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27315e40f96a2ce4c31e7106210"
    },
    {
      "name": "The Perfect Life Does Not Exist",
      "artist": "Ball Park Music",
      "position": 19,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736db69b4b1d9fe89e73d0c00f"
    },
    {
      "name": "Do What You Want",
      "artist": "The Presets",
      "position": 20,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273340cad194cb73edcca39b084"
    },
    {
      "name": "One Another",
      "artist": "Mac DeMarco",
      "position": 21,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27398526846ff341ae71e5c3818"
    },
    {
      "name": "10-20-40",
      "artist": "Rina Sawayama",
      "position": 22,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c78d5681f2cb01b1679f0699"
    },
    {
      "name": "Slip Away",
      "artist": "Perfume Genius",
      "position": 23,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273365c2055a7f3c4f741a20679"
    },
    {
      "name": "Red Flavor",
      "artist": "Red Velvet",
      "position": 24,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738164cd1a2e03b7ca2db9ff5e"
    },
    {
      "name": "Living Each Day",
      "artist": "Kirin J Callinan, Connan Mockasin",
      "position": 25,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27348c2f6aa4e9d899608aff350"
    },
    {
      "name": "american dream",
      "artist": "LCD Soundsystem",
      "position": 26,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273945696d01c650eeade335ac9"
    },
    {
      "name": "On And On",
      "artist": "Curtis Harding",
      "position": 27,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731bd6d2d52810efdfee21b608"
    },
    {
      "name": "Ogre",
      "artist": "Richard Dawson",
      "position": 28,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733145d5000e718a8b14b57616"
    },
    {
      "name": "The Underside of Power",
      "artist": "Algiers",
      "position": 29,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27324780e3135596b1b3187c6fd"
    },
    {
      "name": "Love Galore (feat. Travis Scott)",
      "artist": "SZA, Travis Scott",
      "position": 30,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2734c79d5ec52a6d0302f3add25"
    },
    {
      "name": "how do you sleep?",
      "artist": "LCD Soundsystem",
      "position": 31,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a5a932da2fc13defad4b7fba"
    },
    {
      "name": "South Dakota",
      "artist": "Jakey",
      "position": 32,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273590b85f26326719305b3110b"
    },
    {
      "name": "Does This Last",
      "artist": "Boo Seeka",
      "position": 33,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27312178c469d89d298c5026ac4"
    },
    {
      "name": "Stranger's Kiss (Duet with Angel Olsen)",
      "artist": "Alex Cameron, Angel Olsen",
      "position": 34,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732f874bee036b29f2e6f956ac"
    },
    {
      "name": "XO Tour Llif3",
      "artist": "Lil Uzi Vert",
      "position": 35,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27341b41e6f7924e530a9b00f9c"
    },
    {
      "name": "Little Dark Age",
      "artist": "MGMT",
      "position": 36,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f46a2ae0885ef71184e5b792"
    },
    {
      "name": "DNA.",
      "artist": "Kendrick Lamar",
      "position": 37,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2739e0062560d8bcccca15d412a"
    },
    {
      "name": "SWEET",
      "artist": "BROCKHAMPTON",
      "position": 38,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737d15fb20303a589acc1ab98b"
    },
    {
      "name": "Mask Off",
      "artist": "Future",
      "position": 39,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e0b64c8be3c4e804abcb2696"
    },
    {
      "name": "Plain Jane",
      "artist": "A$AP Ferg",
      "position": 40,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273d79cfa3155b50beb5dbeeb9a"
    },
    {
      "name": "Little Of Your Love",
      "artist": "HAIM",
      "position": 41,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733d1d41392095659415fcc71c"
    },
    {
      "name": "Yer Killin' Me",
      "artist": "Remo Drive",
      "position": 42,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732adcd0af12b404e2135d6b77"
    },
    {
      "name": "ZIPPER",
      "artist": "BROCKHAMPTON",
      "position": 43,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273ef51817e6a6563b6f7ce5872"
    },
    {
      "name": "HEAT",
      "artist": "BROCKHAMPTON",
      "position": 44,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a0c4a585a7d73b4943b9bf13"
    },
    {
      "name": "Rachel Khoo",
      "artist": "IDLES",
      "position": 45,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f5e16c460c5da80f8326b08a"
    },
    {
      "name": "Deserve (feat. Travis Scott)",
      "artist": "Kris Wu, Travis Scott",
      "position": 46,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f8a4ed0b627fbfe83219cc22"
    },
    {
      "name": "Bank Account",
      "artist": "21 Savage",
      "position": 47,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e83b061a735d3851dc27f745"
    },
    {
      "name": "Wedding Crashers",
      "artist": "Aminé, Offset",
      "position": 48,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f79e6e61fb0eec9fbe1abfff"
    },
    {
      "name": "Chanel",
      "artist": "Frank Ocean",
      "position": 49,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a0b780c23fc3c19bd412b234"
    },
    {
      "name": "The Weekend",
      "artist": "SZA",
      "position": 50,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2734c79d5ec52a6d0302f3add25"
    },
    {
      "name": "goosebumps",
      "artist": "Travis Scott",
      "position": 51,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f54b99bf27cda88f4a7403ce"
    },
    {
      "name": "In Motion (feat. Japanese Wallpaper)",
      "artist": "Allday, Japanese Wallpaper",
      "position": 52,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b1b6ac1fc7eec20422a8762a"
    },
    {
      "name": "Scott Green",
      "artist": "Dune Rats",
      "position": 53,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27368c05aa774768245e0e86dde"
    },
    {
      "name": "8TEEN",
      "artist": "Khalid",
      "position": 54,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273988ede5e1276e758b5f9e577"
    },
    {
      "name": "Biking",
      "artist": "Frank Ocean, JAY-Z, Tyler, The Creator",
      "position": 55,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27369a8328489e5e485514a8667"
    },
    {
      "name": "RAF (feat. A$AP Rocky, Playboi Carti, Quavo, Lil Uzi Vert & Frank Ocean)",
      "artist": "A$AP Mob, A$AP Rocky, Playboi Carti, Quavo, Lil Uzi Vert, Frank Ocean",
      "position": 56,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731b1ea8257496228138609eb6"
    },
    {
      "name": "Bodak Yellow",
      "artist": "Cardi B",
      "position": 57,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27362a2dedc55a38a0fca0a17b0"
    },
    {
      "name": "Achoo",
      "artist": "Keith Ape, Ski Mask The Slump God",
      "position": 58,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27385f8880d439f903de0e74761"
    },
    {
      "name": "JUNKY",
      "artist": "BROCKHAMPTON",
      "position": 59,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27357eab512b1704482ce01265d"
    },
    {
      "name": "Ghostface Killers (feat. Travis Scott)",
      "artist": "21 Savage, Offset, Metro Boomin, Travis Scott",
      "position": 60,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2730db43130a9aaa7bae56967ed"
    },
    {
      "name": "Art School",
      "artist": "Remo Drive",
      "position": 61,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732adcd0af12b404e2135d6b77"
    },
    {
      "name": "Location",
      "artist": "Khalid",
      "position": 62,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273988ede5e1276e758b5f9e577"
    },
    {
      "name": "Slide (feat. Frank Ocean & Migos)",
      "artist": "Calvin Harris, Frank Ocean, Migos",
      "position": 63,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731e439ac0ed08d612808f7122"
    },
    {
      "name": "Garn Servo",
      "artist": "Lanstan, Miles Marmalade, CashMoneyAp",
      "position": 64,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731713198ea419b6ca23e59561"
    },
    {
      "name": "Smoko",
      "artist": "The Chats",
      "position": 65,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f87a0b030426ce68d9aa1bf6"
    },
    {
      "name": "Weaver",
      "artist": "Richard Dawson",
      "position": 66,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733145d5000e718a8b14b57616"
    },
    {
      "name": "Runnin' Outta Luck",
      "artist": "Alex Cameron, Brandon Flowers",
      "position": 67,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732f874bee036b29f2e6f956ac"
    },
    {
      "name": "When You Die",
      "artist": "MGMT",
      "position": 68,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736a7d6effa7a25dfa0dd9e6c6"
    },
    {
      "name": "Bourbon (feat. Saba & Lophiile)",
      "artist": "Gallant, Saba, lophiile",
      "position": 69,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27370e3728a7e873237e06a57f5"
    },
    {
      "name": "Show You the Way",
      "artist": "Thundercat, Michael McDonald, Kenny Loggins",
      "position": 70,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27369fdfde4fe63d6cb4e11e5af"
    },
    {
      "name": "Weatherboard Man",
      "artist": "Batpiss",
      "position": 71,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273d46efa55edb10c5d9db71eb0"
    },
    {
      "name": "Leaning On A Wheel",
      "artist": "Pile",
      "position": 72,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2739cb42453fd65d19567689911"
    },
    {
      "name": "Cola",
      "artist": "CamelPhat, Elderbrook",
      "position": 73,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f6db09ac79eb3d74f1df3ad4"
    },
    {
      "name": "KMT",
      "artist": "Drake, Giggs",
      "position": 74,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2735ea859dc94365abd9fd84fd6"
    },
    {
      "name": "Dangerous",
      "artist": "The xx",
      "position": 75,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273cc35ac879d5f419165166f76"
    },
    {
      "name": "Brick Body Complex",
      "artist": "Open Mike Eagle",
      "position": 76,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737092bbc13520b5e56962a059"
    },
    {
      "name": "911 / Mr. Lonely (feat. Frank Ocean & Steve Lacy)",
      "artist": "Tyler, The Creator, Frank Ocean, Steve Lacy",
      "position": 77,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738940ac99f49e44f59e6f7fb3"
    },
    {
      "name": "745",
      "artist": "Vince Staples",
      "position": 78,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27317f513ca86c795609ea29a80"
    },
    {
      "name": "Will He",
      "artist": "Joji",
      "position": 79,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736a5457c61a10d2937ced8347"
    },
    {
      "name": "BUTTERFLY EFFECT",
      "artist": "Travis Scott",
      "position": 80,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b5e9358d0d07114609d9afab"
    },
    {
      "name": "Big Fish",
      "artist": "Vince Staples",
      "position": 81,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27317f513ca86c795609ea29a80"
    },
    {
      "name": "Moby Dick",
      "artist": "Jakey",
      "position": 82,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27349975866363b47754b3b1fe1"
    },
    {
      "name": "Habits",
      "artist": "Marmozets",
      "position": 83,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732aab51402e62e333f43237a4"
    },
    {
      "name": "disco tits",
      "artist": "Tove Lo",
      "position": 84,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27375c3b6771df2cf9669378d29"
    },
    {
      "name": "Let Me Show You",
      "artist": "Kero One, Azure",
      "position": 85,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2739d8b631a0f2ea2228b42636c"
    },
    {
      "name": "Tomorrow Never Came (feat. Sean Ono Lennon)",
      "artist": "Lana Del Rey, Sean Ono Lennon",
      "position": 86,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2730ce29816dc0bf56f52ebde8f"
    },
    {
      "name": "Unforgettable",
      "artist": "French Montana, Swae Lee",
      "position": 87,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738a31195a371b2233456f6c07"
    },
    {
      "name": "I'm My Own Doctor",
      "artist": "Remo Drive",
      "position": 88,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732adcd0af12b404e2135d6b77"
    },
    {
      "name": "451",
      "artist": "Brand New",
      "position": 89,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a32d5fad2aa2b300bcea3bb9"
    },
    {
      "name": "Lemon - Edit",
      "artist": "N.E.R.D, Rihanna",
      "position": 90,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2730b81fbe5d81c35375a1c168e"
    },
    {
      "name": "Hot Shit",
      "artist": "Towkio",
      "position": 91,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737cc2237e6c86ae2c8a5e733d"
    },
    {
      "name": "Homemade Dynamite - REMIX",
      "artist": "Lorde, Khalid, Post Malone, SZA",
      "position": 92,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736626ef537ceeba28af1a14e7"
    },
    {
      "name": "Anywhere",
      "artist": "Rita Ora",
      "position": 93,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737a642f7a662f4c94683ac038"
    },
    {
      "name": "In Cold Blood",
      "artist": "alt-J",
      "position": 94,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731b2a4413768c9239a4fa1901"
    },
    {
      "name": "Boom (X3)",
      "artist": "Injury Reserve",
      "position": 95,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273fd1e152fbd601c494f776bea"
    },
    {
      "name": "Chateau",
      "artist": "Angus & Julia Stone",
      "position": 96,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736567f18f9a164a51e933cdad"
    },
    {
      "name": "Big Enough",
      "artist": "Kirin J Callinan, Alex Cameron, Molly Lewis, Jimmy Barnes",
      "position": 97,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27348c2f6aa4e9d899608aff350"
    },
    {
      "name": "TEMPTATION",
      "artist": "Joey Bada$$",
      "position": 98,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736a3c1e51a7d2a2a7fbe172a1"
    },
    {
      "name": "I Like U",
      "artist": "NIKI",
      "position": 99,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e2470c350bb6b21eac86bdc8"
    },
    {
      "name": "TRACK DELETED",
      "artist": "WHO KNOWS??",
      "position": 100,
      "addedByName": "Dan Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c5663e50de353981ed2b1a37"
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
