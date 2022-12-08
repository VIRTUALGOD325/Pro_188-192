AFRAME.registerComponent('drive',{
    init:function(){
        var gameStateValue = this.el.getAttribute('game')
        if(gameStateValue == 'play'){
            this.driveCar()
        }
    },

    isVelocityActive:function(){
        return Math.random() < 0.25
    },

    driveCar:function(){
        var wheelRotation = 0 
        var multiply = 10 

        window.addEventListener("keydown",(e)=>{
            var wheelEl = document.querySelector("#control-wheel")
            if(e.code == 'ArrowRight' && wheelRotation > -40){
                wheelRotation -= 5
                wheelEl.setAttribute('rotation',{x:0,y:0,z:wheelRotation})
            }
            if(e.code == 'ArrowLeft' && wheelRotation > 40){
                wheelRotation += 5
                wheelEl.setAttribute('rotation',{x:0,y:0,z:wheelRotation})
            }

            var cursorEl = document.querySelector("#camera-rig")
            var camRotation = cursorEl.getAttribute("rotation")
            var camPosition = cursorEl.getAttribute("position")
            var camMoveControl = cursorEl.getAttribute("movement-controls")

            cursorEl.setAttribute("movement-controls",{"speed":camMoveControl.speed+0.005})

            var camDirection = new THREE.Vector3()

            cursorEl.object3D.getWorldDirection(camDirection)

            if(e.code == "ArrowRight"){
                camRotation.y -= 5
                cursorEl.setAttribute('rotation',{x:0, y:camRotation.y,z:0})
                cursorEl.setAttribute('movement-controls',{"speed":camMoveControl.speed+0.005})
            }

            if(e.code == "ArrowLeft"){
                camRotation.y += 5
                cursorEl.setAttribute('rotation',{x:0, y:camRotation.y, z:0})
                cursorEl.setAttribute('movement-controls',{"speed":camMoveControl.speed+0.005})
            }

            if(e.code == "ArrowUp"){
                multiply += 0.5

                if(multiply <= 100 && camPosition.z > -500){
                    cursorEl.setAttribute('movement-controls',{"speed":camMoveControl.speed+0.005})
                    
                    var accelCar = document.querySelector("#control-acce")
                    accelCar.setAttribute("material",'color','green')

                    var carSpeed = document.querySelector("#speed")
                    carSpeed.setAttribute("text",{value:multiply})
                }
            }

            if(e.code == "Space"){
                cursorEl.setAttribute('movement-controls',{"speed":0})

                var brakeEl = document.querySelector("#control-break")
                brakeEl.setAttribute("material",'color','red')
            }
        })

        window.addEventListener('keyup',(e)=>{
            var cursorEl = document.querySelector("#camera-rig")
            var camDirection = new THREE.Vector3()

            cursorEl.object3D.getWorldDirection(camDirection)

            var camMoveControl = cursorEl.getAttribute('movement-controls')

            if(e.code == "space"){
                var brakeEl = document.querySelector("#control-break")
                brakeEl.setAttribute("material",'color','grey')
            }

            if(e.code == "ArrowUp"){
                if(multiply > 10){
                    multiply -= 0.5
                
                    cursorEl.setAttribute('movement-controls',{"speed":camMoveControl.speed+0.005})
                }

                var accelEl = document.querySelector("#control-acce")
                accelEl.setAttribute("material","color","grey")
            }

            
        })
    }
})