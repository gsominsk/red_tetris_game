class Figure {
    constructor () {
        return this.getRandFigure()
    }

    figures () {
        return ([
            {
                rotationIndex: 0,
                maxRotations: 4,
                color: 'middle-blue',
                rotations: [
                    [
                        [1,1,1,1],
                        [0,0,0,0],
                        [0,0,0,0],

                    ], [
                        [0,0,1],
                        [0,0,1],
                        [0,0,1],
                        [0,0,1]
                    ], [
                        [1,1,1,1],
                        [0,0,0,0],
                    ], [
                        [0,1],
                        [0,1],
                        [0,1],
                        [0,1]
                    ]

                ]
            },{
                rotationIndex: 0,
                maxRotations: 4,
                color: 'blurple',
                rotations: [
                    [
                        [2,0,0],
                        [2,2,2],
                        [0,0,0]
                    ],
                    [
                        [0,2,2],
                        [0,2,0],
                        [0,2,0]
                    ],
                    [
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
                        [3,3,3],
                        [0,0,0],
                    ],
                    [
                        [0,3,0],
                        [0,3,0],
                        [0,3,3]
                    ],
                    [
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
                        [5,5,0],
                        [0,0,0],
                    ],
                    [
                        [0,5,0],
                        [0,5,5],
                        [0,0,5]
                    ],
                    [
                        [0,5,5],
                        [5,5,0],
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
                        [6,6,6],
                        [0,0,0],
                    ],
                    [
                        [0,6,0],
                        [0,6,6],
                        [0,6,0]
                    ],
                    [
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
                        [0,7,7],
                        [0,0,0],
                    ],
                    [
                        [0,0,7],
                        [0,7,7],
                        [0,7,0]
                    ],
                    [
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
        this.endGame = false;

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

        if (this.figure.vPos == 0 + this.figure.mH - this.figure.fH) {
            for (let mL = this.figure.vPos, fL = this.figure.fH - 1; mL >= 0; mL--, fL--) {
                for (let mC = this.figure.hPos, fC = 0; fC < this.figure.mW; fC++, mC++) {
                    if (this.heap[mL][mC] != 0 && figure[fL][fC] != 0) {
                        this.endGame = true;
                        break ;
                    }
                }
                if (this.endGame)
                    break ;
            }
        }

        if (this.endGame)
            return ;

        console.log('[+] figure draw : ', figureDraw);

        console.log('[+] map line : ', mapLine);
        for (let fH = 0; mapLine >= 0 && fH < figureHeight && figureDraw; mapLine--, fH++, figureLineToDraw--) {
            for (let cell = 0, mapPos = figurePosition; cell < this.map[0].length && cell < figureWidth && mapLine < this.map.length; cell++, mapPos++) {
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

        if (!this.map[mapLine - (this.figure.mH - this.figure.fH)])
            onHeap = true;

        for (let mL = mapLine, fL = figureLineToDraw; fL >= 0 && mL >= 0; fL--, mL--) {
            for (let i = figurePosition, cell = 0; cell < this.heap[0].length && cell < figureWidth && !onHeap && mL < this.heap.length; i++, cell++) {
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

        // Проверяем потолок, если фигура упала на хип и при этом не отресовалась
        // полностью, мы ставим флаг ендгейм
        // if (onHeap && this.figure.vPos - this.figure.mH < 0) {
        //     console.log('+++==========+++');
        //     console.log('+++ END GAME +++');
        //     console.log('+++==========+++');
        //     this.endGame = true;
        // }

        // Проверяем упала ли фигура до дна
        if (onHeap) {
            this.figure.lastStep = true;
            console.log('[+] last step : ', this.figure.lastStep);
        }

        console.log('[+] figure placed on map : ');
        console.log(this.map);

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
            mW: 0,
            mH: 0
        };

        let fSize = this.getFigureSize(this.figure.el.rotations[this.figure.el.rotationIndex]);
        this.figure.mH = fSize.mH;
        this.figure.mW = fSize.mW;
        this.figure.fW = fSize.w;
        this.figure.fH = fSize.h;
        this.figure.vPos += fSize.mH - fSize.h;
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

        for (let i = 0; i < this.heap.length; i++) {
            let filledLine = [];
            for (let j = 0; j < this.heap[0].length; j++) {
                if (this.heap[i][j] != 0)
                    filledLine.push(0);
            }

            if (filledLine.length == this.heap[0].length) {
                for (let line = i; line > 0; line--) {
                    this.heap[line] = this.heap[line - 1];
                }
            }
        }
        // console.log('[+] heap : ');
        // console.log(this.heap);
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
        let fH = 0;
        let mH = figure.length;
        let mW = figure[0].length;
        let columnsToCalc = []

        for (let i = 0, lineNotEmpty = false; i < figure.length; i++, lineNotEmpty = false) {
            columnsToCalc.push(0);
            for (let j = 0; j < figure[0].length; j++) {
                if (i == 0)
                    columnsToCalc.push(0)

                if (figure[i][j] != 0) {
                    columnsToCalc[j] = 1;
                    lineNotEmpty = true;
                }
            }

            if (lineNotEmpty)
                fH++;
        }

        for (let i = 0; i < columnsToCalc.length; i++)
            columnsToCalc[i] == 1 ? fW++ : 0;

        // console.log('=============== CALC FIGURE LENGTH ================');
        // console.log('[+] figure : ', figure);
        // console.log('[+] figure length : ', fW);
        // console.log('[+] figure height : ', fH);
        // console.log('===================================================');

        return ({
            h: fH,
            w: fW,
            mH,
            mW
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

    checkFigurePlacing (move) {
        let canDraw = true;
        let figure = this.figure.el.rotations[this.figure.el.rotationIndex];
        let hPos = this.figure.hPos;
        let fSize = this.getFigureSize(this.figure.el.rotations[this.figure.el.rotationIndex]);
        let mH = fSize.mH;
        let fW = fSize.w;
        let fH = fSize.h;
        let vPos = this.figure.vPos;

        if (move == 'ArrowRight') {
            if (!(this.figure.hPos + this.figure.fW <= 9 - (figure[0].length - this.figure.fW)))
                return false;

            hPos++;
        } else if (move == 'ArrowLeft') {
            if (!(this.figure.hPos - 1 >= 0 - (figure[0].length - this.figure.fW)))
                return false;

            hPos--;
        } else if (move == 'ArrowUp') {
            if (!(this.figure.el.maxRotations != 0))
                return false;

            let rotationIndex = this.figure.el.rotationIndex;

            if (this.figure.el.rotationIndex + 1 >= this.figure.el.maxRotations) {
                rotationIndex = 0;
            } else rotationIndex++;

            figure = this.figure.el.rotations[rotationIndex];
            let fSize = this.getFigureSize(figure);
            mH = fSize.mH;
            fW = fSize.w;
            fH = fSize.h;

            if (vPos > 19)
                vPos = 19 + (mH - fH);

            if (hPos < 0)
                hPos = 0

            if (hPos + fW > 9)
                hPos -= (hPos + fW) - 10;
        } else if (move = 'ArrowDown') {
            if (!(this.figure.el.maxRotations != 0))
                return false

            let rotationIndex = this.figure.el.rotationIndex;

            if (this.figure.el.rotationIndex - 1 < 0) {
                rotationIndex = this.figure.el.maxRotations - 1;
            } else rotationIndex--;

            figure = this.figure.el.rotations[rotationIndex];
            let fSize = this.getFigureSize(this.figure.el.rotations[rotationIndex]);
            mH = fSize.mH;
            fW = fSize.w;
            fH = fSize.h;

            if (vPos > 19)
                vPos = 19 + (mH - fH);

            if (hPos < 0)
                hPos = 0

            if (hPos + fW > 9)
                hPos -= (hPos + fW) - 10;
        }

        for (let i = vPos, fL = mH - 1; i >= 0 && fL >= 0; i--, fL--) {
            for (let fC = 0, j = hPos; fC < fW + (figure[0].length - fW) && i < this.heap.length; fC++, j++) {
                if (this.heap[i][j] != 0 && figure[fL][fC] != 0) {
                    canDraw = false;
                    break ;
                }
            }
            if (!canDraw) break ;
        }

        console.log('[+] can draw : ', canDraw);

        return canDraw;
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
        let canDraw = this.checkFigurePlacing(key);
        // console.log('[+] canDraw : ', canDraw);

        if (key === ' ') {
            if (this.figure.lastStep)
                return ;

            let figure = this.figure.el.rotations[this.figure.el.rotationIndex];

            // console.log('[+] figure width : ', this.figure.fW);
            // console.log('[+] figure height : ', this.figure.fH);
            // console.log('[+] figure map width : ', this.figure.mW);
            // console.log('[+] figure map height : ', this.figure.mH);

            for (let line = this.figure.vPos; line >= 0 && line < this.heap.length; line++) {
                let canDraw = true;

                // console.log('+++++++++++++++++++++++++++++++++++++++++++')

                for (let i = line, fL = 0; i < this.heap.length && fL < this.figure.mH; i++, fL++) {

                    // console.log('--------------------------------')
                    // console.log('[+] line heap      : ', this.heap[i]);
                    // console.log('[+] line figure    : ', figure[fL]);
                    // console.log('[+] map start pos  : ', this.figure.hPos);

                    for (let fC = 0, j = this.figure.hPos; fC < this.figure.fW + (this.figure.mW - this.figure.fW); fC++, j++) {
                        // console.log('-------')
                        // console.log('[+] intersection : ', this.heap[i][j] != 0 && figure[fL][fC] != 0);
                        // console.log('[+] heap cell : ', this.heap[i][j]);
                        // console.log('[+] map cell : ', figure[fL][fC]);
                        // console.log('-------')
                        if (this.heap[i][j] != 0 && figure[fL][fC] != 0) {
                            canDraw = false;
                            break ;
                        }

                    }
                    // console.log('--------------------------------')
                    if (!canDraw) break ;
                }

                // console.log('+++++++++++++++++++++++++++++++++++++++++++')

                if (canDraw && line == this.map.length - 1) {
                    this.figure.vPos = line + (this.figure.mH - this.figure.fH);
                    break ;
                }

                if (!canDraw) {
                    this.figure.vPos = line + this.figure.mH - 2;
                    break ;
                }
            }
        } else if (key == 'ArrowRight' && canDraw) {
            this.figure.hPos++;
        } else if (key == 'ArrowLeft' && canDraw) {
            this.figure.hPos--;
        } else if (key == 'ArrowUp' && canDraw) {
            if (this.figure.el.rotationIndex + 1 >= this.figure.el.maxRotations) {
                this.figure.el.rotationIndex = 0;
            } else this.figure.el.rotationIndex++;

            let fSize = this.getFigureSize(this.figure.el.rotations[this.figure.el.rotationIndex]);
            this.figure.mH = fSize.mH;
            this.figure.mW = fSize.mW;
            this.figure.fW = fSize.w;
            this.figure.fH = fSize.h;

            if (this.figure.vPos >= 19)
                this.figure.vPos = 19 + (this.figure.mH - this.figure.fH);

            console.log('[+] this.figure.mH : ', this.figure.mH);
            console.log('[+] this.figure.fH : ', this.figure.fH);
            console.log('[+] this.figure.vPos : ', this.figure.vPos);

            if (this.figure.hPos < 0)
                this.figure.hPos = 0;

            if (this.figure.hPos + this.figure.fW > 9)
                this.figure.hPos -= (this.figure.hPos + this.figure.fW) - 10;
        } else if (key == 'ArrowDown' && canDraw) {
            if (this.figure.el.rotationIndex - 1 < 0) {
                this.figure.el.rotationIndex = this.figure.el.maxRotations - 1;
            } else this.figure.el.rotationIndex--;

            let fSize = this.getFigureSize(this.figure.el.rotations[this.figure.el.rotationIndex]);
            this.figure.mH = fSize.mH;
            this.figure.mW = fSize.mW;
            this.figure.fW = fSize.w;
            this.figure.fH = fSize.h;

            if (this.figure.vPos >= 19)
                this.figure.vPos = 19 + (this.figure.mH - this.figure.fH);

            console.log('[+] this.figure.mH : ', this.figure.mH);
            console.log('[+] this.figure.fH : ', this.figure.fH);
            console.log('[+] this.figure.vPos : ', this.figure.vPos);

            if (this.figure.hPos < 0)
                this.figure.hPos = 0;

            if (this.figure.hPos + this.figure.fW > 9)
                this.figure.hPos -= (this.figure.hPos + this.figure.fW) - 10;
        }

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

    checkEndGame () {
        return this.endGame;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = Game;