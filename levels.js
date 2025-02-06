var level1Scene1 = {
    ghostpirate: [
        { x: 100, y: 100, type: "gun" }, 
    ],
    pirate: [{ x: 200, y: 30, type: "sword" }, 
        { x: 800, y: 100 , type: "sword"},
        { x: 400, y: 100 , type: "gun"}, 
        { x: 600, y: 212, type: "sword"},
    ],
    boss: [],
    grass_m: [
        //grassblockmiddle, left, and right are 45x45
        { x: 0, y: 700, width: 45, height: 45 }, 
        { x: 45, y: 700, width: 45, height: 45 }, 
        { x: 90, y: 700, width: 45, height: 45 }, 
        { x: 135, y: 700, width: 45, height: 45 }, 
        { x: 180, y: 700, width: 45, height: 45 }, 
        { x: 225, y: 700, width: 45, height: 45 }, 
        { x: 270, y: 700, width: 45, height: 45 }, 
        { x: 315, y: 700, width: 45, height: 45 }, 
        { x: 360, y: 700, width: 45, height: 45 }, 
        { x: 405, y: 700, width: 45, height: 45 }, 
        { x: 450, y: 700, width: 45, height: 45 }, 
        { x: 495, y: 700, width: 45, height: 45 }, 
        { x: 540, y: 700, width: 45, height: 45 }, 
        { x: 585, y: 700, width: 45, height: 45 }, 
        { x: 630, y: 700, width: 45, height: 45 }, 
        { x: 675, y: 700, width: 45, height: 45 }, 
        { x: 720, y: 700, width: 45, height: 45 }, 
        { x: 765, y: 700, width: 45, height: 45 }, 
        { x: 810, y: 700, width: 45, height: 45 }, 
        { x: 855, y: 700, width: 45, height: 45 }, 
        { x: 900, y: 700, width: 45, height: 45 }, 
        { x: 945, y: 700, width: 45, height: 45 }, 
        { x: 990, y: 700, width: 45, height: 45 }, 
        { x: 545, y: 655, width: 45, height: 45 }, 

    ],
    grass_l: [
        { x: 500, y: 655, width: 45, height: 45 }, 
    ],
    grass_r: [
        { x: 590, y: 655, width: 45, height: 45 }, 
    ],
    crates: [
        { x: 635, y: 655, width: 45, height: 45 }, 
    ],
    chests: [
        { x: 500, y: 321, width: 32, height: 32 }, 
    ],
    grass_m_p: [
        { x: 350, y: 450, width: 45, height: 20 },
        { x: 245, y: 600, width: 45, height: 20 }, 
        { x: 545, y: 350, width: 45, height: 20 },
        { x: 745, y: 250, width: 45, height: 20 },
        { x: 920, y: 350, width: 45, height: 20 },
         
    ],
    grass_l_p: [
        { x: 305, y: 450, width: 45, height: 20 },
        { x: 200, y: 600, width: 45, height: 20 }, 
        { x: 500, y: 350, width: 45, height: 20 },
        { x: 700, y: 250, width: 45, height: 20 }, 
        { x: 875, y: 350, width: 45, height: 20 },
    ],
    grass_r_p: [
        { x: 395, y: 450, width: 45, height: 20 },
        { x: 290, y: 600, width: 45, height: 20 }, 
        { x: 590, y: 350, width: 45, height: 20 },
        { x: 790, y: 250, width: 45, height: 20 }, 
        { x: 965, y: 350, width: 45, height: 20 },
    ],
    artifacts: [{x: 795, y: 700}],
    coins: [{x: 635, y: 315}],
};

level1Scene1.objectives = [
    { pirates: level1Scene1.pirate.length + level1Scene1.ghostpirate.length, artifact: level1Scene1.artifacts.length, chests: level1Scene1.chests.length }
];

var level1Scene2 = {
    ghostpirate: [{ x: 59, y: 30, type: "sword" }, 
        { x: 100, y: 100 , type: "sword"},
        { x: 545, y: 620 , type: "sword"},
        { x: 350, y: 410 , type: "gun"}, 
        { x: 550, y: 321, type: "sword"},
        { x: 920, y: 350 , type: "sword"}],
    pirate: [],
    boss: [{}],
    grass_m: [
        //grassblockmiddle, left, and right are 45x45
        { x: 0, y: 700, width: 45, height: 45 }, 
        { x: 45, y: 700, width: 45, height: 45 }, 
        { x: 90, y: 700, width: 45, height: 45 }, 
        { x: 135, y: 700, width: 45, height: 45 }, 
        { x: 180, y: 700, width: 45, height: 45 }, 
        { x: 225, y: 700, width: 45, height: 45 }, 
        { x: 270, y: 700, width: 45, height: 45 }, 
        { x: 315, y: 700, width: 45, height: 45 }, 
        { x: 360, y: 700, width: 45, height: 45 }, 
         
        { x: 765, y: 700, width: 45, height: 45 }, 
        { x: 810, y: 700, width: 45, height: 45 }, 
        { x: 855, y: 700, width: 45, height: 45 }, 
        { x: 900, y: 700, width: 45, height: 45 }, 
        { x: 945, y: 700, width: 45, height: 45 }, 
        { x: 990, y: 700, width: 45, height: 45 }, 
        { x: 545, y: 655, width: 45, height: 45 }, 

    ],
    grass_l: [
        { x: 500, y: 655, width: 45, height: 45 }, 
        { x: 720, y: 700, width: 45, height: 45 },
    ],
    grass_r: [
        { x: 590, y: 655, width: 45, height: 45 }, 
        { x: 405, y: 700, width: 45, height: 45 }, 
    ],
    crates: [
        { x: 945, y: 655, width: 45, height: 45 }, 
    ],
    chests: [
        { x: 550, y: 321, width: 32, height: 32 }, 
        { x: 920, y: 350, width: 32, height: 32 }, 
        { x: 990, y: 655, width: 32, height: 32 }, 
    ],
    grass_m_p: [
        { x: 350, y: 450, width: 45, height: 20 },
        { x: 245, y: 600, width: 45, height: 20 }, 
        { x: 545, y: 350, width: 45, height: 20 },
        { x: 745, y: 250, width: 45, height: 20 },
        { x: 920, y: 350, width: 45, height: 20 },
         
    ],
    grass_l_p: [
        { x: 305, y: 450, width: 45, height: 20 },
        { x: 200, y: 600, width: 45, height: 20 }, 
        { x: 500, y: 350, width: 45, height: 20 },
        { x: 700, y: 250, width: 45, height: 20 }, 
        { x: 875, y: 350, width: 45, height: 20 },
    ],
    grass_r_p: [
        { x: 395, y: 450, width: 45, height: 20 },
        { x: 290, y: 600, width: 45, height: 20 }, 
        { x: 590, y: 350, width: 45, height: 20 },
        { x: 790, y: 250, width: 45, height: 20 }, 
        { x: 965, y: 350, width: 45, height: 20 },
    ],
    artifacts: [{x: 795, y: 700}], 
    coins: [
        {x: 200, y: 25},
        {x: 945, y: 620},
        {x: 545, y: 620},
        {x: 745, y: 250}
    ], 
};
level1Scene2.objectives = [
    { pirates: level1Scene2.pirate.length + level1Scene2.ghostpirate.length, artifact: level1Scene2.artifacts.length, chests: level1Scene2.chests.length }
];
var level1Scene3 = {
    ghostpirate: [ {x: 585, y: 700, type: "sword"}, 
        {x: 310, y: 255, type: "sword"}, 
        {x: 630, y: 455, type: "sword"}, 
        {x: 630, y: 55, type: "sword"},
         {x: 830, y: 355, type: "sword"}],
    pirate: [ {x: 315, y: 700}, 
        { x: 970, y: 500 , type: "sword"},
        {x: 630, y: 255, type: "sword"}, 
        {x: 310, y: 455, type: "sword"},
        {x: 310, y: 55, type: "sword"},
         {x: 90, y: 155, type: "sword"}, 
         {x: 135, y: 555, type: "sword"} ],
    boss: [{}],
    grass_m: [
        { x: 45, y: 700, width: 45, height: 45 }, 
        { x: 90, y: 700, width: 45, height: 45 }, 
        { x: 315, y: 700, width: 45, height: 45 },  
        { x: 360, y: 700, width: 45, height: 45 },  
        { x: 585, y: 700, width: 45, height: 45 },  
        { x: 630, y: 700, width: 45, height: 45 },  
        { x: 855, y: 700, width: 45, height: 45 },  
        { x: 900, y: 700, width: 45, height: 45 }, 
        
    ],
    grass_l: [
        { x: 0, y: 700, width: 45, height: 45 }, 
        { x: 270, y: 700, width: 45, height: 45 },  
        { x: 540, y: 700, width: 45, height: 45 },  
        { x: 810, y: 700, width: 45, height: 45 },  


    ],
    grass_r: [
        { x: 135, y: 700, width: 45, height: 45 }, 
        { x: 405, y: 700, width: 45, height: 45 },  
        { x: 675, y: 700, width: 45, height: 45 }, 
        { x: 945, y: 700, width: 45, height: 45 }, 
    ],
    crates: [
        { x: 360, y: 255, width: 45, height: 45 }, 
        { x: 580, y: 455, width: 45, height: 45 }, 
        { x: 580, y: 55, width: 45, height: 45 }, 
        { x: 830, y: 655, width: 45, height: 45 },
    ],
    chests: [
        { x: 830, y: 355, width: 32, height: 32 }, 
        { x: 90, y: 155, width: 32, height: 32 }, 
    ],
    grass_m_p: [

        { x: 315, y: 500, width: 45, height: 20 },  
        { x: 360, y: 500, width: 45, height: 20 },  
        { x: 585, y: 500, width: 45, height: 20 },  
        { x: 630, y: 500, width: 45, height: 20 },  
        { x: 315, y: 300, width: 45, height: 20 },  
        { x: 360, y: 300, width: 45, height: 20 },  
        { x: 585, y: 300, width: 45, height: 20 },  
        { x: 630, y: 300, width: 45, height: 20 },  
        { x: 315, y: 100, width: 45, height: 20 },  
        { x: 360, y: 100, width: 45, height: 20 },  
        { x: 585, y: 100, width: 45, height: 20 },  
        { x: 630, y: 100, width: 45, height: 20 }, 
    ],
    grass_l_p: [
 
        { x: 90, y: 600, width: 45, height: 20 },
        { x: 270, y: 500, width: 45, height: 20 },
        { x: 540, y: 500, width: 45, height: 20 }, 
        { x: 810, y: 400, width: 45, height: 20 },
        { x: 90, y: 200, width: 45, height: 20 },
        { x: 270, y: 300, width: 45, height: 20 },
        { x: 540, y: 300, width: 45, height: 20 }, 
        { x: 270, y: 100, width: 45, height: 20 },
        { x: 540, y: 100, width: 45, height: 20 },
        { x: 810, y: 100, width: 45, height: 20 },
        
    ],
    grass_r_p: [

        { x: 135, y: 600, width: 45, height: 20 },
        { x: 405, y: 500, width: 45, height: 20 },
        { x: 675, y: 500, width: 45, height: 20 },
        { x: 855, y: 400, width: 45, height: 20 }, 
        { x: 135, y: 200, width: 45, height: 20 },
        { x: 405, y: 300, width: 45, height: 20 },
        { x: 675, y: 300, width: 45, height: 20 },
        { x: 405, y: 100, width: 45, height: 20 },
        { x: 675, y: 100, width: 45, height: 20 },
        { x: 855, y: 100, width: 45, height: 20 }, 
        
    ],
    artifacts: [{ x: 855, y: 30, width: 45, height: 20 }, ], 
    coins: [
    ], 
};
level1Scene3.objectives = [
    { pirates: level1Scene3.pirate.length + level1Scene3.ghostpirate.length, artifact: level1Scene3.artifacts.length, chests: level1Scene3.chests.length }
];
var level1Scene4 = {
    ghostpirate: [{ x: 295, y: 500 }, 
        { x: 100, y: 400 , type: "sword"},
        { x: 970, y: 500 , type: "sword"}],
    pirate: [{ x: 135, y: 700 , type: "sword"}, 
        { x: 360, y: 700 , type: "sword"},
         { x: 540, y: 600 , type: "sword"},
          { x: 295, y: 300 , type: "sword"},
           { x: 475, y: 150, type: "sword"}],
    boss: [{}],
    grass_m: [
        //grassblockmiddle, left, and right are 45x45

        { x: 45, y: 700, width: 45, height: 45 }, 
        { x: 90, y: 700, width: 45, height: 45 }, 
        { x: 135, y: 700, width: 45, height: 45 }, 
        { x: 765, y: 500, width: 45, height: 45 }, 
        { x: 810, y: 500, width: 45, height: 45 }, 
        { x: 855, y: 500, width: 45, height: 45 }, 
        { x: 900, y: 500, width: 45, height: 45 }, 
        { x: 945, y: 500, width: 45, height: 45 }, 
        { x: 990, y: 500, width: 45, height: 45 },     
    ],
    grass_l: [
        { x: 0, y: 700, width: 45, height: 45 }, 
        { x: 720, y: 500, width: 45, height: 45 }, 


    ],
    grass_r: [
        { x: 180, y: 700, width: 45, height: 45 }, 
    ],
    crates: [
        { x: 360, y: 700, width: 45, height: 45 }, 
        { x: 405, y: 700, width: 45, height: 45 }, 
        { x: 250, y: 300, width: 45, height: 45 }, 
        { x: 295, y: 300, width: 45, height: 45 }, 
        { x: 855, y: 455, width: 45, height: 45 }, 
        { x: 810, y: 455, width: 45, height: 45 }, 
        { x: 810, y: 410, width: 45, height: 45 }, 
        { x: 855, y: 410, width: 45, height: 45 }, 
        { x: 765, y: 455, width: 45, height: 45 }, 
        { x: 765, y: 410, width: 45, height: 45 }, 
        { x: 765, y: 365, width: 45, height: 45 }, 
    ],
    chests: [
        { x: 733, y: 455, width: 32, height: 32 }, 
        { x: 50, y: 400, width: 32, height: 32 }, 
    ],
    grass_m_p: [
        { x: 540, y: 600, width: 45, height: 20 }, 
        { x: 585, y: 600, width: 45, height: 20 },
        { x: 295, y: 500, width: 45, height: 20 }, 
        { x: 95, y: 400, width: 45, height: 20 },
        { x: 430, y: 200, width: 45, height: 20 },
        { x: 475, y: 200, width: 45, height: 20 },
        { x: 520, y: 200, width: 45, height: 20 }
         
    ],
    grass_l_p: [
        { x: 495, y: 600, width: 45, height: 20 }, 
        { x: 250, y: 500, width: 45, height: 20 }, 
        { x: 50, y: 400, width: 45, height: 20 },
        { x: 385, y: 200, width: 45, height: 20 }
    ],
    grass_r_p: [
        { x: 630, y: 600, width: 45, height: 20 },
        { x: 340, y: 500, width: 45, height: 20 }, 
        { x: 140, y: 400, width: 45, height: 20 },
        { x: 565, y: 200, width: 45, height: 20 }
    ],
    artifacts: [{ x: 990, y: 500}], 
    coins: [
        {x: 450, y: 25},
        {x: 350, y: 400},
        {x: 777, y: 455},
        {x: 822, y: 500},
        {x: 867, y: 455},
        {x: 430, y: 500},
        {x: 550, y: 400},
    ], 
};
level1Scene4.objectives = [
    { pirates: level1Scene4.pirate.length + level1Scene4.ghostpirate.length, artifact: level1Scene4.artifacts.length, chests: level1Scene4.chests.length }
];


var bosslevel1 = {
    ghostpirate: [{ x: 295, y: 500 }, { x: 100, y: 400 },{ x: 970, y: 500 }],
    pirate: [{ x: 135, y: 700 }, { x: 360, y: 700 }, { x: 540, y: 600 }, { x: 295, y: 300 }, { x: 475, y: 150}],
    boss: [{x: 700, y: 200 }],
    grass_m: [
        //grassblockmiddle, left, and right are 45x45
        { x: 45, y: 700, width: 45, height: 45 }, 
        { x: 90, y: 700, width: 45, height: 45 }, 
        { x: 135, y: 700, width: 45, height: 45 }, 
        { x: 765, y: 500, width: 45, height: 45 }, 
        { x: 810, y: 500, width: 45, height: 45 }, 
        { x: 855, y: 500, width: 45, height: 45 }, 
        { x: 900, y: 500, width: 45, height: 45 }, 
        { x: 945, y: 500, width: 45, height: 45 }, 
        { x: 990, y: 500, width: 45, height: 45 },     
    ],
    grass_l: [
        { x: 0, y: 700, width: 45, height: 45 }, 
        { x: 720, y: 500, width: 45, height: 45 }, 


    ],
    grass_r: [
        { x: 180, y: 700, width: 45, height: 45 }, 
    ],
    crates: [
        { x: 360, y: 700, width: 45, height: 45 }, 
        { x: 405, y: 700, width: 45, height: 45 }, 
        { x: 250, y: 300, width: 45, height: 45 }, 
        { x: 295, y: 300, width: 45, height: 45 }, 
        { x: 855, y: 455, width: 45, height: 45 }, 
        { x: 810, y: 455, width: 45, height: 45 }, 
        { x: 810, y: 410, width: 45, height: 45 }, 
        { x: 855, y: 410, width: 45, height: 45 }, 
        { x: 765, y: 455, width: 45, height: 45 }, 
        { x: 765, y: 410, width: 45, height: 45 }, 
        { x: 765, y: 365, width: 45, height: 45 }, 
    ],
    chests: [
        { x: 733, y: 455, width: 32, height: 32 }, 
        { x: 50, y: 400, width: 32, height: 32 }, 
    ],
    grass_m_p: [
        { x: 540, y: 600, width: 45, height: 20 }, 
        { x: 585, y: 600, width: 45, height: 20 },
        { x: 295, y: 500, width: 45, height: 20 }, 
        { x: 95, y: 400, width: 45, height: 20 },
        { x: 430, y: 200, width: 45, height: 20 },
        { x: 475, y: 200, width: 45, height: 20 },
        { x: 520, y: 200, width: 45, height: 20 }
         
    ],
    grass_l_p: [
        { x: 495, y: 600, width: 45, height: 20 }, 
        { x: 250, y: 500, width: 45, height: 20 }, 
        { x: 50, y: 400, width: 45, height: 20 },
        { x: 385, y: 200, width: 45, height: 20 }
    ],
    grass_r_p: [
        { x: 630, y: 600, width: 45, height: 20 },
        { x: 340, y: 500, width: 45, height: 20 }, 
        { x: 140, y: 400, width: 45, height: 20 },
        { x: 565, y: 200, width: 45, height: 20 }
    ],
    artifacts: [{ x: 990, y: 500}], 
    coins: [
        {x: 450, y: 25},
        {x: 350, y: 400},
        {x: 777, y: 455},
        {x: 822, y: 500},
        {x: 867, y: 455},
        {x: 430, y: 500},
        {x: 550, y: 400},
    ], 
};
bosslevel1.objectives = [
    { pirates: bosslevel1.pirate.length + bosslevel1.ghostpirate.length, boss: bosslevel1.boss.length, chests: bosslevel1.chests.length }
];