vetor1 = [10, 24, 3, 43, 55, 6, 7]
vetor2 = [72, 6, 5, 4, 32, 2, 10]

soma_vetor = []

for i in range(7):
  soma_elemento = vetor1[i] + vetor2[i]
  soma_vetor.append(soma_elemento)

print("A soma dos vetores é:", soma_vetor)