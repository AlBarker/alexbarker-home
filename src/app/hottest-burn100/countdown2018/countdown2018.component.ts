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
  selector: 'app-countdown2018',
  templateUrl: './countdown2018.component.html',
  styleUrls: ['./countdown2018.component.scss']
})
export class Countdown2018Component {
  public tracks$: Observable<TrackModel[]>;
  public nowPlayingTrack$: Observable<TrackModel | undefined>;
  public noTracksToShow$ = new BehaviorSubject<boolean>(false);
  public error$ = new Subject<string>;

  private readonly trackListResponse = [
    {
      "name": "Bad Boy",
      "artist": "Red Velvet",
      "position": 1,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b64001fa6292caefc7605550"
    },
    {
      "name": "You Are Going to Love Me and Scream",
      "artist": "Against All Logic",
      "position": 2,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731e50f5b92bba4875bb776756"
    },
    {
      "name": "Hopeless",
      "artist": "Against All Logic",
      "position": 3,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731e50f5b92bba4875bb776756"
    },
    {
      "name": "Talking Straight",
      "artist": "Rolling Blackouts Coastal Fever",
      "position": 4,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733d36e19a356b7be4ffbf029c"
    },
    {
      "name": "Sugar & Spice",
      "artist": "Hatchie",
      "position": 5,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273d545693f9e4cb492eaadb8f6"
    },
    {
      "name": "The Reason They Hate Me",
      "artist": "Daughters",
      "position": 6,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733b50badddc922c9df5025dd6"
    },
    {
      "name": "4th Dimension",
      "artist": "KIDS SEE GHOSTS, Louis Prima",
      "position": 7,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273013c00ee367dd85396f79c82"
    },
    {
      "name": "She Works Out Too Much",
      "artist": "MGMT",
      "position": 8,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b47d309281c66820b7137f5d"
    },
    {
      "name": "In The Air",
      "artist": "DMA'S",
      "position": 9,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b5bc40296a46d45d5ffb70cd"
    },
    {
      "name": "COOLEST MONKEY IN THE JUNGLE",
      "artist": "Ski Mask The Slump God, SahBabii",
      "position": 10,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27346db517d3fba2766afdf26a4"
    },
    {
      "name": "Feel The Love",
      "artist": "KIDS SEE GHOSTS, Pusha T",
      "position": 11,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273013c00ee367dd85396f79c82"
    },
    {
      "name": "The Perfect Life Does Not Exist",
      "artist": "Ball Park Music",
      "position": 12,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2739fbba7dca4f38bc68ea39c82"
    },
    {
      "name": "Make Believe",
      "artist": "Kero Kero Bonito",
      "position": 13,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273bf56fcfd9d0f4e73fe9a447b"
    },
    {
      "name": "Violence",
      "artist": "Parquet Courts",
      "position": 14,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731317be574cc7f4cad6eb4f27"
    },
    {
      "name": "Praise The Lord (Da Shine) (feat. Skepta)",
      "artist": "A$AP Rocky, Skepta",
      "position": 15,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2739feadc48ab0661e9b3a9170b"
    },
    {
      "name": "M.A.H.",
      "artist": "U.S. Girls",
      "position": 16,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273cdfe9ca52fbe76c85e055aef"
    },
    {
      "name": "Potato Salad",
      "artist": "Tyler, The Creator, A$AP Rocky",
      "position": 17,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273215cac8c30b47bb1bfb9d2d1"
    },
    {
      "name": "Time Today",
      "artist": "Kero Kero Bonito",
      "position": 18,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273d46d8e0ca587953520235a25"
    },
    {
      "name": "Losing It - Radio Edit",
      "artist": "FISHER",
      "position": 19,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273ceafefb9499a0a61bdf3d661"
    },
    {
      "name": "My Boy (Twin Fantasy)",
      "artist": "Car Seat Headrest",
      "position": 20,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e4221d183898a2c206626b64"
    },
    {
      "name": "Status",
      "artist": "Machine Girl",
      "position": 21,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27358208c8f8ca9d66da3358432"
    },
    {
      "name": "Enough For Now",
      "artist": "Flowertruck",
      "position": 22,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738b2c672b086c5dae1b9a82aa"
    },
    {
      "name": "God's Plan",
      "artist": "Drake",
      "position": 23,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5"
    },
    {
      "name": "Limo Song",
      "artist": "Jack River",
      "position": 24,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273d24fc52449a54b4e50bb6474"
    },
    {
      "name": "Naysayer, Magick Obeyer",
      "artist": "Clarence Clarity",
      "position": 25,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732bce245804a46788ead81499"
    },
    {
      "name": "Vacation (feat. Joey Bada$$)",
      "artist": "Flatbush Zombies, Joey Bada$$",
      "position": 26,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b4e320aee99bd87662d85178"
    },
    {
      "name": "all my friends",
      "artist": "21 Savage",
      "position": 27,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273280689ecc5e4b2038bb5e4bd"
    },
    {
      "name": "Going Bad (feat. Drake)",
      "artist": "Meek Mill, Drake",
      "position": 28,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273cd63c5962050729d260077d6"
    },
    {
      "name": "Lucid Dreams",
      "artist": "Juice WRLD",
      "position": 29,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f7db43292a6a99b21b51d5b4"
    },
    {
      "name": "Me and My Husband",
      "artist": "Mitski",
      "position": 30,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273257f81958be25db29f328159"
    },
    {
      "name": "Poem",
      "artist": "U.S. Girls",
      "position": 31,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273cdfe9ca52fbe76c85e055aef"
    },
    {
      "name": "STARGAZING",
      "artist": "Travis Scott",
      "position": 32,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3"
    },
    {
      "name": "In My View",
      "artist": "Young Fathers",
      "position": 33,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736acb9ab5797d3548c59bc515"
    },
    {
      "name": "Raining in Kyoto",
      "artist": "The Wonder Years",
      "position": 34,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273ecaf43f7cd57975223c6b1a5"
    },
    {
      "name": "What Would Meek Do?",
      "artist": "Pusha T, Kanye West",
      "position": 35,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273263555eebbe2b375593aa31e"
    },
    {
      "name": "Mariners Apartment Complex",
      "artist": "Lana Del Rey",
      "position": 36,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27304df1a7d21ae17d5d8e6566b"
    },
    {
      "name": "Mo Bamba",
      "artist": "Sheck Wes",
      "position": 37,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a7d96c80aba617f9c335fdbe"
    },
    {
      "name": "Streaky",
      "artist": "Death Grips",
      "position": 38,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738b0fd435be942b69343759e9"
    },
    {
      "name": "Violent Crimes",
      "artist": "Kanye West",
      "position": 39,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27397508a4b756763370510bd44"
    },
    {
      "name": "We Appreciate Power",
      "artist": "Grimes, HANA",
      "position": 40,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27360d00d08bc2c0afcbc0f770f"
    },
    {
      "name": "My My My!",
      "artist": "Troye Sivan",
      "position": 41,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e6011945def7c6e5478765d6"
    },
    {
      "name": "Shotgun",
      "artist": "George Ezra",
      "position": 42,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273103045cd1c29dd16a469f808"
    },
    {
      "name": "Bubblin",
      "artist": "Anderson .Paak",
      "position": 43,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736357eef63bcab4f5b551b216"
    },
    {
      "name": "Falling Into Me",
      "artist": "Let's Eat Grandma",
      "position": 44,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a394a40b5df1b7c0baaca0f7"
    },
    {
      "name": "Sweet Release",
      "artist": "Hockey Dad",
      "position": 45,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c506a3e6058417f3e7e290b5"
    },
    {
      "name": "Yeah Right",
      "artist": "Joji",
      "position": 46,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738a9f12ce3d93554107e8e0d8"
    },
    {
      "name": "REEL IT IN",
      "artist": "Aminé",
      "position": 47,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a52fb68f00620e45ed7467c5"
    },
    {
      "name": "Sometimes",
      "artist": "Cub Sport",
      "position": 48,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273941cbe036298b64037ce0e22"
    },
    {
      "name": "Bellarine",
      "artist": "Rolling Blackouts Coastal Fever",
      "position": 49,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273720de47c262471eee65d0c30"
    },
    {
      "name": "Powerglide (feat. Juicy J)",
      "artist": "Rae Sremmurd, Swae Lee, Slim Jxmmi, Juicy J",
      "position": 50,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b1a45566d88dcc74772ed649"
    },
    {
      "name": "SICKO MODE",
      "artist": "Travis Scott",
      "position": 51,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3"
    },
    {
      "name": "Permanent High School",
      "artist": "The Voidz",
      "position": 52,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273d00e504004a48159ac896b64"
    },
    {
      "name": "KANGA",
      "artist": "6ix9ine, Kanye West",
      "position": 53,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b007746e91348081b34d51ae"
    },
    {
      "name": "This Is America",
      "artist": "Childish Gambino",
      "position": 54,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e6566c914daaa1d5ad0bda7e"
    },
    {
      "name": "Better Now",
      "artist": "Post Malone",
      "position": 55,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b1c4b76e23414c9f20242268"
    },
    {
      "name": "Cry To Me",
      "artist": "IDLES",
      "position": 56,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27323c88111499555554ecb2033"
    },
    {
      "name": "I Thought About Killing You",
      "artist": "Kanye West",
      "position": 57,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27397508a4b756763370510bd44"
    },
    {
      "name": "You Let My Tyres Down",
      "artist": "Tropical Fuck Storm",
      "position": 58,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c9267acfc4f9a9aa07aee89b"
    },
    {
      "name": "It's Not Just Me",
      "artist": "Let's Eat Grandma",
      "position": 59,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a394a40b5df1b7c0baaca0f7"
    },
    {
      "name": "May I Be the Light",
      "artist": "Laura Marling, LUMP, Mike Lindsay",
      "position": 60,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732e76984133c029e0515fc95f"
    },
    {
      "name": "Six Wave Hold-Down",
      "artist": "Hot Snakes",
      "position": 61,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e218583b9b00f18a5dba4e0c"
    },
    {
      "name": "Join The Club",
      "artist": "Hockey Dad",
      "position": 62,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c506a3e6058417f3e7e290b5"
    },
    {
      "name": "No Place",
      "artist": "RÜFÜS DU SOL",
      "position": 63,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27397b4fe1728c5498d1f30d9e2"
    },
    {
      "name": "Just A Stranger (feat. Steve Lacy)",
      "artist": "Kali Uchis, Steve Lacy",
      "position": 64,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27390b4e1905b1fc48c537ec053"
    },
    {
      "name": "Humility (feat. George Benson)",
      "artist": "Gorillaz, George Benson",
      "position": 65,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2734d9f7b88e82db31d13ac6668"
    },
    {
      "name": "when the party's over",
      "artist": "Billie Eilish",
      "position": 66,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27304b3aa9683e334b8140d19e7"
    },
    {
      "name": "Psycho (feat. Ty Dolla $ign)",
      "artist": "Post Malone, Ty Dolla $ign",
      "position": 67,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27342f3b73aa2eb23ec87a32f5c"
    },
    {
      "name": "Make Me Feel",
      "artist": "Janelle Monáe",
      "position": 68,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2730a60fb0deda858270cca82ee"
    },
    {
      "name": "JAPAN",
      "artist": "Famous Dex",
      "position": 69,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e7691a6ba8adc24b28e5ac63"
    },
    {
      "name": "Mouth Log",
      "artist": "Sidney Gish",
      "position": 70,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27396986a55d05e037b1f04d81d"
    },
    {
      "name": "Danny Nedelko",
      "artist": "IDLES",
      "position": 71,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27323c88111499555554ecb2033"
    },
    {
      "name": "Sin (feat. Jaden Smith)",
      "artist": "Young Thug, Jaden",
      "position": 72,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273ba2f79a5a79bbad7da3ec387"
    },
    {
      "name": "no tears left to cry",
      "artist": "Ariana Grande",
      "position": 73,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c3af0c2355c24ed7023cd394"
    },
    {
      "name": "4EVER",
      "artist": "Clairo",
      "position": 74,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27371179dd3ac3cba1d14920469"
    },
    {
      "name": "lovely (with Khalid)",
      "artist": "Billie Eilish, Khalid",
      "position": 75,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738a3f0a3ca7929dea23cd274c"
    },
    {
      "name": "bitches (feat. Charli XCX, Icona Pop, Elliphant, ALMA)",
      "artist": "Tove Lo, Charli XCX, Icona Pop, Elliphant, ALMA",
      "position": 76,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273eb5a79bef2908a2eb7b1b78c"
    },
    {
      "name": "I Did It!",
      "artist": "Kitten",
      "position": 77,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273655ec468bf2de9844ecc6601"
    },
    {
      "name": "I’ll Still Have Me",
      "artist": "Cyn",
      "position": 78,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731af811a83bdbb87bc4286ed2"
    },
    {
      "name": "Rosebud",
      "artist": "U.S. Girls",
      "position": 79,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273cdfe9ca52fbe76c85e055aef"
    },
    {
      "name": "APESHIT",
      "artist": "The Carters",
      "position": 80,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273264c32750a4676ac49183fbb"
    },
    {
      "name": "Never Fight A Man With A Perm",
      "artist": "IDLES",
      "position": 81,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27323c88111499555554ecb2033"
    },
    {
      "name": "Ghost Town",
      "artist": "Kanye West, PARTYNEXTDOOR",
      "position": 82,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27397508a4b756763370510bd44"
    },
    {
      "name": "I Love It (& Lil Pump)",
      "artist": "Kanye West, Lil Pump",
      "position": 83,
      "addedByName": "Wildcard",
      "addedByImage": "beer3",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b6d544387b04e1d1a5f7926c"
    },
    {
      "name": "BAGDAD - Cap.7: Liturgia",
      "artist": "ROSALÍA",
      "position": 84,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f4d64a6a6b7e24b6bd9f009f"
    },
    {
      "name": "SLOW DANCING IN THE DARK",
      "artist": "Joji",
      "position": 85,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27360ba1d6104d0475c7555a6b2"
    },
    {
      "name": "Sunshine",
      "artist": "JMSN",
      "position": 86,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273aca5d0ee5041ec98ae569905"
    },
    {
      "name": "Because It's In The Music",
      "artist": "Robyn",
      "position": 87,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2739eb78609dfaab25f4f7a9190"
    },
    {
      "name": "VENGEANCE | VENGEANCE [FEAT. JPEGMAFIA & ZILLAKAMI | JPEGMAF1A + Z1LLAKAM1]",
      "artist": "Denzel Curry, JPEGMAFIA, ZillaKami",
      "position": 88,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737d05dd3ebb77cc048d66b294"
    },
    {
      "name": "Leave It In My Dreams",
      "artist": "The Voidz",
      "position": 89,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273d00e504004a48159ac896b64"
    },
    {
      "name": "Peach Jam",
      "artist": "88rising, Joji, BlocBoy JB",
      "position": 90,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2734aedbebc17bc6ebccad220e9"
    },
    {
      "name": "Next Best Thing",
      "artist": "Clarence Clarity",
      "position": 91,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732bce245804a46788ead81499"
    },
    {
      "name": "Lovesick Blues",
      "artist": "Mason Ramsey",
      "position": 92,
      "addedByName": "Wildcard",
      "addedByImage": "beer3",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27309666867e54fa766e2b70ce3"
    },
    {
      "name": "Proxy Love",
      "artist": "HMLTD",
      "position": 93,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b2c1f2987308c3f18affd80d"
    },
    {
      "name": "きみのみかた",
      "artist": "Kyary Pamyu Pamyu",
      "position": 94,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273374813674ace3b289a5964e2"
    },
    {
      "name": "Me and Michael",
      "artist": "MGMT",
      "position": 95,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b47d309281c66820b7137f5d"
    },
    {
      "name": "TABOO | TA13OO",
      "artist": "Denzel Curry",
      "position": 96,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737d05dd3ebb77cc048d66b294"
    },
    {
      "name": "The Lords Song",
      "artist": "Daughters",
      "position": 97,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733b50badddc922c9df5025dd6"
    },
    {
      "name": "Switch",
      "artist": "6LACK",
      "position": 98,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e1530b42603367fdb2208d88"
    },
    {
      "name": "T69 collapse",
      "artist": "Aphex Twin",
      "position": 99,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733feb53151799913991ef9cd6"
    },
    {
      "name": "Chameleon Paint",
      "artist": "Tropical Fuck Storm",
      "position": 100,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c9267acfc4f9a9aa07aee89b"
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
