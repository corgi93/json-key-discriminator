# Json Key Discriminator
---

This is cli program that compares the key values of two json files.

When the key value is on one side and you get confused about whether it's not on the other side.
Notifies you when it is only on one side, not on the same key value.

## Installation
```
npm install json-key-discriminator
```

## directory structure
---
```
project
|-- src
|-- JsonTestFolder (json validation folder you defined)
|---- lang-kr.json
|---- lang-en.json
|---- lang-ja.json
|---- lang-fr.json
```


## usage
---
```
 jkd [options]

 Options:
    -V, --version 
    -h, --help
    -d, --dir (required), directory name. ex) JsonTestFolder
    -f, --first (required), first json file what you discriminate. ex) lang-en.json
    -s, --second (required), second json file what you discriminate. ex) lang-kr.json

ex) jkd -d JsonTestFolder -f lang-en -s lang-kr
    jkd -d JsonTestFolder -f lang-en -s lang-ja
    jkd -d JsonTestFolder -f lang-ja -s lang-ko
    jkd --dir JsonTestFolder --first lang-en --second lang-kr
    jkd --dir JsonTestFolder --first lang-ko --second lang-fr
    ...
```
