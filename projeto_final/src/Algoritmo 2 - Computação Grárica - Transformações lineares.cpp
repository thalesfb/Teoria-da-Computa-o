#include <stdio.h>
#include <stdlib.h>
#include <GL\glut.h>
#include <Windows.h>

#define janela_altura 400
#define janela_largura 600

char texto[30];
int objeto = 0;
float rotacaotriangulo = 1, rotacaoretangulo = 1, rotacaoquadrado = 1;
float zoomtriangulo = 1, zoomretangulo = 1, zoomquadrado = 1;
float transtrianguloX = 1, transretanguloX = 1, transquadradoX = 1, transtrianguloY = 1, transretanguloY = 1, transquadradoY = 1;
//int op = 0;

void desenhar() {

  glEnable(GL_POINT_SMOOTH);//suaviza os pontos
  glEnable(GL_LINE_SMOOTH);//suaviza linhas
  glEnable(GL_POLYGON_SMOOTH);//suaviza polignos

  glPushMatrix();
  glRotatef(rotacaotriangulo, 0, 0, 1);
  glScalef(zoomtriangulo, zoomtriangulo, 0);
  glTranslatef(transtrianguloX, transtrianguloY, 0);

  glBegin(GL_TRIANGLES);
  glColor3f(1, 0, 0); //cor
  glVertex2f(-200, -100);
  glVertex2f(-100, 0);
  glVertex2f(0, -100);
  glEnd();
  glPopMatrix();

  glPushMatrix();
  glRotatef(rotacaoretangulo, 0, 0, 1);
  glScalef(zoomretangulo, zoomretangulo, 0);
  glTranslatef(transretanguloX, transretanguloY, 0);

  glBegin(GL_QUADS);
  glColor3f(0, 1, 0);
  glVertex2f(-150, 50);
  glVertex2f(100, 50);
  glVertex2f(100, 150);
  glVertex2f(-150, 150);
  glEnd();
  glPopMatrix();

  glPushMatrix();
  glRotatef(rotacaoquadrado, 0, 0, 1);
  glScalef(zoomquadrado, zoomquadrado, 0);
  glTranslatef(transquadradoX, transquadradoY, 0);

  glBegin(GL_QUADS);
  glColor3f(0, 0, 1);
  glVertex2f(50, -100);
  glVertex2f(150, -100);
  glVertex2f(150, 0);
  glVertex2f(50, 0);
  glEnd();
  glPopMatrix();
}

void tela(GLsizei w, GLsizei h) {
  glMatrixMode(GL_PROJECTION);
  glLoadIdentity();
  gluOrtho2D(0, janela_largura, 0, janela_altura);// cria janela(esq,dir,baixo,cima)
}

void display() {
  glMatrixMode(GL_MODELVIEW);//coordenadas de desenho
  glLoadIdentity();

  glClearColor(1, 1, 1, 1); //cor do fundo
  glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT); //executa limpeza
  glTranslatef(janela_largura / 2, janela_altura / 2, 0); //onde o desenho começa, bem no meio da tela
  glEnable(GL_BLEND); // habilita blend
  glViewport(0, 0, janela_largura, janela_altura);

  desenhar();

  glFlush();//executa desenho
}

void keyboard(int tecla, int x, int y) {

  printf("X: %d, Y:%d\n", x, y);
  if (objeto == 1) {

    switch (tecla) {
    case (GLUT_KEY_RIGHT):
      transtrianguloX += 0.5;
      printf("O valor de X do trinangulo é: %f\n", transtrianguloX);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_LEFT):
      transtrianguloX -= 0.5;
      printf("O valor de X do trinangulo é: %f\n", transtrianguloX);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_UP):
      transtrianguloY += 0.5;
      printf("O valor de Y do trinangulo é: %f\n", transtrianguloY);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_DOWN):
      transtrianguloY -= 0.5;
      printf("O valor de Y do trinangulo é: %f\n", transtrianguloY);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_PAGE_UP):
      zoomtriangulo += 0.05;
      printf("O valor do zoom do trinangulo é: %f\n", zoomtriangulo);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_PAGE_DOWN):
      zoomtriangulo -= 0.05;
      printf("O valor do zoom do trinangulo é: %f\n", zoomtriangulo);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_HOME):
      rotacaotriangulo += 0.5;
      printf("O valor da rotacao do trinangulo é: %f\n", rotacaotriangulo);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_INSERT):
      rotacaotriangulo -= 0.5;
      printf("O valor da rotacao do trinangulo é: %f\n", rotacaotriangulo);
      glutPostRedisplay();
      break;

    default:
      printf("Opção invalida\n");
      break;
    }
  }

  if (objeto == 2) {

    switch (tecla) {
    case (GLUT_KEY_RIGHT):
      transretanguloX += 0.5;
      printf("O valor de X do retangulo é: %f\n", transretanguloX);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_LEFT):
      transretanguloX -= 0.5;
      printf("O valor de X do retangulo é: %f\n", transretanguloX);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_UP):
      transretanguloY += 0.5;
      printf("O valor de Y do retangulo é: %f\n", transretanguloY);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_DOWN):
      transretanguloY -= 0.5;
      printf("O valor de Y do retangulo é: %f\n", transretanguloY);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_PAGE_UP):
      zoomretangulo += 0.05;
      printf("O valor do zoom do retangulo é: %f\n", zoomretangulo);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_PAGE_DOWN):
      zoomretangulo -= 0.05;
      printf("O valor do zoom do retangulo é: %f\n", zoomretangulo);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_HOME):
      rotacaoretangulo += 0.5;
      printf("O valor da rotacao do retangulo é: %f\n", rotacaoretangulo);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_INSERT):
      rotacaoretangulo -= 0.5;
      printf("O valor da rotacao do retangulo é: %f\n", rotacaoretangulo);
      glutPostRedisplay();
      break;

    default:
      printf("Opção invalida\n");
      break;
    }
  }

  if (objeto == 3) {

    switch (tecla) {
    case (GLUT_KEY_RIGHT):
      transquadradoX += 0.5;
      printf("O valor de X do quadrado é: %f\n", transquadradoX);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_LEFT):
      transquadradoX -= 0.5;
      printf("O valor de X do quadrado é: %f\n", transquadradoX);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_UP):
      transquadradoY += 0.5;
      printf("O valor de Y do quadrado é: %f\n", transquadradoY);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_DOWN):
      transquadradoY -= 0.5;
      printf("O valor de Y do quadrado é: %f\n", transquadradoY);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_PAGE_UP):
      zoomquadrado += 0.05;
      printf("O valor do zoom do quadrado é: %f\n", zoomquadrado);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_PAGE_DOWN):
      zoomquadrado -= 0.05;
      printf("O valor do zoom do quadrado é: %f\n", zoomquadrado);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_HOME):
      rotacaoquadrado += 0.5;
      printf("O valor da rotacao do quadrado é: %f\n", rotacaoquadrado);
      glutPostRedisplay();
      break;

    case (GLUT_KEY_INSERT):
      rotacaoquadrado -= 0.5;
      printf("O valor da rotacao do quadrado é: %f\n", rotacaoquadrado);
      glutPostRedisplay();
      break;

    default:
      printf("Opção invalida\n");
      break;
    }
  }
}

void menu_objeto(int id) {

  switch (id) {

  case 2:
    objeto = 1;
    break;
  case 3:
    objeto = 2;
    break;
  case 4:
    objeto = 3;
    break;
  default:
    objeto = 0;
    break;
  }
}

void menu(int id) {

  if (id == 1) exit(0);
}

int main(int argc, char** argv) {


  int sub_menu; //variavel que recebe o sub menu

  glutInit(&argc, argv); // suporte a janelas
  glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB); //GLUT_SINGLE - apenas uma tela, GLUT_RGB - padrão de cores
  glutInitWindowSize(janela_largura, janela_altura); // tamanho da janela
  glutInitWindowPosition(100, 100);//posicao onde surge a janela
  glutCreateWindow("Brincando com os objetos");//cria janela e da nome pra ela
  glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);//habilitando a transparencia
  printf("Seta direita para mover positivamente no eixo X;\n"
         "Seta esquerda para mover negativamente no eixo X;\n"
         "Seta para cima para mover positivamente no eixo Y;\n"
         "Seta para baixo para mover negativamente no eixo Y;\n"
         "PAGE UP para dar mais zomm;\n"
         "PAGE DOWN para dar menos zomm;\n"
         "Tecla Insert para rotacionar no sintido horario;\n"
         "Tecla Home para rotacionar no sentido anti-horario;\n");
  //glutFullScreen();																																																										
  glutReshapeFunc(tela); //configura tela
  glutDisplayFunc(display);
  //Criando sub menu
  sub_menu = glutCreateMenu(menu_objeto);
  glutAddMenuEntry("Triangulo", 2);
  glutAddMenuEntry("Retangulo", 3);
  glutAddMenuEntry("Quadrado", 4);
  glutCreateMenu(menu);
  glutAddMenuEntry("Fechar", 1);
  glutAddSubMenu("Objetos", sub_menu);
  glutAttachMenu(GLUT_RIGHT_BUTTON);
  //glutSpecialFunc(&keyboard);
  glutSpecialFunc(keyboard);
  glutMainLoop(); // redesenhar

  return EXIT_SUCCESS;
}