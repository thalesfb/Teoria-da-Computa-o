// variaveis
var rotacaoGraus = 0; // graus de rotacao
var rotacao = []; // rotacao
var vetorXRotacao = []; // vetor x da rotacao
var vetorYRotacao = []; // vetor y da rotacao
var sen; // seno
var cos; // cosseno

var dilatacaoX = []; // dilatacao x
var dilatacaoY = []; // dilatacao y
var dilatacaoFatorX = 0; // numero inserido na dilatacao de x
var dilatacaoFatorY = 0; // numero inserido na dilatacao de y
var vetorXDilatacaoX = [];
var vetorYDilatacaoX = [];
var vetorXDilatacaoY = [];
var vetorYDilatacaoY = [];

var cisalhamentoX = []; // cisalhamento x
var cisalhamentoFatorX = 0; // numero inserido no cisalhamento de x
var vetorXCisalhamentoX = []; // vetor x resultante do cisalhamento de x
var vetorYCisalhamentoX = []; // vetor y resultante do cisalhamento de x
var cisalhamentoY = []; // cisalhamento y
var cisalhamentoFatorY = 0; // numero inserido no cisalhamento de y
var vetorXCisalhamentoY = []; // vetor x resultante do cisalhamento de y
var vetorYCisalhamentoY = []; // vetor y resultante do cisalhamento de y

var original = []; // grafico original
var vetorX = []; // vetor dos x
var vetorY = []; // vetor dos y

var reflexaoX = []; // reflexao eixo x
var vetorXReflexaoX = []; // vetor x da reflexao de x
var vetorYReflexaoX = []; // vetor y da reflexao de x
var reflexaoY = []; //reflexao eixo y
var vetorXReflexaoY = []; // vetor x da reflexao de y
var vetorYReflexaoY = []; // vetor y da reflexao de y
var reflexaoOrigem = []; //reflexao origem
var vetorXReflexaoOrigem = []; // vetor x da reflexao da origem
var vetorYReflexaoOrigem = []; // vetor y da reflexao da origem
var reflexaoXY = []; // reflexao quando x=y
var vetorXReflexaoXY = []; // vetor x da reflexao de xy
var vetorYReflexaoXY = []; // vetor y da reflexao de xy
var reflexaoYX = []; // reflexao quando y=-x
var vetorXReflexaoYX = []; // vetor x da reflexao de y-x
var vetorYReflexaoYX = []; // vetor y da reflexao de y-x


var matriz = []; // matriz de transformacao
var vetorXMatriz = [];
var vetorYMatriz = [];

var numeroPontos = 1; // numero de pontos
var removidos = 0; // pontos removidos

function limpaGrafico() {

  original = [];
  reflexaoX = [];
  reflexaoY = [];
  reflexaoOrigem = [];
  reflexaoXY = [];
  reflexaoYX = [];
  rotacao = [];
  dilatacaoX = [];
  dilatacaoY = [];
  cisalhamentoX = [];
  cisalhamentoY = [];
  matriz = [];

  grafico();
}

function limpaValores() {

  for (var i = 0; i < numeroPontos; i++) {
    $('#x' + i + ', #y' + i).val("");
  }
}


(function ($) {
  $(function () {
    $(".tip").tooltip();
  });
})(jQuery);

// Adicionando e removendo pontos

(function ($) {

  removerPonto = function (handler) {
    var tr = $(handler).closest('tr');

    tr.fadeOut(200, function () {
      tr.remove();
    });

    removidos++;

    return false;
  };

  adicionarPonto = function () {

    var novaLinha = $("<tr>");
    var coluna = "";

    coluna += '<td>' +
      '<div class="input-group input-group-sm">' +
      '<span class="input-group-addon" id="sizing-addon1">X</span>' +
      '<input type="number" min="0" max="" placeholder="0,00" class="form-control text-center" id="x' + numeroPontos + '" step="any">' +
      '</div>' +
      '</td>';

    coluna += '<td>' +
      '<div class="input-group input-group-sm">' +
      '<span class="input-group-addon" id="sizing-addon1">Y</span>' +
      '<input type="number" min="0" max="" placeholder="0,00" class="form-control text-center" id="y' + numeroPontos + '" step="any">' +
      '</div>' +
      '</td>';

    coluna += '<td>' +
      '<button onclick="removerPonto(this)" type="button" class="btn btn-default btn-sm tip" data-toggle="tooltip" data-placement="bottom" title="Remover"><i class="fa fa-times"></i></button>' +
      '</td>' +
      '</tr>';

    novaLinha.append(coluna);
    numeroPontos++;
    $("#pontos").append(novaLinha);

    return false;
  };

})(jQuery);

// grafico dos pontos adicionados

function grafOriginal() {

  limpaGrafico();

  for (var i = 0; i < numeroPontos; i++) {
    var y = $("#y" + i).val();
    var x = $("#x" + i).val();

    vetorY[i] = y;
    vetorX[i] = x;
  }

  original['y'] = vetorY;
  original['x'] = vetorX;

  grafico();
}

// grafico do cisalhamento de x

function grafCisalhamentoX() {

  cisalhamentoFatorX = $('#cisalhamentoFatorX').val();

  for (var i = 0; i < numeroPontos; i++) {
    vetorXCisalhamentoX[i] = (parseFloat(vetorX[i]) + parseFloat(cisalhamentoFatorX * vetorY[i]));
    vetorYCisalhamentoX[i] = vetorY[i];
  }

  cisalhamentoX['x'] = vetorXCisalhamentoX;
  cisalhamentoX['y'] = vetorYCisalhamentoX;

  grafico();

}

// grafico cisalhamento y

function grafCisalhamentoY() {

  cisalhamentoFatorY = $('#cisalhamentoFatorY').val();

  for (var i = 0; i < numeroPontos; i++) {
    //        res = vetorX[i] + (cisalhamentoFatorX * vetorY[i]);

    vetorXCisalhamentoY[i] = vetorX[i];
    vetorYCisalhamentoY[i] = (parseFloat(vetorY[i]) + parseFloat(cisalhamentoFatorY * vetorX[i]));
  }

  cisalhamentoY['x'] = vetorXCisalhamentoY;
  cisalhamentoY['y'] = vetorYCisalhamentoY;

  grafico();

}

// dilatacao de x

function grafDilatacaoX() {

  dilatacaoFatorX = $('#dilatacaoFatorX').val();

  for (var i = 0; i < numeroPontos; i++) {
    vetorXDilatacaoX[i] = vetorX[i] * dilatacaoFatorX;
    vetorYDilatacaoX[i] = vetorY[i];
  }

  dilatacaoX['x'] = vetorXDilatacaoX;
  dilatacaoX['y'] = vetorYDilatacaoX;

  grafico();
}

// dilatacao de y

function grafDilatacaoY() {

  dilatacaoFatorY = $('#dilatacaoFatorY').val();

  for (var i = 0; i < numeroPontos; i++) {
    vetorXDilatacaoY[i] = vetorX[i];
    vetorYDilatacaoY[i] = vetorY[i] * dilatacaoFatorY;
  }

  dilatacaoY['x'] = vetorXDilatacaoY;
  dilatacaoY['y'] = vetorYDilatacaoY;

  grafico();

}

// grafico reflecao de x

function grafReflexaoX() {

  for (var i = 0; i < numeroPontos; i++) {
    vetorXReflexaoX[i] = vetorX[i];
    vetorYReflexaoX[i] = vetorY[i] * -1;
  }

  reflexaoX['x'] = vetorXReflexaoX;
  reflexaoX['y'] = vetorYReflexaoX;

  grafico();
}

// grafico reflexao de y

function grafReflexaoY() {

  for (var i = 0; i < numeroPontos; i++) {
    vetorXReflexaoY[i] = vetorX[i] * -1;
    vetorYReflexaoY[i] = vetorY[i];
  }

  reflexaoY['x'] = vetorXReflexaoY;
  reflexaoY['y'] = vetorYReflexaoY;

  grafico();
}

// grafico reflexao origem

function grafReflexaoOrigem() {

  for (var i = 0; i < numeroPontos; i++) {
    vetorXReflexaoOrigem[i] = vetorX[i] * -1;
    vetorYReflexaoOrigem[i] = vetorY[i] * -1;
  }

  reflexaoOrigem['x'] = vetorXReflexaoOrigem;
  reflexaoOrigem['y'] = vetorYReflexaoOrigem;

  grafico();
}

// grafico reflexao x=y

function grafReflexaoXY() {

  for (var i = 0; i < numeroPontos; i++) {
    vetorXReflexaoXY[i] = vetorY[i];
    vetorYReflexaoXY[i] = vetorX[i];
  }

  reflexaoXY['x'] = vetorXReflexaoXY;
  reflexaoXY['y'] = vetorYReflexaoXY;

  grafico();
}

function grafReflexaoYX() {

  for (var i = 0; i < numeroPontos; i++) {
    vetorXReflexaoYX[i] = vetorY[i] * -1;
    vetorYReflexaoYX[i] = vetorX[i] * -1;
  }

  reflexaoYX['x'] = vetorXReflexaoYX;
  reflexaoYX['y'] = vetorYReflexaoYX;

  grafico();
}

// grafico rotacao

function grafRotacao() {

  rotacaoGraus = $('#grau').val();

  sen = Math.sin(rotacaoGraus * (Math.PI / 180));
  cos = Math.cos(rotacaoGraus * (Math.PI / 180));

  for (var i = 0; i < numeroPontos; i++) {
    vetorXRotacao[i] = (parseFloat(cos * vetorX[i]) + parseFloat((-1 * sen) * vetorY[i]));
    vetorYRotacao[i] = (parseFloat(sen * vetorX[i]) + parseFloat(cos * vetorY[i]));
  }

  rotacao['x'] = vetorXRotacao;
  rotacao['y'] = vetorYRotacao;

  grafico();
}

// grafico da matriz

function grafMatriz() {

  var a11 = $('#a11').val();
  var a12 = $('#a12').val();
  var a21 = $('#a21').val();
  var a22 = $('#a22').val();

  for (var i = 0; i < numeroPontos; i++) {
    vetorXMatriz[i] = parseFloat(a11 * vetorX[i]) + parseFloat(a12 * vetorY[i]);
    vetorYMatriz[i] = parseFloat(a21 * vetorX[i]) + parseFloat(a22 * vetorY[i]);
  }

  matriz['x'] = vetorXMatriz;
  matriz['y'] = vetorYMatriz;

  grafico();
}
function matrizInversa() {

  var a11 = $('#a11').val();
  var a12 = $('#a12').val();
  var a21 = $('#a21').val();
  var a22 = $('#a22').val();

  var det = (a11 * a22) - (a12 * a21);

  if (det == 0) {
    $('#determinante').empty();
    $('#determinante').append(
      '<div class="alert alert-danger alert-dismissible fade in text-center" role="alert">' +
      '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">X</span></button>' +
      'A matriz possui determinante igual a 0. Isso significa que não possui inversa.' +
      '</div>');

    $('#a11Inversa, #a12Inversa, #a21Inversa, #a22Inversa').val("");
  }
  else {
    $('#determinante').empty();

    var a = (a22 / det);
    var b = ((-a12) / det);
    var c = ((-a21) / det);
    var d = (a11 / det);

    $('#a11Inversa').val(a);
    $('#a12Inversa').val(b);
    $('#a21Inversa').val(c);
    $('#a22Inversa').val(d);
  }
}

function grafico() {
  original['mode'] = 'lines+markers', cisalhamentoX['mode'] = 'lines+markers', cisalhamentoY['mode'] = 'lines+markers', dilatacaoX['mode'] = 'lines+markers', dilatacaoY['mode'] = 'lines+markers', reflexaoX['mode'] = 'lines+markers', reflexaoY['mode'] = 'lines+markers', reflexaoXY['mode'] = 'lines+markers', reflexaoYX['mode'] = 'lines+markers', reflexaoOrigem['mode'] = 'lines+markers', rotacao['mode'] = 'lines+markers', matriz['mode'] = 'lines+markers';

  original['name'] = 'Original';
  cisalhamentoX['name'] = 'Cisalhamento X de ' + cisalhamentoFatorX;
  cisalhamentoY['name'] = 'Cisalhamento Y de ' + cisalhamentoFatorY;
  dilatacaoX['name'] = 'Dilatação X de ' + dilatacaoFatorX;
  dilatacaoY['name'] = 'Dilatação Y de ' + dilatacaoFatorY;
  reflexaoX['name'] = 'Reflexção X';
  reflexaoY['name'] = 'Reflexção Y';
  reflexaoXY['name'] = 'Reflexção X = Y';
  reflexaoYX['name'] = 'Reflexao Y = -X';
  reflexaoOrigem['name'] = 'Reflexção Origem';
  rotacao['name'] = 'Rotação de ' + rotacaoGraus + '°';
  matriz['name'] = 'Matriz x Pontos Iniciais';

  var layout = {
    title: 'Gráfico',
    xaxis: {
      title: 'Eixo X',

    },
    yaxis: {
      title: 'Eixo Y',
    },
  };

  var data = [original, cisalhamentoX, cisalhamentoY, dilatacaoX, dilatacaoY, reflexaoX, reflexaoY, reflexaoXY, reflexaoYX, reflexaoOrigem, rotacao, matriz];
  Plotly.newPlot('grafico', data, layout);
};