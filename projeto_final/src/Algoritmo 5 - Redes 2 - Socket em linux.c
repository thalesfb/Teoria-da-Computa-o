// Server
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <string.h >
#include <unistd.h >
/*

struct sckaddr_in{
  short int sin_family; // familia de endereco
  unsigned short int sin_port; // porta de comunicacao
  struct in_addr.sin_addr; //ip do host
  unsigned char sin_zero[8];
}

*/
int main(int argc, char** argv) {
  truct sockaddr_in servidor; //estrutura do socket
  nt meusocket, tsocket;
  nt porta = 9900;
  truct hostent* host;
  system("clear");
  printf("Iniciando Servidor\n");
  //AF_INET, AF_UNIX, AF_ISO, AF_NS
  //0 - ip; 1-icmp; 2- igmp; 3-gg; 6-tcp; 17-udp
  meusocket = socket(AF_INET, SOCK_STREAM, 0);
  servidor.sin_family = AF_INET;
  servidor.sin_addr.s_addr = INADDR_ANY;
  servidor.sin_port = htons(porta);
  memset(&(servidor.sin_zero), 0x00, sizeof(servidor.sin_zero));
  tsocket = sizeof(struct sockaddr_in);
  //sobe servico
  bind(meusocket, (struct sockaddr*)&servidor, sizeof(struct sockaddr));
  listen(meusocket, 1);
  printf(">> Servidor escutando na porta %d:\n\n", porta);
  meusocket = accept(meusocket, (struct sockaddr*)&servidor, &tsocket); //passa a aceitar conexoes
  close(meusocket);
  printf(">> Conexao encerrada\n\n");
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

int main() {

  char ip[] = "127.0.0.1";
  int meusocket;
  int porta = 9900;
  struct sockaddr_in cliente;

  system("clear");
  printf("Iniciando Cliente\n\n");

  meusocket = socket(AF_INET, SOCK_STREAM, 0);
  cliente.sin_family = AF_INET;
  cliente.sin_addr.s_addr = inet_addr(ip);
  cliente.sin_port = htons(porta);

  memset(&(cliente.sin_zero), 0x00, sizeof(cliente.sin_zero));

  if (connect(meusocket, (struct sockaddr*)&cliente, sizeof(struct sockaddr)) != 0)
  {
    puts("\n>> Servidor nao encontrado\nO cliente sera encerrado\n");
    exit(0);
  }
  printf(">> A conexao com o servidor %s foi estabelecida na porta %d \n\n", ip, porta);

  close(cliente);
  printf(">> Conexao com o servidor encerrada com sucesso!\n\n");

  return (0);
}