#include <napi.h>

#include "./screen_buffer_info/screen_buffer_info.h"

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  exports.Set(Napi::String::New(env, "get_console_cursor_position"), Napi::Function::New(env, GetConsoleCursorPosition));

  return exports;
}

NODE_API_MODULE(addon, Init)