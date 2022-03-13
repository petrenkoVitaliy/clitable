#include <napi.h>
#include <windows.h>
#include "screen_buffer_info.h"
#include <iostream>
using namespace std;

struct Position {
    int x;
    int y;
};

Position getConsoleCursorPosition()
{
  CONSOLE_SCREEN_BUFFER_INFO csbi;
  GetConsoleScreenBufferInfo(GetStdHandle(STD_OUTPUT_HANDLE), &csbi);

  Position p;
  p.x = csbi.dwCursorPosition.X;
  p.y = csbi.dwCursorPosition.Y;
  
  return p;
}

Napi::Value GetConsoleCursorPosition(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  Position position = getConsoleCursorPosition();

  Napi::Object res = Napi::Object::New(env);

  res.Set("x", position.x);
  res.Set("y", position.y);

  return res;
}
