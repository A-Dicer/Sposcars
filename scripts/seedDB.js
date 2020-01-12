const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the fighters collection and inserts the fighters below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/podb",
  {
    useMongoClient: true
  }
);

newObject = (id) => {
  return new mongoose.Types.ObjectId(id);
};

const fighterSeed = [
        // Punch-Out!! (Wii) Fighters
        {_id: newObject("5ab975e0af67235b3dfef53b"), fighter: "Glass Joe",    circuit: "Contender: Minor", img: "img/fighters/glassJoe/gjWiiCont.png", icon: "img/fighters/glassJoe/wiiIconCont.png"},
        {_id: newObject("5ab975e0af67235b3dfef53c"), fighter: "Von Kaiser",   circuit: "Contender: Minor", img: "img/fighters/vonKaiser/vkWiiCont.png", icon: "img/fighters/vonKaiser/wiiIconCont.png"},
        {_id: newObject("5ab975e0af67235b3dfef53d"), fighter: "Disco Kid",    circuit: "Contender: Minor", img: "img/fighters/discoKid/dkWiiCont.png", icon: "img/fighters/discoKid/wiiIconCont.png"},
        {_id: newObject("5ab975e0af67235b3dfef53e"), fighter: "King Hippo",   circuit: "Contender: Minor", img: "img/fighters/kingHippo/khWiiCont.png", icon: "img/fighters/kingHippo/wiiIconCont.png"},
        {_id: newObject("5ab975e0af67235b3dfef53f"), fighter: "Piston Hondo", circuit: "Contender: Major", img: "img/fighters/pistonHondo/phWiiCont.png", icon: "img/fighters/pistonHondo/wiiIconCont.png"},
        {_id: newObject("5ab975e0af67235b3dfef540"), fighter: "Bear Hugger",  circuit: "Contender: Major", img: "img/fighters/bearHugger/bhWiiCont.png", icon: "img/fighters/bearHugger/wiiIconCont.png" },
        {_id: newObject("5ab975e0af67235b3dfef541"), fighter: "Great Tiger",  circuit: "Contender: Major", img: "img/fighters/greatTiger/gtWiiCont.png", icon: "img/fighters/greatTiger/wiiIconCont.png" },
        {_id: newObject("5ab975e0af67235b3dfef542"), fighter: "Don Flamenco", circuit: "Contender: Major", img: "img/fighters/donFlamenco/dfWiiCont.png", icon: "img/fighters/donFlamenco/wiiIconCont.png" },
        {_id: newObject("5ab975e0af67235b3dfef543"), fighter: "Aran Ryan",    circuit: "Contender: World", img: "img/fighters/aranRyan/arWiiCont.png", icon: "img/fighters/aranRyan/wiiIconCont.png" },
        {_id: newObject("5ab975e0af67235b3dfef544"), fighter: "Soda Popinski",circuit: "Contender: World", img: "img/fighters/sodaPopinski/spWiiCont.png", icon: "img/fighters/sodaPopinski/wiiIconCont.png" },
        {_id: newObject("5ab975e0af67235b3dfef545"), fighter: "Bald Bull",    circuit: "Contender: World", img: "img/fighters/baldBull/bbWiiCont.png", icon: "img/fighters/baldBull/wiiIconCont.png" },
        {_id: newObject("5ab975e0af67235b3dfef546"), fighter: "Super Macho Man", circuit: "Contender: World", img: "img/fighters/machoMan/mmWiiCont.png", icon: "img/fighters/machoMan/wiiIconCont.png" },
        {_id: newObject("5ab975e0af67235b3dfef547"), fighter: "Mr Sandman",   circuit: "Contender: World", img: "img/fighters/mrSandman/msWiiCont.png", icon: "img/fighters/mrSandman/wiiIconCont.png" },  
        {_id: newObject("5ab975e0af67235b3dfef548"), fighter: "Glass Joe",    circuit: "Title Defense: Minor ", img: "img/fighters/glassJoe/gjWiiDef.png", icon: "img/fighters/glassJoe/wiiIconDef.png" },       
        {_id: newObject("5ab975e0af67235b3dfef549"), fighter: "Von Kaiser",   circuit: "Title Defense: Minor", img: "img/fighters/vonKaiser/vkWiiDef.png", icon: "img/fighters/vonKaiser/wiiIconDef.png" },        
        {_id: newObject("5ab975e0af67235b3dfef54a"), fighter: "Disco Kid",    circuit: "Title Defense: Minor", img: "img/fighters/discoKid/dkWiiDef.png", icon: "img/fighters/discoKid/wiiIconDef.png"  },
        {_id: newObject("5ab975e0af67235b3dfef54b"), fighter: "King Hippo",   circuit: "Title Defense: Minor", img: "img/fighters/kingHippo/khWiiDef.png", icon: "img/fighters/kingHippo/wiiIconDef.png" },
        {_id: newObject("5ab975e0af67235b3dfef54c"), fighter: "Piston Hondo", circuit: "Title Defense: Major", img: "img/fighters/pistonHondo/phWiiDef.png", icon: "img/fighters/pistonHondo/wiiIconDef.png" },
        {_id: newObject("5ab975e0af67235b3dfef54d"), fighter: "Bear Hugger",  circuit: "Title Defense: Major", img: "img/fighters/bearHugger/bhWiiDef.png", icon: "img/fighters/bearHugger/wiiIconDef.png" },
        {_id: newObject("5ab975e0af67235b3dfef54e"), fighter: "Great Tiger",  circuit: "Title Defense: Major", img: "img/fighters/greatTiger/gtWiiDef.png", icon: "img/fighters/greatTiger/wiiIconDef.png"},
        {_id: newObject("5ab975e0af67235b3dfef54f"), fighter: "Don Flamenco", circuit: "Title Defense: Major", img: "img/fighters/donFlamenco/dfWiiDef.png", icon: "img/fighters/donFlamenco/wiiIconDef.png" },
        {_id: newObject("5ab975e0af67235b3dfef550"), fighter: "Aran Ryan",    circuit: "Title Defense: World", img: "img/fighters/aranRyan/arWiiDef.png", icon: "img/fighters/aranRyan/wiiIconDef.png"  },
        {_id: newObject("5ab975e0af67235b3dfef551"), fighter: "Soda Popinski",circuit: "Title Defense: World", img: "img/fighters/sodaPopinski/spWiiDef.png", icon: "img/fighters/sodaPopinski/wiiIconDef.png" },
        {_id: newObject("5ab975e0af67235b3dfef552"), fighter: "Bald Bull",    circuit: "Title Defense: World", img: "img/fighters/baldBull/bbWiiDef.png", icon: "img/fighters/baldBull/wiiIconDef.png" },
        {_id: newObject("5ab975e0af67235b3dfef553"), fighter: "Super Macho Man", circuit: "Title Defense: World", img: "img/fighters/machoMan/mmWiiDef.png", icon: "img/fighters/machoMan/wiiIconDef.png" },
        {_id: newObject("5ab975e0af67235b3dfef554"), fighter: "Mr. Sandman",   circuit: "Title Defense: World", img: "img/fighters/mrSandman/msWiiDef.png", icon: "img/fighters/mrSandman/wiiIconDef.png" },
        {_id: newObject("5ab975e0af67235b3dfef555"), fighter: "??? ?????",   circuit: "Last Stand", img: "img/fighters/unknownFighter/wiiDef.png", icon: "img/fighters/unknownFighter/wiiIconDef.png" },
        //Super Punch-Out!! fighters
        {_id: newObject("5ad93983f22c74cdb7c7a59d"), fighter: "Gabby Jay",   circuit: "Minor Circuit", img: "img/fighters/gabbyJay/gjSpo.png", icon: "img/fighters/gabbyJay/spoIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a59e"), fighter: "Bear Hugger",   circuit: "Minor Circuit", img: "img/fighters/bearHugger/bhSpo.png", icon: "img/fighters/bearHugger/spoIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a59f"), fighter: "Piston Hurricane",   circuit: "Minor Circuit", img: "img/fighters/pistonHondo/phSpo.png", icon: "img/fighters/pistonHondo/spoIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5a0"), fighter: "Bald Bull",   circuit: "Minor Circuit", img: "img/fighters/baldBull/bbSpo.png", icon: "img/fighters/baldBull/spoIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5a1"), fighter: "Bob Charlie",   circuit: "Major Circuit", img: "img/fighters/bobCharlie/bcSpo.png", icon: "img/fighters/bobCharlie/spoIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5a2"), fighter: "Dragon Chan",   circuit: "Major Circuit", img: "img/fighters/dragonChan/dcSpo.png", icon: "img/fighters/dragonChan/spoIcon.png"  }, 
        {_id: newObject("5ad93983f22c74cdb7c7a5a3"), fighter: "Masked Muscle",   circuit: "Major Circuit", img: "img/fighters/maskedMuscle/mmSpo.png", icon: "img/fighters/maskedMuscle/spoIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5a4"), fighter: "Mr. Sandman",   circuit: "Major Circuit", img: "img/fighters/mrSandman/msSpo.png", icon: "img/fighters/mrSandman/spoIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5a5"), fighter: "Aran Ryan",   circuit: "World Circuit", img: "img/fighters/aranRyan/arSpo.png", icon: "img/fighters/aranRyan/spoIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5a6"), fighter: "Keike Kagero",   circuit: "World Circuit", img: "img/fighters/keikeKagero/kkSpo.png", icon: "img/fighters/keikeKagero/spoIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5a7"), fighter: "Mad Clown",   circuit: "World Circuit", img: "img/fighters/madClown/mcSpo.png", icon: "img/fighters/madClown/spoIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5a8"), fighter: "Super Macho Man",   circuit: "World Circuit", img: "img/fighters/machoMan/mmSpo.png", icon: "img/fighters/machoMan/spoIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5a9"), fighter: "Narcis Prince",   circuit: "Special Circuit", img: "img/fighters/narcisPrince/npSpo.png", icon: "img/fighters/narcisPrince/spoIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5aa"), fighter: "Hoy Quarlow",   circuit: "Special Circuit", img: "img/fighters/hoyQuarlow/hqSpo.png", icon: "img/fighters/hoyQuarlow/spoIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5ab"), fighter: "Rick Bruiser",   circuit: "Special Circuit", img: "img/fighters/rickBruiser/rbSpo.png", icon: "img/fighters/rickBruiser/spoIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5ac"), fighter: "Nick Bruiser",   circuit: "Special Circuit", img: "img/fighters/nickBruiser/nbSpo.png", icon: "img/fighters/nickBruiser/spoIcon.png"  },
        //Punch-Out!! fighters
        {_id: newObject("5ad93983f22c74cdb7c7a5ad"), fighter: "Glass Joe",   circuit: "Minor Circuit", img: "img/fighters/glassJoe/gjPo.png", icon: "img/fighters/glassJoe/poIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5ae"), fighter: "Von Kaiser",   circuit: "Minor Circuit", img: "img/fighters/vonKaiser/vkPo.png", icon: "img/fighters/vonKaiser/poIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5af"), fighter: "Piston Honda",   circuit: "Minor Circuit", img: "img/fighters/pistonHondo/phPo.png", icon: "img/fighters/pistonHondo/poIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5b0"), fighter: "Don Flamenco",   circuit: "Major Circuit", img: "img/fighters/donFlamenco/dfPo.png", icon: "img/fighters/donFlamenco/poIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5b1"), fighter: "King Hippo",   circuit: "Major Circuit", img: "img/fighters/kingHippo/khPo.png", icon: "img/fighters/kingHippo/poIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5b2"), fighter: "Great Tiger",   circuit: "Major Circuit", img: "img/fighters/greatTiger/gtPo.png", icon: "img/fighters/greatTiger/poIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5b3"), fighter: "Bald Bull",   circuit: "Major Circuit", img: "img/fighters/baldBull/bbPo.png", icon: "img/fighters/baldBull/poIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5b4"), fighter: "Piston Honda",   circuit: "World Circuit", img: "img/fighters/pistonHondo/phPo.png", icon: "img/fighters/pistonHondo/poIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5b5"), fighter: "Soda Popinski",   circuit: "World Circuit", img: "img/fighters/sodaPopinski/spPo.png", icon: "img/fighters/sodaPopinski/poIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5b6"), fighter: "Bald Bull",   circuit: "World Circuit", img: "img/fighters/baldBull/bbPo.png", icon: "img/fighters/baldBull/poIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5b7"), fighter: "Don Flamenco",   circuit: "World Circuit", img: "img/fighters/donFlamenco/dfPo.png", icon: "img/fighters/donFlamenco/poIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5b8"), fighter: "Mr. Sandman",   circuit: "World Circuit", img: "img/fighters/mrSandman/msPo.png", icon: "img/fighters/mrSandman/poIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5b9"), fighter: "Super Macho Man",   circuit: "World Circuit", img: "img/fighters/machoMan/mmPo.png", icon: "img/fighters/machoMan/poIcon.png"  },
        {_id: newObject("5ad93983f22c74cdb7c7a5ba"), fighter: "Mike Tyson",   circuit: "The Dream Fight", img: "img/fighters/mikeTyson/mtPo.png", icon: "img/fighters/mikeTyson/poIcon.png"  },      
];

const gameSeed = [
  { _id: newObject("5ad93dbaa79643ce5b210627"), title: "Mike Tyson's Punch-Out!!", abv: "mtpo", year: "1987" , img: "mtpo/mtpoBoxArt.jpg", categories: [ "Any%", "Highscore" ]},
  { _id: newObject("5ad93dbaa79643ce5b210628"), title: "Super Punch-Out!!", abv: "spo", year: "1994" , img: "spo/spoBoxArt.jpg", categories: [ "Any%" ]},
  { _id: newObject("5ad93dbaa79643ce5b210629"), title: "Punch-Out!! (Wii)", abv: "powii", year: "2009" , img: "powii/powiiBoxArt.jpg", categories: [ "Any%", "Contender%" ]},   
];


const id = new mongoose.Types.ObjectId("5acf8eb59872806d554c3ed3");

const splitSeed = [
  //Punch-Out!! (wii) Any% Splits
  {
    _id: newObject("5acf8eb59872806d554c3ed3"), 
    user: "Defualt", 
    game: {id: "5ad93dbaa79643ce5b210629" , 
    title: "Punch-Out!! (Wii)"}, 
    category: "Any%", 
    time: "00:00.00",
    fighters: [
      "5ab975e0af67235b3dfef53b",
      "5ab975e0af67235b3dfef53c",
      "5ab975e0af67235b3dfef53d",
      "5ab975e0af67235b3dfef53e",
      "5ab975e0af67235b3dfef53f",
      "5ab975e0af67235b3dfef540",
      "5ab975e0af67235b3dfef541",
      "5ab975e0af67235b3dfef542",
      "5ab975e0af67235b3dfef543",
      "5ab975e0af67235b3dfef544",
      "5ab975e0af67235b3dfef545",
      "5ab975e0af67235b3dfef546",
      "5ab975e0af67235b3dfef547",
      "5ab975e0af67235b3dfef548",
      "5ab975e0af67235b3dfef549",
      "5ab975e0af67235b3dfef54a",
      "5ab975e0af67235b3dfef54b",
      "5ab975e0af67235b3dfef54c",
      "5ab975e0af67235b3dfef54d",
      "5ab975e0af67235b3dfef54e",
      "5ab975e0af67235b3dfef54f",
      "5ab975e0af67235b3dfef550",
      "5ab975e0af67235b3dfef551",
      "5ab975e0af67235b3dfef552",
      "5ab975e0af67235b3dfef553",
      "5ab975e0af67235b3dfef554",
      "5ab975e0af67235b3dfef555",
      "5ab975e0af67235b3dfef555",
      "5ab975e0af67235b3dfef555"
    ],
    pb: [
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null}
    ],
    gold: [
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null},
      {KD1: null, KD2: null, time: null}
    ],
  },
    //Punch-Out!! (wii) Contender% Splits
    {
      _id: newObject("5acfbd3fd3d18c7049a9a7b7"), 
      user: "Defualt", 
      game: { id: "5ad93dbaa79643ce5b210629", 
      title: "Punch-Out!! (Wii)"}, 
      category: "Contender%", 
      time: "00:00.00",
      fighters: [ 
        "5ab975e0af67235b3dfef53b",
        "5ab975e0af67235b3dfef53c",
        "5ab975e0af67235b3dfef53d",
        "5ab975e0af67235b3dfef53e",
        "5ab975e0af67235b3dfef53f",
        "5ab975e0af67235b3dfef540",
        "5ab975e0af67235b3dfef541",
        "5ab975e0af67235b3dfef542",
        "5ab975e0af67235b3dfef543",
        "5ab975e0af67235b3dfef544",
        "5ab975e0af67235b3dfef545",
        "5ab975e0af67235b3dfef546",
        "5ab975e0af67235b3dfef547"
      ],
      pb: [
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null}
      ],
      gold: [
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null}
      ]
    },
    //Super Punch-Out!! Any% Splits
    {
      _id: newObject("5ad93dbaa79643ce5b21062a"), 
      user: "Defualt", 
      game: { id: "5ad93dbaa79643ce5b210628", 
      title: "Super Punch-Out!!"}, 
      category: "Any%", 
      time: "00:00.00",
      fighters: [
        "5ad93983f22c74cdb7c7a59d",
        "5ad93983f22c74cdb7c7a59e",
        "5ad93983f22c74cdb7c7a59f",
        "5ad93983f22c74cdb7c7a5a0",
        "5ad93983f22c74cdb7c7a5a1",
        "5ad93983f22c74cdb7c7a5a2",
        "5ad93983f22c74cdb7c7a5a3",
        "5ad93983f22c74cdb7c7a5a4",
        "5ad93983f22c74cdb7c7a5a5",
        "5ad93983f22c74cdb7c7a5a6",
        "5ad93983f22c74cdb7c7a5a7",
        "5ad93983f22c74cdb7c7a5a8",
        "5ad93983f22c74cdb7c7a5a9",
        "5ad93983f22c74cdb7c7a5aa",
        "5ad93983f22c74cdb7c7a5ab",
        "5ad93983f22c74cdb7c7a5ac",
      ],
      pb:[
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null}
      ],
      gold:[
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null}
      ],
    },
    //Punch-Out!! Any% Splits
    {
      _id: newObject("5ad93dbaa79643ce5b21062b"), 
      user: "Defualt", 
      game: { id: "5ad93dbaa79643ce5b210627", 
      title: "Punch-Out!!"}, 
      category: "Any%", 
      time: "00:00.00",
      fighters: [
        "5ad93983f22c74cdb7c7a5ad",
        "5ad93983f22c74cdb7c7a5ae",
        "5ad93983f22c74cdb7c7a5af",
        "5ad93983f22c74cdb7c7a5b0",
        "5ad93983f22c74cdb7c7a5b1",
        "5ad93983f22c74cdb7c7a5b2",
        "5ad93983f22c74cdb7c7a5b3",
        "5ad93983f22c74cdb7c7a5b4",
        "5ad93983f22c74cdb7c7a5b5",
        "5ad93983f22c74cdb7c7a5b6",
        "5ad93983f22c74cdb7c7a5b7",
        "5ad93983f22c74cdb7c7a5b8",
        "5ad93983f22c74cdb7c7a5b9",
        "5ad93983f22c74cdb7c7a5ba",
      ],
      pb: [
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null}
      ],
      gold: [
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null}
      ]
    },
    //Punch-Out!! Highscore Splits
    {
      _id: newObject("5ad93dbaa79643ce5b21062c"), 
      user: "Defualt", 
      game: { id: "5ad93dbaa79643ce5b210627", 
      title: "Punch-Out!!"}, 
      category: "Highscore", 
      time: "000000",
      fighters: [
        "5ad93983f22c74cdb7c7a5ad",
        "5ad93983f22c74cdb7c7a5ae",
        "5ad93983f22c74cdb7c7a5af",
        "5ad93983f22c74cdb7c7a5b0",
        "5ad93983f22c74cdb7c7a5b1",
        "5ad93983f22c74cdb7c7a5b2",
        "5ad93983f22c74cdb7c7a5b3",
        "5ad93983f22c74cdb7c7a5b4",
        "5ad93983f22c74cdb7c7a5b5",
        "5ad93983f22c74cdb7c7a5b6",
        "5ad93983f22c74cdb7c7a5b7",
        "5ad93983f22c74cdb7c7a5b8",
        "5ad93983f22c74cdb7c7a5b9",
        "5ad93983f22c74cdb7c7a5ba",
      ],
      pb: [
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null}
      ],
      gold: [
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null},
        {KD1: null, KD2: null, time: null}
      ]
    },

    
];

//--------------- populate fighter data -----------------------
db.Fighters
  .remove({})
  .then(() => db.Fighters.collection.insertMany(fighterSeed))
  .then(data => {
    console.log(data.insertedIds.length + " fighter records inserted!");
    //------------------ populate game data ---------------------
    db.Game
      .remove({})
      .then(() => db.Game.collection.insertMany(gameSeed))
      .then(data => {
        console.log(data.insertedIds.length + " game records inserted!");
        //--------------- populate split data -----------------------
        db.Splits
          .remove({})
          .then(() => db.Splits.collection.insertMany(splitSeed))
          .then(data => {
            console.log(data.insertedIds.length + "  split records inserted!");
            process.exit(0);
          })
          .catch(err => {
            console.error(err);
            process.exit(1);
          });
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });



