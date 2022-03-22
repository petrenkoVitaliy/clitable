{
  "targets": [
    {
      "target_name": "modules",
      "sources": [ 
        "<!@(node -p \" "+
            "const folders = ['screen_buffer_info'];" +
            "const fs = require('fs'); folders.map(folder => fs.readdirSync('./cpp_modules/' + folder).map(f=>'cpp_modules/' + folder + '/'+f).join(' ')).flat().join(' ');" +
          "\")",

        "./cpp_modules/main.cc"
      ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    },
  ]
}