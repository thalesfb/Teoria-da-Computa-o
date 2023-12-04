# Análise e Otimização de Algoritmos - Projeto Final

## Introdução

Este documento apresenta a análise e otimização de 10 algoritmos desenvolvidos durante o curso de Ciëncia da Computação. Cada algoritmo é analisado sob a perspectiva da complexidade de algoritmo utilizando a notação Big O, buscando otimizações e classificando-os como P ou NP.

---

<details>
<summary>Algoritmo 1: Álgebra linear - Transformações lineares</summary>

### Descrição

Breve descrição do algoritmo.

### Análise de Complexidade

Análise detalhada da complexidade utilizando a notação Big O.

### Otimizações Propostas

Descrição das otimizações identificadas.

### Classificação: P ou NP

Justificativa da classificação como P ou NP.

</details>

---

<details>
<summary>Algoritmo 2: Computação Grárica - Transformações lineares</summary>

### Descrição

Breve descrição do algoritmo.

### Análise de Complexidade

Análise detalhada da complexidade utilizando a notação Big O.

### Otimizações Propostas

Descrição das otimizações identificadas.

### Classificação: P ou NP

Justificativa da classificação como P ou NP.

</details>

---

<details>
<summary>Algoritmo 3: Sistemas Operacionais - Cálculo do PI com thread</summary>

### Descrição

Breve descrição do algoritmo.

### Análise de Complexidade

Análise detalhada da complexidade utilizando a notação Big O.

### Otimizações Propostas

Descrição das otimizações identificadas.

### Classificação: P ou NP

Justificativa da classificação como P ou NP.

</details>

---

<details>
<summary>Algoritmo 4: Programação 2 - Site para controle animal</summary>

### Descrição

Breve descrição do algoritmo.

### Análise de Complexidade

Análise detalhada da complexidade utilizando a notação Big O.

### Otimizações Propostas

Descrição das otimizações identificadas.

### Classificação: P ou NP

Justificativa da classificação como P ou NP.

</details>

---

<details>
<summary>Algoritmo 5: Redes 2 - Socket em linux</summary>

### Descrição

Breve descrição do algoritmo.

### Análise de Complexidade

Análise detalhada da complexidade utilizando a notação Big O.

### Otimizações Propostas

Descrição das otimizações identificadas.

### Classificação: P ou NP

Justificativa da classificação como P ou NP.

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

---
