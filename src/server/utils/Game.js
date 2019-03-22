class Figure {
    constructor () {
        return this.getRandFigure()
    }

    figures () {
        return ([
            {
                rotationIndex: 0,
                maxRotations: 4,
                rotations: [
                    [
                        [0,0,0,0],
                        [1,1,1,1],
                        [0,0,0,0]
                    ], [
                        [0,0,1],
                        [0,0,1],
                        [0,0,1],
                        [0,0,1]
                    ], [
                        [0,0,0,0],
                        [0,0,0,0],
                        [1,1,1,1]
                    ], [
                        [0,1,0],
                        [0,1,0],
                        [0,1,0],
                        [0,1,0]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 4,
                rotations: [
                    [
                        [1,0,0],
                        [1,1,1]
                    ],
                    [
                        [0,1,1],
                        [0,1,0],
                        [0,1,0]
                    ],
                    [
                        [0,0,0],
                        [1,1,1],
                        [0,0,1]
                    ],
                    [
                        [0,1,0],
                        [0,1,0],
                        [1,1,0]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 4,
                rotations: [
                    [
                        [0,0,1],
                        [1,1,1],
                        [0,0,0],
                    ],
                    [
                        [0,1,0],
                        [0,1,0],
                        [0,1,1]
                    ],
                    [
                        [0,0,0],
                        [1,1,1],
                        [1,0,0]
                    ],
                    [
                        [1,1,0],
                        [0,1,0],
                        [0,1,0]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 0,
                rotations: [
                    [
                        [1,1],
                        [1,1]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 4,
                rotations: [
                    [
                        [0,1,1],
                        [1,1,0],
                        [0,0,0]

                    ],
                    [
                        [0,1,0],
                        [0,1,1],
                        [0,0,1]
                    ],
                    [
                        [0,0,0],
                        [0,1,1],
                        [1,1,0]
                    ],
                    [
                        [1,0,0],
                        [1,1,0],
                        [0,1,0]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 4,
                rotations: [
                    [
                        [0,1,0],
                        [1,1,1],
                        [0,0,0]
                    ],
                    [
                        [0,1,0],
                        [0,1,1],
                        [0,1,0]
                    ],
                    [
                        [0,0,0],
                        [1,1,1],
                        [0,1,0]
                    ],
                    [
                        [0,1,0],
                        [1,1,0],
                        [0,1,0]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 4,
                rotations: [
                    [
                        [1,1,0],
                        [0,1,1],
                        [0,0,0]
                    ],
                    [
                        [0,0,1],
                        [0,1,1],
                        [0,1,0]
                    ],
                    [
                        [0,0,0],
                        [1,1,0],
                        [0,1,1]
                    ],
                    [
                        [0,1,0],
                        [1,1,0],
                        [1,0,0]
                    ]
                ]
            }
        ])
    }

    getRandFigure() {
        return this.figures()[this.getRandomInt(0, 6)];
    };

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}

class Game {
    constructor () {
        console.log('=============== CREATING GAME FIELD ==================');
        this.map = [];
        this.figureOnField = false;
        this.figure = [];

        // generating new field
        this.generateMap();
        console.log('[+] map : ');
        console.log(this.map);

        //generate new figure
        if (!this.figureOnField) {
            this.figure = new Figure();
            console.log('[+] generating new figure : ', this.figure)
        }

        console.log('======================================================');
    }

    generateMap () {
        for (let l = 0; l < 20; l++) {
            this.map[l] = [];
            for (let c = 0; c < 10; c++) {
                this.map[l][c] = 0;
            }
        }
    }
}

module.exports = Game;