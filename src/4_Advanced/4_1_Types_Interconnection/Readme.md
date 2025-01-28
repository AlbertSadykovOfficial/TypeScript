# Связи между типами


## Подтипы и супертипы

__Подтип__ - тот, который наследуется (A <: B - A - подтип B)
__Супертип__ - Тот, от которого наследуются (A >: B - A - супертип B)

## Вариантность

Виды:
1. Инвариантность - Нужен конкретно Т (=)
2. Ковариантность - Нужен <:T (<=) (Требует подтипы или свой тип, но не супертипы)
2. Контрвариантность - Нужен >:T (>=)
2. Бивариантность - Нужен либо <:T, либо >:T

В TS каждый сложный тип является ковариантным в своих членах
- объкетах, классах, массивах и возваращаемых типов функций
НО типы параметров функции КОНТРвариантивны

### Вариантность формы и массива
Суть: 
### Вариантность функций
Функция B является подтипом A, если она (B) имеет такую же или
меньшую арность (число параметров) и:
1. Тип this B либо не определен, либо :> типа this A
2. Каждый из параметров B :> соответсвует параметрам A
3. Возвращаемый тип B <: возвращаемого типа A.

Пример:
```typescript
class Animal {}
class Bird extends Animal {
  chirp() {}
}
class Crow extends Bird {
  caw(){}
}

// (Crow <: Bird <: Animal)

/* Пример (Правило №2)
* Функция ковариантна в возвращаемых типах - 
* (т.е. требует подтипы, либо свой тип, но не супертип)
*/
function chirp (bird: Bird): Bird {
  bird.chirp()
  return bird
}

chirp(new Animal) // Error: Animal несовместим с параметром типа Bird
chirp(new Bird) // OK
chirp(new Crow) // OK


function clone (f: (b: Bird) => Bird): void {
  let parent = new Bird
  let babyBird = f (parent)
  // (Возбуждение ошибки ковариантности в типах)
  // (Не у всех Animal может быть реализован chirp)
  babyBird.chirp()
}


function birdToAnimal (d: Bird): Animal {
  // 
}
clone (birdToAnimal) // Error: Аргумент типа (d: Bird) => Animal несовместим с параметром типа (b: Bird) => Bird

/* Пример (Правило №3)
* Функция контрвариантна в их прараметраз и типах this - 
* (т.е. функция ожет быть подтипом другой функции, только каждый из ее
*  параметров и тип this будут :> соответсвующих им параметров в др. функц.)
* (Можно представить это как: в цепочке у объектов можно добавлять что-то новое,
* но удалять нельзя, Мы можем что-то добавить в Animal (конкретезировать)
* и Вернуть Более расширенный Bird, но обрезать наоборот не получится,
* поля уже есть, от них избавиться нельзя)
*/

function animalToBird (a: Animal): Bird {
  //
}
clone(animalToBird) // OK

function crowToBird (c: Crow): Bird {
  // (Возбуждение ошибки контрвариантности в параметрах) 
  // (Не у всех Bird может быть реализован caw)
  с.caw()
  return new Bird
}

/* Мы не можем вызвать функцию .chirp() у Animal */
clone(crowToBird) // Error: Аргумент типа (c: Crow) => Bird несовместим с типом (c: Bird): Bird
````


## Совместимость
Совместимость - возможность использовать тип A, где требуется тип B
Как TypeScript проверяет совместимость:

Для НЕ enum-типов:
1. A <: B (A можно использовать везде, где и B (т.к. подтип))
2. A является any (Искл для удбства взаимод с JS)

Для enum-типов:
1. A является членом перечисления B
2. B имеет хотя бы 1 член типа number, а A является number

## Расширение типов
Если переменная изменяема (let, var) - тип расширяется от типа значения ее литерала
до базового типа к которому литерал принадлежит
Расширение типов

```typescript
let a = 'x' // string
let b = {x: 3} // {x: number}
let c: true = true // true - Явная аннотация типа
enum E {X, Y, Z}
let e = E.X  // E

// Это не касается неизменяемых деклараций

const a = 'x' // 'x'
let b = a // string
enum E {X, Y, Z}
let e = E.X  // E.X
```
! Когда переменная, инициализированная как null или undefined покидает область,
в которой была объявлена, TypeScript присваевает ей определенный тип:
```typescript
function x () {
  let a = null //any
  a = 'b' // any
  return a
}

x() // string
```
### Тип const
const помогает отказаться от деклараций типов.
Его можно использовать как утверждение типа.
```typescript
let a = {x: 3} as const // {readonly x: 3}
let b = [1, {x: 2}] as const // readonly [1, {readonly x: 2}]
```
*const исключает расширение типа и рекурсивно омечает его члены как 
readonly даже в глубоко вложенных структурах данных

(as const - для вывода максимально узкого типа)

### Типы размеченного объединения
При использовании событий важно уточнять тип события, иначе (type свойство)
Подойдет для: (восстановлений Redux); (useReducer в React); (Flux)
```typescript
type UserTextEvent = { type: 'TextEvent', value: string, target: HTMLInputElement }
type UserMouseEvent = { type: 'MouseEvent', value: [ number, number ], target: HTMLElement }

type UserEvent = UserTextEvent | UserMouseEvent

function handle(event: UserEvent) {
  if (event.type === 'TextEvent') {
    event.value // string
    event.target // HTMLInputElement
    // ...
    return
  }

  event.value // [number, number]
  event.target // HTMLElement | без св-ва Type: HTMLInputElement | HTMLElement
}
```