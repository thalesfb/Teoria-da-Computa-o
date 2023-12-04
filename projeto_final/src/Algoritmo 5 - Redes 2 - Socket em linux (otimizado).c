//Server
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <string.h>
#include <unistd.h>

int main(int argc, char** argv) {
  struct sockaddr_in servidor, cliente;
  int socketServidor, socketCliente;
  int porta = 9900;
  socklen_t tamanhoCliente;

  system("clear");
  printf("Iniciando Servidor\n");

  socketServidor = socket(AF_INET, SOCK_STREAM, 0);
  if (socketServidor == -1) {
    perror("Falha ao criar o socket");
    exit(EXIT_FAILURE);
  }

  servidor.sin_family = AF_INET;
  servidor.sin_addr.s_addr = INADDR_ANY;
  servidor.sin_port = htons(porta);
  memset(&(servidor.sin_zero), 0x00, sizeof(servidor.sin_zero));

  if (bind(socketServidor, (struct sockaddr*)&servidor, sizeof(struct sockaddr)) == -1) {
    perror("Falha no bind");
    exit(EXIT_FAILURE);
  }

  listen(socketServidor, 5);
  printf(">> Servidor escutando na porta %d:\n\n", porta);

  while (1) {
    tamanhoCliente = sizeof(struct sockaddr_in);
    socketCliente = accept(socketServidor, (struct sockaddr*)&cliente, &tamanhoCliente);
    if (socketCliente == -1) {
      perror("Falha ao aceitar conexão");
      continue;
    }

    printf(">> Conexão estabelecida com %s\n", inet_ntoa(cliente.sin_addr));

    // Lógica de comunicação com o cliente

    close(socketCliente);
  }

  close(socketServidor);
  return 0;
}

//Client
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>

int main() {
  char ip[] = "127.0.0.1";
  int socketCliente;
  int porta = 9900;
  struct sockaddr_in cliente;

  system("clear");
  printf("Iniciando Cliente\n\n");

  socketCliente = socket(AF_INET, SOCK_STREAM, 0);
  if (socketCliente == -1) {
    perror("Falha ao criar o socket");
    exit(EXIT_FAILURE);
  }

  cliente.sin_family = AF_INET;
  cliente.sin_addr.s_addr = inet_addr(ip);
  cliente.sin_port = htons(porta);
  memset(&(cliente.sin_zero), 0x00, sizeof(cliente.sin_zero));

  if (connect(socketCliente, (struct sockaddr*)&cliente, sizeof(struct sockaddr)) != 0) {
    perror("Falha ao conectar ao servidor");
    exit(EXIT_FAILURE);
  }

  printf(">> A conexão com o servidor %s foi estabelecida na porta %d \n\n", ip, porta);

  // Lógica de comunicação com o servidor

  close(socketCliente);
  printf(">> Conexão com o servidor encerrada com sucesso!\n\n");

  return 0;
}

