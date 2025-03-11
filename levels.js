//LEVELS 1-2 | JUNGLE AND BOSS IN LEVEL 2
var level1Scene1  = {
    shop: [],
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
    artifacts: [],
    coins: [{x: 635, y: 315}],
    potions:[{x: 650, y: 315}],
};

level1Scene1.objectives = [
    { enemies: level1Scene1.pirate.length + level1Scene1.ghostpirate.length, artifact: level1Scene1.artifacts.length, chests: level1Scene1.chests.length }
];

var level1Scene2 = {
    shop: [{x: 350, y: 400}],
    ghostpirate: [{ x: 59, y: 30, type: "sword" }, 
        { x: 100, y: 100 , type: "sword"},
        { x: 545, y: 620 , type: "sword"},
        { x: 350, y: 410 , type: "gun"}, 
        { x: 550, y: 321, type: "sword"},
        { x: 920, y: 350 , type: "sword"}],
    pirate: [],
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
    { enemies: level1Scene2.pirate.length + level1Scene2.ghostpirate.length, artifact: level1Scene2.artifacts.length, chests: level1Scene2.chests.length }
];
var level1Scene3 = {
    shop: [],
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
    boss: [],
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
    artifacts: [], 
    coins: [
    ], 
};
level1Scene3.objectives = [
    { enemies: level1Scene3.pirate.length + level1Scene3.ghostpirate.length, artifact: level1Scene3.artifacts.length, chests: level1Scene3.chests.length }
];
var level1Scene4 = {
    shop: [{x: 540, y: 550}],
    ghostpirate: [{ x: 295, y: 500 }, 
        { x: 100, y: 400 , type: "sword"},
        { x: 970, y: 500 , type: "sword"}],
    pirate: [{ x: 135, y: 700 , type: "sword"}, 
        { x: 360, y: 700 , type: "sword"},
         { x: 540, y: 600 , type: "sword"},
          { x: 295, y: 300 , type: "sword"},
           { x: 475, y: 150, type: "sword"}],
    boss: [],
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
    { enemies: level1Scene4.pirate.length + level1Scene4.ghostpirate.length, artifact: level1Scene4.artifacts.length, chests: level1Scene4.chests.length }
];

var level2Scene1  = {
    shop: [],
    ghostpirate: [
        { x: 150, y: 120, type: "gun" },
        { x: 750, y: 150, type: "gun" },
    ],
    pirate: [
        { x: 300, y: 50, type: "sword" }, 
        { x: 850, y: 90, type: "gun" },
        { x: 450, y: 200, type: "sword" }, 
        { x: 650, y: 250, type: "sword" },
    ],
    boss: [],
    grass_m: [
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
    ],
    grass_l: [
    ],
    grass_r: [
        { x: 855, y: 700, width: 45, height: 45 },
    ],
    crates: [
        { x: 600, y: 655, width: 45, height: 45 },
        { x: 400, y: 500, width: 45, height: 45 },
        { x: 445, y: 500, width: 45, height: 45 },
    ],
    chests: [
        { x: 750, y: 300, width: 32, height: 32 },
    ],
    grass_m_p: [
        { x: 320, y: 600, width: 45, height: 20 },
        { x: 600, y: 350, width: 45, height: 20 },
        { x: 820, y: 250, width: 45, height: 20 },
    ],
    grass_l_p: [
        { x: 275, y: 600, width: 45, height: 20 },
        { x: 555, y: 350, width: 45, height: 20 },
        { x: 775, y: 250, width: 45, height: 20 },
    ],
    grass_r_p: [
        { x: 365, y: 600, width: 45, height: 20 },
        { x: 645, y: 350, width: 45, height: 20 },
        { x: 865, y: 250, width: 45, height: 20 },
    ],
    artifacts: [],
    coins: [{ x: 620, y: 315 }],
    potions: [{ x: 635, y: 315 }],
};


level2Scene1.objectives = [
    { enemies: level2Scene1.pirate.length + level2Scene1.ghostpirate.length, artifact: level2Scene1.artifacts.length, chests: level2Scene1.chests.length }
];

var level2Scene2 = {
    shop: [{x: 578, y: 505}],
    ghostpirate: [{ x: 59, y: 30, type: "sword" }, 
        { x: 500, y: 100 , type: "sword"},
        { x: 545, y: 660 , type: "sword"},
        { x: 350, y: 410 , type: "gun"}, 
        { x: 550, y: 321, type: "sword"},
        { x: 920, y: 350 , type: "sword"}],
    pirate: [{ x: 700 , y: 610, type: "sword" }, 
        { x: 800, y: 610 , type: "sword"}
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
    ],
    chests: [
        { x:855, y: 568, width: 32, height: 32 }, 
        { x: 200, y: 668, width: 32, height: 32 }, 
    ],
    grass_m_p: [
        { x: 720, y: 550, width: 45, height: 20 }, 
        { x: 675, y: 550, width: 45, height: 20 }, 
        { x: 630, y: 550, width: 45, height: 20 }, 
        { x: 585, y: 550, width: 45, height: 20 }, 
        { x: 540, y: 550, width: 45, height: 20 }, 
        { x: 495, y: 550, width: 45, height: 20 }, 
        { x: 765, y: 550, width: 45, height: 20 }, 
        { x: 810, y: 550, width: 45, height: 20 }, 
        { x: 855, y: 550, width: 45, height: 20 }, 
        { x: 900, y: 550, width: 45, height: 20 }, 
        { x: 945, y: 550, width: 45, height: 20 }, 
        { x: 990, y: 550, width: 45, height: 20 }, 
         
    ],
    grass_l_p: [
        { x: 450, y: 550, width: 45, height: 20 },

    ],
    grass_r_p: [
  
    ],
    artifacts: [{x: 795, y: 500}], 
    coins: [
    ], 
};
level2Scene2.objectives = [
    { enemies: level2Scene2.pirate.length + level2Scene2.ghostpirate.length, artifact: level2Scene2.artifacts.length, chests: level2Scene2.chests.length }
];
var level2Scene3 = {
    shop: [],
    ghostpirate: [
        {x: 585, y: 600, type: "sword"}, 
        {x: 310, y: 255, type: "sword"}, 
        {x: 630, y: 455, type: "sword"}, 
        {x: 780, y: 155, type: "sword"},
        {x: 400, y: 355, type: "sword"}
    ],
    pirate: [
        {x: 315, y: 700}, 
        {x: 970, y: 500, type: "sword"},
        {x: 630, y: 255, type: "sword"}, 
        {x: 310, y: 455, type: "sword"},
        {x: 150, y: 355, type: "sword"},
        {x: 90, y: 155, type: "sword"}, 
        {x: 490, y: 555, type: "sword"}
    ],
    boss: [],
    grass_m: [
        // Ground level blocks
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
        { x: 945, y: 700, width: 45, height: 45 }
    ],
    grass_l: [

    ],
    grass_r: [
 
    ],
    crates: [
        { x: 360, y: 255, width: 45, height: 45 }, 
        { x: 580, y: 455, width: 45, height: 45 }, 
        { x: 580, y: 55, width: 45, height: 45 }, 
        { x: 830, y: 655, width: 45, height: 45 }
    ],
    chests: [
        { x: 275, y: 450, width: 32, height: 32 },
        { x: 590, y: 150, width: 32, height: 32 }
    ],
    // Zigzag platform pattern
    grass_m_p: [
        // First zigzag pattern
        { x: 135, y: 600, width: 45, height: 20 },
        { x: 180, y: 600, width: 45, height: 20 },
        
        { x: 270, y: 500, width: 45, height: 20 },
        { x: 315, y: 500, width: 45, height: 20 },
        
        { x: 405, y: 400, width: 45, height: 20 },
        { x: 450, y: 400, width: 45, height: 20 },
        
        // Second zigzag pattern
        { x: 585, y: 500, width: 45, height: 20 },
        { x: 630, y: 500, width: 45, height: 20 },
        
        { x: 720, y: 400, width: 45, height: 20 },
        { x: 765, y: 400, width: 45, height: 20 },
        
        { x: 855, y: 300, width: 45, height: 20 },
        { x: 900, y: 300, width: 45, height: 20 },
        
   
        { x: 315, y: 300, width: 45, height: 20 },
        { x: 360, y: 300, width: 45, height: 20 },
        { x: 405, y: 300, width: 45, height: 20 },
        
        { x: 585, y: 200, width: 45, height: 20 },
        { x: 630, y: 200, width: 45, height: 20 },
        { x: 675, y: 200, width: 45, height: 20 },
        

        { x: 225, y: 150, width: 45, height: 20 },
        { x: 270, y: 150, width: 45, height: 20 },
        
        { x: 720, y: 150, width: 45, height: 20 },
        { x: 765, y: 150, width: 45, height: 20 }
    ],
    grass_l_p: [
    
        { x: 90, y: 600, width: 45, height: 20 },
        { x: 225, y: 500, width: 45, height: 20 },
        { x: 360, y: 400, width: 45, height: 20 },
        
        { x: 540, y: 500, width: 45, height: 20 },
        { x: 675, y: 400, width: 45, height: 20 },
        { x: 810, y: 300, width: 45, height: 20 },
        
        { x: 270, y: 300, width: 45, height: 20 },
        { x: 540, y: 200, width: 45, height: 20 },
        
        { x: 180, y: 150, width: 45, height: 20 },
        { x: 675, y: 150, width: 45, height: 20 }
    ],
    grass_r_p: [
   
        { x: 225, y: 600, width: 45, height: 20 },
        { x: 360, y: 500, width: 45, height: 20 },
        { x: 495, y: 400, width: 45, height: 20 },
        
        { x: 675, y: 500, width: 45, height: 20 },
        { x: 810, y: 400, width: 45, height: 20 },
        { x: 945, y: 300, width: 45, height: 20 },
        
        { x: 450, y: 300, width: 45, height: 20 },
        { x: 720, y: 200, width: 45, height: 20 },
        
        { x: 315, y: 150, width: 45, height: 20 },
        { x: 810, y: 150, width: 45, height: 20 }
    ],
    artifacts: [], 
    coins: []
};
level2Scene3.objectives = [
    { enemies: level2Scene3.pirate.length + level2Scene3.ghostpirate.length, artifact: level2Scene3.artifacts.length, chests: level2Scene3.chests.length }
];

var level2Scene4 = {
    shop: [{x: 540, y: 550}],
    ghostpirate: [
        { x: 295, y: 500 }, 
        { x: 100, y: 400, type: "sword"},
        { x: 800, y: 300, type: "sword"},
        { x: 500, y: 250, type: "sword"}
    ],
    pirate: [
        { x: 135, y: 700, type: "sword"}, 
        { x: 360, y: 700, type: "sword"},
        { x: 540, y: 600, type: "sword"},
        { x: 295, y: 300, type: "sword"},
        { x: 650, y: 400, type: "sword"},
        { x: 475, y: 150, type: "sword"}
    ],
    boss: [],
    grass_m: [
        // Ground level
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
        { x: 945, y: 700, width: 45, height: 45 }
    ],
    grass_l: [
        
    ],
    grass_r: [
        
    ],
    crates: [

    ],
    chests: [
        { x: 310, y: 200, width: 32, height: 32 },
        { x: 745, y: 250, width: 32, height: 32 }
    ],

    grass_m_p: [
        // Central spiral platforms
        { x: 450, y: 600, width: 45, height: 20 },
        { x: 495, y: 600, width: 45, height: 20 },
        { x: 540, y: 600, width: 45, height: 20 },
        { x: 585, y: 600, width: 45, height: 20 },
        
        // Left side spiral
        { x: 270, y: 550, width: 45, height: 20 },
        { x: 315, y: 550, width: 45, height: 20 },
        { x: 360, y: 550, width: 45, height: 20 },
        
        { x: 180, y: 500, width: 45, height: 20 },
        { x: 225, y: 500, width: 45, height: 20 },
        { x: 270, y: 500, width: 45, height: 20 },
        
        { x: 90, y: 450, width: 45, height: 20 },
        { x: 135, y: 450, width: 45, height: 20 },
        
        // Right side spiral
        { x: 675, y: 550, width: 45, height: 20 },
        { x: 720, y: 550, width: 45, height: 20 },
        
        { x: 720, y: 500, width: 45, height: 20 },
        { x: 765, y: 500, width: 45, height: 20 },
        { x: 810, y: 500, width: 45, height: 20 },
        
        // Middle platforms
        { x: 360, y: 400, width: 45, height: 20 },
        { x: 405, y: 400, width: 45, height: 20 },
        { x: 450, y: 400, width: 45, height: 20 },
        
        { x: 540, y: 350, width: 45, height: 20 },
        { x: 585, y: 350, width: 45, height: 20 },
        { x: 630, y: 350, width: 45, height: 20 },
        
        // Upper platforms
        { x: 295, y: 250, width: 45, height: 20 },
        { x: 430, y: 200, width: 45, height: 20 },
        { x: 475, y: 200, width: 45, height: 20 },
        { x: 520, y: 200, width: 45, height: 20 },
        { x: 745, y: 300, width: 45, height: 20 }
    ],
    grass_l_p: [
        // Left edge platforms
        { x: 405, y: 600, width: 45, height: 20 },
        { x: 225, y: 550, width: 45, height: 20 },
        { x: 135, y: 500, width: 45, height: 20 },
        { x: 45, y: 450, width: 45, height: 20 },
        
        { x: 630, y: 550, width: 45, height: 20 },
        { x: 675, y: 500, width: 45, height: 20 },
        
        { x: 315, y: 400, width: 45, height: 20 },
        { x: 495, y: 350, width: 45, height: 20 },
        
        { x: 250, y: 250, width: 45, height: 20 },
        { x: 385, y: 200, width: 45, height: 20 },
        { x: 700, y: 300, width: 45, height: 20 }
    ],
    grass_r_p: [
        // Right edge platforms
        { x: 630, y: 600, width: 45, height: 20 },
        { x: 405, y: 550, width: 45, height: 20 },
        { x: 315, y: 500, width: 45, height: 20 },
        { x: 180, y: 450, width: 45, height: 20 },
        
        { x: 765, y: 550, width: 45, height: 20 },
        { x: 855, y: 500, width: 45, height: 20 },
        
        { x: 495, y: 400, width: 45, height: 20 },
        { x: 675, y: 350, width: 45, height: 20 },
        
        { x: 340, y: 250, width: 45, height: 20 },
        { x: 565, y: 200, width: 45, height: 20 },
        { x: 790, y: 300, width: 45, height: 20 }
    ],
    artifacts: [{ x: 810, y: 430, width: 45, height: 20 }],
    coins: [
        {x: 450, y: 300},
        {x: 350, y: 500},
        {x: 600, y: 300},
        {x: 200, y: 450},
        {x: 777, y: 455},
        {x: 822, y: 350},
        {x: 867, y: 455},
        {x: 430, y: 500},
        {x: 550, y: 400}
    ]
};
level2Scene4.objectives = [
    { enemies: level2Scene4.pirate.length + level2Scene4.ghostpirate.length, artifact: level2Scene4.artifacts.length, chests: level2Scene4.chests.length }
];

//LEVEL 2 BOSS
var bosslevel2= {
    shop: [{x: 135, y: 500}],
    ghostpirate: [],
    pirate: [],
    boss: [{x: 500, y: 200}],
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
    ],
    grass_l: [
        { x: 0, y: 700, width: 45, height: 45 }, 
        
    ],
    grass_r: [
        { x: 180, y: 700, width: 45, height: 45 }, 
    ],
    crates: [
    ],
    chests: [
    ],
    grass_m_p: [
        { x: 90, y: 550, width: 45, height: 20 }, 
        { x: 135, y: 550, width: 45, height: 20 }, 
        { x: 180, y: 550, width: 45, height: 20 }, 
        { x: 745, y: 550, width: 45, height: 20 }, 
        { x: 790, y: 550, width: 45, height: 20 }, 
        { x: 835, y: 550, width: 45, height: 20 }, 
         
    ],
    grass_l_p: [
        { x: 45, y: 550, width: 45, height: 20 }, 
        { x: 700, y: 550, width: 45, height: 20 }, 

    ],
    grass_r_p: [
        { x: 225, y: 550, width: 45, height: 20 }, 
        { x: 880, y: 550, width: 45, height: 20 }, 
    ],
    artifacts: [], 
    coins: [], 
};
bosslevel2.objectives = [
    {boss: 1, artifact: 1, bosslevel: true}
];





//LEVEL 3 - WESTERN
var level3Scene1  = {
    ghostpirate: [],
    pirate: [],
    boss: [],
    grass_m: [],
    grass_l: [],
    grass_r: [],
    native: [{ x: 100, y: 100}],
    cactus: [{ x: 200, y: 100}],
    outlaw: [{ x: 200, y: 30, type: "sword" }, 
        { x: 800, y: 100 , type: "sword"},
        { x: 400, y: 100 , type: "gun"}, 
        { x: 600, y: 212, type: "sword"}
    ],
    sand_floor: [
        { x: 0, y: 700, width: 40, height: 40 },
        { x: 40, y: 700, width: 40, height: 40 },
        { x: 80, y: 700, width: 40, height: 40 },
        { x: 120, y: 700, width: 40, height: 40 },
        { x: 160, y: 700, width: 40, height: 40 },
        { x: 200, y: 700, width: 40, height: 40 },
        { x: 240, y: 700, width: 40, height: 40 },
        { x: 280, y: 700, width: 40, height: 40 },
        { x: 320, y: 700, width: 40, height: 40 },
        { x: 360, y: 700, width: 40, height: 40 },
        { x: 400, y: 700, width: 40, height: 40 },
        { x: 440, y: 700, width: 40, height: 40 },
        { x: 480, y: 700, width: 40, height: 40 },
        { x: 520, y: 700, width: 40, height: 40 },
        { x: 560, y: 700, width: 40, height: 40 },
        { x: 600, y: 700, width: 40, height: 40 },
        { x: 640, y: 700, width: 40, height: 40 },
        { x: 680, y: 700, width: 40, height: 40 },
        { x: 720, y: 700, width: 40, height: 40 },
        { x: 760, y: 700, width: 40, height: 40 },
        { x: 800, y: 700, width: 40, height: 40 },
        { x: 840, y: 700, width: 40, height: 40 },
        { x: 880, y: 700, width: 40, height: 40 },
        { x: 920, y: 700, width: 40, height: 40 },
        { x: 960, y: 700, width: 40, height: 40 },
        { x: 1000, y: 700, width: 40, height: 40 },
    ],
    sand_m: [
        {x: 565, y: 600, width: 45, height: 20},
        {x: 610, y: 600, width: 45, height: 20},
        {x: 655, y: 600, width: 45, height: 20},
        {x: 700, y: 600, width: 45, height: 20},
        {x: 745, y: 600, width: 45, height: 20},
    ],
    sand_r: [
        {x: 790, y: 600, width: 45, height: 20}
    ],
    sand_l: [
        {x: 520, y: 600, width: 45, height: 20}
    ],
    
    crates: [
        { x: 700, y: 555, width: 45, height: 45 }, 
    ],
    chests: [
        { x: 700, y: 523, width: 32, height: 32 }, 
    ],
    grass_m_p: [],
    grass_l_p: [],
    grass_r_p: [],
    artifacts: [{x: 400, y: 100}], //new artifcact?
    coins: [{x: 635, y: 315}],
    potions:[{x: 650, y: 315}],
};

level3Scene1.objectives = [
    { enemies: level3Scene1.native.length + level3Scene1.outlaw.length + level3Scene1.cactus.length, artifact: level3Scene1.artifacts.length, chests: level3Scene1.chests.length }
];

// LEVEL 3 - WESTERN - SCENE 2
var level3Scene2 = {
    ghostpirate: [],
    pirate: [],
    boss: [],
    grass_m: [],
    grass_l: [],
    grass_r: [],
    native: [
        { x: 300, y: 120 },
        { x: 500, y: 100 },
        { x: 750, y: 150 }
    ],
    cactus: [
        { x: 150, y: 100 },
        { x: 450, y: 100 },
        { x: 800, y: 100 }
    ],
    outlaw: [
        { x: 200, y: 80, type: "gun" }, 
        { x: 380, y: 120, type: "sword" },
        { x: 600, y: 100, type: "gun" }, 
        { x: 700, y: 150, type: "sword" },
        { x: 850, y: 120, type: "gun" }
    ],
    sand_floor: [
        { x: 0, y: 700, width: 40, height: 40 },
        { x: 40, y: 700, width: 40, height: 40 },
        { x: 80, y: 700, width: 40, height: 40 },
        { x: 120, y: 700, width: 40, height: 40 },
        { x: 160, y: 700, width: 40, height: 40 },
        { x: 200, y: 700, width: 40, height: 40 },
        { x: 240, y: 700, width: 40, height: 40 },
        { x: 280, y: 700, width: 40, height: 40 },
        { x: 320, y: 700, width: 40, height: 40 },
        { x: 360, y: 700, width: 40, height: 40 },
        { x: 400, y: 700, width: 40, height: 40 },
        { x: 440, y: 700, width: 40, height: 40 },
        { x: 480, y: 700, width: 40, height: 40 },
        { x: 520, y: 700, width: 40, height: 40 },
        { x: 560, y: 700, width: 40, height: 40 },
        { x: 600, y: 700, width: 40, height: 40 },
        { x: 640, y: 700, width: 40, height: 40 },
        { x: 680, y: 700, width: 40, height: 40 },
        { x: 720, y: 700, width: 40, height: 40 },
        { x: 760, y: 700, width: 40, height: 40 },
        { x: 800, y: 700, width: 40, height: 40 },
        { x: 840, y: 700, width: 40, height: 40 },
        { x: 880, y: 700, width: 40, height: 40 },
        { x: 920, y: 700, width: 40, height: 40 },
        { x: 960, y: 700, width: 40, height: 40 },
        { x: 1000, y: 700, width: 40, height: 40 }
    ],
    sand_m: [
        // Main platform in the middle
        { x: 200, y: 550, width: 45, height: 20 },
        { x: 245, y: 550, width: 45, height: 20 },
        { x: 290, y: 550, width: 45, height: 20 },
        { x: 335, y: 550, width: 45, height: 20 },
        // Second platform
        { x: 500, y: 450, width: 45, height: 20 },
        { x: 545, y: 450, width: 45, height: 20 },
        { x: 590, y: 450, width: 45, height: 20 },
        // Third platform
        { x: 700, y: 500, width: 45, height: 20 },
        { x: 745, y: 500, width: 45, height: 20 }
    ],
    sand_r: [
        { x: 380, y: 550, width: 45, height: 20 },
        { x: 635, y: 450, width: 45, height: 20 },
        { x: 790, y: 500, width: 45, height: 20 }
    ],
    sand_l: [
        { x: 155, y: 550, width: 45, height: 20 },
        { x: 455, y: 450, width: 45, height: 20 },
        { x: 655, y: 500, width: 45, height: 20 }
    ],
    crates: [
        { x: 335, y: 505, width: 45, height: 45 },
        { x: 590, y: 405, width: 45, height: 45 }
    ],
    chests: [
        { x: 335, y: 473, width: 32, height: 32 },
        { x: 745, y: 468, width: 32, height: 32 }
    ],
    grass_m_p: [],
    grass_l_p: [],
    grass_r_p: [],
    artifacts: [{ x: 590, y: 380 }],
    coins: [
        { x: 245, y: 520 },
        { x: 500, y: 420 },
        { x: 745, y: 470 }
    ],
    potions: [
        { x: 290, y: 520 },
        { x: 700, y: 470 }
    ]
};

// LEVEL 3 - WESTERN - SCENE 3
var level3Scene3 = {
    ghostpirate: [],
    pirate: [],
    boss: [],
    grass_m: [],
    grass_l: [],
    grass_r: [],
    native: [
        { x: 150, y: 120 },
        { x: 400, y: 100 },
        { x: 650, y: 150 },
        { x: 850, y: 120 }
    ],
    cactus: [
        { x: 100, y: 100 },
        { x: 300, y: 100 },
        { x: 550, y: 100 },
        { x: 750, y: 100 },
        { x: 900, y: 100 }
    ],
    outlaw: [
        { x: 200, y: 30, type: "sword" }, 
        { x: 350, y: 80, type: "gun" },
        { x: 480, y: 100, type: "sword" }, 
        { x: 600, y: 80, type: "gun" },
        { x: 720, y: 100, type: "sword" }, 
        { x: 800, y: 80, type: "gun" }
    ],
    sand_floor: [
        { x: 0, y: 700, width: 40, height: 40 },
        { x: 40, y: 700, width: 40, height: 40 },
        { x: 80, y: 700, width: 40, height: 40 },
        { x: 120, y: 700, width: 40, height: 40 },
        { x: 160, y: 700, width: 40, height: 40 },
        { x: 200, y: 700, width: 40, height: 40 },
        { x: 240, y: 700, width: 40, height: 40 },
        { x: 280, y: 700, width: 40, height: 40 },
        { x: 320, y: 700, width: 40, height: 40 },
        { x: 360, y: 700, width: 40, height: 40 },
        { x: 400, y: 700, width: 40, height: 40 },
        { x: 440, y: 700, width: 40, height: 40 },
        { x: 480, y: 700, width: 40, height: 40 },
        { x: 520, y: 700, width: 40, height: 40 },
        { x: 560, y: 700, width: 40, height: 40 },
        { x: 600, y: 700, width: 40, height: 40 },
        { x: 640, y: 700, width: 40, height: 40 },
        { x: 680, y: 700, width: 40, height: 40 },
        { x: 720, y: 700, width: 40, height: 40 },
        { x: 760, y: 700, width: 40, height: 40 },
        { x: 800, y: 700, width: 40, height: 40 },
        { x: 840, y: 700, width: 40, height: 40 },
        { x: 880, y: 700, width: 40, height: 40 },
        { x: 920, y: 700, width: 40, height: 40 },
        { x: 960, y: 700, width: 40, height: 40 },
        { x: 1000, y: 700, width: 40, height: 40 }
    ],
    sand_m: [
        // Staggered platforms for climbing
        // First platform
        { x: 100, y: 600, width: 45, height: 20 },
        { x: 145, y: 600, width: 45, height: 20 },
        // Second platform
        { x: 250, y: 550, width: 45, height: 20 },
        { x: 295, y: 550, width: 45, height: 20 },
        // Third platform
        { x: 400, y: 500, width: 45, height: 20 },
        { x: 445, y: 500, width: 45, height: 20 },
        // Fourth platform
        { x: 550, y: 450, width: 45, height: 20 },
        { x: 595, y: 450, width: 45, height: 20 },
        // Fifth platform
        { x: 700, y: 400, width: 45, height: 20 },
        { x: 745, y: 400, width: 45, height: 20 }
    ],
    sand_r: [
        { x: 190, y: 600, width: 45, height: 20 },
        { x: 340, y: 550, width: 45, height: 20 },
        { x: 490, y: 500, width: 45, height: 20 },
        { x: 640, y: 450, width: 45, height: 20 },
        { x: 790, y: 400, width: 45, height: 20 }
    ],
    sand_l: [
        { x: 55, y: 600, width: 45, height: 20 },
        { x: 205, y: 550, width: 45, height: 20 },
        { x: 355, y: 500, width: 45, height: 20 },
        { x: 505, y: 450, width: 45, height: 20 },
        { x: 655, y: 400, width: 45, height: 20 }
    ],
    crates: [
        { x: 145, y: 555, width: 45, height: 45 },
        { x: 445, y: 455, width: 45, height: 45 },
        { x: 745, y: 355, width: 45, height: 45 }
    ],
    chests: [
        { x: 145, y: 523, width: 32, height: 32 },
        { x: 445, y: 423, width: 32, height: 32 },
        { x: 745, y: 323, width: 32, height: 32 }
    ],
    grass_m_p: [],
    grass_l_p: [],
    grass_r_p: [],
    artifacts: [{ x: 700, y: 350 }],
    coins: [
        { x: 100, y: 570 },
        { x: 250, y: 520 },
        { x: 400, y: 470 },
        { x: 550, y: 420 },
        { x: 700, y: 370 }
    ],
    potions: [
        { x: 190, y: 570 },
        { x: 490, y: 470 },
        { x: 790, y: 370 }
    ]
};

// LEVEL 3 - WESTERN - SCENE 4
var level3Scene4 = {
    ghostpirate: [],
    pirate: [],
    boss: [],
    grass_m: [],
    grass_l: [],
    grass_r: [],
    native: [
        { x: 200, y: 120 },
        { x: 300, y: 100 },
        { x: 700, y: 120 },
        { x: 800, y: 100 }
    ],
    cactus: [
        { x: 100, y: 100 },
        { x: 900, y: 100 }
    ],
    outlaw: [
        { x: 150, y: 80, type: "gun" },
        { x: 250, y: 100, type: "sword" }, 
        { x: 750, y: 100, type: "sword" }, 
        { x: 850, y: 80, type: "gun" }
    ],
    sand_floor: [
        { x: 0, y: 700, width: 40, height: 40 },
        { x: 40, y: 700, width: 40, height: 40 },
        { x: 80, y: 700, width: 40, height: 40 },
        { x: 120, y: 700, width: 40, height: 40 },
        { x: 160, y: 700, width: 40, height: 40 },
        { x: 200, y: 700, width: 40, height: 40 },
        { x: 240, y: 700, width: 40, height: 40 },
        { x: 280, y: 700, width: 40, height: 40 },
        { x: 320, y: 700, width: 40, height: 40 },
        { x: 360, y: 700, width: 40, height: 40 },
        { x: 400, y: 700, width: 40, height: 40 },
        { x: 440, y: 700, width: 40, height: 40 },
        { x: 480, y: 700, width: 40, height: 40 },
        { x: 520, y: 700, width: 40, height: 40 },
        { x: 560, y: 700, width: 40, height: 40 },
        { x: 600, y: 700, width: 40, height: 40 },
        { x: 640, y: 700, width: 40, height: 40 },
        { x: 680, y: 700, width: 40, height: 40 },
        { x: 720, y: 700, width: 40, height: 40 },
        { x: 760, y: 700, width: 40, height: 40 },
        { x: 800, y: 700, width: 40, height: 40 },
        { x: 840, y: 700, width: 40, height: 40 },
        { x: 880, y: 700, width: 40, height: 40 },
        { x: 920, y: 700, width: 40, height: 40 },
        { x: 960, y: 700, width: 40, height: 40 },
        { x: 1000, y: 700, width: 40, height: 40 }
    ],
    sand_m: [
        // Center platform for boss battle
        { x: 380, y: 550, width: 45, height: 20 },
        { x: 425, y: 550, width: 45, height: 20 },
        { x: 470, y: 550, width: 45, height: 20 },
        { x: 515, y: 550, width: 45, height: 20 },
        { x: 560, y: 550, width: 45, height: 20 },
        // Side platforms
        { x: 200, y: 500, width: 45, height: 20 },
        { x: 245, y: 500, width: 45, height: 20 },
        { x: 700, y: 500, width: 45, height: 20 },
        { x: 745, y: 500, width: 45, height: 20 }
    ],
    sand_r: [
        { x: 605, y: 550, width: 45, height: 20 },
        { x: 290, y: 500, width: 45, height: 20 },
        { x: 790, y: 500, width: 45, height: 20 }
    ],
    sand_l: [
        { x: 335, y: 550, width: 45, height: 20 },
        { x: 155, y: 500, width: 45, height: 20 },
        { x: 655, y: 500, width: 45, height: 20 }
    ],
    crates: [
        { x: 380, y: 505, width: 45, height: 45 },
        { x: 560, y: 505, width: 45, height: 45 },
        { x: 200, y: 455, width: 45, height: 45 },
        { x: 745, y: 455, width: 45, height: 45 }
    ],
    chests: [
        { x: 470, y: 518, width: 32, height: 32 },
        { x: 200, y: 423, width: 32, height: 32 },
        { x: 745, y: 423, width: 32, height: 32 }
    ],
    grass_m_p: [],
    grass_l_p: [],
    grass_r_p: [],
    artifacts: [{ x: 500, y: 400 }], 
    coins: [
        { x: 425, y: 520 },
        { x: 515, y: 520 },
        { x: 245, y: 470 },
        { x: 700, y: 470 },
    ],
    potions: [
        { x: 380, y: 520 },
        { x: 560, y: 520 },
        { x: 200, y: 470 },
        { x: 745, y: 470 }
    ]
};

level3Scene2.objectives = [
    { enemies: level3Scene2.native.length + level3Scene2.outlaw.length + level3Scene2.cactus.length, artifact: level3Scene2.artifacts.length, chests: level3Scene2.chests.length }
];

level3Scene3.objectives = [
    { enemies: level3Scene3.native.length + level3Scene3.outlaw.length + level3Scene3.cactus.length, artifact: level3Scene3.artifacts.length, chests: level3Scene3.chests.length }
];

level3Scene4.objectives = [
    { enemies: level3Scene4.native.length + level3Scene4.outlaw.length + level3Scene4.cactus.length, artifact: level3Scene4.artifacts.length, chests: level3Scene4.chests.length }
];