# TypeScript

## Установка TypeScript и TsLint

TsLint поможет отлавливать ошибки при написании кода

```bash
	npm install --save-dev typescript tslint @types/node
```

## Настройка

### TypeScript
TypeScript настраивается в файле tsconfig.json, все конфигурационные
параметры можно посмотреть через команду:

```bash
	./node_modules/.bin/tsc --help
```

### TsLint
TsLint настраивается в файле tslint.json

Создать файл кофигурации с начальными параметрами

```bash
	./node_modules/.bin/tslint --init
```

## Компиляция и Запуск

Компиляция:
```bash
	./node_modules/.bin/tsc
```

Запуск:
```bash
	node ./dist/index.js
```