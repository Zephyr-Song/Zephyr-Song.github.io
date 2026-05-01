/**
 * Gmeek Music Player v9 - 35首歌单 + 每首封面图
 * 纯 HTML5 Audio, 无 eval/new Function, 兼容 GitHub Pages CSP
 * 歌单: 网易云 2829816518 (私人雷达)
 */
(function () {
  'use strict';

  function initPlayer() {

  var HARDCODED_SONGS = [
    { name: 'her (feat. Annika Wells)', artist: 'JVKE/Annika Wells', url: 'https://music.163.com/song/media/outer/url?id=3317235944.mp3', cover: 'https://p2.music.126.net/KJIXaBfUQv7nmnnJCSPiqA==/109951172273049443.jpg', id: '3317235944' },
    { name: 'this is what forever feels like', artist: 'JVKE/Nick Jonas', url: 'https://music.163.com/song/media/outer/url?id=2626680545.mp3', cover: 'https://p2.music.126.net/eJA1NzXbOWokvs6yi2ttJg==/109951169956527578.jpg', id: '2626680545' },
    { name: 'Rush', artist: 'Ayra Starr', url: 'https://music.163.com/song/media/outer/url?id=1990208030.mp3', cover: 'https://p2.music.126.net/y6RIRDMrpKwekRF4CkfUGw==/109951167975291823.jpg', id: '1990208030' },
    { name: "Won't Look Back", artist: 'Geowulf', url: 'https://music.163.com/song/media/outer/url?id=482386197.mp3', cover: 'https://p2.music.126.net/11ZxgSWVXuJLJOg3SlAAXg==/109951163409413347.jpg', id: '482386197' },
    { name: 'Bloody Samaritan', artist: 'Ayra Starr', url: 'https://music.163.com/song/media/outer/url?id=1862884117.mp3', cover: 'https://p2.music.126.net/OrWPWJNAXCUNa79X0xD_Wg==/109951168618792235.jpg', id: '1862884117' },
    { name: 'Other Side', artist: 'PLAZA', url: 'https://music.163.com/song/media/outer/url?id=2093480642.mp3', cover: 'https://p2.music.126.net/oUU_Tw9FTjZSMZ7HHu6_VQ==/109951169004973551.jpg', id: '2093480642' },
    { name: 'Medieval', artist: 'FINNEAS', url: 'https://music.163.com/song/media/outer/url?id=1887215867.mp3', cover: 'https://p2.music.126.net/RFxgjunlII7caFc5XFCetQ==/109951167923009398.jpg', id: '1887215867' },
    { name: 'Empire State Of Mind (Feat. Alicia Keys)', artist: 'JAY-Z', url: 'https://music.163.com/song/media/outer/url?id=5103610.mp3', cover: 'https://p2.music.126.net/iV2Fe8OfVFsDoxt82FXAUg==/2532175279105513.jpg', id: '5103610' },
    { name: 'Billboard', artist: 'Jonas Blue/陈梓童', url: 'https://music.163.com/song/media/outer/url?id=1409157146.mp3', cover: 'https://p2.music.126.net/PaWg8EMJitPZzG9Dl54ljA==/109951164544621349.jpg', id: '1409157146' },
    { name: 'Freak Me', artist: 'Silk', url: 'https://music.163.com/song/media/outer/url?id=406072619.mp3', cover: 'https://p2.music.126.net/DIit3NPDp9nkF-U2-KKaGg==/3276544661546205.jpg', id: '406072619' },
    { name: 'What to Do', artist: 'Buddha Bar', url: 'https://music.163.com/song/media/outer/url?id=28798879.mp3', cover: 'https://p2.music.126.net/c10aknadyrJsk2PgKxXIwg==/5895581348442627.jpg', id: '28798879' },
    { name: 'Real Fake (Remix)', artist: 'Migos', url: 'https://music.163.com/song/media/outer/url?id=3332143952.mp3', cover: 'https://p2.music.126.net/yuJYD00QUbWRxvYwN0eTNg==/109951172483717933.jpg', id: '3332143952' },
    { name: 'Swept Away', artist: 'Buddha Bar/Anna Naklab', url: 'https://music.163.com/song/media/outer/url?id=28798881.mp3', cover: 'https://p2.music.126.net/c10aknadyrJsk2PgKxXIwg==/5895581348442627.jpg', id: '28798881' },
    { name: 'control', artist: 'Shura', url: 'https://music.163.com/song/media/outer/url?id=1344609215.mp3', cover: 'https://p2.music.126.net/PrOe_0e8G4QJpUwkZU4beg==/109951164109253820.jpg', id: '1344609215' },
    { name: 'Breath Away', artist: 'Duffy', url: 'https://music.163.com/song/media/outer/url?id=17368871.mp3', cover: 'https://p2.music.126.net/s4uKXpw8lcIDyFHxAsHLYg==/109951169237259283.jpg', id: '17368871' },
    { name: "AKA... What a Life!", artist: "Noel Gallagher's High Flying Birds", url: 'https://music.163.com/song/media/outer/url?id=27971879.mp3', cover: 'https://p2.music.126.net/1vc2AYyYBjQ8BY78joBDMw==/6665239488611808.jpg', id: '27971879' },
    { name: '云中加冕The Crown In The Clouds', artist: '江上青山JasonYama', url: 'https://music.163.com/song/media/outer/url?id=2084376965.mp3', cover: 'https://p2.music.126.net/Y2dAMDGKRFC4JGzDolJaGQ==/109951168933322029.jpg', id: '2084376965' },
    { name: 'What Does It Mean to You', artist: 'Carpetman', url: 'https://music.163.com/song/media/outer/url?id=2643514137.mp3', cover: 'https://p2.music.126.net/IzACfhjYrFJC3IRz-7Cf0A==/109951170121359445.jpg', id: '2643514137' },
    { name: 'Little Bit Better', artist: 'Caleb Hearn/ROSIE', url: 'https://music.163.com/song/media/outer/url?id=2122825009.mp3', cover: 'https://p2.music.126.net/-FbZQ3-XGtOR_gZTDlKE0w==/109951169315119570.jpg', id: '2122825009' },
    { name: 'I Still Want Your Love (feat. Jinnie)', artist: 'Sam Ock/Jinnie', url: 'https://music.163.com/song/media/outer/url?id=1979192239.mp3', cover: 'https://p2.music.126.net/iWgsGVhmR9Xtoo64DnZiCA==/109951167852411976.jpg', id: '1979192239' },
    { name: 'Every Summertime', artist: 'NIKI', url: 'https://music.163.com/song/media/outer/url?id=2149062755.mp3', cover: 'https://p2.music.126.net/pnxyZHscvnvycqaDcTz9SA==/109951169527798285.jpg', id: '2149062755' },
    { name: 'airplane mode', artist: 'limbo', url: 'https://music.163.com/song/media/outer/url?id=1322132356.mp3', cover: 'https://p2.music.126.net/YcpeNdOncvCvcSrSbTL1lg==/109951163640131408.jpg', id: '1322132356' },
    { name: 'Say Goodbye', artist: 'LODONI', url: 'https://music.163.com/song/media/outer/url?id=2059084604.mp3', cover: 'https://p2.music.126.net/iMlioJMh4guMubsXfFkEPg==/109951168701784147.jpg', id: '2059084604' },
    { name: 'Home (feat. Hikaru Utada)', artist: 'Charlie Puth/宇多田ヒカル', url: 'https://music.163.com/song/media/outer/url?id=3356494231.mp3', cover: 'https://p2.music.126.net/c2G0FTms0rBDSOhwgVR_DA==/109951172848276304.jpg', id: '3356494231' },
    { name: 'Nope your too late i already died', artist: 'wifiskeleton', url: 'https://music.163.com/song/media/outer/url?id=2638616976.mp3', cover: 'https://p2.music.126.net/AGu0IzFGYtOl4FyClLr8zQ==/109951170064566307.jpg', id: '2638616976' },
    { name: 'The Other Side Of Paradise', artist: 'Glass Animals', url: 'https://music.163.com/song/media/outer/url?id=2668934341.mp3', cover: 'https://p2.music.126.net/d4p6xGUMSD5nHkCOoQWR1Q==/109951170419210505.jpg', id: '2668934341' },
    { name: 'Paris in the Rain', artist: 'Lauv', url: 'https://music.163.com/song/media/outer/url?id=518904648.mp3', cover: 'https://p2.music.126.net/4Xf4fRbDc2N30rShLT_irQ==/18251893021647481.jpg', id: '518904648' },
    { name: '2 soon', artist: 'keshi', url: 'https://music.163.com/song/media/outer/url?id=1303019276.mp3', cover: 'https://p2.music.126.net/xB31iMXB9XwzStrPQzcrdw==/109951168789057630.jpg', id: '1303019276' },
    { name: 'Nothing On You', artist: 'B.o.B/Bruno Mars', url: 'https://music.163.com/song/media/outer/url?id=5100769.mp3', cover: 'https://p2.music.126.net/LpNeJdD3VtiThH5uIi62Hg==/1698745464926789.jpg', id: '5100769' },
    { name: 'phone kisses +', artist: 'suhmeduh', url: 'https://music.163.com/song/media/outer/url?id=3343637146.mp3', cover: 'https://p2.music.126.net/ZhY2QhNO3zY-9ID7Tfsfig==/109951172651476790.jpg', id: '3343637146' },
    { name: 'Off The Hook', artist: 'Jeff Jarvis', url: 'https://music.163.com/song/media/outer/url?id=2673161004.mp3', cover: 'https://p2.music.126.net/4gbH3_RAl-QoImhVHanrVQ==/109951171332135140.jpg', id: '2673161004' },
    { name: 'I Love You 3000', artist: 'Stephanie Poetri', url: 'https://music.163.com/song/media/outer/url?id=1374446646.mp3', cover: 'https://p2.music.126.net/9RNRp5dkqfgUu8CLEfEwlQ==/109951170496839853.jpg', id: '1374446646' },
    { name: 'Duvet', artist: 'B\u00f4a', url: 'https://music.163.com/song/media/outer/url?id=2025068890.mp3', cover: 'https://p2.music.126.net/U2yOmD0b2obHE0FBpBWEbQ==/109951168400421481.jpg', id: '2025068890' },
    { name: 'intentions', artist: 'Starfall', url: 'https://music.163.com/song/media/outer/url?id=2149780504.mp3', cover: 'https://p2.music.126.net/u8aU_s-CUvytJlgrkFwRLA==/109951169533927512.jpg', id: '2149780504' },
    { name: 'Dark', artist: 'mixed matches', url: 'https://music.163.com/song/media/outer/url?id=1407789513.mp3', cover: 'https://p2.music.126.net/41cYmse7QDlb-G9_0aN4hA==/109951168881039362.jpg', id: '1407789513' }
  ];

  var HARDCODED_LYRICS = {
    '5100769': `[00:00.000] 作词 : B.o.B/Bruno Mars/Philip Lawrence/Avri Levine
[00:01.000] 作曲 : Philip Lawrence/B.o.B/Bruno Mars/Ari Levine
[00:05.440]Beautiful girls all over the world
[00:09.990]I could be chasing but my time would be wasted
[00:14.000]They got nothing on you baby
[00:19.170]Nothing on you baby
[00:23.950]They might say hi and I might say hey
[00:28.240]But you shouldn't worry about what they say
[00:32.410]Cause they got nothing on you baby
[00:37.560]Nothing on you baby
[00:39.380]Not not not nothing on you babe
[00:41.630]Not not nothing on you
[00:43.340]I know you feel where I'm coming from
[00:45.130]Regardless of the things in my past that I've done
[00:47.540]Most of it really was for the hell of the fun
[00:49.830]On the carousel so around I spun (spun)
[00:52.060]With no directions just tryna get some (some)
[00:54.430]Tryna chase skirts, living in the summer sun (sun)
[00:56.730]And so I lost more than I had ever won
[00:58.930]And honestly I ended up with none
[01:01.730]There's no much nonsense
[01:02.730]It's on my conscience
[01:03.880]I'm thinking baby I should get it out
[01:05.720]And I don't wanna sound redundant
[01:07.370]But I was wondering if there was something that you wanna know
[01:09.880](that you wanna know)
[01:10.750]But never mind that we should let it go (we should let it go)
[01:12.990]Cause we don't wanna be a t.v episode (t.v episode)
[01:15.080]And all the bad thoughts just let them go (go, go, go)
[01:19.370]Beautiful girls all over the world
[01:23.740]I could be chasing but my time would be wasted
[01:27.780]They got nothing on you baby
[01:32.820]Nothing on you baby
[01:37.590]They might say hi and I might say hey
[01:42.230]But you shouldn't worry about what they say
[01:46.140]Cause they got nothing on you baby
[01:51.560]Nothing on you baby
[01:53.020]Not not not nothing on you babe
[01:55.360]Not not nothing on you
[01:57.230]Hands down there will never be another one
[01:59.190]I been around and I never seen another one
[02:01.540]Look at your style they ain't really got nothing on
[02:03.970]And you out and you ain't got nothing on
[02:06.340]Baby you the whole package plus you pay your taxes
[02:08.810]And you keep it real while them other stay plastic
[02:11.200]You're my wonder women call me mr. Fantastic
[02:13.550]Stop.. Now think about it
[02:15.450]I've been to london, I've been to paris
[02:17.820]Even went out there to tokyo
[02:19.510]Back home down in georgia to new orleans
[02:22.580]But you always steal the show (steal the show)
[02:24.430]And just like that girl you got me fro (got me fro)
[02:26.790]Like a nintendo 64 (64)
[02:28.820]If you never knew well now you know (know, know, know)
[02:33.080]Beautiful girls all over the world
[02:37.470]I could be chasing but my time would be wasted
[02:41.580]They got nothing on you baby
[02:46.830]Nothing on you baby
[02:51.490]They might say hi and I might say hey
[02:55.990]But you shouldn't worry about what they say
[02:59.990]Cause they got nothing on you baby
[03:05.440]Nothing on you baby
[03:07.000]Not not not nothing on you babe
[03:09.220]Not not nothing on you
[03:12.380]Everywhere I go I'm always hearing your name (name, name)
[03:16.640]And no matter where I'm at girl you make me wanna sing (sing)
[03:21.270]Whether a bus or a plane or a car or a train
[03:25.610]No other girls in my brain and you the one to blame
[03:28.650]Beautiful girls all over the world
[03:33.080]I could be chasing but my time would be wasted
[03:37.040]They got nothing on you baby
[03:42.310]Nothing on you baby
[03:46.940]They might say hi and I might say hey
[03:51.360]But you shouldn't worry about what they say
[03:55.590]Cause they got nothing on you baby
[04:00.840]Nothing on you baby
[04:02.380]Not not not nothing on you babe
[04:04.600]Not not nothing on you
[04:07.800]Yeah and that's just how we do it
[04:14.810]And I'ma let this ride
`,
    '5103610': `[00:04.92]Yeah
[00:10.63]Yeah  Imma  up  at  Brooklyn
[00:13.41]Now  Im  down  in  Tribeca
[00:14.21]Right  next  to  DeNiro
[00:14.77]But  I'll  be  hood  forever
[00:16.08]I'm  the  new  Sinatra
[00:16.84]And  since  i  made  it  here
[00:18.99]I  can  make  it  anywhere
[00:19.86]Yeah  they  love  me  everywhere
[00:20.99]I  used  to  cop  in  Harlem
[00:22.93]All  of  my  dominicanos
[00:23.73]Right  there  up  on  broadway
[00:25.01]Brought  me  back  to  that  McDonalds
[00:27.25]Took  it  to  my  stash  spot
[00:28.40]Five  Sixty  Stage  street
[00:29.07]Catch  me  in  the  kitchen  like  a  simmons  whipping  pastry
[00:31.23]Cruising  down 8th  street
[00:32.58]Off  white  lexus
[00:33.32]Driving  so  slow  but  BK  is  from  Texas
[00:35.92]Me  I'm  up  at  Bedsty
[00:40.69]Home  of  that  boy  Biggie
[00:41.66]Now  i  live  on  billboard
[00:42.51]And  i  brought  my  boys  with  me
[00:43.69]Say  wat  up  to  Ty  Ty  still  sipping  Malta
[00:45.30]Sitting  courtside  Knicks  and  Nets  give  me  high  fives
[00:46.75]N-gga  i  be  spiked  out  i  can  trip  a  referee
[00:48.54]Tell  by  my  attitude  that  I  most  definitely  from …
[00:55.19]（Alicia  Keys）
[00:55.69]In New  York
[00:56.12]concrete jungle  where  dreams  are  made  of
[01:01.57]There's  nothing  you  can't  do
[01:05.20]Now  you're  in  New  York
[01:09.46]These  streets  will  make  you  feel  brand  new
[01:12.98]The  lights  will  inspire  you
[01:16.00]Let's  here  it  for  New  York  New  York  New  York
[01:22.85]（Jay-Z）
[01:23.05]I  made  you  hot  n-gga
[01:24.55]Catch  me  at  the  X  with  OG  at  a  Yankee  game
[01:26.79]Sh-t  i  made  the  yankee  hat  more  famous  than  a  yankee  can
[01:31.72]You  should  know  I  bleed  Blue  but  I  aint  a  crip  tho
[01:36.66]But  i  got  a  gang  of  n-ggas  walking  with  my  click  though
[01:39.16]Welcome  to  the  melting  pot
[01:40.15]Corners  where  we  selling  rocks
[01:41.58]Afrika  bambaataa  sh-t
[01:42.27]Home  of  the  hip  hop
[01:43.21]Yellow  cap  gypsy  cap  dollar  cap  holla  back
[01:44.74]For  foreigners  it  aint  fitted  they  forgot  how  to  act
[01:47.03]8million  stories  out  there  and  their  naked
[01:48.95]Cities  is  a  pity  half  of  y'all  won't  make  it
[01:53.25]Me  i  gotta  plug  a  special  and  i  got  it  made
[01:55.32]If  Jesus  payin  LeBron  I'm  paying  Dwayne  Wade
[01:56.67]3dice  cee-lo
[01:57.20]3card  marley
[01:57.70]Labor  day  parade  rest  in  peace  Bob  Marley
[01:59.75]Statue  of  Liberty  long  live  the  World  trade
[02:01.73]Long  live  the  king  yo
[02:06.86]I'm  from  the  empire  state  thats …
[02:09.14]（Alicia  Keys）
[02:09.77]In New  York
[02:10.27]concrete jungle where  dreams  are  made  of
[02:12.66]There's  nothing  you  can't  do
[02:16.89]Now  you're  in  New  York
[02:21.45]These  streets  will  make  you  feel  brand  new
[02:24.93]The  lights  will  inspire  you
[02:27.97]Let's  here  it  for  New  York  New  York  New  York
[02:34.94]（Jay-Z）
[02:35.21]Lights  is  blinding
[02:35.85]Girls  need  blinders
[02:37.63]So  they  can  step  out  of  bounds  quick
[02:39.77]The  side  lines  is  blind  with  casualties
[02:41.05]casually  then  gradually  become  worse
[02:43.52]Don't  bite  the  apple  Eve
[02:45.04]Caught  up  in  the  in  crowd
[02:46.37]Now  your  in-style
[02:47.95]And  in  the  winter  gets  cold  en  vogue  with  your  skin  out
[02:50.92]The  city  of  sin  is  a  pity  of  win
[02:54.05]Good  girls  gone  bad  the  cities  filled  with  them
[02:55.88]Mommy  took  a  bus  trip  and  now  she  got  her  bust  out
[02:59.96]Everybody  ride  her  just  like  a  bus  route
[03:02.00]Hail  Mary  to  the  city  your  a  Virgin
[03:05.36]And  Jesus  can't  save  you  like  starts  when  the  church  ends
[03:07.69]Came  here  for  school  graduated  to  the  high  life
[03:10.03]Ball  players  rap  stars  addicted  to  the  limelight
[03:12.36]Empty  in  May  got  you  feeling  like  a  champion
[03:16.16]The  city  never  sleeps  better  slip  you  a  Ambien
[03:18.73]（Alicia  Keys）
[03:19.57]In New  York
[03:20.05]concrete jungle  where  dreams  are  made  of
[03:25.84]There's  nothing  you  can't  do
[03:28.82]Now  you're  in  New  York
[03:33.31]These  streets  will  make  you  feel  brand  new
[03:36.89]The  lights  will  inspire  you
[03:39.94]Let's  here  it  for  New  York  New  York  New  York
[03:43.85]（Alicia  Keys）
[03:47.73]One  hand  in  the  air  for  the  big  city
[03:50.09]Street  lights  big  dreams  all  looking  pretty
[03:52.78]No  place  in  the  World  that  can  compare
[03:55.51]Put  your  lighters  in  the  air  everybody  say  yeaaahh
[04:00.67]Come  on  come
[04:03.14]In New  York
[04:06.18]concrete jungle  where  dreams  are  made  of
[04:10.04]There's  nothing  you  can't  do
[04:13.18]Now  you're  in  New  York
[04:17.40]These  streets  will  make  you  feel  brand  new
[04:21.12]The  lights  will  inspire  you
[04:24.30]Let's  here  it  for  New  York  New  York  New  York
`,
    '17368871': `[00:19.02]Child's play
[00:22.80]I was silly with your heart that day
[00:27.37]I enjoyed tearing you apart
[00:32.55]Now it's me who cries
[00:36.99]Teenage games all I ever did was call you names
[00:45.26]I got kicks from teasing you
[00:50.28]Now it's me who cries
[00:55.51]I have such regrets
[01:00.45]It's you I can't forget
[01:05.00]
[01:06.15]Every time I see you go by
[01:09.20]I break down and cry
[01:11.63]You're taking my breath away
[01:15.88]And every time I see you with her
[01:19.17]Oh baby it hurts
[01:21.74]You're taking my breath away
[01:24.64]Breath away
[01:29.16]
[01:36.61]Now we've grown and I'm still here
[01:41.74]On my own
[01:44.76]I'll be tender with your foolish heart
[01:49.70]Cause still it's me who cries
[01:54.33]Now I'm old
[01:57.54]Still I wish I had you to hold
[02:02.64]I Don't suppose that you would come our way
[02:07.61]Cause still it's me who cries
[02:12.58]I have such regrets
[02:18.04]It's you I can't forget
[02:21.77]
[02:22.43]Every time I see you go by
[02:26.09]I break down and cry
[02:28.74]You're taking my breath away
[02:32.91]And every time I see you with her
[02:36.29]Oh baby it hurts
[02:38.97]You're taking my breath away
[02:41.75]Breath away
[02:46.22]
[03:04.35]I have such regrets
[03:09.55]It's you I can't forget
[03:18.68]oh
[03:20.29]Every time I see you go by
[03:23.79]I break down and cry
[03:26.09]You're taking my breath away
[03:30.21]And every time I see you with her
[03:33.78]Oh baby it hurts
[03:36.68]You're taking my breath away
[03:39.34]Breath away
[03:41.94]Breath away
[03:44.36]Breath away
[03:49.25]You take my breath away
[03:52.81]Breath away
[03:55.27]Breath away.
`,
    '27971879': `[00:21.87]Someday you might find your hero
[00:26.79]
[00:28.66]Some say you might lose your mind
[00:34.84]
[00:35.84]I'm keeping my head down now for the summer
[00:39.71]I'm outta my mind  let me pull the other
[00:43.79]I'm gonna take that tiger outside for a ride
[00:50.46]
[00:52.33]What a life
[00:56.34]
[01:00.08]What a life
[01:07.07]
[01:14.59]Keep on chasing down that rainbow
[01:19.08]
[01:21.19]You'll never know what you might find
[01:26.94]
[01:28.44]Over the sunset on the horizon
[01:32.15]Maybe you dream but it tastes like poison
[01:36.23]I'm gonna take that tiger outside for a ride
[01:43.09]
[01:44.40]What a life
[01:52.51]What a life
[02:00.45]What a life
[02:07.12]
[02:08.69]What a life
[02:16.20]
[02:49.29]What a life
[02:54.92]
[02:56.93]What a life
[03:03.35]
[03:04.98]What a life
[03:11.03]
[03:13.13]What a life
[03:19.15]
[03:26.35]Someday you might find your hero
[03:34.40]Some say you might lose your mind
[03:40.11]
[03:41.99]Woo hoo
`,
    '28798881': `[00:17]You are on with your life
[00:19]Not behind
[00:21]Behind the scenes on the street
[00:29]This shadow is broken
[00:30]Swept away
[00:31]Swept away
[00:33]Swept away
[02:23]You are on with your life
[02:25]Not behind
[02:27]Behind the scenes on the street
[02:30]This shadow is broken
[02:54]Downstairs, the animals are dancing
[04:04]You are on with your life
[04:06]Not behind
[04:09]Behind the scenes on the street
[04:17]This shadow is broken
[04:19]Swept away
[04:19]Swept away
[04:21]Swept away
[04:27]Inviting some people
[04:31]Cheap trick
[04:35]Aligning your back
[04:37]It's all to, to see
[04:43]Trust your body and your head
`,
    '406072619': `[00:00.00] 作词 : Keith Sweat/Anthony Johnson/Royce Murray
[00:00.00] 作曲 : Keith Sweat/Anthony Johnson/Roy Murray/Royce Murray
[00:00.00]Another Level - Freak Me
[00:10.56]
[00:14.56]Let me lick you up and down till you say stop
[00:21.31]Let me play with your body baby make you real hot
[00:28.33]Let me do all the things you want me to do
[00:36.65]Cause tonight baby I wanna get freaky with you
[00:42.49]
[00:43.30]Baby don't you understand I wanna be your nasty man?
[00:50.12]I wanna make your body scream,
[00:53.67]then you will know just what I mean
[00:57.22]24 carat gold I want the night to grow cold
[01:03.03]
[01:04.21]I wanna lick you up and down
[01:07.52]and then I wanna lay you down come on sexy
[01:10.58]Let me lick you up and down till you say stop
[01:17.32]Let me play with your body baby make you real hot
[01:24.35]Let me do all the things you want me to do
[01:32.61]Cause tonight baby I wanna get freaky with you
[01:38.42]
[01:39.12]I love the taste of whipped cream
[01:42.67]spread it on the top of me
[01:46.06]You know I can't resist you girl
[01:49.58]I'll fly you all around the world
[01:53.10]I wanna see your body drip come on let me take a sip
[02:00.07]To calm what you cherish most
[02:03.51]Cause we're not about to brag and boast
[03:02.35][02:06.22]Let me lick you up and down till you say stop
[03:09.30][02:13.26]Let me play with your body baby make you real hot
[03:16.24][02:20.26]Let me do all the things you want me to do
[03:24.51][02:28.57]Cause tonight baby I wanna get freaky with you
[02:34.26]
[02:57.33]Cause tonight baby I wanna get freaky with you
[03:30.35]
`,
    '482386197': `[00:00.00] 作词 : Star Kendrick, Toma Banjanin
[00:01.00] 作曲 : Toma Banjanin/Star Kendrick
[00:39.25]Time on my own I used to love
[00:50.86]Kept it like a teenage secret crush
[01:03.16]Now time alone's my living hell
[01:14.43]Claimed it as if it was yours to own
[01:23.38]Throw the water on the fire
[01:26.84]This time, I'm too tired
[01:29.52]Draw the horse before the cart
[01:32.70]Took back my broken heart
[01:35.40]Finally found your bottom line
[01:38.69]You always change your mind
[01:41.39]Find some peace in your parade
[01:44.35]Kindly let me walk away
[01:51.27]I won't look back
[02:02.39]My restless sleep was once my own
[02:13.52]Somehow you've been cast the major role
[02:26.05]Can't help the tears that come at dawn
[02:37.20]This time they won't stop me from movin' on
[02:46.46]Throw the water on the fire
[02:49.83]This time, I'm too tired
[02:52.54]Draw the horse before the cart
[02:55.81]Took back my broken heart
[02:58.47]Finally found your bottom line
[03:01.73]You always change your mind
[03:04.33]Find some peace in your parade
[03:07.23]Kindly let me walk away
[03:14.31]I won't look back
[03:25.66]I won't look back
[03:33.06]My last relapse
[03:39.23]I won't look back
[03:44.82]My last relapse
[03:50.69]I won't look back
[03:56.51]My last relapse
[04:02.83]I won't look back
[04:08.21]My last relapse
[04:14.26]I won't look back
[04:19.46]I won't look back
`,
    '518904648': `[00:00.000] 作词 : Ari Leff/Michael Ross Pollack/Michael Matosic
[00:01.000] 作曲 : hye sung lim
[00:13.347]All I know is (ooh ooh ooh)
[00:16.388]We could go anywhere we could do
[00:18.945]Anything girl whatever the mood we're in
[00:24.112]All I know is (ooh ooh ooh)
[00:26.984]Getting lost late at night under stars
[00:29.731]Finding love standing right where we are your lips
[00:34.013]They pull me in the moment
[00:37.094]You and I alone and
[00:39.694]People may be watching I don't mind ‘cause
[00:46.478]Anywhere with you feels right
[00:49.163]Anywhere with you feels like
[00:51.952]Paris in the rain
[00:54.469]Paris in the rain
[00:57.295]We don't need a fancy town
[00:59.744]Or bottles that we can't pronounce
[01:02.403]Cause anywhere babe
[01:04.766]Is like Paris in the rain
[01:07.846]When I’m with you
[01:10.515]When I’m with you
[01:13.730]Paris in the rain
[01:16.274]Paris in the rain
[01:19.326]I look at you now and I want this forever
[01:22.040]I might not deserve it but there's nothing better
[01:24.154]Don't know how I ever did it all without you
[01:27.532]My heart is about to about to jump out of my chest
[01:30.865]Feelings they come and they go that they do
[01:33.589]Feelings they come and they go not with you
[01:36.198]The late nights
[01:36.887]And the street lights
[01:37.365]And the people
[01:38.355]Look at me girl
[01:39.156]And the whole world could stop
[01:41.080]Anywhere with you feels right
[01:43.637]Anywhere with you feels like
[01:46.330]Paris in the rain
[01:49.015]Paris in the rain
[01:51.849]We don't need a fancy town
[01:54.235]Or bottles that we can't pronounce
[01:57.013]Cause anywhere babe
[01:59.700]Is like Paris in the rain
[02:02.132]When I'm with you
[02:04.893]When I’m with you
[02:08.275]Paris in the rain
[02:10.847]Paris in the rain
[02:19.262]Girl when I'm not with you
[02:21.992]All I do is miss you
[02:30.199]Come and set the mood right
[02:32.903]Underneath the moonlight
[02:36.336](Days in Paris
[02:38.977]Nights in Paris)
[02:41.143]Paint you with my eyes closed
[02:43.803]Wonder where the time goes
[02:47.777](Yeah, Isn't it obvious
[02:51.264]Isn't it obvious)
[02:52.078]Come and set the mood right
[02:54.661]Underneath the moonlight
[02:57.429]Anywhere with you feels right
[03:00.227]Anywhere with you feels like
[03:03.093]Paris in the rain
[03:05.713]Paris in the rain
[03:08.936]Walking down an empty street
[03:11.837]Puddles underneath our feet
`,
    '1303019276': `[00:00.000] 作词 : Casey Luong
[00:01.000] 作曲 : Casey Luong
[00:24.950]Drank too much
[00:26.400]Got the sickness
[00:27.860]Pray to god and his son for forgiveness
[00:30.540]Same crew but
[00:31.880]Another mistress
[00:33.260]Every day every night getting wasted
[00:36.100]But i miss you
[00:37.270]What did i do
[00:38.880]**** it up, laugh it off and i lost you
[00:41.620]If i pull through
[00:42.850]Is it too soon
[00:44.400]Turn it up, close my eyes, and i'm with you
[00:47.240]Yo Marvin
[00:48.320]Stop calling
[00:49.810]Sad Iverson is ballin
[00:52.460]In the corner of a room by himself
[00:55.450]You are nothing but an empty shell
[00:58.030]Every night he going down to hell
[01:00.820]Fake love in a ****ed up hotel
[01:03.610]Can't believe how far he fell
[01:06.340]You weak on the floor so you call her cell
[01:09.130]“How you been”
[01:10.460]“How you doing”
[01:11.940]You been good
[01:13.340]I been drinking
[01:14.530]Way too much
[01:15.820]You think that i'd be
[01:17.450]Over you over you over you
[01:20.370]8 calls, all you
[01:23.010]But i think about it everyday
[01:25.810]Yeah i never missed her anyways
[01:28.380]Yeah i never missed her anyways
[01:31.250]Drank too much
[01:32.710]Got the sickness
[01:34.010]Pray to god and his son for forgiveness
[01:36.720]Same crew but
[01:38.100]Another mistress
[01:39.500]Every day every night getting wasted
[01:42.340]But i miss you
[01:43.650]What did i do
[01:45.010]**** it up, laugh it off and i lost you
[01:47.790]If i pull through
[01:49.260]Is it too soon
[01:50.480]Turn it up, close my eyes, and i'm with you
[01:53.140]Call me up
[01:56.870]Stay over and we’ll call it love
[02:02.210]Don’t matter if it ****s me up
[02:07.760]The alcohol is not enough
[02:15.330]**** pride
[02:16.750]And the other guy
[02:18.190]I cried
[02:19.530]I don't remember why
[02:20.910]Tonight
[02:22.400]I'm try to hide
[02:23.660]No slide
[02:25.020]Get frostbite
[02:26.390]8 calls, all you
[02:29.230]8 ball, all you
[02:31.980]Yeah i never missed her anyways
[02:34.680]Yeah i never missed her anyways
[02:37.470]Drank too much
[02:38.820]Got the sickness
[02:40.220]Pray to god and his son for forgiveness
[02:42.970]Same crew but
[02:44.250]Another mistress
[02:45.650]Every day every night getting wasted
[02:48.260]But i miss you
[02:49.830]What did i do
[02:51.220]**** it up, laugh it off and i lost you
[02:54.000]If i pull through
[02:55.350]Is it too soon
[02:56.770]Turn it up, close my eyes, and i'm with you
[02:59.570]Drank too much
[03:00.910]Got the sickness
[03:02.320]Pray to god and his son for forgiveness
[03:05.040]Same crew but
[03:06.330]Another mistress
[03:07.790]Every day every night getting wasted
[03:10.480]But i miss you
[03:11.870]What did i do
[03:13.270]**** it up, laugh it off and i lost you
[03:16.110]If i pull through
[03:17.370]Is it too soon
[03:18.840]Turn it up, close my eyes, and i'm with you
`,
    '1322132356': `[00:16.31]I need to not pick up my phone
[00:18.41]I'll go straight to airplane mode
[00:20.24]Find something to do I know
[00:22.21]I can be a little bit cold
[00:24.23]But my third eye is going blind
[00:26.26]I'm unaligned with my body and mind
[00:28.30]It's playing tricks, I say I'm fine
[00:29.98]But really, it's hurting me deep inside
[00:32.02]Cause I been dreaming about you, oooh
[00:35.97]I've been wishing that I was next to you, oooh
[00:39.98]I've been dreaming of us, oh
[00:43.99]I've been thinking that this is not a need or a must, but
[00:48.08]Love has driven me so, so wrong
[00:49.95]This year all I've got to show are songs
[00:51.95]And I want to be super duper true to you
[00:54.20]But God, I don't know what to do
[00:55.97]Cause last year I was just 22
[00:58.31]Feels like it up and flew
[01:00.01]So far away, and out of view
[01:02.14]But 23 seems like me and you
[01:03.99]Cause I been dreaming about you, oooh
[01:07.86]I've been wishing I was next to you, oooh
[01:11.91]I've been dreaming of us, oh
[01:15.97]I've been thinking that this is not a need or a must, but
[01:20.08]I know sometimes I make you feel insane
[01:22.12]Sorry that's just how I play this stupid game
[01:23.94]I can't act like a child and disobey
[01:25.81]All that you want from me and that you say
[01:27.70]I'm sorry, baby, please, puppy
[01:31.98]I'm trying to be ultra mega happy
[01:35.62]And show you my smile, and send you my feelings
[01:39.63]And ****, it is so hard being so damn far
[01:43.68]I guess I'll just stay here and stay singing in my car
[01:50.64]I'll sing in my car
[01:51.86]I've been dreaming about you, oooh
[01:55.99]I've been wishing I was next to you, oooh
[02:00.05]I've been dreaming of us, oh
[02:03.89]I've been thinking this is not a need or a must, but
[02:07.91]I've been waiting on you, oooh
[02:11.85]I've been waiting for you to tell me those three words too
[02:16.01]Cause I been hoping it's true, oooh
[02:20.32]That one day I'll feel like I am something real for you
[02:23.42](I've been dreamin' of us)
[02:24.57]Somethin' real for you, somethin' real for you...
[02:28.08]
`,
    '1344609215': `[00:00.00] 作词 : Alexandra Lilah Denton/Joel Laslett Pott
[00:01.00] 作曲 : Alexandra Lilah Denton/Joel Laslett Pott
[00:22.81]I got my friend to teach me French
[00:27.11]So I could speak true to you
[00:32.64]Goodnight, sweet dreams, bonne nuit
[00:37.02]Funny that I tried
[00:40.55]I don't need a seatbelt
[00:45.96]I don't need the lights turned low
[00:49.20]Baby we can keep it
[00:51.29]Or baby we can take it off
[00:54.35]Wanna go everywhere with my got to be girl
[00:58.56]Though there's gonna be turbulence
[01:03.72]When I'm with you
[01:06.32]I want you to be the remote
[01:12.35]Cause you're out of control
[01:17.71]You can get whatever you want from me cause
[01:23.97]You be the pilot
[01:27.60]I'll let you fly it
[01:29.88]All night long
[01:32.56](All night long)
[01:35.30]Look at our clothes
[01:39.34]They wrap around
[01:41.06]Each other like lovers do
[01:47.41]My jeans around your
[01:50.44]Polo polo polo neck
[01:55.50]Polo neck
[01:57.75]I don't need a seatbelt
[02:00.76]I don't need the lights turned low
[02:03.49]Baby we can keep it
[02:05.67]Or baby we can take it off
[02:08.80]Wanna go everywhere with my got to be girl
[02:13.28]Though there's gonna be turbulence
[02:18.45]When I'm with you
[02:20.97]I want you to be the remote
[02:27.35]Cause you're out of control
[02:31.94]You can get whatever you want from me cause
[02:38.64]You be the pilot
[02:41.92]I'll let you fly it
[02:44.52]All night long
[02:47.41](All night long)
[02:49.97]You be the pilot
[02:52.53]I'll let you fly it
[02:55.18]All night long
[02:58.19](All night long)
[03:00.65]When I'm with you
[03:24.94]I want you to be the remote
[03:32.14]Cause you're out of control
[03:36.02]You can get whatever you want from me cause
[03:43.26]You be the pilot
[03:45.93]I'll let you fly it
[03:48.54]All night long
[03:51.26](All night long)
[03:53.88]You be the pilot
[03:56.52]I'll let you fly it
[03:59.08]All night long
[04:01.96](All night long)
[04:04.56]You be the pilot
[04:07.20]I'll let you fly it
[04:09.92]All night long
[04:12.55](All night long)
[04:17.32]
[04:27.12]The bird is flying low over the lake
[04:30.43]And you told me that you were mine
[04:33.25]And now I'm flying like the bird
[04:35.39](Summer in December)
[04:37.82]Upside down
[04:42.16]Upside down
[04:46.72]
`,
    '1374446646': `[by:琬锥]
[00:02.31]亲爱的，请牵住我
[00:04.32]请你成为我一生的伴侣
[00:07.33]因为你是我的那位钢铁侠
[00:09.59]因为我可以爱你三千遍，永不停下
[00:12.85]亲爱的，请抓住机会
[00:14.85]因为我不想再止步于此了
[00:18.37]我要我们像好莱坞电影里演的那样
[00:23.38]我看见你站在那
[00:26.47]披着绿巨人浩克的外衣
[00:28.73]但我能想到的却是
[00:31.74]你能把要给我的戒指藏��哪里
[00:34.01]毕竟我猜你是想向我开口的
[00:36.52]我虽然害怕那个瞬间转瞬就不见
[00:39.28]但从你眼里我看到了不会消逝的一切
[00:41.79]那就让我惊喜吧
[00:44.58]身边的朋友都告诉我他们知道
[00:49.59]你在计划着向我单膝跪地的那一天
[00:55.11]但我希望那一天的到来是出乎意料的
[01:00.38]所以请你确保我不会找到任何线索
[01:04.39]在那一天到来之前
[01:05.88]亲爱的，就牵起我的手
[01:08.14]我想要一生都有你陪伴
[01:11.40]因为你就是我的钢铁侠
[01:13.40]因为我爱你，远不止三千遍
[01:16.67]亲爱的，就抓住这个机会
[01:18.92]让一切变得不同
[01:22.18]让好莱坞电影里的剧情成真
[01:27.40]此刻我们正吃着晚餐
[01:29.92]我想说你赢得了我陪你吃一辈子晚餐的机会
[01:32.42]从你的笑容中我看出
[01:35.18]你在思考，在怎样的走道上等待我缓缓向你走去
[01:37.94]你的手伸向了口袋
[01:40.70]我就快控制不住自己了
[01:43.21]假设你现在就要开口
[01:45.72]那我的点头应允一定来得更快
[01:48.79]现在我的朋友们都在告诉我
[01:53.80]你在计划着向我求婚了
[01:58.57]所以我再也按捺不住想你，想这件事
[02:04.34]想所有所有可能有关的线索
[02:08.60]于是，现在我想问
[02:10.36]亲爱的，你愿意牵起我的手吗
[02:12.37]我想要你成为我的丈夫
[02:15.24]因为你就是为我开辟宇宙的钢铁侠
[02:17.38]而我将爱你直至宇宙终结
[02:20.90]亲爱的，你愿意抓住这次机会吗
[02:22.90]让我这一次梦想实现
[02:26.16]让我成为好莱坞电影里属于你的女主角
[02:33.44]请不要有任何意外出现啊
[02:38.66]我不希望有任何意外出现
[02:42.17]亲爱的，这次你牵住我了
[02:44.43]我想让你成为我相伴一生的伴侣
[02:47.44]因为你是我的英雄
[02:49.44]我会一直爱你，与你一同守护我们的世界
[02:52.70]亲爱的，这次你抓住我了
[02:54.71]等着我们的就是崭新的生活了
[02:58.22]一切都将从好莱坞电影的银幕上落下，于现实里展开
[03:05.27]请别有任何压力
[03:10.54]什么都不用担心
[03:15.81]无论将会发生什么
[03:21.38]我一直都在，直到宇宙毁灭又重来
`,
    '1407789513': `[00:00.00] 作词 : Ed Barrios
[00:01.00] 作曲 : Ed Barrios
[00:11.35] I really wanna say sorry
[00:13.64] For what I did
[00:15.15] Cause it doesn't make me
[00:18.27] And I want to
[00:19.76] Just tell you
[00:21.28] But you won't face me
[00:23.80]
[00:24.06] Cause I think you're quick to just say your regard
[00:26.94] And I think you won't
[00:28.64] Leave a thread or a mark
[00:30.05] And whether the time
[00:31.31] Seems to faze me
[00:33.18] I'll remember everything
[00:35.84]
[00:36.17] Cause i could depend on what i know
[00:39.16] And i could have had a shot at hope
[00:42.40] And whether it's all you try
[00:44.65] And you know what's next
[00:45.96] Well I don't want to and I don't want this
[00:47.86]
[00:48.16] And you could hang on this
[00:52.10] And watch from beneath
[00:55.06] As I lose grip
[00:58.22] And lose me
[01:00.88]
[01:01.19] Cause you got a lot
[01:02.90] Into me
[01:04.47] And I'll
[01:05.51] Say between
[01:07.34] The place
[01:08.98] That I'm at
[01:10.45] It's dark
[01:12.06] For me
[01:13.32]
[01:13.84] And your trying to tell me
[01:16.31] That you're already past it
[01:19.45] When you say I'm a bastard
[01:22.43] Maybe I already know
[01:24.60]
[01:25.30] Whether it all comes from me I think
[01:29.24] That you could be here in the end
[01:32.23] That I could be what you want
[01:35.38] But that's not how it was yet
[01:37.70]
[01:37.97] What do you want
[01:39.32] I want to feel home
[01:40.83] And where I fall
[01:42.42] It's better shown
[01:43.95] That I could try my best to be clear
[01:47.04] But I don't want to be here
[01:49.57]
[01:49.90] Cause i could depend on what i know
[01:53.15] And i could have had a shot at hope
[01:56.22] And whether it's all you try
[01:58.43] And you know what's next
[01:59.86] Well I don't want to and I don't want this
[02:02.57]
[02:02.91] And you could hang on this
[02:05.74] And watch from beneath
[02:08.87] As I lose grip
[02:11.93] And lose me
[02:14.65]
[02:15.95] Cause you got a lot
[02:17.53] Into me
[02:18.13] And I'll
[02:20.43] Say between
[02:21.33] The place
[02:22.95] That I'm at
[02:24.44] It's dark
[02:26.05] For me
`,
    '1409157146': `[00:00.000] 作词 : 陈梓童/黄子源/Guy James Robin/Madison Love/Samuel Roman
[00:01.000] 作曲 : Madison Love/Guy James Robin/Samuel Roman
[00:02.000] 编曲 : Jonas Blue
[00:03.000] 制作人 : Jonas Blue/Dark Heart
[00:09.868]你向世界宣告
[00:11.937]我们多好
[00:14.280]又让我挂上假笑
[00:16.510]每张合照
[00:18.262]
[00:18.806]你却像一场感冒
[00:21.037]太难治好
[00:23.335]越来越甩不掉
[00:25.648]越抓越牢
[00:27.597]
[00:28.182]我拜托你快走开 别来烦我
[00:30.384]不要再消费彼此暧昧过
[00:32.682]停止你不得安宁的放送
[00:36.083]It's so weird
[00:37.148]
[00:37.448]I see you like a billboard, painted in the sky
[00:41.623]You're everywhere tonight
[00:44.096]You light up like Shanghai at night
[00:46.553]I see you like a billboard, stranger in the night
[00:50.929]Something that reminds me
[00:53.395]You're still living here in my mind
[00:56.125]
[00:56.575]My mind, my mind
[00:58.639]My mind, my mind
[01:00.390]My mind, my mind
[01:02.950]You're still living here in my mind
[01:05.328]
[01:05.517]我们曾经约定过
[01:07.174]让彼此快乐
[01:09.555]你得到你想要的
[01:11.844]却忽略了我
[01:14.176]
[01:14.357]你说你不想要走
[01:16.417]你还在乎我
[01:18.699]如果只是怕寂寞
[01:21.200]不要一错再错
[01:22.843]
[01:23.117]我拜托你快走开 别来烦我
[01:25.808]不要再消费彼此暧昧过
[01:28.039]停止你不得安宁的放送
[01:31.474]It's so weird
[01:32.407]
[01:32.670]I see you like a billboard, painted in the sky
[01:37.037]You're everywhere tonight
[01:39.411]You light up like Shanghai at night
[01:41.848]I see you like a billboard, stranger in the night
[01:46.327]Something that reminds me
[01:48.604]You're still living here in my mind
[01:51.351]
[01:51.654]My mind, my mind
[01:53.453]My mind, my mind
[01:55.664]My mind, my mind
[01:58.157]You're still living here in my mind
[02:00.490]
[02:00.692]I see you like a billboard, painted in the sky
[02:04.794]You're everywhere tonight
[02:07.449]You light up like Shanghai at night
[02:09.698]I see you like a billboard, stranger in the night
[02:13.979]Something that reminds me
[02:16.643]You're still living here in my mind
[02:18.939]
[02:19.099]I see you like a billboard, painted in the sky
[02:23.251]You're everywhere tonight
[02:25.864]You light up like Shanghai at night
[02:27.987]I see you like a billboard, stranger in the night
[02:32.596]Something that reminds me
[02:34.873]You're still living here in my mind
[02:37.855]My mind, my mind
[02:39.561]My mind, my mind
[02:41.900]My mind, my mind
[02:44.323]You're still living here in my mind
[02:47.733] 混音 : Dark Heart
[02:48.447] 母带 : Mike Marsh at The Exchange Mike Marsh Mastering/Devon/England
[02:49.161] 主唱/和声配唱制作人Lead and backing vocal producer: Ruth Ling
[02:49.875] 
[02:50.589] 主唱录音Vocal engineer: Ruth Ling
[02:51.303] 
[02:52.017] Vocals mixed by: Cameron Gower Poole for YMU Group
`,
    '1862884117': `[00:00.000] 作词 : Oluwadamilare Aderibigbe/Prince Omoferi
[00:01.000] 作曲 : Oluwadamilare Aderibigbe/Prince Omoferi
[00:14.180]London (London)
[00:18.685]I'm feelin' vibes on vibes
[00:20.939]I'm a tickin' dynamite
[00:23.436]I'll blow your candle light
[00:25.686]You know I'm just that type
[00:27.429]No, dem fit kill my vibe (no, no)
[00:30.436]Dem no fit kill my vibe
[00:32.686]Dem fit no fit kill
[00:33.685]Dem fit no fit kill
[00:34.929]Dem no fit kill my
[00:36.181]A wise man said "follow the stars"
[00:38.436]There you shall find a piece of advice
[00:40.687]If you hate your enemies, enemies shine
[00:42.940]If you're not a friend of me, enter the light
[00:45.179]'Cause you can never kill my vibe
[00:47.686]Got here with no sacrifices
[00:49.684]Everythin' once takеn, still had to make it
[00:52.436]Vibe killer, mе I no go take shit (ayy)
[00:54.632]Vibe killer, bloody Samaritan
[00:56.887]Protect my energy from your bad aura
[00:59.136]Na my pastor say I be my healer
[01:01.134]Everythin' I desire, I go receive
[01:03.886]My rhythm flow like a river
[01:05.884]If you get yawa, come on, go and sit down
[01:08.134]I go just para
[01:09.386]Comot my jigga
[01:10.388]I go just dey
[01:11.640]Follow my dreams
[01:13.637]I'm feelin' vibes on vibes (I'm feelin' vibes)
[01:15.891]I'm a tickin' dynamite (I'm a tickin' dyn')
[01:18.142]I'll blow your candle light (I'll blow your can')
[01:20.639]You know I'm just that type
[01:22.393]No, dem fit kill my vibe
[01:25.143]Dem no fit kill my vibe
[01:27.385]You no fit kill
[01:28.637]You no fit kill
[01:29.636]You no fit kill my vibe
[01:31.890]I see you watchin' my stories
[01:34.141]I see you gaugin' my lifestyle
[01:36.391]I see you watchin' my movements
[01:38.633]This bad b***h bad everyday
[01:41.387]I no dey look your face
[01:43.384]Bad man bad everyday
[01:45.888]Get on your knees and pray
[01:48.142]'Til you regain your faith
[02:07.893]Vibe killer, bloody Samaritan
[02:09.890]Protect my energy from your bad aura
[02:12.140]Na my pastor say I be my healer
[02:14.137]Everythin' I desire, I go receive
[02:17.132]My rhythm flow like a river
[02:18.883]If you get yawa, come on, go and sit down
[02:21.138]I go just para
[02:22.382]Comot my jigga
[02:23.634]I go just dey
[02:24.886]Follow my dreams
[02:26.883]I'm feelin' vibes on vibes (I'm feelin' vibes)
[02:29.138]I'm a tickin' dynamite (I'm a tickin' dyn')
[02:31.388]I'll blow your candle light (I'll blow your can')
[02:33.642]You know I'm just that type
[02:35.385]No, dem fit kill my vibe
[02:38.388]Dem no fit kill my vibe
[02:40.642]You no fit kill
[02:41.883]You no fit kill
[02:42.885]You no fit kill my vibe
`,
    '1887215867': `[00:00.000] 作词 : FINNEAS
[00:00.011] 作曲 : FINNEAS
[00:00.022]It feels a little medieval if you ask me
[00:04.283]Like I'm watchin' a sequel I've already seen
[00:08.459]I could tell you what happens to the new king
[00:12.704]When he goes out of fashion
[00:15.255]
[00:16.740]I want my money back now-ow
[00:21.001]I've been in the wrong crowd-owd
[00:24.940]I'd never say it out loud-oud
[00:29.175]But I've hated every word that comes out of your mouth
[00:33.249]What should we fight about this time?
[00:37.383]What will you write about this time?
[00:41.555]What does it matter if you're not fine?
[00:45.696]You should've kept that shit offline
[00:49.188]
[00:49.908]It feels a little medieval if you ask me
[00:54.423]Like I'm watchin' a sequel I've already seen
[00:58.415]I could tell you what happens to the new king
[01:02.694]When he goes out of fashion
[01:06.683]It feels a little medieval kissin' the ring
[01:10.966]In a gothic cathedral, have you ever seen
[01:15.499]What really happens to people like me
[01:19.413]When we go out of fashion?
[01:22.490]
[01:23.391]They're gonna tear you from your pedestal, it's almost inevitable
[01:28.441]I'm not bein' cynical, it's so unoriginal
[01:32.322]If you get political, they'll make you a criminal
[01:36.490]It's all a bit biblical
[01:40.058]Don't put your camera down
[01:44.144]You don't go to heaven in a crown
[01:48.222]It's not worth the money bringin' me back from the dead
[01:56.742]I never said it would be any fun
[02:01.084]You never should've trusted anyone
[02:06.106]They'll love you til' they know you're done
[02:09.449]And then it's off with his head
[02:13.331]
[02:13.484]It feels a little medieval if you ask me
[02:17.895]Like I'm watchin' a sequel I've already seen
[02:21.880]I could tell you what happens to the new king
[02:26.203]When he goes out of fashion
[02:30.051]It feels a little medieval kissin' the ring
[02:34.446]In a gothic cathedral, have you ever seen
[02:39.004]What really happens to people like me
[02:42.830]When we go out of fashion?
`,
    '1979192239': `[00:00.000] 作词 : Samuel Ock
[00:00.005] 作曲 : Samuel Ock
[00:00.010] You don't have to do anything
[00:07.386] I still want your love
[00:15.719] You don't have to be anything
[00:22.262] Just your love is enough
[00:31.213] You don't have to do anything
[00:37.704] I'm still gonna love you
[00:46.190] And you don't have to be anyone
[00:53.213] I'm still gonna want you
[00:58.366]
[01:32.342] I just want
[01:36.312] I just want
[01:40.130] I just want
[01:43.841] I just want you
[01:47.848]
[01:47.851] I just want
[01:51.432] I just want
[01:55.352] I just want
[01:59.249] I just want you
[02:02.564]
[02:03.123] You don't have to do anything
[02:09.985] I still want your love
[02:18.531] You don't have to be anyone
[02:25.170] You are all you're enough
[02:33.987] We don't have to do anything
[02:41.165] I'm still gonna love you
[02:49.128] And we don't have to go anywhere
[02:56.001] I'm just glad that I'm with you
[03:01.143] (With you)
[03:04.622]
[03:04.642] I just want
[03:08.328] I just want
[03:12.061] I just want
[03:15.939] I just want you
[03:19.141]
[03:19.932] I just want (I just want)
[03:23.706] I just want (I just want)
[03:27.802] I just want (I just want)
[03:31.418] I just want you
[03:35.418]
[03:35.461] I just want (I just want)
[03:39.184] I just want (I just want)
[03:42.967] I just want (I just want)
[03:46.763] I just want you
[03:49.788]
[03:50.641] I just want (I just want)
[03:54.274] I just want (I just want)
[03:58.296] I just want (I just want)
[04:02.066] I just want you
[04:05.441]
[04:06.053] You don't have to do anything
[04:13.338] You don't have to do anything
[04:21.376] You don't have to do anything
[04:28.858] You are enough
[04:36.872] You don't have to be anyone
[04:44.586] You don't have to go anywhere
[04:48.744] Nowhere
[04:52.115] You don't have to do anything
[04:59.265] You are enough
`,
    '1990208030': `[by:SKT_FlockaFlame]
[00:08.716]Andrevibez 制作
[00:10.309]
[00:12.166]
[00:14.560]
[00:20.079]我是懂她的 她从不多言语
[00:22.742]但她体内的那股野性正渐渐苏醒
[00:24.863]闺蜜们也不喜欢早出晚归的生活啊
[00:27.254]但为了能生活得更好点 我们别无选择
[00:29.909]这事儿还没完呢 他们还想找我们茬
[00:32.039]就算他们加足马力 依旧追不上火力全开的我
[00:34.421]我不会把自己装成白莲圣母
[00:36.812]你也没必要���装去爱慕我们
[00:40.004]我可没时间跟黑粉纠缠 也没时间在社媒上散发负能量
[00:42.656]向“钱”看齐 一心扑在利润上
[00:44.789]让你如同Poco Lee般翩翩起舞（Poco Lee：尼日利亚著名舞者）
[00:47.179]花花绿绿的钞票 如同新鲜的西兰花
[00:49.297]一步一个脚印 无视贱婢们在后面嚼舌根
[00:52.228]权当是我的幻想罢了
[00:54.346]他们都在等着看我出糗
[00:57.535]但我岂能这么容易满足他们？
[00:58.870]我现在一切安好 0负面新闻
[01:00.190]我的生活如此多姿多彩
[01:00.988]神父眷顾着我 百万票子滚滚来
[01:03.854]这丰厚财富触手可得
[01:06.986]我岂能这么容易满足他们？
[01:08.306]我现在一切安好 0负面新闻
[01:09.376]我的生活如此多姿多彩
[01:10.700]不搞乱七八糟的炒作 每个人都爱慕着我
[01:13.558]和我们出街起耍 我保证你不会无聊
[01:17.272]
[01:19.402]
[01:21.783]
[01:26.304]飞去加纳度过美好时光
[01:28.959]你还未谙世事 就别装的很老成了
[01:31.614]你懂得 见过世面的女人不好惹
[01:34.004]别把男人看太重 姐就是女王自信放光芒
[01:36.126]你永远夺不走我现在的成就
[01:41.709]你数不清我的恩典
[01:43.566]从不被规则禁锢 我自成一派
[01:46.754]我可没时间跟黑粉纠缠 也没时间在社媒上散发负能量
[01:49.943]向“钱”看齐 一心扑在利润上
[01:52.064]让你如同Poco Lee般翩翩起舞（Poco Lee：尼日利亚著名舞者）
[01:54.455]花花绿绿的钞票 如同新鲜的西兰花
[01:56.585]一步一个脚印 无视贱婢们在后面嚼舌根
[01:59.240]权当是我的幻想罢了
[02:01.634]他们都在等着看我出糗
[02:04.822]但我岂能这么容易满足他们？
[02:05.881]我现在一切安好 0负面新闻 我的生活是如此多姿多彩
[02:08.275]神父眷顾着我 百万票子滚滚来
[02:11.191]这丰厚财富触手可得
[02:14.328]我岂能这么容易满足他们？
[02:15.388]我现在一切安好 0负面新闻 我的生活是如此多姿多彩
[02:17.778]不搞乱七八糟的炒作 每个人都爱慕着我
[02:20.697]和我们出街起耍 我保证你不会无聊
[02:23.886]因为我岂能这么容易满足他们？
[02:25.218]我现在一切安好 0负面新闻
[02:26.276]我的生活是如此多姿多彩
[02:27.339]神父眷顾着我 百万票子滚滚来
[02:30.266]这丰厚财富触手可得
[02:33.644]我岂能这么容易满足他们？
[02:34.704]我现在一切安好 0负面新闻
[02:36.833]不搞乱七八糟的炒作 每个人都爱慕着我
[02:40.025]和我们出街起耍 我保证你不会无聊
`,
    '2025068890': `[00:00.000] 作曲 : Lee Sullivan
[00:00.526] 编曲 : Jasmine Rodgers
[00:01.052]And you don't seem to understand
[00:06.074]A shame you seemed an honest man
[00:11.097]And all the fears you hold so dear
[00:16.372]Will turn to whisper in your ear
[00:21.395]And you know what they say might hurt you
[00:23.906]And you know that it means so much
[00:26.669]And you don't even feel a thing
[00:31.941]I am falling, I am fading
[00:37.346]I have lost it all
[00:42.340]And you don't seem the lying kind
[00:47.360]A shame then I can read your mind
[00:52.382]And all the things that I read there
[00:57.652]Candle lit smile that we both share
[01:02.674]And you know I don't mean to hurt you
[01:05.436]But you know that it means so much
[01:07.946]And you don't even feel a thing
[01:12.970]I am falling, I am fading
[01:18.307]I am drowning
[01:21.044]Help me to breathe
[01:23.556]I am hurting,I have lost it all
[01:28.583]I am losing
[01:31.341]Help me to breathe
[02:15.103]I am falling, I am fading
[02:20.376]I am drowning
[02:23.138]Help me to breathe
[02:25.146]I am hurting,I have lost it all
[02:30.689]I am losing
[02:33.178]Help me to breathe
[02:56.531]I am falling, I am fading
[03:01.557]I am drowning
[03:04.321]Help me to breathe
[03:06.836]I am hurting,I have lost it all
[03:11.861]I am losing
[03:14.371]Help me to breathe
`,
    '2059084604': `[00:00.000] 作词 : Lorenzo Spadoni
[00:00.000] 作曲 : Lorenzo Spadoni
[00:00.000][Chorus]
[00:00.017]Please don’t say goodbye, goodbye, goodbye
[00:04.365]And my heart keeps coming back
[00:08.973]I don’t wanna cry, no cry, no cry
[00:15.162]I don’t wanna say goodbye
[00:19.271]Woah oh, woah oh, woah oh
[00:19.622]
[00:20.224][Verse]
[00:21.380]Said goodbye but she’s much too late
[00:24.708]Got a girl now and I’m finally straight
[00:27.160]Gotta go, don’t run up on my way
[00:29.896]Nothing down low, I was down so strange
[00:32.661]Don’t ever go, I wanna give you all my world
[00:36.956]I wanna give everything that I meant to provide
[00:43.943]Toodoodoo
[00:44.290]This girl goes down, goes down
[00:45.913]Goes down, down, down
[00:47.316]Goes down
[00:50.098]Oh, ooh
[00:52.005]No good, bae
[00:54.255]Good baby, bae
[00:56.473]Good bae
[00:58.678]Yeah, yeah, yeah
[01:00.084]Woah oh, woah oh oh
[01:03.098]Danananana
[01:05.880]Nanana
[01:06.724]Allowed to say goodbye if I’m gonna cry
[01:08.958]But I know-
[01:09.959]But I know that I should go
[01:11.130]But I know that I should go
[01:12.239]I maybe finding that [?]
[01:13.974]I’ll maybe find another [?]
[01:15.113]Just wanna go inside my home
[01:17.584]And I got a good house like Jerome
[01:20.561]And I don’t wanna show out like a [?]
[01:22.991]And I don’t know but slow how I wanna go
[01:25.504]I wanna go, girl, I wanna go, go, go
[01:27.958]I wanna toodoodoodoo
[01:30.927]Toodoodoodoo
[01:31.519]Toodoodoo
[01:32.428]Ramanama
[01:34.895]Tadada
[01:35.490]Tada dadada
[01:38.786]Tada dada
[01:40.741]Tada dadada
[01:44.051]Tada dada
`,
    '2084376965': `[00:00.00] 作词 : 江上青山JasonYama
[00:00.00] 作曲 : 江上青山JasonYama
[00:00.00] 编曲 : 江上青山JasonYama
[00:00.00] 出品 : 网易电波
[00:01.76]The Crown In The Clouds
[00:00.00] 
[00:40.04]You just walk like a king
[00:42.58]You just move like a king
[00:44.67]You just talk like a king
[00:46.96]Take it ！！your crown
[00:00.00] 
[00:49.53]You just eat like a king
[00:51.91]You just sleep like a king
[00:54.25]You just dance like a king
[00:56.58]Treasure your crown
[00:00.00] 
[00:58.43]Someone kisses your crown
[01:03.14]Someone who likes just the way you are
[01:07.42]Someone kisses your crown
[01:12.56]Someone who likes just the way you are
[00:00.00] 
[01:36.17]给我一些crazy
[01:38.47]I just wanna little bit lazy
[01:40.77]有好多事情天注定 那也不一定
[01:43.18]那我又何必去关心
[01:46.03]I just like to study in my life
[01:50.70]take it the crown you must be good
[01:53.14]take it the crown you must be cool
[00:00.00]
[01:55.49]Someone kisses your crown
[01:59.97]Someone who likes just the way you are
[02:04.32]Someone kisses your crown
[02:09.06]Someone who likes just the way you are
[00:00.00]
[02:13.82] 企划 : 邓泽西
[02:14.82] 营销 : Fendi / 阿油ayu
[02:15.82] 出品人 : Dylan刘勇
`,
    '2093480642': `[00:00.000] 作曲 : Evan Miles/Dom Dias
[00:11.232] The other side, yeah
[00:19.864] Oh yeah, let's go
[00:24.396]
[00:25.476] They always told me I should leave her alone
[00:31.516] The type of woman use your love and be gone
[00:37.476] Word on the street is that she’s heard about me
[00:43.496] They said I'll see
[00:46.247]
[00:46.456] Whatever she wants
[00:49.736] She can get
[00:52.247] If you don't believe me
[00:55.697] You haven’t met her yet
[00:58.257] Started with one look
[01:02.219] In her deep brown eyes
[01:05.429] Woulda lived a thousand livеs
[01:09.152] Just to get
[01:10.891]
[01:11.071] My hands on you
[01:17.011] I fell into
[01:23.195] This spell you do
[01:29.067] Girl I'm right bеhind
[01:31.770] See what's on the other side
[01:37.345]
[01:37.734] She looked at me like I was nothing but prey
[01:43.565] My mind said leave her but my body betrayed
[01:49.494] To think my baby's all alone in our bed
[01:54.465] I said I was wrong, I know
[01:58.196]
[01:58.356] Whatever she wants
[02:01.896] She can get
[02:04.196] If you don't believe me
[02:07.807] You haven't met her yet
[02:10.208] Started with one look
[02:14.208] In her deep brown eyes
[02:17.370] By the time I realized
[02:21.206] Girl I had
[02:23.056]
[02:23.216] My hands on you
[02:27.319] (I don't care what they say)
[02:29.107] I fell into
[02:33.120] (I would risk it all tonight)
[02:35.036] This spell you do
[02:39.321] (Somethin' about ya)
[02:40.906] Girl I’m right behind
[02:43.766] Don’t care if I don't survive
[02:48.029]
[02:48.218] Give it up, all to me
[02:50.240] Give it up, give it all, all to me (Give it up)
[02:54.006] And we touch and we ****, all to me (That’s right)
[02:56.629] Give it up, get it down, all (Oh, yeah)
[03:00.209] Beat it up, over me
[03:02.751] Beat it up, let it cum, over me
[03:05.141] Girl I'm right behind
[03:07.611] See what's on the other side
`,
    '2122825009': `[00:00.000] 作曲 : Alex Borel/Caleb Hearn/Rosaileen Scher
[00:03.787]Ooo ooo
[00:10.696]Ooo ooo
[00:15.993]I met somebody, selfless and kind
[00:19.484]She’s got a smile even when she isn't fine
[00:22.975]She can be hurting but she's got enough love to fill up Tennessee
[00:29.956]I met somebody, stays up at night
[00:33.486]I see her worry and she sees all of mine
[00:36.973]I met somebody, she really loves me, says I’m all she needs
[00:44.698]And I grew up thinking I would have to
[00:51.841]Fight all of this alone
[00:59.693]But now you hold me in the darkness
[01:02.379]Hold me ’til it hurts less you
[01:07.592]Tell me that I’m alright
[01:09.355]Show me where the light shines through
[01:14.622]Please stay love me through the weather
[01:18.112]Please say this will be forever
[01:21.643]Hold me in the darkness
[01:23.411]Even when it’s hard with you
[01:26.463]It’s a little bit, little bit better
[01:34.865]I met somebody, gentle and smart
[01:38.315]He underestimates the size of his heart
[01:41.808]He can be laughing but he’s got enough pain to fill up New York City
[01:48.831]I met somebody, so full of scars
[01:52.285]The worlds on his shoulders but he won’t fall apart
[01:55.778]I met somebody, he really loves me, says I'm all he needs
[02:03.648]And I grew up thinking I would have to
[02:10.667]Fight all of this alone
[02:18.622]But now you hold me in the darkness
[02:21.232]Hold me ’til it hurts less you
[02:26.489]Tell me that I’m alright
[02:28.260]Show me where the light shines through
[02:33.472]Please stay, love me through the weather
[02:36.962]Please say this will be forever
[02:40.494]Hold me in the darkness
[02:42.225]Even when it’s hard with you
[02:45.356]It’s a little bit, little bit better
[02:48.485]Ooo ooo(a little bit, little bit)
[02:55.423]Ooo ooo
[03:01.646]And I grew up thinking I would have to
[03:08.506]Fight all of this alone
[03:16.404]But now you hold me in the darkness
[03:19.052]Hold me ’til it hurts less you
[03:24.269]Tell me that I’m alright
[03:26.034]Show me where the light shines through
[03:31.298]Please stay love me through the weather
[03:34.754]Please say this will be forever
[03:38.290]Hold me in the darkness
[03:40.052]Even when it’s hard with you
[03:43.110]It’s a little bit, little bit better
`,
    '2149062755': `[00:00.000] 作词 : Jacob Ray/Nicole Chng
[00:01.000] 作曲 : Jacob Ray/Nicole Chng
[00:13.034] Eighteen, we were undergrads
[00:15.418] Stayed out late, never made it to class, uh
[00:18.966] Outer Richmond in a taxi cab
[00:21.576] You were sweatin' bullets on the way to my Dad's
[00:24.527] And oh, you said, "Baby, think we're movin' too fast!"
[00:31.427]
[00:37.328] And I swear the magnolias flashed a smile (Flashed a smile)
[00:48.529] And that's when I caught me hopin' you'd stay a while (Stay a while)
[01:01.278]
[01:01.428] Baby, I'd give up anything to travel inside your mind
[01:07.258] Baby, I fall in love again come every summertime
[01:13.118] My daddy taught me to choose 'em wisely but you don't have to try
[01:19.450] 'Cause, baby, I fall in lovе every summertimе
[01:24.679]
[01:25.835] Twenty-five, man we're missin' church
[01:28.346] Laugh 'bout everyone we're hatin' at work
[01:31.481] Dinner with your sister and the jokes kinda hurt
[01:34.296] Cry the way home and you're puttin' me first, oh
[01:40.872] Yeah, you just always know what to say
[01:46.207]
[01:50.373] We're strolling down the boulevard, and dancing under streetlights (Oh, the lights)
[02:02.611] Every year we get older and I'm still on your side (Oh, I)
[02:13.984]
[02:14.184] Baby, I'd give up anything to travel inside your mind
[02:20.016] Baby, I fall in love again come every summertime
[02:26.043] My daddy taught me to choose 'em wisely but you don't have to try
[02:32.114] 'Cause, baby, I fall in love every summertime
[02:38.574]
[02:38.733] Every day is summertime
[02:41.333] Every day is summertime
[02:44.324] Every day is summertime with you
[02:50.325] Every day is summertime
[02:53.344] Every day is summertime
[02:56.405] Every day is summertime with you
`,
    '2149780504': `[00:00.000] 作词 : Christian Blair/Richard Okamoto/bradley au/Stephen Carlier
[00:00.953] 作曲 : Christian Blair/Richard Okamoto/bradley au/Stephen Carlier
[00:01.907]intentions - Starfall
[00:15.363]What's your intentions, baby?
[00:17.589]Do I drive you crazy?
[00:19.516]Have you been honest lately?
[00:21.478]Do you mind me sayin' "I don't know how to feel?"
[00:25.576]Is this love even real? I don't know
[00:30.554]No, I don't want to be alone, it's making me sentimental
[00:35.039]The feelings I can't control, it always just ****s with my mental
[00:39.083]It's only you that knows, I guess that you're somebody special
[00:43.595]But I don't know, girl, I don't know-ooh-woah
[00:48.320]Lately, I feel like I'm too attached, we're stuck in the moment
[00:52.321]Not thinking 'bout how we move too fast
[00:55.030]But I kinda like it this way
[00:57.040]Who gives a **** what they say?
[00:59.504]It's you and me right now, baby (No-woah)
[01:04.227]Can't even think, I've been losing track, I'm stuck in the middle
[01:08.195]Start thinking 'bout how you do me like that
[01:11.070]But I kinda like it this way
[01:13.025]Who gives a **** what they say?
[01:15.478]It's you and me right now, baby, uh-huh
[01:20.620]What you doing? (What you doing?)
[01:22.423]And where you've been? (Where you've been?)
[01:24.335]Did I miss a text back? Are you with your friends?
[01:27.877]Could you tell me where you are? Don't stay too far
[01:31.989]You know that I won't trip 'bout the time-ime
[01:36.007]Close to nine, oh, please, don't dim the lights
[01:39.337]Can we just talk about it over at my place?
[01:43.348]And baby, stay the night, oh, let me make it right
[01:47.410]And let me tell you what I wanted from that day, yeah, yeah
[01:52.334]Lately, I feel like I'm too attached, we're stuck in the moment (Ooh-ooh)
[01:56.334]Not thinking 'bout how we move too fast (Oh, oh-oh)
[01:58.918]But I kinda like it this way (Yeah)
[02:01.100]Who gives a **** what they say? (Yeah, yeah)
[02:03.495]It's you and me right now, baby (No-woah)
[02:08.264]Can't even think, I've been losing track, I'm stuck in the middle (Uh-huh)
[02:12.251]Start thinking 'bout how you do me like that
[02:15.009]But I kinda like it this way (Ooh)
[02:17.061]Who gives a **** what they say?
[02:19.474]It's you and me right now, baby (Ooh)
[02:22.432]So, baby, tell me, would you know?
[02:24.582](Would you notice me if I fell apart?)
[02:27.381]Oh, would you know?
[02:28.407](Would you notice me if I fell apart?)
[02:31.457]I might be over it all, oh, could you look at me?
[02:34.993]Think I might be getting withdrawals, why can't you look at me?
[02:38.651]So, baby, tell me, would you know?
[02:40.491](Would you notice me if I fell apart?)
[02:42.557]I can't get enough, oh, would you know?
[02:44.470](Would you notice me if I fell apart?)
[02:46.028]I can't get enough of you
[02:47.614]I might be over it all, oh, could you look at me?
[02:50.980]Think I might be getting withdrawals, why can't you look at me, baby?
[02:56.280]Lately, I feel like I'm too attached, we're stuck in the moment
[03:00.298]Not thinking 'bout how we move too fast
[03:02.859]But I kinda like it this way
[03:05.011]Who gives a **** what they say?
[03:07.452]It's you and me right now, baby (Yeah, yeah)
[03:10.527]('Cause you're still on my mind)
[03:12.338]Can't even think, I've been losing track, I'm stuck in the middle
[03:16.244]Start thinking 'bout how you do me like that
[03:18.949]But I kinda like it this way
[03:21.044]Who gives a **** what they say?
[03:23.456]It's you and me right now, baby, uh-huh
`,
    '2626680545': `[00:00.000] 作词 : ZVC/Nick Jonas/JVKE/Andrew Fortier/Kevin Jonas/Joe Jonas
[00:01.000] 作曲 : ZVC/Nick Jonas/JVKE/Andrew Fortier/Kevin Jonas/Joe Jonas
[00:04.022] Seventeen
[00:05.993] I had my first heartbreak and it was terrible
[00:08.519] And I pray that it won’t happen again
[00:10.448] But then again I hope it does
[00:12.215] Because I wanna fall in love
[00:13.800] Without the part where we give up
[00:15.530] I wonder if this still exists
[00:17.183] I hope it does
[00:18.296]
[00:18.330] I wonder what it’s like
[00:20.714] How it feels to be loved by someone who’ll never leave
[00:24.344] I wanna know if you wanna be growing old with me
[00:27.690]
[00:27.713] Until were
[00:28.796] Seventy
[00:32.202] Dancing with me
[00:35.049] Just passing the time
[00:37.865] With you right by my side
[00:41.357] Just stay with me
[00:44.238] Promise you’ll never leave
[00:48.176] I wanna love you for the rest of my life
[00:53.526] Until were seventy
[00:57.118]
[01:03.654] Baby I’m so into you
[01:05.416] I’ve lived a thousand lives
[01:07.034] Can’t go a single night
[01:08.619] Without you
[01:09.855] You’re more than a feeling
[01:12.584] I think I’m ready for the real thing, yeah
[01:15.737] And I want that love
[01:17.025] That typa love
[01:18.091] That’s steady
[01:18.988] Them kitchen hugs
[01:20.183] Sentimental stuff
[01:21.346] You get me
[01:22.083] Everything I want and need (Everything I want and need)
[01:25.165] I find it here with you and me, yeah
[01:28.629]
[01:29.214] I wonder what it’s like
[01:31.397] How it feels to be loved by someone who’ll never leave
[01:35.220] I wanna know if you wanna be growing old with me
[01:38.460]
[01:38.624] Until were
[01:39.558] Seventy
[01:43.059] Dancing with me
[01:45.923] Just passing the time
[01:48.613] With you right by my side
[01:52.204] Just stay with me
[01:55.126] Promise you’ll never leave
[01:59.082] I wanna love you for the rest of my life
[02:04.468] Until were seventy, oooh
[02:11.943]
[02:12.182] I wanna love you for the rest of my life
[02:17.228] Until were seventy
[02:20.989] Promise you’ll never leave
[02:24.976] I wanna love you for the rest of my life
[02:30.111] Until were seventy
`,
    '2638616976': `[00:00.000] 作词 : wifi skeleton
[00:00.349] 作曲 : wifi skeleton
[00:00.698]I'm not tryna ruin your fun
[00:02.645]You're just a little bit late, I guess you're already done
[00:07.317]There's this feeling I can't shake 'cause I'm too dumb
[00:10.813]I'm never doing the right thing so I'm so stuck
[00:15.188]If you see me in America I might say "Hi"
[00:18.749]But if you meet me out in Europe I'm a talkative guy
[00:23.142]Maybe we'll talk over scones around lunch some time
[00:27.173]And I've never been to France so it might be nice
[00:31.212]But I can't take this paparazzi, geez
[00:34.829]It's like the camera's always out and always starin' at me
[00:38.897]And if I say the wrong thing, they'll cut my tongue 'til it bleeds
[00:42.950]Always whippin' out their pitchforks when you try to speak
[00:47.264]But that couldn't be me
[00:49.008]Next day I'm walkin' the road
[00:50.751]Kickin' rocks, it's my fault
[00:52.651]My life's the worst story told, I'll be this way 'til I'm old
[00:56.754]I rip a page out the book, I'm just so misunderstood
[01:00.651]I always think about her, and when my life felt good
[01:04.781]I smoked a cig on the porch
[01:06.806]It doesn't help me at all, I wonder, what's it all for?
[01:10.812]Is this the girl I adored and I know I can't afford
[01:14.748]Watchin' her walk out the door so I keep it to myself, and keep my feet on the floor
`,
    '2643514137': `[00:00.000] 作词 : Carpetman
[00:01.000] 作曲 : Carpetman
[00:02.128]oh～oh～oh
[00:06.927]oh～oh～oh
[00:15.708]what if I gonna say
[00:17.464]that you were wrong
[00:19.224]about yourself and who are you at all
[00:22.539]Perhaps you'll say that
[00:24.050]"I AM" outta my mind
[00:26.308]But then you will think about it all night
[00:30.321]What if I'm gonna say
[00:31.826]We are the same
[00:33.837]But just forgot how we get into this game
[00:37.601]What if I'm gonna say that
[00:39.377]You were fooled
[00:41.196]But let me ask
[00:42.738]What does it mean to you?
[00:57.787]...doesn't mean to you?
[01:05.313]Diggity boom
[01:12.377]What does it mean to you?
[01:20.154]Wakey - Wakey
[01:26.678]The biggest joke is
[01:27.455]What it means to you
[01:42.287]This circle is endless, amigo
[01:46.048]Tell it tell to your lying friend
[01:47.556]Whose name is "Your Ego"
[01:49.354]We're able to create a hell
[01:51.434]And destroy it as well
[01:52.938]When I've been talking to myself
[01:55.520]...learned The Spell
[01:57.024]How do you know if you're dreaming?
[01:58.532]So many answers have been hidden
[02:00.317]It might shoot whith a God damn feeling
[02:02.072]But this knowledge is forbidden
[02:04.329]Cause there's no profit in the freedom
[02:05.835]Of slaves for the "leader"
[02:07.842]So the shadow of delusion
[02:09.598]Only gets bigger
[02:11.608]What if there's no "me"?
[02:13.666]And there's no "you"
[02:15.424]My kingdom's empty and free
[02:16.929]But I've been blind too
[02:18.688]What if there's no "me"?
[02:20.694]Aah too many words
[02:22.703]Are going through...
[02:23.766]But I'm curious, Human
[02:25.606]So could you tell me
[02:26.609]What it means to you?
[02:41.171]Hahahaha
[02:48.870]Diggity boom
[02:55.645]What does it mean to you?
[03:03.670]Wakey - Wakey
[03:09.951]The biggest joke is
[03:10.698]What it means to you
[03:12.472]Oh~ oh~ oh
[03:24.766]The biggest joke is
[03:25.521]What it means to you
`,
    '2668934341': `[00:00.000] 作词 : Dave Bayley
[00:01.000] 作曲 : Dave Bayley
[00:31.225] When I was young and stupid
[00:33.934] My love left to be a rock and roll star
[00:39.183] He told me, "Please don't worry"
[00:42.294] Wise little smile that spoke so safely
[00:46.645] He booked a one-way ticket
[00:50.389] Out west, that's where they make it
[00:54.114] Six kids stuck in a bedsit
[00:57.803] To sunswept poolside riches
[01:08.655] He met a girl who wore Versace
[01:12.474] Pink feather coats and jumbo jewelry
[01:16.609] Gonna be a hoop phenomenon
[01:19.950] He's gonna be Hakeem Olajuwon
[01:24.162] He's got a gold Camaro
[01:27.825] He said over the payphone
[01:31.662] I try and keep my cool but
[01:35.444] My life turns in slow motion
[01:38.629] Bye-bye, baby blue
[01:41.530] I wish you could see the wicked truth
[01:45.228] Caught up in a rush, it's killing you
[01:48.802] Screaming at the sun you blow into
[01:52.612] Curled up in a grip when we were us
[01:56.497] Fingers in a fist like you might run
[02:00.000] I settle for a ghost I never knew
[02:03.968] Super paradise I held on to
[02:07.343] But I settle for a ghost
[02:16.119] Where I was from, in NOLA
[02:18.909] No one left to be a rock and roll star
[02:24.227] He'd stay and treat his lady
[02:27.451] Give everything to his new baby
[02:31.678] I miss him, don't you blame me?
[02:35.375] That boy went stone cold crazy
[02:39.089] Caught up in camera lust, he's
[02:42.888] Chasing that pappy pipe dream
[03:16.625] I know you don't, but I
[03:20.397] I know you don't, but I still try
[03:24.191] My thunder shook him down
[03:27.903] My thunder came and shook him down
[03:31.687] That girl is gone, but I
[03:35.419] That girl is gone, but I still try
[03:39.221] I think it's over now
[03:42.925] The bullet hit but maybe not
[03:46.703] I feel so ****ing numb
[03:50.431] It hits my head and I feel numb
[03:54.152] My body's looking wrong
[03:57.798] My body's looking wrong
[04:01.591] My body's looking wrong
[04:04.891] Bye-bye, baby blue
[04:07.723] I wish you could see the wicked truth
[04:11.440] Caught up in a rush, it's killing you
[04:15.124] Screaming at the sun you blow into
[04:18.961] Curled up in a grip when we were us
[04:22.727] Fingers in a fist like you might run
[04:26.261] I settle for a ghost I never knew
[04:30.136] Super paradise I held on to
[04:33.567] But I settle for a ghost
`,
    '2673161004': `[00:00.000] 作词 : Jeff Jarvis
[00:01.000] 作曲 : Jeff Jarvis
[00:09.268]Would you be my girl
[00:10.835]Would you be my girl
[00:12.849]The ring upon your finger's worth a fortune
[00:14.751]But it doesn't matter
[00:16.317]He don't love you
[00:17.884]He don't love you
[00:19.059]And I know you went to Paris
[00:20.234]When he asked for your hand but
[00:22.583]He don't love you
[00:24.378]He don't love you
[00:25.774]I will give you something that no other man could
[00:28.474]When love is for real you know it feels so good
[00:31.860]It's hard to walk away now
[00:33.381]But it's gonna get worse
[00:35.057]Just cancel the wedding and come with me
[00:37.752]Sweet baby
[00:40.367]Understand me
[00:41.935]I feel the pressure to
[00:43.224]Let the man marry me
[00:44.790]But deep down in my heart
[00:47.167]It's you I want
[00:49.396]It's you I want
[00:51.022]You keep on driving me crazy
[00:54.304]Girl let me off the hook tell me
[00:57.436]Said you need time
[00:58.743]But I wanna know now
[01:00.962]Would you be my girl
[01:02.528]Would you be my girl
[01:03.311]I am so mad about you boy
[01:06.117]It's hard to be your friend when I want more
[01:09.485]I think about it seven and twenty-four
[01:12.731]It's what I want
[01:13.493]Would you be my girl
[01:15.060]Would you be my girl
[01:18.976](yeah~yeah~oh yeah~~)
[01:28.375]Come on
[01:29.158]I fell in love the second that I laid my hands on you I said
[01:33.074]Let me love you
[01:34.581]Let me love you
[01:35.816]But everybody told me I was wasting my time that
[01:39.387]I shouldn't love you
[01:41.155]I shouldn't love you
[01:42.663]But I will give you something that no other man could
[01:45.598]When love is for real you know it feels so good
[01:48.772]It's hard to walk away now
[01:50.134]But it's gonna get worse
[01:51.754]Just cancel the wedding and come with me
[01:55.396]Sweet baby
[01:57.288]Understand me
[01:58.635]I feel the pressure to
[02:00.053]Let the man marry me
[02:01.455]But deep down in my heart
[02:03.989]It's you that I want
[02:06.424]It's you that I want
[02:07.963]You keep on driving me crazy
[02:11.061]Girl let me off the hook tell me
[02:14.297]Said you need time
[02:15.566]But I wanna know now
[02:17.327]Would you be my girl
[02:19.145]Would you be my girl
[02:20.655]I am so mad about you boy
[02:22.695]It's hard to be your friend when I want more
[02:26.228]I think about it seven and twenty-four
[02:29.061]It's what I want
[02:30.591]Would you be my girl
[02:32.180]Would you be my girl
[02:33.642]It's hard to be in between
[02:36.427]Love can hurt so easily
[02:39.625]You're all I want
[02:41.441]And all I need
[02:42.939]Girl I need you to be mine
[02:46.307]You keep on driving me crazy
[02:49.451]Girl let me off the hook tell me
[02:52.720]Said you need time
[02:54.316]But I wanna know now
[02:56.097]Would you be my girl
[02:57.181]Would you be my girl
[02:58.447]I am so mad about you boy
[03:01.355]It's hard to be your friend when I want more
[03:04.414]I think about it seven and twenty-four
[03:07.303]It's what I want
[03:09.073]Would you be my girl
[03:10.386]Would you be my girl
[03:11.788]You keep on driving me crazy
[03:15.198]Girl let me off the hook tell me
[03:18.273]Said you need time
[03:19.594]But I wanna know now
[03:21.629](Someone you know now)Would you be my girl
[03:23.119]Would you be my girl
[03:24.293]I am so mad about you boy
[03:27.220]It's hard to be your friend when I want more
[03:29.947]I think about it seven and twenty-four
[03:33.155]It's what I want
[03:35.022]Would you be my girl
[03:35.917]Would you be my girl
[03:37.591](you you woo~would you be my girl~on yeah~)
`,
    '3317235944': `[00:00.000] 作词 : JVKE/ZVC
[00:01.000] 作曲 : JVKE/ZVC
[00:06.296]Hold me close
[00:08.445]Look me dead in my eyes
[00:09.711]Dead in my eyes
[00:11.742]Till the day that I die
[00:13.228]Dead inside
[00:15.162]I just wanna feel alive
[00:16.371]With you, I'm alive
[00:18.479]With you, I'm alive
[00:19.654]Fell in love, but it left me lonely
[00:22.891]Tried to trust, but it burned me slowly
[00:26.826]I didn't know what I was looking for
[00:30.325]Till I found her
[00:38.026]I found her
[00:44.876]Without her
[00:46.924]I'm a mess, there was nothing 'bout that love that made sense, I was stressed
[00:51.219]Till I found her
[00:56.387]
[00:59.734]Found me lonely, lost, and only
[01:03.046]One step away from just giving up slowly
[01:06.411]I was a mess, I was afraid
[01:07.825]I'd be the girl who just put up her walls no one could break
[01:12.120]Till I found him
[01:13.637]Running through the wild with 1/2 of a heart
[01:16.265]Made me a whole one out of the parts
[01:19.629]Suddenly, it's like I'm healed
[01:21.227]Didn't know the love was real
[01:23.078]Until I could
[01:26.218]
[01:26.370]Hold you close (Hold me close)
[01:28.512]Look me dead in my eyes
[01:29.646]Dead in my
[01:31.952]Till the day that I die
[01:33.003]Dead inside
[01:35.259]I just wanna feel alive
[01:36.538]With you, I'm alive
[01:38.736]With you, I'm a—
[01:39.710]Fell in love, but it left me lonely
[01:42.869]Tried to trust, but it burned me slowly
[01:46.813]I didn't know what I was looking for
[01:50.363]Till I found her
[01:57.983]I found her
[02:04.498]Without her
[02:06.790]I'm a mess, there was nothing 'bout that love that made sense, I was stressed
[02:11.024]Till I found her
[02:17.147]
[02:17.261]And without her
[02:20.598]I'm a mess, there was nothing 'bout that love that made sense, I was stressed
[02:24.300]Till I found her
[02:30.710]Till I found her
[02:38.165]Ooh
`,
    '3343637146': `[00:00.000] 作词 : suhmeduh
[00:01.000] 作曲 : suhmeduh
[00:02.000] 编曲 : suhmeduh
[00:06.870]Six seven eight triple nine eight two one
[00:12.270]two one two one
[00:12.570]nine eight two one two one two one
[00:14.760]nine eight two one
[00:22.050]Hello, no one is available to take your call
[00:34.830]please leave a message after the tone.
[00:37.500]Six seven eight triple nine eight two one
[01:41.370]Baby, you know that I miss you
[01:46.170]I wanna get with you
[01:46.770]TonightbutIcan't now baby girl
[01:47.640]Andthat's the issue
[01:47.820]Girl you know I miss you
[01:51.510]I just wanna kiss you
[01:52.170]ButIcan't right now so baby
[01:53.370]Kiss me through the phone
[01:53.760]Kiss me through the phone
[01:54.150]I'll see you later on
[01:54.660]Later on
[01:54.870]Kiss me through the phone
[01:55.560]Kiss me through the phone
[01:55.950]See ya when I get home
[02:03.120]When I get home
`,
    '3356494231': `[00:00.000] 作词 : Charlie Puth/BloodPop®/Hikaru Utada
[00:01.000] 作曲 : Charlie Puth/BloodPop®/Hikaru Utada
[00:02.000] 制作人 : Charlie Puth/BloodPop®
[00:05.960]Through the rose-colored lenses
[00:08.510]And the white picket fences
[00:10.980]No matter how good this is
[00:12.820]It could never satisfy
[00:16.110]When it's you that I'm missing
[00:18.660]Now I sit in the kitchen
[00:21.240]Through the window pane
[00:22.700]I watch the day, turn to night
[00:26.310]It ain't a mystery that every time you leave
[00:31.380]That's when I feel the most alone
[00:35.070]Ooo, don't you know (Don't you know?)
[00:40.180]That you're the one who makes this house a home (House a home)
[00:45.340]And so, (And so) when you go (When you go)
[00:50.220]It feels so cold without that soul (That soul)
[00:53.260]You're the one who makes this house a home
[00:58.660]
[01:06.820]一人の時間も大切
[01:09.820]誰にも妥協せず
[01:12.300]私だけのお城を築いた
[01:17.440]But it's you I was missing
[01:19.960]君に毎日ただいまと言わせてください
[01:27.670]行ってらしゃい
[01:30.300]君がいないこの家は好きじゃない
[01:37.110]Ooo, don't you know (Don't you know?)
[01:41.390]That you're the one who makes this house a home (House a home)
[01:46.660]And so, (And so) when you go (When you go)
[01:51.340]夏でも凍えちゃいそう
[01:54.640]君の温もりが home (Home)
[01:59.700]Ooh-ooh-ooh
[02:01.750]You're the one
[02:02.940]You're the one, you're the one who makes this
[02:07.000]House a home, house a home, house a home
[02:10.890]Oh-oh-oh
[02:11.940]You're the one, you're the one
[02:15.350]Oh mmm-mmm oh
[02:18.780]It ain't a mystery that every time you leave
[02:23.830]That's when I feel the most alone, ooh
[02:29.010]当たり前に
[02:31.620]なりそうな時
[02:34.110]思い出してほしい
[02:38.330]Ooo, don't you know (Don't you know?)
[02:42.540]That you're the one who makes this house a home (A home)
[02:47.980]And so, when you go (When you go)
[02:52.560]It feels so cold without that soul (That soul)
[02:55.840]You're the one who makes this house a home
[02:59.100]ある日楽園で目が覚めても
[03:04.110]君がいなきゃ長居しないね
[03:09.380]どんな豪邸手に入れたって
[03:14.270]君がいなきゃハリボテ同然
[03:22.200]
[03:23.420]Ooh, ooh-ooh, ooh
[03:27.500]You're the one who makes this house a home
[03:31.490]Who made this house a home
[03:38.560]
[03:39.946] 音频助理 : Eric Eylands
[03:40.258] 音频工程师 : Ben Sedano
[03:40.570] 吉他 : Curt Chambers
[03:40.882] 键盘 : Charlie Puth
[03:41.194] 鼓 : Stanley Rudolph
[03:41.506] 人声 : Charile Puth
[03:41.818] 大提琴 : Mia Barcia Colombo/Christopher Ahn/Ben Lash/Juan-Salvador Carrasco
[03:42.130] 小提琴 : Katie Sloan/Radu Pieptea/Kerenza Peacock/Maya Magub/Mark Robertson/Sara Parkins/Adam Millstein/Ji Young An/Misha Vayman/Michael Siess/Stephanie Yu
[03:42.442] 中提琴 : Emily Williams/Carolyn Riley/Corinne Sobolewski/Drew Forde
[03:42.754] 打击乐 : Leddie Garcia
[03:43.066] 编程 : Charlie Puth/BloodPop®
[03:43.378] 贝斯 : Pastor Funk/William Nathan Farrington
[03:43.690] 混音助理 : Ramiro Fernandez-Seoane
[03:44.002] 母带工程师 : Zach Pereyra
[03:44.314] 人声录音工程师 : Yuya Saito
[03:44.626] 混音师 : Charlie Puth/Manny Marroquin
`
  };

  // ---- CSS ----
  var css = [
    /* 右侧固定定位（偏下） */
    '#gmeek-player{position:fixed;right:24px;top:55%;transform:translateY(-50%);z-index:10004;font-family:Arial,Helvetica,sans-serif;}',

    /* 播放器主体 */
    '#gmp-body{width:320px;background:#fff;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.18);overflow:hidden;transition:all 0.3s ease;display:none;}',
    '#gmp-body.show{display:block;}',

    /* 顶部信息区 */
    '#gmp-header{position:relative;padding:14px 14px 10px;background:#fff;cursor:pointer;}',

    /* 封面图 */
    '#gmp-cover{position:absolute;left:14px;top:14px;width:46px;height:46px;background:linear-gradient(135deg,#8fb3a9,#7a9e96);border-radius:6px;display:flex;align-items:center;justify-content:center;overflow:hidden;}',
    '#gmp-cover.playing{animation:ap-cover-rotate 20s linear infinite;}',
    '@keyframes ap-cover-rotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}',
    '#gmp-cover svg{width:20px;height:20px;color:#fff;}',
    '#gmp-cover img{width:100%;height:100%;object-fit:cover;}',

    /* 歌曲信息 */
    '#gmp-info{margin-left:60px;min-height:46px;display:flex;flex-direction:column;justify-content:center;}',
    '#gmp-title{color:#333;font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4;}',
    '#gmp-artist{color:#999;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4;margin-top:2px;}',

    /* 歌词按钮 */
    '#gmp-list-btn,#gmp-lyrics-btn{position:absolute;top:4px;transform:none;background:none;border:none;cursor:pointer;color:#999;padding:4px;transition:color 0.2s;}',
    '#gmp-list-btn:hover,#gmp-lyrics-btn:hover{color:#8fb3a9;}',
    '#gmp-list-btn svg,#gmp-lyrics-btn svg{width:16px;height:16px;}',
    '#gmp-list-btn.active,#gmp-lyrics-btn.active{color:#8fb3a9;}',
    '#gmp-list-btn{right:90px;}',
    '#gmp-lyrics-btn{right:52px;}',
    '#gmp-close-btn{position:absolute;top:4px;right:14px;background:none;border:none;cursor:pointer;color:#999;padding:4px;transition:color 0.2s;}',
    '#gmp-close-btn:hover{color:#666;}',
    '#gmp-close-btn svg{width:16px;height:16px;}',

    /* 悬浮歌词面板 */
    '#gmp-lyrics-float{position:absolute;bottom:100%;left:0;right:0;margin-bottom:8px;background:rgba(255,255,255,0.97);border-radius:12px;box-shadow:0 -4px 20px rgba(0,0,0,0.12);max-height:240px;overflow-y:auto;display:none;backdrop-filter:blur(8px);}',
    '#gmp-lyrics-float.show{display:block;}',
    '#gmp-lyrics-float::-webkit-scrollbar{width:4px;}',
    '#gmp-lyrics-float::-webkit-scrollbar-thumb{background:#ddd;border-radius:2px;}',
    '#gmp-lyrics-inner{padding:12px 14px;text-align:center;font-size:13px;line-height:2;}',
    '.gmp-lrc{color:#666;cursor:pointer;transition:all 0.2s;padding:2px 0;}',
    '.gmp-lrc:hover{color:#333;}',
    '.gmp-lrc.active{color:#8fb3a9;font-weight:500;font-size:14px;}',
    '.gmp-lrc.passive{color:#ccc;}',

    /* 进度条区域 */
    '#gmp-progress{padding:0 14px 8px;}',
    '#gmp-bar-wrap{height:2px;background:#eee;border-radius:1px;cursor:pointer;position:relative;}',
    '#gmp-bar{height:100%;background:#8fb3a9;border-radius:1px;width:0%;position:relative;}',
    '#gmp-bar::after{content:"";position:absolute;right:-6px;top:-5px;width:12px;height:12px;background:#8fb3a9;border-radius:50%;opacity:0;transition:opacity 0.2s;box-shadow:0 0 4px rgba(143,179,169,0.4);}',
    '#gmp-bar-wrap:hover #gmp-bar::after{opacity:1;}',

    /* 控制区 */
    '#gmp-controls{display:flex;align-items:center;padding:0 14px 10px;background:#fff;}',
    '#gmp-time{color:#999;font-size:11px;font-variant-numeric:tabular-nums;min-width:40px;}',
    '#gmp-btns{display:flex;align-items:center;gap:8px;flex:1;justify-content:center;}',
    '.gmp-btn{background:none;border:none;cursor:pointer;padding:6px;color:#666;transition:color 0.2s;border-radius:50%;}',
    '.gmp-btn:hover{color:#8fb3a9;}',
    '.gmp-btn svg{width:18px;height:18px;display:block;}',
    '.gmp-btn.play-btn svg{width:22px;height:22px;}',

    /* 音量 */
    '#gmp-vol{display:flex;align-items:center;margin-left:auto;}',
    '#gmp-vol-icon{cursor:pointer;color:#999;transition:color 0.2s;}',
    '#gmp-vol-icon:hover{color:#8fb3a9;}',
    '#gmp-vol-icon svg{width:16px;height:16px;}',
    '#gmp-vol-bar-wrap{width:60px;height:2px;background:#eee;border-radius:1px;margin-left:6px;cursor:pointer;}',
    '#gmp-vol-bar{height:100%;background:#8fb3a9;border-radius:1px;width:70%;}',

    /* 歌单列表 */
    '#gmp-list{max-height:0;overflow-y:auto;transition:max-height 0.3s ease;background:#fafafa;border-radius:0 0 12px 12px;}',
    '#gmp-list.open{max-height:320px;border-top:1px solid #eee;}',
    '#gmp-list::-webkit-scrollbar{width:4px;}',
    '#gmp-list::-webkit-scrollbar-thumb{background:#ddd;border-radius:2px;}',
    '.gmp-item{display:flex;align-items:center;padding:8px 14px;cursor:pointer;border-left:3px solid transparent;transition:all 0.15s;}',
    '.gmp-item:hover{background:#f0f0f0;}',
    '.gmp-item.playing{background:#f0f7f5;border-left-color:#8fb3a9;}',
    '.gmp-item-cover{width:32px;height:32px;border-radius:4px;overflow:hidden;flex-shrink:0;margin-right:10px;background:#eee;}',
    '.gmp-item-cover img{width:100%;height:100%;object-fit:cover;}',
    '.gmp-item-info{flex:1;min-width:0;}',
    '.gmp-item-name{color:#333;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.gmp-item.playing .gmp-item-name{color:#8fb3a9;font-weight:500;}',
    '.gmp-item-artist{color:#999;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',

    /* Mini 切换按钮 */
    '#gmp-mini{position:absolute;right:0px;top:0px;width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#8fb3a9,#7a9e96);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:-2px 2px 8px rgba(143,179,169,0.4);transition:all 0.2s;}',
    '#gmp-mini:hover{box-shadow:-2px 2px 12px rgba(143,179,169,0.6);transform:scale(1.05);}',
    '#gmp-mini svg{width:20px;height:20px;color:#fff;transition:transform 0.3s;}',
    '#gmp-mini.collapsed svg{transform:rotate(180deg);}',

    /* 移动端响应 */
    '@media(max-width:480px){#gmeek-player{right:8px;top:55%;transform:translateY(-50%);}#gmp-body{width:calc(100vw - 52px);}}',
  ].join('');

  // ---- Inject Styles ----
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---- Build UI ----
  var container = document.createElement('div');
  container.id = 'gmeek-player';

  container.innerHTML =
    '<div id="gmp-mini" title="展开播放器">' +
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>' +
    '</div>' +
    '<div id="gmp-body">' +
      '<div id="gmp-lyrics-float"><div id="gmp-lyrics-inner"></div></div>' +
      '<div id="gmp-header">' +
        '<div id="gmp-cover"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg></div>' +
        '<div id="gmp-info">' +
          '<div id="gmp-title">私人雷达</div>' +
          '<div id="gmp-artist">35首 · 点击播放</div>' +
        '</div>' +
        '<button id="gmp-list-btn" title="歌单">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/></svg>' +
        '</button>' +
        '<button id="gmp-lyrics-btn" title="歌词">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>' +
        '</button>' +
        '<button id="gmp-close-btn" title="收起">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>' +
        '</button>' +
      '</div>' +
      '<div id="gmp-progress"><div id="gmp-bar-wrap"><div id="gmp-bar"></div></div></div>' +
      '<div id="gmp-controls">' +
        '<span id="gmp-time">0:00</span>' +
        '<div id="gmp-btns">' +
          '<button class="gmp-btn" id="gmp-prev" title="上一首"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z"/></svg></button>' +
          '<button class="gmp-btn play-btn" id="gmp-play" title="播放"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg></button>' +
          '<button class="gmp-btn" id="gmp-next" title="下一首"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zm2-12v12l6.5-6L8 6zm8 0v12h2V6h-2z"/></svg></button>' +
        '</div>' +
        '<div id="gmp-vol">' +
          '<span id="gmp-vol-icon" title="静音"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg></span>' +
          '<div id="gmp-vol-bar-wrap"><div id="gmp-vol-bar"></div></div>' +
        '</div>' +
      '</div>' +
      '<div id="gmp-list"></div>' +
    '</div>';

  document.body.appendChild(container);

  // ---- DOM Refs ----
  var bodyEl = document.getElementById('gmp-body');
  var miniBtn = document.getElementById('gmp-mini');
  var titleEl = document.getElementById('gmp-title');
  var artistEl = document.getElementById('gmp-artist');
  var coverEl = document.getElementById('gmp-cover');
  var playBtn = document.getElementById('gmp-play');
  var timeEl = document.getElementById('gmp-time');
  var barEl = document.getElementById('gmp-bar');
  var barWrap = document.getElementById('gmp-bar-wrap');
  var volBar = document.getElementById('gmp-vol-bar');
  var volBarWrap = document.getElementById('gmp-vol-bar-wrap');
  var volIcon = document.getElementById('gmp-vol-icon');
  var listEl = document.getElementById('gmp-list');
  var listBtn = document.getElementById('gmp-list-btn');
  var lyricsBtn = document.getElementById('gmp-lyrics-btn');
  var lyricsFloat = document.getElementById('gmp-lyrics-float');
  var lyricsInner = document.getElementById('gmp-lyrics-inner');

  // ---- State ----
  var audio = new Audio();
  audio.volume = 0.7;
  var current = -1;
  var playing = false;
  var muted = false;
  var prevVol = 0.7;
  var songList = [];
  var lyricsData = [];
  var lyricLines = [];
  var playerOpen = false;
  var lyricsOpen = false;

  // ---- Build playlist ----
  function buildList() {
    var html = '';
    for (var i = 0; i < songList.length; i++) {
      var s = songList[i];
      html += '<div class="gmp-item" data-i="' + i + '">' +
        '<div class="gmp-item-cover"><img src="' + esc(s.cover) + '" loading="lazy" alt=""></div>' +
        '<div class="gmp-item-info">' +
          '<div class="gmp-item-name">' + esc(s.name) + '</div>' +
          '<div class="gmp-item-artist">' + esc(s.artist) + '</div>' +
        '</div>' +
      '</div>';
    }
    listEl.innerHTML = html;
    listEl.querySelectorAll('.gmp-item').forEach(function (item, idx) {
      item.addEventListener('click', function () { playSong(idx); });
    });
  }

  function esc(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ---- LRC Parser ----
  function parseLRC(text) {
    if (!text) return [];
    var lines = text.split('\n');
    var result = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;
      var textPart = line.substring(line.lastIndexOf(']') + 1).trim();
      if (!textPart) continue;
      var re = /\[(\d+):(\d+)(?:[.\:](\d+))?\]/g;
      var m;
      while ((m = re.exec(line)) !== null) {
        var time = parseInt(m[1]) * 60 + parseInt(m[2]) + (m[3] ? parseInt(m[3].substring(0, 2)) / 100 : 0);
        result.push({ time: time, text: textPart });
      }
    }
    return result.sort(function (a, b) { return a.time - b.time; });
  }

  function buildLyrics(text) {
    lyricsData = parseLRC(text);
    if (!lyricsData.length) {
      lyricsInner.innerHTML = '<div class="gmp-lrc" style="color:#999;">暂无歌词</div>';
      return;
    }
    var html = '';
    for (var i = 0; i < lyricsData.length; i++) {
      html += '<div class="gmp-lrc" data-i="' + i + '">' + esc(lyricsData[i].text) + '</div>';
    }
    lyricsInner.innerHTML = html;
    lyricLines = lyricsInner.querySelectorAll('.gmp-lrc');
    lyricLines.forEach(function (el, idx) {
      el.addEventListener('click', function () {
        if (audio.duration && lyricsData[idx]) {
          audio.currentTime = lyricsData[idx].time;
        }
      });
    });
  }

  function updateLyrics() {
    if (!lyricsData.length || !lyricsOpen) return;
    var t = audio.currentTime || 0;
    var active = -1;
    for (var i = lyricsData.length - 1; i >= 0; i--) {
      if (t >= lyricsData[i].time) { active = i; break; }
    }
    for (var j = 0; j < lyricLines.length; j++) {
      lyricLines[j].classList.remove('active', 'passive');
      if (j === active) {
        lyricLines[j].classList.add('active');
        var st = lyricLines[j].offsetTop - lyricsFloat.clientHeight / 2 + lyricLines[j].clientHeight / 2;
        lyricsFloat.scrollTop = st;
      } else if (j < active) {
        lyricLines[j].classList.add('passive');
      }
    }
  }

  // ---- Play song ----
  function playSong(idx) {
    if (idx < 0 || idx >= songList.length) return;
    current = idx;
    var s = songList[idx];
    audio.src = s.url;
    audio.load();
    titleEl.textContent = s.name;
    artistEl.textContent = s.artist;
    barEl.style.width = '0%';
    timeEl.textContent = '0:00';

    // Update cover image
    if (s.cover) {
      coverEl.innerHTML = '<img src="' + esc(s.cover) + '" alt="">';
    } else {
      coverEl.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>';
    }

    // Update list highlight
    listEl.querySelectorAll('.gmp-item').forEach(function (item, i) {
      item.classList.toggle('playing', i === idx);
    });

    // Load lyrics from HARDCODED_LYRICS
    var lrc = HARDCODED_LYRICS[s.id];
    if (lrc) {
      buildLyrics(lrc);
    } else {
      lyricsInner.innerHTML = '<div class="gmp-lrc" style="color:#999;">暂无歌词</div>';
      lyricsData = [];
    }

    // Play
    audio.play().catch(function () { });
    playing = true;
    updatePlayIcon();
  }

  function updatePlayIcon() {
    playBtn.innerHTML = playing
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>';
    coverEl.classList.toggle('playing', playing);
  }

  // ---- Controls ----
  playBtn.addEventListener('click', function () {
    if (current === -1) { playSong(0); return; }
    if (playing) { audio.pause(); playing = false; }
    else { audio.play().catch(function () { }); playing = true; }
    updatePlayIcon();
  });

  document.getElementById('gmp-prev').addEventListener('click', function () {
    playSong((current - 1 + songList.length) % songList.length);
  });

  document.getElementById('gmp-next').addEventListener('click', function () {
    playSong((current + 1) % songList.length);
  });

  // ---- Progress ----
  audio.addEventListener('timeupdate', function () {
    if (!audio.duration) return;
    barEl.style.width = (audio.currentTime / audio.duration * 100) + '%';
    var m = Math.floor(audio.currentTime / 60);
    var s = Math.floor(audio.currentTime % 60);
    timeEl.textContent = m + ':' + (s < 10 ? '0' : '') + s;
    updateLyrics();
  });

  audio.addEventListener('ended', function () {
    playSong((current + 1) % songList.length);
  });

  // ---- Seek ----
  barWrap.addEventListener('click', function (e) {
    if (!audio.duration) return;
    var rect = barWrap.getBoundingClientRect();
    var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * audio.duration;
  });

  // ---- Volume ----
  volIcon.addEventListener('click', function () {
    if (muted) {
      audio.volume = prevVol;
      muted = false;
      volBar.style.width = (prevVol * 100) + '%';
    } else {
      prevVol = audio.volume;
      audio.volume = 0;
      muted = true;
      volBar.style.width = '0%';
    }
  });

  volBarWrap.addEventListener('click', function (e) {
    var rect = volBarWrap.getBoundingClientRect();
    var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.volume = pct;
    volBar.style.width = (pct * 100) + '%';
    muted = false;
  });

  // ---- Toggle player ----
  miniBtn.addEventListener('click', function () {
    playerOpen = !playerOpen;
    bodyEl.classList.toggle('show', playerOpen);
    miniBtn.classList.toggle('collapsed', !playerOpen);
    miniBtn.title = playerOpen ? '收起播放器' : '展开播放器';
  });

  // ---- Toggle floating lyrics ----
  lyricsBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    lyricsOpen = !lyricsOpen;
    lyricsFloat.classList.toggle('show', lyricsOpen);
    lyricsBtn.classList.toggle('active', lyricsOpen);
  });

  // ---- Toggle playlist ----
  var listOpen = false;
  listBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    listOpen = !listOpen;
    listEl.classList.toggle('open', listOpen);
    listBtn.classList.toggle('active', listOpen);
  });

  // ---- Click header (no longer toggles list) ----
  document.getElementById('gmp-header').addEventListener('click', function (e) {
    if (e.target.closest('#gmp-lyrics-btn') || e.target.closest('#gmp-list-btn')) return;
    // 点击 header 收起播放器
    playerOpen = false;
    bodyEl.classList.remove('show');
    miniBtn.classList.add('collapsed');
    miniBtn.title = '展开播放器';
  });

  // ---- Close button ----
  document.getElementById('gmp-close-btn').addEventListener('click', function (e) {
    e.stopPropagation();
    playerOpen = false;
    bodyEl.classList.remove('show');
    miniBtn.classList.add('collapsed');
    miniBtn.title = '展开播放器';
  });

  // ---- Init ----
  songList = HARDCODED_SONGS;
  buildList();
  console.log('[GmeekMusic] Loaded', songList.length, 'songs');

  } // end initPlayer()

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayer);
  } else {
    initPlayer();
  }

})();
