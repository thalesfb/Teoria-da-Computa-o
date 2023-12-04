#include <stdio.h>
#include <stdlib.h>
#include <GL/glut.h>
#include <Windows.h>

#define janela_altura 400
#define janela_largura 600

typedef struct {
  float rotacao;
  float zoom;
  float transX;
  float transY;
} Objeto;

Objeto triangulo = { 1, 1, 1, 1 };
Objeto retangulo = { 1, 1, 1, 1 };
Objeto quadrado = { 1, 1, 1, 1 };
int objetoSelecionado = 0;

void aplicarTransformacoes(Objeto* obj) {
  glRotatef(obj->rotacao, 0, 0, 1);
  glScalef(obj->zoom, obj->zoom, 0);
  glTranslatef(obj->transX, obj->transY, 0);
}

void desenharTriangulo() {
  glPushMatrix();
  aplicarTransformacoes(&triangulo);
  glBegin(GL_TRIANGLES);
  glColor3f(1, 0, 0); // Vermelho
  glVertex2f(-200, -100);
  glVertex2f(-100, 0);
  glVertex2f(0, -100);
  glEnd();
  glPopMatrix();
}

void desenharRetangulo() {
  glPushMatrix();
  aplicarTransformacoes(&retangulo);
  glBegin(GL_QUADS);
  glColor3f(0, 1, 0); // Verde
  glVertex2f(-150, 50);
  glVertex2f(100, 50);
  glVertex2f(100, 150);
  glVertex2f(-150, 150);
  glEnd();
  glPopMatrix();
}

void desenharQuadrado() {
  glPushMatrix();
  aplicarTransformacoes(&quadrado);
  glBegin(GL_QUADS);
  glColor3f(0, 0, 1); // Azul
  glVertex2f(50, -100);
  glVertex2f(150, -100);
  glVertex2f(150, 0);
  glVertex2f(50, 0);
  glEnd();
  glPopMatrix();
}

void desenhar() {
  glEnable(GL_POINT_SMOOTH);
  glEnable(GL_LINE_SMOOTH);
  glEnable(GL_POLYGON_SMOOTH);

  glViewport(0, 0, janela_largura, janela_altura);
  glMatrixMode(GL_MODELVIEW);
  glLoadIdentity();
  glTranslatef(janela_largura / 2, janela_altura / 2, 0);

  desenharTriangulo();
  desenharRetangulo();
  desenharQuadrado();
}

void tela(GLsizei w, GLsizei h) {
  glMatrixMode(GL_PROJECTION);
  glLoadIdentity();
  gluOrtho2D(0, janela_largura, 0, janela_altura);
}

void display() {
  glClearColor(1, 1, 1, 1);
  glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
  glEnable(GL_BLEND);
  glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

  desenhar();
  glFlush();
}

void keyboard(int tecla, int x, int y) {
  Objeto* objAtual;
  switch (objetoSelecionado) {
  case 1: objAtual = &triangulo; break;
  case 2: objAtual = &retangulo; break;
  case 3: objAtual = &quadrado; break;
  default: return;
  }

  switch (tecla) {
  case (GLUT_KEY_RIGHT): objAtual->transX += 0.5; break;
  case (GLUT_KEY_LEFT): objAtual->transX -= 0.5; break;
  case (GLUT_KEY_UP): objAtual->transY += 0.5; break;
  case (GLUT_KEY_DOWN): objAtual->transY -= 0.5; break;
  case (GLUT_KEY_PAGE_UP): objAtual->zoom += 0.05; break;
  case (GLUT_KEY_PAGE_DOWN): objAtual->zoom -= 0.05; break;
  case (GLUT_KEY_HOME): objAtual->rotacao += 0.5; break;
  case (GLUT_KEY_INSERT): objAtual->rotacao -= 0.5; break;
  default: printf("Opção invalida\n"); break;
  }
  glutPostRedisplay();
}

void menu_objeto(int id) {
  objetoSelecionado = id - 1;
}

void menu(int id) {
  if (id == 1) exit(0);
}

int main(int argc, char** argv) {
  glutInit(&argc, argv);
  glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB);
  glutInitWindowSize(janela_largura, janela_altura);
  glutInitWindowPosition(100, 100);
  glutCreateWindow("Brincando com os objetos");

  int sub_menu = glutCreateMenu(menu_objeto);
  glutAddMenuEntry("Triangulo", 2);
  glutAddMenuEntry("Retangulo", 3);
  glutAddMenuEntry("Quadrado", 4);

  glutCreateMenu(menu);
  glutAddMenuEntry("Fechar", 1);
  glutAddSubMenu("Objetos", sub_menu);
  glutAttachMenu(GLUT_RIGHT_BUTTON);

  glutReshapeFunc(tela);
  glutDisplayFunc(display);
  glutSpecialFunc(keyboard);
  glutMainLoop();

  return EXIT_SUCCESS;
}
