#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

#define n_th 64
#define iteracoes 1000000000

long double PI = 0.0;
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

void* calculaPI(void* arg) {
  int id = *(int*)arg;
  long double tmp = 0.0;
  long start = id * (iteracoes / n_th) * 2 + 1;
  long end = (id + 1) * (iteracoes / n_th) * 2;

  for (long i = start; i < end; i += 4) {
    tmp += (long double)1 / i - (long double)1 / (i + 2);
  }

  pthread_mutex_lock(&mutex);
  PI += tmp;
  pthread_mutex_unlock(&mutex);

  pthread_exit(NULL);
}

int main() {
  pthread_t thread[n_th];
  int i, ids[n_th];

  for (i = 0; i < n_th; i++) {
    ids[i] = i;
    pthread_create(&thread[i], NULL, calculaPI, &ids[i]);
  }

  for (i = 0; i < n_th; i++) {
    pthread_join(thread[i], NULL);
  }

  PI *= 4.0;
  printf("PI = %.30Lf\n", PI);
  pthread_exit(NULL);
  return 0;
}
