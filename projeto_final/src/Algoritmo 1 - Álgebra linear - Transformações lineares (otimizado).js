class Ponto {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Variáveis Globais
var pontos = []; // Array de objetos Ponto
var rotacaoGraus = 0;
var dilatacaoFatorX = 0, dilatacaoFatorY = 0;
var cisalhamentoFatorX = 0, cisalhamentoFatorY = 0;

function aplicarRotacao(ponto, graus) {
  let rad = graus * Math.PI / 180;
  let cos = Math.cos(rad), sen = Math.sin(rad);
  return new Ponto(
    ponto.x * cos - ponto.y * sen,
    ponto.x * sen + ponto.y * cos
  );
}

function aplicarDilatacao(ponto, fatorX, fatorY) {
  return new Ponto(ponto.x * fatorX, ponto.y * fatorY);
}

function aplicarCisalhamento(ponto, fatorX, fatorY) {
  return new Ponto(ponto.x + fatorX * ponto.y, ponto.y + fatorY * ponto.x);
}

function transformarPontos(transformacao) {
  pontos = pontos.map(p => transformacao(p));
}

function adicionarPonto(x, y) {
  pontos.push(new Ponto(x, y));
}

function removerPonto(index) {
  pontos.splice(index, 1);
}

function limparPontos() {
  pontos = [];
}

function rotacionar() {
  transformarPontos(p => aplicarRotacao(p, rotacaoGraus));
}

function dilatar() {
  transformarPontos(p => aplicarDilatacao(p, dilatacaoFatorX, dilatacaoFatorY));
}

function cisalhar() {
  transformarPontos(p => aplicarCisalhamento(p, cisalhamentoFatorX, cisalhamentoFatorY));
}

// Funções de manipulação do DOM e eventos
(function ($) {
  $(function () {
    $(".tip").tooltip();

    // Funções para adicionar e remover pontos da interface
    removerPonto = function (handler) {
      var tr = $(handler).closest('tr');
      tr.fadeOut(200, function () {
        tr.remove();
        pontos.splice(tr.index(), 1); // Remover ponto do array
      });
    };

    adicionarPonto = function () {
      var x = $('#x' + pontos.length).val();
      var y = $('#y' + pontos.length).val();
      adicionarPonto(parseFloat(x), parseFloat(y));
    };

    // Eventos para aplicar transformações
    $('#rotacionar').click(function () {
      rotacaoGraus = $('#grau').val();
      rotacionar();
      grafico();
    });

    $('#dilatar').click(function () {
      dilatacaoFatorX = $('#dilatacaoFatorX').val();
      dilatacaoFatorY = $('#dilatacaoFatorY').val();
      dilatar();
      grafico();
    });

    $('#cisalhar').click(function () {
      cisalhamentoFatorX = $('#cisalhamentoFatorX').val();
      cisalhamentoFatorY = $('#cisalhamentoFatorY').val();
      cisalhar();
      grafico();
    });
  });
})(jQuery);

function grafico() {
  // Lógica de plotagem do gráfico
  var data = pontos.map(p => { return { x: p.x, y: p.y, mode: 'markers' } });
  var layout = {
    title: 'Gráfico',
    xaxis: { title: 'Eixo X' },
    yaxis: { title: 'Eixo Y' }
  };
  Plotly.newPlot('grafico', data, layout);
}

// Inicialização
$(document).ready(function () {
  grafico();
});
