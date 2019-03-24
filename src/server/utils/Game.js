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

let testFigures = [
    {
        rotationIndex: 0,
        maxRotations: 4,
        rotations: [
            [
                [0,0,0,0],
                [1,1,1,1]
            ], [
                [0,1],
                [0,1],
                [0,1],
                [0,1]
            ], [
                [0,0,0,0],
                [0,0,0,0],
                [1,1,1,1]
            ], [
                [1,0],
                [1,0],
                [1,0],
                [1,0]
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
                [1,1,1]
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
                [1,1,0]

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
                [1,1,1]
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
                [0,1,1]
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
];

class Game {
    constructor () {
        console.log('=============== CREATING GAME FIELD ==================');
        this.map = [];
        this.figure = {
            el: [],
            onField: false,
            lastStep: false,
            vPos: 19,
            hPos: 2
        };

        this.figureVerticalPosition = 19;

        // generating new field
        this.generateMap();
        console.log('[+] map : ');
        console.log(this.map);

        //generate new figure
        if (!this.figure.onField) {
            this.figure.el = new Figure();
            this.figure.hPos = this.getRandomInt(2, 8);
            console.log('[+] generating new figure : ', this.figure.el.rotations[this.figure.el.rotationIndex]);
            this.placeFigureOnMap();
        }

        console.log('======================================================');
    }

    placeFigureOnMap () {
        /*
        * Отрисовка фигуры.
        * Отрисовка происходит слева направно, снизу вверх.
        * Слева направо что бы сдвигать в зависимости от позиции отрисовки на нужное кол-во клеток влево.
        * Сверху вниз что бы при начале отрисовки, когда она выводится не вся, отрисовать нужную ее часть.
        * */

        /*
        * Вертикальная отрисовка фигуры.
        * Каждое двжиение фигуры это figureVerticalPostiion (fvp), в зависимости от fvp мы отрисовваем
        * определенную часть фигуры, чем больше fvp тем больше прорисовывется фигура сверху карты.
        *
        * Если fvp 1, значит мы отрисовываем замый низ фигуры с самого верхка карты.
        * [0][...]
        *
        * Если fvp 2 мы отрисовываем 2 последних линии фигуры со второй позиции на карте.
        * [0][...]
        * [1][...]
        *
        * И так далее до момента пока высота фигуры не станет больше чем fwp.
        * */

        /*
        * Горизонтальное позиционирование фигуры
        *
        * Рандомно у нас генерируется горизонтальная позиция фигуры на карте. В зависимости от позиции,
        * нам надо расчитать с какой колонки в карте нам надо начинать переводить фигуру на карту. Для
        * этого, нам нужно взять длину фигуры и в зависимости от нее отодвинуть маркер начала отрисовки
        * фигуры на карте на определенное кол-во клеток.
        * Например:
        *
        * Ширина фигуры 4 клетки, двигаем ее влево на две клетки от позиции.
        * Ширина фигуры 3 клетки, двигаем ее на одну клетку влево от позиции.
        * Ширина фигуры 2 или меньше, отрисовываем ее не сдвигая клетку влево.
        * */

        let figurePosition = this.figure.hPos;
        let figureWidth = this.figure.el.rotations[this.figure.rotationIndex][0].length;
        let figureHeight = this.figure.el.rotations[this.figure.rotationIndex].length;
        let figure = this.figure.el.rotations[this.figure.rotationIndex];

        console.log('[+] figure height : ', figureHeight);
        console.log('[+] figure width : ', figureWidth);
        console.log('[+] figure position : ', figurePosition);
        console.log('[+] figure : ', f[i].rotations[0]);

        figurePosition = figurePosition - (figureWidth > 2 ? (figureWidth - 2) : 0);
        console.log('[+] figure position start : ', figurePosition);

        let figureLineToDraw = figureHeight - 1;
        let mapLine = this.figure.vPos - 1;

        // Проверяем упала ли фигура до дна
        if (!this.map[mapLine])
            this.figure.lastStep = true;

        for (let fH = 0; mapLine >= 0 && fH < figureHeight; mapLine--, fH++, figureLineToDraw--) {
            for (let cell = 0, mapPos = figurePosition; cell < this.map[0].length && cell < figureWidth; cell++, mapPos++) {
                // console.log('[+] figure line to draw : ', figureLineToDraw);
                this.map[mapLine][mapPos] = figure[figureLineToDraw][cell];
            }
        }

        console.log('[+] figure placed on map : ');
        console.log(this.map);

        // let f = testFigures;
        // for (let i = 0; i < f.length; i++) {
        //     let figurePosition = this.figure.hPos;
        //     this.generateMap();
        //     console.log('=========================================')
        //
        //     // let figureWidth = this.figure.el.rotations[this.figure.rotationIndex][0].length;
        //     // let figureHeight = this.figure.el.rotations[this.figure.rotationIndex].length;
        //     // let figure = this.figure.el.rotations[this.figure.rotationIndex];
        //
        //     let figureWidth = f[i].rotations[0][0].length;
        //     let figureHeight = f[i].rotations[0].length;
        //     let figure = f[i].rotations[0];
        //
        //     console.log('[+] figure height : ', figureHeight);
        //     console.log('[+] figure width : ', figureWidth);
        //     console.log('[+] figure position : ', figurePosition);
        //     console.log('[+] figure : ', f[i].rotations[0]);
        //
        //     // отрисовать конец фигуры на начале карты
        //
        //     figurePosition = figurePosition - (figureWidth > 2 ? (figureWidth - 2) : 0);
        //     console.log('[+] figure position start : ', figurePosition);
        //     let figureLineToDraw = figureHeight - 1;
        //     let mapLine = this.figure.vPos - 1;
        //
        //     // Проверяем упала ли фигура до дна
        //     if (!this.map[mapLine])
        //         this.figure.lastStep = true;
        //
        //     for (let fH = 0; mapLine >= 0 && fH < figureHeight; mapLine--, fH++, figureLineToDraw--) {
        //         for (let cell = 0, mapPos = figurePosition; cell < this.map[0].length && cell < figureWidth; cell++, mapPos++) {
        //             // console.log('[+] figure line to draw : ', figureLineToDraw);
        //             this.map[mapLine][mapPos] = figure[figureLineToDraw][cell];
        //         }
        //     }
        //
        //     console.log('[+] figure placed on map : ');
        //     console.log(this.map);
        // }
    }

    generateMap () {
        for (let l = 0; l < 20; l++) {
            this.map[l] = [];
            for (let c = 0; c < 10; c++) {
                this.map[l][c] = 0;
            }
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = Game;