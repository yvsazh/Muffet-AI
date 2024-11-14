var player;
var population;
var walls;
var roads;
var muffet;
var spiders = [];
var evolutionSpeed = 1;
var genText;

var trained = false;

var popSize = 50;

var moves = 15;
var increaseMovesBy = 5;
var increaseEvery = 5;

function preload() {
    player_img = loadImage('/Muffet-AI/assets/player.png'); // Load the image
    spider_img = loadImage('/Muffet-AI/assets/spider.png'); // Load the image
}

function startLevel() {
    // 1
    spiders.push(new Spider(width, roads[0], "left", (20-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[0], "left", (40-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[2], "left", (90-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[2], "left", (110-20)*1/world.timeScale));
    spiders.push(new Spider(0, roads[1], "right", (130-20)*1/world.timeScale));
    spiders.push(new Spider(0, roads[1], "right", (150-20)*1/world.timeScale));
    spiders.push(new Spider(0, roads[2], "right", (200-20)*1/world.timeScale));
    spiders.push(new Spider(0, roads[0], "right", (220-20)*1/world.timeScale));
    // 2
    spiders.push(new Spider(width, roads[1], "left", (220+40-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[2], "left", (220+60-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[0], "left", (220+80-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[1], "left", (220+100-20)*1/world.timeScale));
    spiders.push(new Spider(0, roads[0], "right", (220+140-20)*1/world.timeScale));
    spiders.push(new Spider(0, roads[1], "right", (220+160-20)*1/world.timeScale));
    spiders.push(new Spider(0, roads[1], "right", (220+200-20)*1/world.timeScale));
    spiders.push(new Spider(0, roads[2], "right", (220+220-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[1], "left", (220+260-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[2], "left", (220+280-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[0], "left", (220+300-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[1], "left", (220+320-20)*1/world.timeScale));
    // 3
    spiders.push(new Spider(width, roads[1], "left", (540+60-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[2], "left", (540+60-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[0], "left", (540+100-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[0], "left", (540+140-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[1], "left", (540+140-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[2], "left", (540+180-20)*1/world.timeScale));
    spiders.push(new Spider(0, roads[1], "right", (540+220-20)*1/world.timeScale));
    spiders.push(new Spider(0, roads[0], "right", (540+260-20)*1/world.timeScale));
    spiders.push(new Spider(0, roads[2], "right", (540+260-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[1], "left", (540+300-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[0], "left", (540+340-20)*1/world.timeScale));
    spiders.push(new Spider(width, roads[2], "left", (540+340-20)*1/world.timeScale));
}

function startSimulation() {
    for(var spider of spiders) {
        spider.sprite.remove();
    }
    spiders = [];
    if (!trained) {
        if (player) {
            player.dead = true;
            player.sprite.remove();
        }
        population = new Population(popSize); // 250
        genText = new Sprite(width/2, height/5, 200, 30, "n");
        genText.color = "black";
        genText.stroke = "black";
        genText.text = `Покоління: ${population.gen}`;
        genText.textColor = "white";
        genText.textSize = 40;
    } else {
        player = new Player();
        genText.remove();
    }

    muffet = new Muffet(width/2, height/2 - 50);

    walls = [
        new Wall(120, 600, 40, 200),
        new Wall(335, 505, 400, 10),
        new Wall(550, 600, 40, 200),
        new Wall(335, 695, 400, 10),
    ];

    roads = [
        new Road(340, 550, 0),
        new Road(340, 600, 1),
        new Road(340, 650, 2),
    ];

    startLevel();

    var blackWall1 = new Sprite(60, 400, 150, 800, "n");
    blackWall1.stroke = "black";
    blackWall1.color = "black";
    var blackWall2 = new Sprite(610, 400, 150, 800, "n");
    blackWall2.stroke = "black";
    blackWall2.color = "black";
    blackWall1.layer = 100;
    blackWall2.layer = 100;
}

function setup() {
    var cnv = createCanvas(680, 800);
    cnv.parent('game');
    
    startSimulation();
    startUI();
}

function draw() {
    background(0, 0, 0);
    if (!trained) {
        if (!population.allPlayersDead()) {
            population.update();
        } else {
            if (population.gen%increaseEvery == 0 && population.gen != 1) {
                population.increaseMoves();
            }
            population.removeAllSprites();
            population.calculateFitness();
            population.naturalSelection();
            population.mutate();
            for(var spider of spiders) {
                spider.sprite.remove();
            }
            spiders = [];
            startLevel();
        }
    } else {
        if(player.brain.step >= player.brain.directions.length) {
            player.sprite.remove();
            player = new Player();
            for(var spider of spiders) {
                spider.sprite.remove();
            }
            spiders = [];
            startLevel();
        };
    }  ;
    handleUI();
};

function startUI() {
    $("#popSize").text(popSize);
    $("#popSizeRange").val(popSize);

    $("#mutationRate").text(population.players[0].brain.mutationRate);
    $("#mutationRateRange").val(population.players[0].brain.mutationRate);

    $("#increaseEvery").text(increaseEvery);
    $("#increaseEveryRange").val(increaseEvery);

    $("#increaseMovesBy").text(increaseMovesBy);
    $("#increaseMovesByRange").val(increaseMovesBy);
}

function handleUI() {
    $("#popSize").text($("#popSizeRange").val());
    $("#mutationRate").text($("#mutationRateRange").val());
    $("#increaseEvery").text($("#increaseEveryRange").val());
    $("#increaseMovesBy").text($("#increaseMovesByRange").val());

    $("#watchTrained").off("click").on("click", function() {
        population.players.forEach(p => {
            p.dead = true;
            p.sprite.remove();
        });
        genText.remove();
        trained = true;
        startSimulation();
    });
    $("#saveChanges").off("click").on("click", function() {
        population.players.forEach(p => {
            p.dead = true;
            p.sprite.remove();
        });
        genText.remove();
        popSize = parseInt($("#popSizeRange").val());
        trained = false;
        startSimulation();
        population.players.forEach(p => {
            p.brain.mutationRate = parseFloat($("#mutationRateRange").val())/100;
            console.log(p.brain.mutationRate);
        });
        increaseEvery = parseInt($("#increaseEveryRange").val());
        increaseMovesBy = parseInt($("#increaseMovesByRange").val());
    });
}
