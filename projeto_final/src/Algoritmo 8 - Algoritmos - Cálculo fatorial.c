#include <stdio.h>

int main(void) {

  int numero, fat;
  fat = 1;

  printf("Digite o úmero: ");
  scanf("%i", &numero);

  while (numero > 0) {
    fat = fat * numero;
    numero = numero - 1;
  }

  printf("O fatorial é: %i\n", fat);

  return 0;
}