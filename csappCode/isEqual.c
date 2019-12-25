#include <stdio.h>

int isEqual(int x, int y) {
  return !(x^y);
}

int main() {
  int a = 10;
  int b = 10;
  int res =  isEqual(a, b);
  printf("%d\n", res);
  return res;
}