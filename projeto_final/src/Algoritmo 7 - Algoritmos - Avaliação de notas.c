#include <stdio.h>

int main(void) {
  int n1, n2, cont, tA, tR;
  float mediaG, media;
  cont = 0;
  tA = tR = 0;

  while (cont < 3) {
    printf("\n\nDigite a primeira nota: ");
    scanf("%i", &n1);

    printf("\n\nDigite a segunda nota: ");
    scanf("%i", &n2);

    media = (n1 + n2) / 2;

    if ((media >= 0) && (media <= 5)) {
      printf("Reprovado: ");
      tR = tR + 1;
    }
    else {
      if ((media > 5) && (media < 7)) {
        printf("Recuperação: ");
      }
      else
        if ((media >= 7) && (media <= 10)) {
          printf("Aprovado: ");
          tA = tA + 1;
        }
    }
    cont = cont + 1;
  }

  return 0;
}