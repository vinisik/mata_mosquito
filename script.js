var altura = 0
var largura = 0
var vidas = 1
var tempo = 10
var criaTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

//aplica a dificuldade selecionada ao jogo
if(nivel === 'normal') {
    criaTempo = 1500

} else if(nivel === 'dificil') {
    criaTempo = 1000

} else if(nivel === 'lendario') {
    criaTempo = 750

}

function ajustaTamanhoTela() {
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(largura, altura)
}

ajustaTamanhoTela()

//cria o cronometro do jogo, se continuar vivo ao final, vitória
var cronometro = setInterval(function() {

    tempo --

    //condição de vitória ao final do cronometro
    if(tempo < 0){
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
    
}, 1000)

function randPos() {

    //Remove o mosquito anterior caso exista
    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if(vidas > 3){
            //Interromper o jogo (game over)
            window.location.href = 'game_over.html'
        } else {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
            vidas++
        }
        
    }
    

    var posX = Math.floor(Math.random() * largura) - 90
    var posY = Math.floor(Math.random() * altura) - 90

    //Remove a possibilidade de posições negativas
    posX = posX < 0 ? 0 : posX
    posY = posY < 0 ? 0 : posY

    console.log(posX, posY)

    //cria o elemento html
    var som = new Audio('mosquitao.mp3')
    som.play()
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoAlatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posX + 'px'
    mosquito.style.top = posY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        var audio = new Audio('hit.mp3');
        audio.play();
        this.remove()
    }

    document.body.appendChild(mosquito)
    
}

function tamanhoAlatorio() {
    var classe = Math.floor(Math.random() * 3)
    
    switch(classe) {
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3' 
    }
}

//faz com que o mosquito apareça virado para lados aleatorios
function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)
    
    switch(classe) {
        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'

    }
}

