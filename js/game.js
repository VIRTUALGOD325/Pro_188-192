AFRAME.registerComponent('game',{
    schema:{
        gameState:{type:'string',default:'play'}
    },

    init:function(){
        duration:500
        var timerEl = document.querySelector("#timer")
        this.startTimer(duration,timerEl)
    },

    startTimer:function(duration,timerEl){
        var mins,secs
        setInterval(() => {
            if(duration >= 0){
                this.data.gameState = 'play'
                mins = parseInt(duration/60)
                secs = parseInt(duration % 60)
                if(mins < 10){
                    mins = '0'+mins
                }
                if(secs < 10){
                    secs = '0'+secs
                }
                timerEl.setAttribute('text',{value:mins + ':' + secs})
                duration -= 1
            }
            else{
                this.data.gameState = 'over'
                var cameraEl = document.querySelector("#camera-rig")
                cameraEl.setAttribute('velocity',{x:0,y:0,z:0})

                var gameOver = document.querySelector("#over")
                gameOver.setAttribute('visible',true)

                var speedEl = document.querySelector("#speed")
                speedEl.setAttribute('text',{value:'0'})
            }
        }, 100);
    }
})