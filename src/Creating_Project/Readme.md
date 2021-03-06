# Создание и запуск TypeScript

## На сервере

target - Для старых NodeJS - es5, для новых - es2015
module - commonjs.

```json
{
	"compilerOptions": {
		"target": "es2015",
		"module": "commonjs"
	}
}
```

Можно также подключить карты кода (sourc-map-support),
а так же инструменты мониторинга и отлова ошибок, такие
как Winston, Sentry, PM2&

## В браузере

Тут сложнее, так как больше разновидность.
1. Определить свой бандлер: в документации к ним указано какую систему
модулей они используют:
	2.1. Для NPM - umd
	2.2. SystemJS - systemjs
	2.3. Webpack, Rollup - es2015
	2.4. Browserfy - commonjs
	2.5. RequireJS - amd
	2.6. Чтобы экспорты были глобально в window - none, (но если код
		находится в режиме модулей, то TSC установит commonjs)
2. Кол-во выходных js файлов - один или несколько. (Флаг outFile, но
он работает только для SystemJS и AMD, поэтому лучше исп Webpack или др.)
Для таких, более функциональных, сборщиков в TS есть специальные плагины:
(Webpack - ts-loader, Broserfy - tsify, Babel - @babel/preset-typescript,
Gulp - gulp-typescript, Grunt - grunt-ts)

Рекомендации:
1. Разбивать код на модули, устранять неявные зависимости 
2. Использовать динмаический импорт для загрузки кода по требованию
3. Использовать инструменты сборки, чтобы избежать ненужной загрузки
больших частей кода
4. Стараться сохранять сборку в DEV и PROD макисмально близкими
5. Выработать подход для замера времени загрузки страницы - либо 
синтетически, либо из данных пользователей. (Инструменты: New Relic (
https://newrelic.com) и Datadog (https://www.datadoghq.com/)


## Директивы с тремя слешами

Директивы с тремя слешами - оссобый формат комментариев, служащих в 
качестве инструкции для TypeScript.

Рассмотрим парочку:
1. type - избежать JS вызова import или require для модуля, который
импортируется целиком (import './global')
2. amd-module - позволяет дать имя модулю в системе AMD-модулей

```typescript
/// <reference types="./global">

/// <amd-module name="LogService" />
export let LogService {

}
```