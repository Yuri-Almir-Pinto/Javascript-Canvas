const canvas = document.querySelector("#canvas");
const wHeight = window.innerHeight;
const wWidth = window.innerWidth;

canvas.height = wHeight - 20;
canvas.width = wWidth - 20;

function toRadians(degress) {
    return (Math.PI / 180) * degress;
}

function draw(teste) {
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        // Transforma a canvas. No exemplo abaixo, altera a escala X e Y dela respectivamente.
        ctx.scale(0.8, 0.8);

        // Define a cor de linhas e fills. Recebe um valor tipo {color} de CSS.
        ctx.strokeStyle = "black";
        ctx.fillStyle = "rgba(240, 240, 0)";
        // Define o valor alpha (transparência) que será usado por tudo.
            // ctx.globalAlpha = 0.5;
        // Altera a grossura das linhas
        ctx.lineWidth = 50;
        // Altera o comportamento do fim da linha (quadrado, redondo, etc...)
        ctx.lineCap = "round";
        // Altera o comportamento de quando linhas se encontram
        ctx.lineJoin = "round";

        // Desenha um quadrado/retângulo. Recebe a posição x e y do retângulo para desenhar, e o tamanho x e y também como parâmetros, respectivamente.
        ctx.fillRect(canvas.width / 2, canvas.height / 2, 100, 100);
        // Como o acima, mas ao invés de cirar um quadrado/retângulo, ele limpa um quadrado/retângulo.
        ctx.clearRect((canvas.width / 2) + 25, (canvas.height / 2) + 25, 50, 50);

        // Inicia um desenho, simulando rabiscos de uma caneta.
        ctx.beginPath();
        // Tira a caneta do papel, e move para a posição x/y.
        ctx.moveTo(100, 100);
        // Move a caneta, no papel, para a posição x/y.
        ctx.lineTo(500, 100);
        // Move a caneta de novo.
        ctx.lineTo(300, 400);
        // Move a caneta para a posição inicial no papel, e preenche todo o espaço interior com cor.
        // ---> ctx.fill();

        // Alternativamente, para fazer um desenho não preenchido, é preciso usar "closePath()" para mover a caneta para a posição inicial e fechar um formato,
        // e apenas então usar "stroke()"
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        // Inicia um desenho de um círculo. Recebe x,y para o ponto no centro do círculo, o raio do círculo, o ângulo onde o círculo vai começar e terminar, em
        // radianos, e por fim se deve ser no sentido horáro ou anti-horário.
        ctx.arc(1000, 500, 50, toRadians(45), toRadians(315), false);
        ctx.lineTo(1000, 500);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(1000, 200);
        //ctx.lineTo(1050, 150);
        // Curvas de bezier e quadráticas. Bezier recebe seis parâmetros: Os quatro primeiros é o X e Y dos pontos de controle 1 e 2, e o quinto e sexto
        // é o ponto final onde a caneta vai se mover.
        ctx.bezierCurveTo(1000, 200, 1000, 150, 1050, 150);
        ctx.bezierCurveTo(1100, 150, 1100, 200, 1100, 200);
        ctx.stroke();

        // Para curvas quadráticas é a mesma coisa, mas só tem um ponto de controle.
        ctx.beginPath();
        ctx.moveTo(1000, 350);
        ctx.quadraticCurveTo(1020, 375, 1000, 400);
        ctx.quadraticCurveTo(980, 375, 1000, 350);
        ctx.stroke();

        // Cria um Path2D que pode ser usado para criar formatos de maneira mais fácil, rápida e eficiente.
        const circle = new Path2D();
        circle.arc(1100, 500, 50, toRadians(0), toRadians(360), false);
        // Passa o Path2D como parâmetro para um stroke ou fill.
        ctx.fillStyle = "black";
        ctx.fill(circle);

        // Cria um gradiente linear, que vai de algum lugar da tela até outro.
        const gradient = ctx.createLinearGradient(1000, 500, 1175, 500);
        // Adiciona cores ao gradiente, precisando de ao menos duas chamadas da função, para descrever de qual porcentagem a qual porcentagem de cor.
        // Segundo parâmetro é do tipo {color} CSS.
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(0.55, "red");
        gradient.addColorStop(1, "green");
        // Um gradiente é aplicado ao estilo de stroke ou fill.
        ctx.strokeStyle = gradient;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(50, 600);
        ctx.lineTo(1500, 600);
        ctx.stroke();

        ctx.fill(circle);

        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        // Cria um gradiente em formato de círculo. Os três primeiros parâmetros descrevem o primeiro círculo (X, Y e Raio), e os três ultimos o segundo círculo.
        const radialGradient = ctx.createRadialGradient(300, 200, 1, 300, 200, 50);
        //radialGradient.addColorStop(0, "yellow");
        radialGradient.addColorStop(0.09, "orange");
        radialGradient.addColorStop(1, "white");

        ctx.fillStyle = radialGradient;
        ctx.fillRect(250, 150, 100, 100);
        // Cria um gradiente no formato de um cone (Ao redor de um ponto). Primeiro parâmetro é o ângulo, segundo e terceiro é o local.
        const coneGradient = ctx.createConicGradient(toRadians(45), 1300, 600);
        coneGradient.addColorStop(0, "black");
        coneGradient.addColorStop(0.55, "red");
        coneGradient.addColorStop(1, "white");

        ctx.fillStyle = coneGradient;
        ctx.fillRect(1200, 500, 200, 200);

        // Isso é um padrão. Primeiro se carrega uma imagem da seguinte forma..
        const img = new Image();
        img.src = "./pattern.jpg"
        img.onload = () => {
            // E quando ela carregar, cria o padrão com esta função (Usa os mesmos valores de repeat de img de CSS), e coloca ele no fillStyle.
            const pattern = ctx.createPattern(img, "repeat");
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 700, 2000, 200);

            ctx.drawImage(img, 1200, 0, 100, 100);
        }
        
        // Aplica sombras a algum formato. Cada um dos quatro valores aqui altera algo da sombra, como sua localização, blur e cor.
        // ctx.shadowOffsetX = 20;
        // ctx.shadowOffsetY = 10;
        // ctx.shadowBlur = 10;
        // ctx.shadowColor = "rgba(0,0,0,0.7)"
        ctx.fillStyle = "rgba(150,0,150, 1)";
        ctx.fillRect(1600, canvas.height / 2, 100, 100);

        // Salva todas as configurações atuais do Canvas para um stack. (fillStyle, strokeStyle, transforms, etc)
        ctx.save();
        // Restaura todas as confgurações salvas anteriormente, do topo do stack.
        ctx.restore();
    }
}

draw();