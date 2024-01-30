class Game {
    constructor(level, highScore){
        this.highScore = highScore
        this.level = level
        this.score = 0
    }

    addScore(){
        this.score += 1
    }
    
    setHighScore(){
        this.highScore = this.score
    }

    resetScore(){
        this.score = 0
    }
}