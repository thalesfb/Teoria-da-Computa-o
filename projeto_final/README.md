# Análise e Otimização de Algoritmos - Projeto Final

## Introdução

Este documento apresenta a análise e otimização de 10 algoritmos desenvolvidos durante o curso de Ciëncia da Computação. Cada algoritmo é analisado sob a perspectiva da complexidade de algoritmo utilizando a notação Big O, buscando otimizações e classificando-os como P ou NP.

---

<details>
<summary>Algoritmo 1: Álgebra linear - Transformações lineares</summary>

### Descrição

Parte de uma aplicação web para manipulação gráfica, específica para transformações geométricas. Ele lida com operações como rotação, dilatação, cisalhamento, reflexão e aplicação de matrizes em um conjunto de pontos 2D. Cada função altera as coordenadas dos pontos de acordo com a transformação específica e, em seguida, um gráfico é gerado para visualizar o resultado.

### Análise de Complexidade

- Complexidade de Tempo: Todas as funções de transformação (rotação, dilatação, cisalhamento, reflexão) têm loops que percorrem um array de pontos. A complexidade de tempo de cada função é O(N), onde N é o número de pontos (numeroPontos). Isso porque cada ponto é processado individualmente em tempo constante.
- Complexidade de Espaço: O espaço utilizado é proporcional ao número de pontos, pois para cada ponto são armazenadas suas coordenadas x e y em diferentes arrays. Portanto, a complexidade de espaço também é O(N).

### Otimizações Propostas

- Redução de Código Repetido: Há repetição significativa no código para diferentes transformações. Uma abordagem mais eficiente seria criar funções genéricas para transformações e passar os parâmetros específicos como argumentos.

- Melhor Gerenciamento de Memória: O código poderia ser otimizado para melhor uso da memória, evitando a criação de múltiplos arrays para armazenar resultados temporários de transformações.

- Uso de Objetos: Em vez de usar arrays separados para coordenadas x e y, usar um array de objetos, onde cada objeto representa um ponto com propriedades x e y.

### Classificação: P ou NP

Todas as operações realizadas são computacionalmente simples (operações aritméticas básicas) e podem ser realizadas em tempo polinomial em relação ao número de pontos. Não há problemas de decisão complexos ou cálculos que crescem exponencialmente com o tamanho da entrada, que são características comuns de problemas NP.

</details>

---

<details>
<summary>Algoritmo 2: Computação Grárica - Transformações lineares</summary>

### Descrição

Programa OpenGL para desenhar formas geométricas (triângulo, retângulo, quadrado) em uma janela gráfica. O usuário pode interagir com estas formas, aplicando transformações como translação, rotação e zoom, usando o teclado. Há também um menu interativo que permite selecionar a forma a ser manipulada.

### Análise de Complexidade

- Complexidade de Tempo: A complexidade do algoritmo, em termos de renderização gráfica, é geralmente considerada constante, O(1), por desenho. Isso se deve ao fato de que, independentemente do número de vezes que as formas são manipuladas, a quantidade de trabalho realizado para desenhar cada forma é fixa. No entanto, em aplicações gráficas, a complexidade real pode ser mais dependente da implementação do hardware gráfico e do pipeline de renderização do OpenGL.
- Complexidade de Espaço: O espaço utilizado é fixo, já que armazena um número constante de variáveis e configurações para cada forma. Portanto, a complexidade de espaço é O(1).

### Otimizações Propostas

- Refatoração do Código: O código pode ser refatorado para reduzir a repetição, principalmente nas funções de manipulação de teclado. Pode-se criar funções genéricas para manipulação das formas geométricas.
- Uso de Estruturas de Dados: Em vez de usar variáveis separadas para cada transformação de cada forma, pode-se usar uma estrutura de dados (como uma classe ou struct) para representar cada forma com suas propriedades e transformações.
- Melhoria na Interface de Usuário: Pode-se melhorar a interface de usuário, fornecendo feedback visual mais claro e opções interativas para o usuário.

### Classificação: P ou NP

A aplicação é um programa de renderização gráfica interativo que realiza um conjunto fixo de operações em cada quadro. Todas as operações são executadas em tempo constante ou linear, e não há problemas de decisão ou cálculos que cresçam de maneira não polinomial com o tamanho da entrada. Portanto, ele se enquadra na categoria P.

</details>

---

<details>
<summary>Algoritmo 3: Sistemas Operacionais - Cálculo do PI com thread</summary>

### Descrição

Este programa em C utiliza múltiplas threads (utilizando a biblioteca pthread) para calcular uma aproximação do número π. Ele divide a tarefa de cálculo entre n_th threads (64 no caso), cada uma executando um subconjunto das iterações totais (iteracoes, que é 1000000000). O cálculo é baseado em uma série numérica para π, frequentemente usada em métodos de aproximação.

### Análise de Complexidade

- Complexidade de Tempo: A complexidade de tempo do algoritmo é determinada pelo número de iterações que cada thread executa. Como o número total de iterações é dividido igualmente entre as threads, cada thread executa iteracoes/n_th iterações. Portanto, a complexidade de tempo de cada thread é O(iteracoes/n_th). Em um ambiente com múltiplas threads executando em paralelo, a complexidade de tempo para todo o programa ainda depende do número total de iterações, mas a execução paralela pode reduzir o tempo total necessário.
- Complexidade de Espaço: A complexidade de espaço é O(n_th) devido à criação de 64 threads, cada uma com sua própria pilha e variáveis locais. Além disso, há variáveis globais e recursos de sincronização usados pelas threads.

### Otimizações Propostas

- Melhoria na Precisão do Cálculo: O cálculo de π é baseado em uma série alternada, mas a forma de somar e subtrair valores alternados pode introduzir erros de arredondamento, especialmente para um número grande de iterações. Uma revisão matemática pode ser necessária para garantir a precisidade do valor calculado.
- Balanceamento de Carga entre Threads: Certificar-se de que cada thread realiza uma quantidade igual de trabalho é crucial para otimizar o uso de múltiplas threads.
- Uso de Redução de Sincronização: Reduzir a sincronização entre as threads pode melhorar o desempenho. No código atual, a variável PI é compartilhada entre todas as threads, o que pode levar a condições de corrida ou exigir bloqueios, diminuindo o desempenho. Uma abordagem melhor seria usar variáveis locais dentro de cada thread para calcular a contribuição de cada uma ao valor final de π e, em seguida, somar esses valores de forma segura após todas as threads terem concluído sua execução.

### Classificação: P ou NP

O problema de calcular uma aproximação de π até um certo número de iterações é um problema que pode ser resolvido em tempo polinomial. Mesmo com o uso de múltiplas threads, cada thread executa um número polinomial de operações. Não há problemas de decisão complexos ou crescimento exponencial com o tamanho da entrada.

</details>

---

<details>
<summary>Algoritmo 4: Programação 2 - Site para controle animal</summary>

### Descrição

O código em JavaScript define um objeto DAO (Data Access Object) para interagir com um banco de dados SQLite local usando a API Web SQL Database. Ele inclui métodos para criar e deletar tabelas, inserir, selecionar e deletar dados de diferentes tabelas (USER, TAB_ULT_MACRO, TAB_HIST_MACROS, CAD_MACRO, CAD_FISCALIZACAO), e sincronizar registros. 

### Análise de Complexidade

- As operações de banco de dados (createTables, insertUser, selectUser, etc.) são as principais atividades neste código. A complexidade de tempo para essas operações depende do desempenho do mecanismo de banco de dados subjacente e do número de registros processados.
- Operações como createTables e dropTables são O(1), pois executam um número fixo de comandos SQL independentemente do tamanho do banco de dados.
- Operações de inserção, atualização e seleção (como insertUser, selectUser, deleteUser) têm complexidade variável. Em geral, a inserção e a exclusão de registros são O(1) para um único registro, mas podem ser O(N) para operações em massa. As operações de seleção podem variar de O(1) a O(N), dependendo do número de registros recuperados e da complexidade das consultas SQL.

### Otimizações Propostas

- Otimização de Consultas SQL: As consultas SQL podem ser otimizadas para melhorar o desempenho, especialmente para operações de seleção em grandes conjuntos de dados. Índices podem ser adicionados às tabelas para acelerar as buscas.
- Gerenciamento de Conexões: Reutilizar a conexão com o banco de dados, em vez de abrir uma nova conexão para cada operação, pode melhorar o desempenho e reduzir o overhead.
- Tratamento de Erros: Melhorar o tratamento de erros nas operações do banco de dados pode tornar o código mais robusto e confiável.
- Uso de Promises ou Async/Await: Considerar o uso de Promises ou async/await para lidar com operações assíncronas de banco de dados pode melhorar a legibilidade e a manutenção do código.

### Classificação: P ou NP

As operações realizadas são todas operações típicas de manipulação de banco de dados, que podem ser executadas em tempo polinomial em relação ao tamanho dos dados processados. Não há problemas complexos de decisão ou cálculos que cresçam de forma não polinomial com o tamanho da entrada.

</details>

---

<details>
<summary>Algoritmo 5: Redes 2 - Socket em linux</summary>

### Descrição

O algoritmo consiste em duas partes: um servidor e um cliente TCP, escritos em C.

Servidor: 
- Inicializa um servidor TCP que ouve na porta 9900.
- Utiliza socket(), bind(), listen(), e accept() para configurar e aceitar conexões.
- Fecha a conexão após aceitar uma única conexão.

Cliente:
- Conecta-se ao servidor TCP no endereço 127.0.0.1 (localhost) na porta 9900.
- Utiliza socket() e connect() para estabelecer a conexão.
- Fecha a conexão após estabelecê-la.

### Análise de Complexidade

- Complexidade de Tempo: Tanto o servidor quanto o cliente têm uma complexidade de tempo O(1). As operações realizadas (abrir socket, conectar, aceitar conexão, etc.) não dependem do tamanho da entrada e são executadas um número fixo de vezes.
- Complexidade de Espaço: A complexidade de espaço também é O(1) para ambos. Eles usam uma quantidade constante de memória para armazenar as estruturas de dados do socket, independentemente do tamanho dos dados enviados ou recebidos.

### Otimizações Propostas

- Tratamento de Erros: Ambos os programas não implementam um tratamento de erros robusto. Adicionar verificações de retorno para socket(), bind(), listen(), accept() e connect() pode prevenir falhas silenciosas e tornar o código mais resiliente.
- Ciclo de Aceitação no Servidor: O servidor atualmente aceita apenas uma conexão e depois se encerra. Para ser mais útil, o servidor deve aceitar conexões em um loop, possivelmente em múltiplas threads ou usando I/O não bloqueante.
- Limpeza de Recursos: O servidor deve fechar o socket de escuta (meusocket) após encerrar o serviço. O cliente deve fechar o socket (meusocket) após o término da comunicação, não a estrutura cliente.
- Mensagens de Comunicação: Adicionar a capacidade de enviar e receber mensagens entre o cliente e o servidor pode tornar o exemplo mais prático e ilustrativo de uma comunicação TCP real.

### Classificação: P ou NP

As operações de rede realizadas são básicas e não envolvem problemas complexos que requerem tempo não polinomial para resolver. O código executa um conjunto fixo de instruções que não escalam com o tamanho da entrada.

</details>

---

<details>
<summary>Algoritmo 6: Algoritmos - Avaliação de altura</summary>

### Descrição

Código feito em C que recebe altura de 5 pessoas onde vão ser imprimidas: A maior altura, a média das alturas e as pessoas com altura maior que 2 metros.

### Análise de Complexidades

A complexidade do algoritmo é O(N), que neste caso é o número de iterações do loop (N=5).

### Otimizações Propostas

A quantidade de entradas é fixa, logo poderia ser definida como uma constante.
A entrada de dados poderia ser validada para não ocasionar possíveis erros.
A variável 'cont' poderia ser apenas declarada no loop pois ela é usada somente nele, mantendo o escopo.
A variável 'media' poderia ser eliminada, podendo ser calculada a média das alturas diretamente ao imprimir o resultado para o usuário.

### Classificação: P ou NP

Dado que o algoritmo executa em tempo constante e não há nenhum problema de decisão intrínseco ou complexidade crescente com o aumento do tamanho da entrada, ele se qualifica como um problema P.

</details>

---

<details>
<summary>Algoritmo 7: Algoritmos - Avaliação de notas</summary>

### Descrição

Código em C que recebe duas notas de três alunos, e ele vai dizer se os alunos são aprovados ou não e depois ele vai dizer quantos alunos foram aprovados, reprovados ou estão de recuperação dos três alunos.

### Análise de Complexidade

A complexidade deste algoritmo é linear O(n), onde n é o número de iterações do loop (neste caso, 3).

### Otimizações Propostas

O loop “while” poderia ser substituído polo loop “for” como a variável “cont” é usado somente dentro do loop “while” daí a gente poderia declarar-la diretamente dentro do loop “for”. A variável “media” poderia ser usada como uma variável local, daí o programa ficaria com menos linhas de código.
Poderia ter também uma outra verificação para verificar se a média vai além de 10.

### Classificação: P ou NP

Este algoritmo é de classe P porque o tempo de execução aumenta linearmente com o tamanho da entrada. A entrada neste contexto específico não influencia o desempenho de maneira significativa.

</details>

---

<details>
<summary>Algoritmo 8: Algoritmos - Cálculo fatorial</summary>

### Descrição

Código feito em C que calcula o fatorial de um número.

### Análise de Complexidade

A complexidade desse algoritmo pode ser representada como O(N), onde N é o valor do número inserido. Isso ocorre porque o loop while é executado N vezes, onde N é o valor do número inserido. 

### Otimizações Propostas

Poderia usar uma verificação para avaliar se o número digitado é negativo, caso seja, ele retorna uma mensagem.

### Classificação: P ou NP

Este algoritmo é de classe P, pois o tempo de execução é polinomial em relação ao tamanho da entrada, seguindo a definição da classe P na teoria da complexidade computacional.

</details>

---

<details>
<summary>Algoritmo 9: Algoritmos - Matriz</summary>

### Descrição

Código feito em C, dada a entrada de uma matriz quatro por quatro ele a imprime para o usuário.

### Análise de Complexidade

A complexidade deste algoritmo é Quadrática O(n²).

### Otimizações Propostas

Pode ser útil incluir verificações para garantir que a entrada do usuário seja válida. Por exemplo, garantir que o usuário insira valores numéricos e não caracteres.

### Classificação: P ou NP

Este algoritmo é um exemplo de algoritmo de complexidade polinomial. O motivo é que o tempo de execução cresce de maneira polinomial com o tamanho da entrada.

</details>

---

<details>
<summary>Algoritmo 10: Algoritmos - Soma de vetores</summary>

### Descrição

Código feito em python, ele faz a soma de dois vetores e imprime o vetor resultante.

### Análise de Complexidade

A complexidade é linear, O(N), onde N é o tamanho dos vetores (que é constante neste caso, 7).

### Otimizações Propostas

Pode-se otimizar o código utilizando uma funçõe nativa do Python, como "zip" para percorrer simultaneamente os elementos dos vetores.

### Classificação: P ou NP

Algoritmos lineares são classificados como P (Polinomial), pois seu tempo de execução é proporcional ao tamanho da entrada.

</details>

---

### Conclusão

A análise de algoritmos é um aspecto crucial na ciência da computação, pois permite compreender a eficiência e a eficácia de diferentes abordagens para a resolução de problemas. Ao longo deste projeto, examinamos 10 algoritmos distintos, cada um com suas características e desafios específicos. Vamos destacar os principais pontos observados e as conclusões gerais:

### Observações Gerais
- Complexidade Temporal e Espacial: A análise da complexidade, tanto temporal quanto espacial, revelou que a maioria dos algoritmos analisados opera em tempo polinomial (classe P). Alguns apresentam complexidade linear (O(N)), enquanto outros têm complexidade constante (O(1)). Em todos os casos, a eficiência do algoritmo está fortemente relacionada ao seu propósito e ao contexto de aplicação.

- Otimizações: As otimizações propostas focaram principalmente em melhorar a eficiência, a robustez e a legibilidade do código. Isso incluiu desde o uso de estruturas de dados apropriadas e gerenciamento eficiente de memória até a implementação de práticas recomendadas para tratamento de erros e operações assíncronas.

- Classificação P ou NP: Todos os algoritmos analisados foram classificados como P (Polynomial Time), indicando que eles podem ser resolvidos (ou suas soluções verificadas) em tempo polinomial em relação ao tamanho da entrada.

### Conclusões Específicas
- Transformações Geométricas e Gráficas: Algoritmos envolvendo transformações geométricas e gráficas mostraram a importância do balanceamento entre eficiência computacional e qualidade da renderização. A complexidade constante nessas operações reflete a natureza fixa dos cálculos por quadro, independentemente da complexidade da cena.

- Cálculo de π com Threads: Este algoritmo destacou a eficácia do uso de múltiplas threads para distribuir tarefas computacionais. Embora a complexidade temporal global não seja reduzida, a execução paralela oferece uma melhora significativa no tempo de execução prático.

- Manipulação de Banco de Dados: A análise de operações de banco de dados em JavaScript sublinhou a importância do gerenciamento eficiente das conexões e da otimização de consultas para melhorar o desempenho e a escalabilidade.

- Comunicação via Socket: Os algoritmos de comunicação via socket ressaltaram a necessidade de um design robusto e eficiente para aplicações de rede, com ênfase especial no tratamento de erros e no gerenciamento de conexões.

### Implicações e Aplicações
Estes algoritmos têm aplicações práticas variadas, desde aplicações gráficas e web até sistemas operacionais e redes. A compreensão da complexidade e das otimizações não só melhora o desempenho, mas também aprimora a segurança, a escalabilidade e a experiência do usuário.

### Perspectivas Futuras
A análise de algoritmos é um campo dinâmico e em constante evolução. O avanço das tecnologias e a emergência de novos paradigmas de programação continuarão a desafiar e a estimular a otimização e a inovação em algoritmos. A adoção de novas técnicas, como aprendizado de máquina e inteligência artificial, pode oferecer abordagens ainda mais eficientes e adaptativas para a resolução de problemas complexos.

---
