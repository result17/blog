#include <stdio.h>

typedef unsigned char *byte_pointer;

void show_bytes(byte_pointer start, size_t len) {
  size_t i;
  for (i = 0; i < len; i++)
    printf(" %.2x", start[i]);
  printf("\n") ;
}

int main() {
  short sx = -12345;
  unsigned short usx = sx;
  int x = sx;
  unsigned ux = usx;
  printf("sx = %d:\t", sx);
  show_bytes((byte_pointer) &sx, sizeof(short));
  printf("usx = %u:\t", usx);
  show_bytes((byte_pointer) &usx, sizeof(unsigned short));
  printf("x = %d:\t", x);
  show_bytes((byte_pointer) &x, sizeof(int));
  printf("ux = %u:\t", ux);
  show_bytes((byte_pointer) &ux, sizeof(unsigned));
  return 0;
}