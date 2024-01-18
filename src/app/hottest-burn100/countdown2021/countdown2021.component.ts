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
  selector: 'app-countdown2021',
  templateUrl: './countdown2021.component.html',
  styleUrls: ['./countdown2021.component.scss']
})
export class Countdown2021Component {
  public tracks$: Observable<TrackModel[]>;
  public nowPlayingTrack$: Observable<TrackModel | undefined>;
  public noTracksToShow$ = new BehaviorSubject<boolean>(false);
  public error$ = new Subject<string>;

  private readonly trackListResponse = [
    {
      "name": "april's-bloom",
      "artist": "julie",
      "position": 1,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273d90103f5fc09d34f3d123015"
    },
    {
      "name": "Spinning (with Charli XCX & The 1975)",
      "artist": "No Rome, Charli XCX, The 1975",
      "position": 2,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2734f5549dc1dd07183ee7941ba"
    },
    {
      "name": "headboard",
      "artist": "Lil Ugly Mane",
      "position": 3,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27354dbbd095c73e3549bba72b7"
    },
    {
      "name": "Life Of The Party (with André 3000)",
      "artist": "Kanye West, André 3000",
      "position": 4,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c5663e50de353981ed2b1a37"
    },
    {
      "name": "New Shapes (feat. Christine and the Queens and Caroline Polachek)",
      "artist": "Charli XCX, Christine and the Queens, Caroline Polachek",
      "position": 5,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273adf0ad39a8ba7c2b2cacc304"
    },
    {
      "name": "Elephant - triple j Like A Version",
      "artist": "The Wiggles",
      "position": 6,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2734c9b248c07bc361326bb22a7"
    },
    {
      "name": "range brothers (with Kendrick Lamar)",
      "artist": "Baby Keem, Kendrick Lamar",
      "position": 7,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731bfa23b13d0504fb90c37b39"
    },
    {
      "name": "Pump The Brakes",
      "artist": "Dom Dolla",
      "position": 8,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e2f062d566e914307bbfbc03"
    },
    {
      "name": "White Dress",
      "artist": "Lana Del Rey",
      "position": 9,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273ca929c6e766cb8591a286e0d"
    },
    {
      "name": "Stormy Weather",
      "artist": "Kings of Leon",
      "position": 10,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27377253620f08397c998d18d78"
    },
    {
      "name": "FORCE OF HABIT",
      "artist": "Paris Texas",
      "position": 11,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a3fed508a9b88a492b589873"
    },
    {
      "name": "Automata",
      "artist": "Mirrors",
      "position": 12,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c119cee776ada8396c1a5380"
    },
    {
      "name": "High & Hurt",
      "artist": "Iceage",
      "position": 13,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737d645c1803a42f7942eb9568"
    },
    {
      "name": "See Me",
      "artist": "death's dynamic shroud",
      "position": 14,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273bcc101e799f5e6ed8407b887"
    },
    {
      "name": "BALD! REMIX",
      "artist": "JPEGMAFIA, Denzel Curry",
      "position": 15,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736e57be9031cc8bc46fb17fee"
    },
    {
      "name": "BLACKOUT",
      "artist": "Turnstile",
      "position": 16,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a4499cf37a6fe4ff043dc9f2"
    },
    {
      "name": "For Sale",
      "artist": "Meat Wave",
      "position": 17,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27385e7797a39bfa626c7c65f78"
    },
    {
      "name": "WE GO",
      "artist": "fromis_9",
      "position": 18,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731b71401437cd2b0e6577e813"
    },
    {
      "name": "HOLIDAY",
      "artist": "Turnstile",
      "position": 19,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a4499cf37a6fe4ff043dc9f2"
    },
    {
      "name": "Démons",
      "artist": "Angèle, Damso",
      "position": 20,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27392dc99b0795e0b8471780217"
    },
    {
      "name": "MYSTERY",
      "artist": "Turnstile",
      "position": 21,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a4499cf37a6fe4ff043dc9f2"
    },
    {
      "name": "Secrets (Your Fire)",
      "artist": "Magdalena Bay",
      "position": 22,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2730ecbdac77e72dc16719a3e89"
    },
    {
      "name": "DiE4u",
      "artist": "Bring Me The Horizon",
      "position": 23,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732391bf91fd75328b113d9126"
    },
    {
      "name": "Knife Talk (with 21 Savage ft. Project Pat)",
      "artist": "Drake, 21 Savage, Project Pat",
      "position": 24,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273cd945b4e3de57edd28481a3f"
    },
    {
      "name": "Come to Life",
      "artist": "Kanye West",
      "position": 25,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736ba1cffc9b2c5469503430b3"
    },
    {
      "name": "Demeanor (feat. Dua Lipa)",
      "artist": "Pop Smoke, Dua Lipa",
      "position": 26,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27379476cf856443329e6c52c04"
    },
    {
      "name": "Freedom (You Bring Me)",
      "artist": "Snakehips, Armand Van Helden",
      "position": 27,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736f73236e210c57a8a5a764d8"
    },
    {
      "name": "benadryl submarine",
      "artist": "Lil Ugly Mane",
      "position": 28,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27354dbbd095c73e3549bba72b7"
    },
    {
      "name": "Chemtrails Over The Country Club",
      "artist": "Lana Del Rey",
      "position": 29,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273ca929c6e766cb8591a286e0d"
    },
    {
      "name": "The End",
      "artist": "IDLES",
      "position": 30,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a7124df8d812ebddaeff14f8"
    },
    {
      "name": "That Funny Feeling",
      "artist": "Phoebe Bridgers",
      "position": 31,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737791973890cd3352f5bc69ea"
    },
    {
      "name": "Good Ones",
      "artist": "Charli XCX",
      "position": 32,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273945256a58125076169ac098f"
    },
    {
      "name": "Sara Jo",
      "artist": "Alex Cameron",
      "position": 33,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273805566e2f96ddd79da455c38"
    },
    {
      "name": "Black Bathing Suit",
      "artist": "Lana Del Rey",
      "position": 34,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736946deb6f548e464b385ee0e"
    },
    {
      "name": "STAY (with Justin Bieber)",
      "artist": "The Kid LAROI, Justin Bieber",
      "position": 35,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738e6551a2944764bc8e33a960"
    },
    {
      "name": "Only for Tonight",
      "artist": "Pearl Charles",
      "position": 36,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27359b278a7e0d8051e2c6d8a56"
    },
    {
      "name": "On My Knees",
      "artist": "RÜFÜS DU SOL",
      "position": 37,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f014b5a71d5e7b0a9ee64386"
    },
    {
      "name": "Treat You Right",
      "artist": "The Jungle Giants",
      "position": 38,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736b012ec8d97287ac2088c2f2"
    },
    {
      "name": "Apple Crumble",
      "artist": "Lime Cordiale, Idris Elba",
      "position": 39,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2735d7fb51583e28093ac160ec7"
    },
    {
      "name": "Smokin Out The Window",
      "artist": "Bruno Mars, Anderson .Paak, Silk Sonic",
      "position": 40,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273ca1fa2ec5795f48e610dc058"
    },
    {
      "name": "The Other Black Dog",
      "artist": "Genesis Owusu",
      "position": 41,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a5be3902609e482a1a9eec9c"
    },
    {
      "name": "Butter",
      "artist": "BTS",
      "position": 42,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273240447f2da1433d8f4303596"
    },
    {
      "name": "Laughing Waters",
      "artist": "Quivers",
      "position": 43,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273618f4bf8cd8f97231f3df427"
    },
    {
      "name": "Bezos I",
      "artist": "Bo Burnham",
      "position": 44,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732853b5ea06ddc676b337c389"
    },
    {
      "name": "I Don't Wanna Talk (I Just Wanna Dance)",
      "artist": "Glass Animals",
      "position": 45,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273cb4d977459c7ea7498a4711c"
    },
    {
      "name": "Out of Ordinary",
      "artist": "Oliver Tree",
      "position": 46,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273882d096f46cfbe634b29a4a3"
    },
    {
      "name": "INDUSTRY BABY (feat. Jack Harlow)",
      "artist": "Lil Nas X, Jack Harlow",
      "position": 47,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273ba26678947112dff3c3158bf"
    },
    {
      "name": "Bones",
      "artist": "Telenova",
      "position": 48,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27375fcbf888904f152370cd674"
    },
    {
      "name": "Narrator",
      "artist": "Squid, Martha Skye Murphy",
      "position": 49,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27355fa8fe66444b56a47f69327"
    },
    {
      "name": "Airwalks (Alt)",
      "artist": "Jeff Rosenstock",
      "position": 50,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273932ab4a493d07e97202438c0"
    },
    {
      "name": "One Right Now (with The Weeknd)",
      "artist": "Post Malone, The Weeknd",
      "position": 51,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2734158fe41143182ec16ead070"
    },
    {
      "name": "Hurricane",
      "artist": "Kanye West",
      "position": 52,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736ba1cffc9b2c5469503430b3"
    },
    {
      "name": "Leave The Door Open",
      "artist": "Bruno Mars, Anderson .Paak, Silk Sonic",
      "position": 53,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273af964ec2d75f1b2e32be7670"
    },
    {
      "name": "Gang Signs (feat. ScHoolboy Q)",
      "artist": "Freddie Gibbs, ScHoolboy Q",
      "position": 54,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27346e9c7ffb581bad9fdbe1e2e"
    },
    {
      "name": "Jackie",
      "artist": "Yves Tumor",
      "position": 55,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733cb460f372c84a76dda0001d"
    },
    {
      "name": "250",
      "artist": "lil golo, Cult Shφtta",
      "position": 56,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27385b17c31709d1dc76a5f9b0c"
    },
    {
      "name": "Chapters",
      "artist": "Sweet Trip",
      "position": 57,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273aa85ec61a5e7b596586ed178"
    },
    {
      "name": "Take My Breath - Single Version",
      "artist": "The Weeknd",
      "position": 58,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733c041e53cb5c38b6de03e758"
    },
    {
      "name": "Peaches (feat. Daniel Caesar & Giveon)",
      "artist": "Justin Bieber, Daniel Caesar, Giveon",
      "position": 59,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431"
    },
    {
      "name": "LUMBERJACK",
      "artist": "Tyler, The Creator",
      "position": 60,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273696b4e67423edd64784bfbb4"
    },
    {
      "name": "Leave Them Behind",
      "artist": "Mirrors",
      "position": 61,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b991fcc633aa9c9065ee3b2c"
    },
    {
      "name": "You Lose!",
      "artist": "Magdalena Bay",
      "position": 62,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2730ecbdac77e72dc16719a3e89"
    },
    {
      "name": "Why’d Ya Do It",
      "artist": "Sierra Ferrell",
      "position": 63,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273407ceaa5d7fdb779e73c48f3"
    },
    {
      "name": "Arcadia",
      "artist": "Lana Del Rey",
      "position": 64,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273bdba8bbafc263b551996d56f"
    },
    {
      "name": "MONTERO (Call Me By Your Name)",
      "artist": "Lil Nas X",
      "position": 65,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273be82673b5f79d9658ec0a9fd"
    },
    {
      "name": "Air Bnb Sonnet",
      "artist": "The Hellp",
      "position": 66,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27326ecccf3aaf98509a257486a"
    },
    {
      "name": "Ten Of Swords",
      "artist": "Antagonist A.D, Matt Honeycutt",
      "position": 67,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273670ba4d14ee95c6b74e6d53c"
    },
    {
      "name": "R U 4 Me?",
      "artist": "Middle Kids",
      "position": 68,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273618b0609aa6f26935c76f300"
    },
    {
      "name": "Kiss Me More (feat. SZA)",
      "artist": "Doja Cat, SZA",
      "position": 69,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273908280d9807127e185b71d56"
    },
    {
      "name": "porcelain slightly",
      "artist": "Lil Ugly Mane",
      "position": 70,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27354dbbd095c73e3549bba72b7"
    },
    {
      "name": "Free",
      "artist": "Parcels",
      "position": 71,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2734148eebf7cfaf56f5d3bb144"
    },
    {
      "name": "hollywood sucks//",
      "artist": "KennyHoopla, Travis Barker",
      "position": 72,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27328f984a071dd9f074d3e22ed"
    },
    {
      "name": "edamame (feat. Rich Brian)",
      "artist": "bbno$, Rich Brian",
      "position": 73,
      "addedByName": "Griffyn Heels",
      "addedByImage": "gh",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273545a202ab06885cf2c6621ca"
    },
    {
      "name": "mememe",
      "artist": "100 gecs",
      "position": 74,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27308ab9a6225d66cec9b947aa1"
    },
    {
      "name": "Venus Fly Trap",
      "artist": "MARINA",
      "position": 75,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27336c95d8631f465e6898bccc8"
    },
    {
      "name": "Just Feels Tight",
      "artist": "FISHER",
      "position": 76,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273854ede8a6938609649144743"
    },
    {
      "name": "Higher Power",
      "artist": "Coldplay",
      "position": 77,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273ec10f247b100da1ce0d80b6d"
    },
    {
      "name": "Need to Know",
      "artist": "Doja Cat",
      "position": 78,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2734df3245f26298a1579ecc321"
    },
    {
      "name": "Don't You Worry About Me",
      "artist": "Bad Boy Chiller Crew",
      "position": 79,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273ab77a191149ae9f1f7ae439f"
    },
    {
      "name": "Dumb Enough",
      "artist": "Kirin J Callinan",
      "position": 80,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273340e640f37b84db77db6280e"
    },
    {
      "name": "Heaven and Hell",
      "artist": "Kanye West",
      "position": 81,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736ba1cffc9b2c5469503430b3"
    },
    {
      "name": "Fat Chance",
      "artist": "We Were Promised Jetpacks",
      "position": 82,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2734bbb32925eb995b03c4f1b20"
    },
    {
      "name": "Fever",
      "artist": "Dua Lipa, Angèle",
      "position": 83,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273214b60a753733ca0792cf47f"
    },
    {
      "name": "Let’s Get The Party Started (feat. Bring Me The Horizon)",
      "artist": "Tom Morello, Bring Me The Horizon",
      "position": 84,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f4f22b73eef54cfc089abd59"
    },
    {
      "name": "good 4 u",
      "artist": "Olivia Rodrigo",
      "position": 85,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a"
    },
    {
      "name": "Lagoon",
      "artist": "Horsey",
      "position": 86,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c2df97b95aa6270b77f9ec54"
    },
    {
      "name": "Waiting",
      "artist": "PUP",
      "position": 87,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273400b49de13f6165ede43b1ff"
    },
    {
      "name": "family ties (with Kendrick Lamar)",
      "artist": "Baby Keem, Kendrick Lamar",
      "position": 88,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731bfa23b13d0504fb90c37b39"
    },
    {
      "name": "CORSO",
      "artist": "Tyler, The Creator",
      "position": 89,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273696b4e67423edd64784bfbb4"
    },
    {
      "name": "AN ITERATION",
      "artist": "The Armed",
      "position": 90,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27322350f2c0a5a5cdd2a559d83"
    },
    {
      "name": "Don't Go Yet",
      "artist": "Camila Cabello",
      "position": 91,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273d24bb6aa36842e45bdd3d1cc"
    },
    {
      "name": "All Over U",
      "artist": "Snakehips",
      "position": 92,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273af8c5b210d4c9eae374b0971"
    },
    {
      "name": "Beggin'",
      "artist": "Måneskin",
      "position": 93,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273fa0ab3a28b5c52d8a5f97045"
    },
    {
      "name": "Cold Heart - PNAU Remix",
      "artist": "Elton John, Dua Lipa, PNAU",
      "position": 94,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2739f5cce8304c42d3a5463fd23"
    },
    {
      "name": "Henny & Reefer",
      "artist": "Chillinit",
      "position": 95,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e884efdaeee459d0bf87e13c"
    },
    {
      "name": "A Bottle of Rum",
      "artist": "Xiu Xiu, Liz Harris",
      "position": 96,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273188e684ec60c91d0221f169f"
    },
    {
      "name": "Nothing for Free",
      "artist": "Pendulum",
      "position": 97,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273481aa3449c21a8d219c3c414"
    },
    {
      "name": "Happy Loner",
      "artist": "MARINA",
      "position": 98,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273ccbe716313392350f3ce4624"
    },
    {
      "name": "Off The Grid",
      "artist": "Kanye West",
      "position": 99,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273cad190f1a73c024e5a40dddd"
    },
    {
      "name": "Your Love (9PM)",
      "artist": "ATB, Topic, A7S",
      "position": 100,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f1462ebfec5f96421f44dcd3"
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
