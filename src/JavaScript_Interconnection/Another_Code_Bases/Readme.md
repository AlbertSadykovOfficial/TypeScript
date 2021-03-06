# Использование стороннего кода JavaScript

Сторонний код, это, к примеру, то, что установлен через npm.

При этом есть 3 вариант развития событий:
1. Установленный код уже содержит декларациии типов
2. Код не содержит декларации типов, но они есть в Defenitely-Typed
3. Код не содержит декларации типов и их нет на DefiniteTyped.

## Установленный код уже содержит декларациии типов
Чтобы узнать, нужно импортировать пакет с включеным:
```typescript
{ "noImplicityAny": true }
```
Если TypeScript не выкинет ошибок, то все ок.


## Код не содержит декларации типов, но они есть в Defenitely-Typed
Defenitely-Typed - централизованный репозиторий, поддерживаемый сообществом,
соержащем внешние декларации модулей для открытых проектов.

Проверитть имеет ли пакет декларации можно, воспольовавшийсь TypeSearch,
либо просто попробовать установить декларации.
```bash
npm install lodash -save
npm install @types/lodash --save-dev
```

## JS код не имеющий деклараций

Для работы с таким кодом есть несколько вариантов:
1. Поместить в белый список нетипизированный импорт, 
	Для этого: (// @ts-ignore) в начале файла.
2. Поместить в беый список все применения этого модуля.
	Для этого: Создать файл types.d.ts, куда поместить 
	все модули, определив их через declare:
```typescript
declare module 'some-module-name'
```
	declare module 'some-module-name'
3. Создать внешнюю декларацию модуля
	Для этого: Создать файл types.d.ts, куда поместить
	пустую декларацию и заполнить ее.
```typescript
declare module 'some-module-name' {
	export default function alert(loudness: 'soft' | 'loud'): Promise<void>
	export function getFerretCount(): Promise<number>
}
```
4. Создать декларацию типов и отправить ее на npm 
	(сделать pull-request на созданный файл)