class Figure {
    constructor () {
        return this.getRandFigure()
    }

    figures () {
        return ([
            {
                rotationIndex: 0,
                maxRotations: 2,
                color: 'middle-blue',
                rotations: [
                    [
                        [1,1,1,1]
                    ], [
                        [1],
                        [1],
                        [1],
                        [1]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 4,
                color: 'blurple',
                rotations: [
                    [
                        [2,0,0],
                        [2,2,2]
                    ],
                    [
                        [2,2],
                        [2,0],
                        [2,0]
                    ],
                    [
                        [0,0,0],
                        [2,2,2],
                        [0,0,2]
                    ],
                    [
                        [0,2],
                        [0,2],
                        [2,2]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 4,
                color: 'quince-jelly',
                rotations: [
                    [
                        [0,0,3],
                        [3,3,3]
                    ],
                    [
                        [3,0],
                        [3,0],
                        [3,3]
                    ],
                    [
                        [0,0,0],
                        [3,3,3],
                        [3,0,0]
                    ],
                    [
                        [3,3],
                        [0,3],
                        [0,3]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 0,
                color: 'turbo',
                rotations: [
                    [
                        [4,4],
                        [4,4]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 4,
                color: 'june-bud',
                rotations: [
                    [
                        [0,5,5],
                        [5,5,0]
                    ],
                    [
                        [5,0],
                        [5,5],
                        [0,5]
                    ],
                    [
                        [0,0,0],
                        [0,5,5],
                        [5,5,0]
                    ],
                    [
                        [5,0],
                        [5,5],
                        [0,5]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 4,
                color: 'steel-pink',
                rotations: [
                    [
                        [0,6,0],
                        [6,6,6]
                    ],
                    [
                        [6,0],
                        [6,6],
                        [6,0]
                    ],
                    [
                        [0,0,0],
                        [6,6,6],
                        [0,6,0]
                    ],
                    [
                        [0,6],
                        [6,6],
                        [0,6]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 4,
                color: 'red',
                rotations: [
                    [
                        [7,7,0],
                        [0,7,7]
                    ],
                    [
                        [0,7],
                        [7,7],
                        [7,0]
                    ],
                    [
                        [0,0,0],
                        [7,7,0],
                        [0,7,7]
                    ],
                    [
                        [0,7],
                        [7,7],
                        [7,0]
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
        this.figure = {
            el: [],
            onField: false,
            lastStep: false,
            vPos: 0,
            hPos: 0
        };
        this.heap = [];
        this.startBool = false;

        // generating new field
        this.generateMap();
        console.log('[+] map : ');
        console.log(this.map);

        //generate new figure
        if (!this.figure.onField) {
            this.createNewFigure();
            console.log('[+] generating new figure : ', this.figure.el.rotations[this.figure.el.rotationIndex]);
            this.placeFigureToHeap();
            this.placeFigureOnMap();
        }

        console.log('======================================================');
    }

    placeFigureOnMap () {
        console.log('==================== PLACE FIGURE ON MAP ===========================');
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
        let figureWidth = this.figure.el.rotations[this.figure.el.rotationIndex][0].length;
        let figureHeight = this.figure.el.rotations[this.figure.el.rotationIndex].length;
        let figure = this.figure.el.rotations[this.figure.el.rotationIndex];

        console.log('[+] figure height : ', figureHeight);
        console.log('[+] figure width : ', figureWidth);
        console.log('[+] figure position : ', figurePosition);
        console.log('[+] figure : ', figure);

        // figurePosition = figurePosition - (figureWidth > 2 ? (figureWidth - 2) : 0);
        console.log('[+] figure position start : ', figurePosition);

        let figureLineToDraw = figureHeight - 1;
        let mapLine = this.figure.vPos;

        let figureDraw = true;
        if (this.figure.lastStep && !this.figure.moved)
            figureDraw = false;

        console.log('[+] figure draw : ', figureDraw);

        console.log('[+] map line : ', mapLine);
        for (let fH = 0; mapLine >= 0 && fH < figureHeight && figureDraw; mapLine--, fH++, figureLineToDraw--) {
            for (let cell = 0, mapPos = figurePosition; cell < this.map[0].length && cell < figureWidth; cell++, mapPos++) {
                // Условие на случай если угол фигуры пустой, при падении на угол другой фигуры
                // не перерисовывало его в пустоту
                if (this.map[mapLine][mapPos] == 0)
                    this.map[mapLine][mapPos] = figure[figureLineToDraw][cell];
            }
        }

        /*
        * Проверка следующего хода.
        *
        * Надо проверить можно ли продолжать двигать фигуру или это последний ее ход.
        *
        * Делаем проверку на дно карты, если карта закончилась значит это конечная ее
        * позиция.
        *
        * Делаем проверку на прилипание к хипу, и если след шаг фигуры в местах отрисовки
        * фигуры пересикается с хипом, значит это последний шаг фигуры.
        * */

        let onHeap = false;
        figureLineToDraw = figureHeight - 1;
        mapLine = this.figure.vPos + 1;

        if (!this.map[mapLine])
            onHeap = true;

        for (let mL = mapLine, fL = figureLineToDraw; fL >= 0 && mL >= 0; fL--, mL--) {
            for (let i = figurePosition, cell = 0; cell < this.heap[0].length && cell < figureWidth && !onHeap; i++, cell++) {
                if (this.heap[mL][i] != 0 && figure[fL][cell] != 0) {
                    onHeap = true;
                    break ;
                }
            }

            if (onHeap) break;
        }

        if (this.figure.moved && !onHeap) {
            this.figure.lastStep = false;
        }

        // Проверяем упала ли фигура до дна
        if (onHeap) {
            this.figure.lastStep = true;
            console.log('[+] last step : ', this.figure.lastStep);
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
        console.log('====================================================================');
    }

    step() {
        console.log('================= STEP ===================');
        console.log('[+] figure : ', this.figure);

        if (this.figure.lastStep) {
            this.createNewFigure();
            this.placeFigureToHeap();
        } else {
            this.figure.vPos++;
        }

        this.addHeapOnMap();
        this.placeFigureOnMap();

        console.log('==========================================');
    }

    createNewFigure () {
        this.figure = {
            el: new Figure(),
            onField: false,
            lastStep: false,
            moved: false,
            vPos: 0,
            hPos: 0,
            fW: 0,
            fH: 0,
        };

        let fSize = this.getFigureSize(this.figure.el.rotations[this.figure.el.rotationIndex]);
        this.figure.fH = fSize.h;
        this.figure.fW = fSize.w;
        this.figure.hPos = this.getRandomInt(0, 9 - fSize.w);
    }

    placeFigureToHeap () {
        console.log('================= PLACING TO HEAP ===================');
        this.heap = [];

        for (let l = 0; l < 20; l++) {
            this.heap[l] = [];
            for (let c = 0; c < 10; c++) {
                this.heap[l][c] = this.map[l][c];
            }
        }

        console.log('[+] heap : ', this.heap);
        console.log('=====================================================');
    }

    getFiguresPosition () {
        let res = [];
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[0].length; j++) {
                if (this.map[i][j] != 0) {
                    res.push({
                        pos: ((i) * 10) + (j),
                        color: this.figureColors()[this.map[i][j]]
                    })
                }
            }
        }

        return res;
    }

    getFigureSize(figure) {
        let fW = 0;
        let fH = figure.length;
        let columnsToCalc = []

        for (let i = 0; i < figure.length; i++) {
            columnsToCalc.push(0);
            for (let j = 0; j < figure[0].length; j++) {
                if (i == 0)
                    columnsToCalc.push(0)

                if (figure[i][j] != 0)
                    columnsToCalc[j] = 1;
            }
        }

        for (let i = 0; i < columnsToCalc.length; i++)
            columnsToCalc[i] == 1 ? fW++ : 0;

        console.log('=============== CALC FIGURE LENGTH ================');
        console.log('[+] figure length : ', fW);
        console.log('===================================================');

        return ({
            h: fH,
            w: fW
        })
    }

    figureColors () {
        return ({
            1: 'middle-blue',
            2: 'blurple',
            3: 'quince-jelly',
            4: 'turbo',
            5: 'june-bud',
            6: 'steel-pink',
            7: 'red'
        });
    }

    generateMap () {
        for (let l = 0; l < 20; l++) {
            this.map[l] = [];
            for (let c = 0; c < 10; c++)
                this.map[l][c] = 0;
        }
    }

    addHeapOnMap () {
        console.log('================= ADDING HEAP TO MAP ===================');
        this.map = [];
        for (let l = 0; l < 20; l++) {
            this.map[l] = [];
            for (let c = 0; c < 10; c++) {
                this.map[l][c] = this.heap[l][c];
            }
        }

        // console.log('[+] map from heap : ', this.map);
        console.log('========================================================');
    }

    move (key) {
        console.log('================ FIGURE MOVE ====================');
        console.log('[+] key : ', key);

        this.figure.moved = true;

        if (key === ' ') {
            let figure = this.figure.el.rotations[this.figure.el.rotationIndex];

            for (let line = this.figure.vPos; line >= 0 && line < this.heap.length; line++) {
                let canDraw = true;

                for (let i = line, fL = 0; i < this.heap.length && fL < this.figure.fH; i++, fL++) {
                    for (let fC = 0, j = this.figure.hPos; fC < this.figure.fW; fC++, j++) {
                        if (this.heap[i][j] != 0 && figure[fL][fC] != 0) {
                            canDraw = false;
                            break ;
                        }
                    }
                    if (!canDraw) break ;
                }

                if (line == this.map.length - 1) {
                    this.figure.vPos = line;
                    break ;
                }

                if (!canDraw) {
                    this.figure.vPos = line + this.figure.fH - 2;
                    break ;
                }
            }
        } else if (key == 'ArrowRight' && this.figure.hPos + this.figure.fW <= 9) {
            this.figure.hPos++;
        } else if (key == 'ArrowLeft' && this.figure.hPos - 1 >= 0) {
            this.figure.hPos--;
        } else if (key == 'ArrowUp' && this.figure.el.maxRotations != 0) {
            if (this.figure.el.rotationIndex + 1 >= this.figure.el.maxRotations) {
                this.figure.el.rotationIndex = 0;
            } else this.figure.el.rotationIndex++;

            let fSize = this.getFigureSize(this.figure.el.rotations[this.figure.el.rotationIndex]);
            this.figure.fH = fSize.h;
            this.figure.fW = fSize.w;

            if (this.figure.hPos + this.figure.fW > 9)
                this.figure.hPos -= (this.figure.hPos + this.figure.fW) - 10;
        } else if (key == 'ArrowDown' && this.figure.el.maxRotations != 0) {
            if (this.figure.el.rotationIndex - 1 < 0) {
                this.figure.el.rotationIndex = this.figure.el.maxRotations - 1;
            } else this.figure.el.rotationIndex--;

            let fSize = this.getFigureSize(this.figure.el.rotations[this.figure.el.rotationIndex]);
            this.figure.fH = fSize.h;
            this.figure.fW = fSize.w;

            if (this.figure.hPos + this.figure.fW > 9)
                this.figure.hPos -= (this.figure.hPos + this.figure.fW) - 10;
        }

        console.log('[+] figure : ', this.figure);

        this.addHeapOnMap();
        this.placeFigureOnMap();

        console.log('=================================================');
    }

    start () {
        this.startBool = true;
    }

    alreadyStart () {
        return this.startBool;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = Game;