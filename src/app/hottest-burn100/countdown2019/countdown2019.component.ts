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
  selector: 'app-countdown2019',
  templateUrl: './countdown2019.component.html',
  styleUrls: ['./countdown2019.component.scss']
})
export class Countdown2019Component {
  public tracks$: Observable<TrackModel[]>;
  public nowPlayingTrack$: Observable<TrackModel | undefined>;
  public noTracksToShow$ = new BehaviorSubject<boolean>(false);
  public error$ = new Subject<string>;

  private readonly trackListResponse =[
    {
      "name": "bad guy",
      "artist": "Billie Eilish",
      "position": 1,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce"
    },
    {
      "name": "Boy With Luv (feat. Halsey)",
      "artist": "BTS, Halsey",
      "position": 2,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27329d00196831bec20ebbff5c7"
    },
    {
      "name": "Truth Hurts",
      "artist": "Lizzo",
      "position": 3,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2734d51081892dbe3f1ddf28914"
    },
    {
      "name": "Bulls On Parade - triple j Like A Version",
      "artist": "Denzel Curry",
      "position": 4,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27389eeee3827c8315c973637bd"
    },
    {
      "name": "Juicy",
      "artist": "Doja Cat",
      "position": 5,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27305d15f02b484a462368cce63"
    },
    {
      "name": "Don't Start Now",
      "artist": "Dua Lipa",
      "position": 6,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738583df1a14bea9175f9ac520"
    },
    {
      "name": "Robbery",
      "artist": "Lime Cordiale",
      "position": 7,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27332d34e24c11ed96d3f174389"
    },
    {
      "name": "Circles",
      "artist": "Post Malone",
      "position": 8,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2739478c87599550dd73bfa7e02"
    },
    {
      "name": "Rules",
      "artist": "Doja Cat",
      "position": 9,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27348504987a6d779e4cc3ab339"
    },
    {
      "name": "Next Level Charli",
      "artist": "Charli XCX",
      "position": 10,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273cee4acc7bfe23bc75461a66c"
    },
    {
      "name": "Vossi Bop",
      "artist": "Stormzy",
      "position": 11,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a1e8b73748ee972a4c22be16"
    },
    {
      "name": "The Whole Of The Moon",
      "artist": "Kirin J Callinan",
      "position": 12,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273fcd95679c07a6fb727665630"
    },
    {
      "name": "Not",
      "artist": "Big Thief",
      "position": 13,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e73a1a912f761d1a8b57c43b"
    },
    {
      "name": "The Real Thing",
      "artist": "Client Liaison",
      "position": 14,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2735610a6c500c26ced1301b2cb"
    },
    {
      "name": "Ride It",
      "artist": "Regard",
      "position": 15,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2735c27813ae019011fcb370c78"
    },
    {
      "name": "3 Nights",
      "artist": "Dominic Fike",
      "position": 16,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2734a42166d927b3acce345c5c0"
    },
    {
      "name": "Jailbreak the Tesla (feat. Aminé)",
      "artist": "Injury Reserve, Aminé",
      "position": 17,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732cc98f4c23379cc95d2c6916"
    },
    {
      "name": "Kids",
      "artist": "PUP",
      "position": 18,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27359a228fe782f13b049dd152c"
    },
    {
      "name": "FANCY",
      "artist": "TWICE",
      "position": 19,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f917c68dd4a3a36ec77f06ec"
    },
    {
      "name": "Everyday",
      "artist": "Weyes Blood",
      "position": 20,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b0ac3ede8fb336c47d067a43"
    },
    {
      "name": "The London (feat. J. Cole & Travis Scott)",
      "artist": "Young Thug, J. Cole, Travis Scott",
      "position": 21,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273137c2d3150118e7157800c5b"
    },
    {
      "name": "See You at Your Funeral",
      "artist": "PUP",
      "position": 22,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27359a228fe782f13b049dd152c"
    },
    {
      "name": "Babushka Boi",
      "artist": "A$AP Rocky",
      "position": 23,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f0af4e62df674240cc7a35f8"
    },
    {
      "name": "Numb Numb Juice",
      "artist": "ScHoolboy Q",
      "position": 24,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f2149422121d1674c6f4c009"
    },
    {
      "name": "Miami Memory",
      "artist": "Alex Cameron",
      "position": 25,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273bf96842d5f15a8a49d12ab67"
    },
    {
      "name": "Bad N Bouj",
      "artist": "Hp Boyz",
      "position": 26,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732cb37cb6a509309b117bc451"
    },
    {
      "name": "Labrador",
      "artist": "WAAX",
      "position": 27,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273d687299c1c747b9b10aa6a9a"
    },
    {
      "name": "Morbid Stuff",
      "artist": "PUP",
      "position": 28,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27359a228fe782f13b049dd152c"
    },
    {
      "name": "Older Than Before (Oswald Made No Way for Himself)",
      "artist": "Weatherday",
      "position": 29,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731968b11017438f6d67ed700f"
    },
    {
      "name": "Blinding Lights",
      "artist": "The Weeknd",
      "position": 30,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c464fabb4e51b72d657f779a"
    },
    {
      "name": "Toss a Coin to Your Witcher",
      "artist": "Samuel Kim, Black Gryph0n",
      "position": 31,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733a7c5206225b8779a1570128"
    },
    {
      "name": "EARFQUAKE",
      "artist": "Tyler, The Creator",
      "position": 32,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737005885df706891a3c182a57"
    },
    {
      "name": "July",
      "artist": "Noah Cyrus",
      "position": 33,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731c897ee628349a905b217068"
    },
    {
      "name": "Obsessed",
      "artist": "Hatchie",
      "position": 34,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273ceee06fb053735c62e8b3385"
    },
    {
      "name": "The Cleaner",
      "artist": "Squid",
      "position": 35,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273053808368e831c65f0f87482"
    },
    {
      "name": "A Good Look",
      "artist": "Sturgill Simpson",
      "position": 36,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273579cf5b56106f5dddfaae13b"
    },
    {
      "name": "Bruxist Grin",
      "artist": "Pile",
      "position": 37,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273903f97fcbc0ec12c476a0f95"
    },
    {
      "name": "hope is a dangerous thing for a woman like me to have - but I have it",
      "artist": "Lana Del Rey",
      "position": 38,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273879e9318cb9f4e05ee552ac9"
    },
    {
      "name": "Robbery",
      "artist": "Juice WRLD",
      "position": 39,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273af149eb4002f65f83afc63c4"
    },
    {
      "name": "10/10",
      "artist": "Rex Orange County",
      "position": 40,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27328c886d8404a6c9ee594464d"
    },
    {
      "name": "Silver",
      "artist": "DMA'S",
      "position": 41,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273033fee1ba7e27e040d44113c"
    },
    {
      "name": "Feelin' Low (F*ckboy Blues)",
      "artist": "Peach Pit",
      "position": 42,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737ae20c9b7dd667360d9333c7"
    },
    {
      "name": "Doorman",
      "artist": "slowthai, Mura Masa",
      "position": 43,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2738fdd144d8a8e57db60c5c29d"
    },
    {
      "name": "Other Ladies",
      "artist": "Alex Cameron",
      "position": 44,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273bf96842d5f15a8a49d12ab67"
    },
    {
      "name": "Divorce",
      "artist": "Alex Cameron",
      "position": 45,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273bf96842d5f15a8a49d12ab67"
    },
    {
      "name": "Lose Control",
      "artist": "MEDUZA, Becky Hill, Goodboys",
      "position": 46,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273d43c59e52d6a8032a4e27fc4"
    },
    {
      "name": "Scorpion Hill",
      "artist": "PUP",
      "position": 47,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27359a228fe782f13b049dd152c"
    },
    {
      "name": "Drowning",
      "artist": "KUČKA",
      "position": 48,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273bad47de1b5cce6932fca7ddb"
    },
    {
      "name": "datsu . hikage no onna",
      "artist": "Otoboke Beaver",
      "position": 49,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732c96d9855d5d448df661c4c8"
    },
    {
      "name": "Face to Face",
      "artist": "Rex Orange County",
      "position": 50,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273733e6d7818eef87d20df86b5"
    },
    {
      "name": "Hush Money",
      "artist": "Blanck Mass",
      "position": 51,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733b1c849cbe28b4ab935662b9"
    },
    {
      "name": "Out of Sequence",
      "artist": "Drab Majesty",
      "position": 52,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c671b036e99f23147460ff00"
    },
    {
      "name": "Jogging",
      "artist": "Richard Dawson",
      "position": 53,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c08a582aed19c2393a707a31"
    },
    {
      "name": "Mile High (feat. Travis Scott & Metro Boomin)",
      "artist": "James Blake, Travis Scott, Metro Boomin",
      "position": 54,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2739af56a54edacb6237b49fa2e"
    },
    {
      "name": "Spot the Difference",
      "artist": "ONEFOUR",
      "position": 55,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2735bd163057122204ce43b06cd"
    },
    {
      "name": "Old Town Road (feat. Billy Ray Cyrus) - Remix",
      "artist": "Lil Nas X, Billy Ray Cyrus",
      "position": 56,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273bc5839eea68e7ff7f1010f93"
    },
    {
      "name": "Follow God",
      "artist": "Kanye West",
      "position": 57,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731bb797bbfe2480650b6c2964"
    },
    {
      "name": "GONE, GONE / THANK YOU",
      "artist": "Tyler, The Creator",
      "position": 58,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737005885df706891a3c182a57"
    },
    {
      "name": "Just Friends",
      "artist": "Hayden James, Boy Matthews",
      "position": 59,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273ab2228f272e4929418a4f55b"
    },
    {
      "name": "money machine",
      "artist": "100 gecs, Dylan Brady, Laura Les",
      "position": 60,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273acd9825c2d60ddee38f643b3"
    },
    {
      "name": "In My Room",
      "artist": "Frank Ocean",
      "position": 61,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273db974f9533dd9b362891b5db"
    },
    {
      "name": "Watermelon Sugar",
      "artist": "Harry Styles",
      "position": 62,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27377fdcfda6535601aff081b6a"
    },
    {
      "name": "Confessions",
      "artist": "Sudan Archives",
      "position": 63,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27353603561110b604aa2f8c72d"
    },
    {
      "name": "Jet Lag",
      "artist": "A$AP Ferg",
      "position": 64,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27380dacac510e9d085a591f981"
    },
    {
      "name": "Boogieman Sam",
      "artist": "King Gizzard & The Lizard Wizard",
      "position": 65,
      "addedByName": "Griffyn Heels",
      "addedByImage": "gh",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b5bd8af17729dcdc597014d3"
    },
    {
      "name": "Turn to Hate",
      "artist": "Orville Peck",
      "position": 66,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27356ebaf407e8dbc09afd7f6be"
    },
    {
      "name": "HIGHEST IN THE ROOM",
      "artist": "Travis Scott",
      "position": 67,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273e42b5fea4ac4c3d6328b622b"
    },
    {
      "name": "hand crushed by a mallet",
      "artist": "100 gecs, Dylan Brady, Laura Les",
      "position": 68,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273acd9825c2d60ddee38f643b3"
    },
    {
      "name": "Señorita",
      "artist": "Shawn Mendes, Camila Cabello",
      "position": 69,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c820f033bd82bef4355d1563"
    },
    {
      "name": "Foot on Necks",
      "artist": "SAULT",
      "position": 70,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27330b7c883e2f389dfa0cbd788"
    },
    {
      "name": "CYANIDE",
      "artist": "Daniel Caesar",
      "position": 71,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737607aa9ae7904e1b12907c93"
    },
    {
      "name": "NEW MAGIC WAND",
      "artist": "Tyler, The Creator",
      "position": 72,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737005885df706891a3c182a57"
    },
    {
      "name": "Better Together",
      "artist": "Hayden James, Running Touch",
      "position": 73,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273ab2228f272e4929418a4f55b"
    },
    {
      "name": "Use This Gospel",
      "artist": "Kanye West, Clipse, Kenny G",
      "position": 74,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2731bb797bbfe2480650b6c2964"
    },
    {
      "name": "Start from Nothing",
      "artist": "Yung Bae",
      "position": 75,
      "addedByName": "Alex Barker",
      "addedByImage": "ab",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c8954d7d5c9deb29f1f77b08"
    },
    {
      "name": "wonderful life (feat. Dani Filth)",
      "artist": "Bring Me The Horizon, Dani Filth",
      "position": 76,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27349e3b7e85829da2fbc68bc46"
    },
    {
      "name": "Nothing is Safe",
      "artist": "clipping.",
      "position": 77,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b27340ae55a202d7c1f9c2779791"
    },
    {
      "name": "Purple Hat",
      "artist": "Sofi Tukker",
      "position": 78,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273818685825c4be7951a2ec4bb"
    },
    {
      "name": "Left Hand (feat. Joey Bada$$, Flatbush Zombies, The Underachievers, Kirk Knight, Nyck Caution, CJ Fly)",
      "artist": "Beast Coast, Joey Bada$$, Flatbush Zombies, The Underachievers, Kirk Knight, Nyck Caution, CJ Fly",
      "position": 79,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2735bfdcb69a43712cee7bf0193"
    },
    {
      "name": "Drunk II",
      "artist": "Mannequin Pussy",
      "position": 80,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733b00b2c21fab2f9633ea5c84"
    },
    {
      "name": "Goodbyes (feat. Young Thug)",
      "artist": "Post Malone, Young Thug",
      "position": 81,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2739478c87599550dd73bfa7e02"
    },
    {
      "name": "All Comes Back To You",
      "artist": "R3HAB",
      "position": 82,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2732d0fc4c885e1625de65d74a5"
    },
    {
      "name": "Violence",
      "artist": "Grimes, i_o",
      "position": 83,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c6469e1f945a7fad9da8bdba"
    },
    {
      "name": "Andromeda",
      "artist": "Weyes Blood",
      "position": 84,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273b0ac3ede8fb336c47d067a43"
    },
    {
      "name": "Resolution",
      "artist": "SAFIA",
      "position": 85,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737b15631ba6eca57488ad93b0"
    },
    {
      "name": "classic j dies and goes to hell, Pt. 1",
      "artist": "glass beach",
      "position": 86,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2733933e60c101d9150ead73c0f"
    },
    {
      "name": "TOES (feat. Lil Baby & Moneybagg Yo)",
      "artist": "DaBaby, Lil Baby, Moneybagg Yo",
      "position": 87,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f2b94b2fda4f08836d6371ba"
    },
    {
      "name": "Feel Special",
      "artist": "TWICE",
      "position": 88,
      "addedByName": "Josh Anderson",
      "addedByImage": "ja",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273bca7276ff61550764dc8a95e"
    },
    {
      "name": "Take What You Want (feat. Ozzy Osbourne & Travis Scott)",
      "artist": "Post Malone, Ozzy Osbourne, Travis Scott",
      "position": 89,
      "addedByName": "Joshua Landy",
      "addedByImage": "jl",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273bbf401121625a31ba1a6a4bb"
    },
    {
      "name": "Bartender",
      "artist": "Lana Del Rey",
      "position": 90,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273879e9318cb9f4e05ee552ac9"
    },
    {
      "name": "So Hot You're Hurting My Feelings",
      "artist": "Caroline Polachek",
      "position": 91,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737d983e7bf67c2806218c2759"
    },
    {
      "name": "The Message",
      "artist": "ONEFOUR",
      "position": 92,
      "addedByName": "Braeden Wilson",
      "addedByImage": "bw",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273737eb75b07bbfa2af74ed941"
    },
    {
      "name": "Old. Self. Doubt.",
      "artist": "Bench Press",
      "position": 93,
      "addedByName": "Jack McGrath",
      "addedByImage": "jm",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2739522aaea25fb4b42c08b4caa"
    },
    {
      "name": "Season's Greetings",
      "artist": "Stella Donnelly",
      "position": 94,
      "addedByName": "Daniel Hornblower",
      "addedByImage": "db",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273a91d0d3a6dde2bedd8ae9aa8"
    },
    {
      "name": "everything i wanted",
      "artist": "Billie Eilish",
      "position": 95,
      "addedByName": "Alex Karney",
      "addedByImage": "ak",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273f2248cf6dad1d6c062587249"
    },
    {
      "name": "Rodeo",
      "artist": "Lil Nas X, Cardi B",
      "position": 96,
      "addedByName": "Chris Quigley",
      "addedByImage": "cq",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273c0e7bf5cdd630f314f20586a"
    },
    {
      "name": "Mistakes Like Fractures",
      "artist": "Knocked Loose",
      "position": 97,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273467cf5ba40fda2a43da76c4d"
    },
    {
      "name": "1999",
      "artist": "Charli XCX, Troye Sivan",
      "position": 98,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b273cee4acc7bfe23bc75461a66c"
    },
    {
      "name": "I THINK",
      "artist": "Tyler, The Creator",
      "position": 99,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2737005885df706891a3c182a57"
    },
    {
      "name": "San Frandisco",
      "artist": "Dom Dolla",
      "position": 100,
      "addedByName": "Matt Knightbridge",
      "addedByImage": "mk",
      "albumArt": "https://i.scdn.co/image/ab67616d0000b2736e8eb4b6aa89aedf63f9adfd"
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
