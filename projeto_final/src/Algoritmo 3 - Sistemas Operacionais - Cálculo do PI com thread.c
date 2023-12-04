#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

#define n_th 64
#define iteracoes 1000000000

long double PI = 0.0;

void calculaPI(int id) {

  long double tmp = 0.0;
  int i;
  for (i = 1; i < (iteracoes / n_th);i += 2)
  {
    tmp += (long double)1 / i;
    i += 2;
    tmp -= (long double)1 / i;
  }

  PI += tmp;
  pthread_exit(NULL);
}

int main() {

  pthread_t thread[n_th];
  int i;

  for (i = 0;i < n_th;i++) {
    pthread_create(&thread[i], NULL, calculaPI, i);
  }
  for (i = 0;i < n_th;i++) {
    pthread_join(thread[i], NULL);
  }
  printf("PI = %.30Lf\n", (PI * 4) / n_th);
  pthread_exit(NULL);
  return 0;
}