# Сигнатуры вызовов (типы самих функций)

Пример:
```typesctipt
function add(a: number, b:number): number {
  return a + b
}
```

## Коды уровня типов и уровня значений
__Код уровня типов__ - код, сотоящий только из типов и операторов типов - без значений 
(все, что после (:) - : let a: __number__; : __number__ | __null__)
__Код уровня значений__ - противоположность (let b = 4)

## Сигнатура функции

__Сигнатура функции__ - т.е. ее определение - это код, который содержит только уровни
типа

__Перегруженная функция__ - функция, которая имеет несколько __сигнатур__

Полная запись (подойдет для сложных функций с перегрузками параметров):
```typescript
  type Log = {
    (message: string, userId?: string): void
  }
```

Сокращенная запись (подойдет для простых функций):
```typescript
  type Log = (message: string, userId?: string) => void
```

Использование:
```typescript
  let log: Log = (message, userId = 'Not Signed In') => {
    console.log(message, userId)
  } 
```
###  Перегрузка функций

TypeScript имеет особенность работы перегрузки сигнатур.
Если мы объявляем набор сигнатур для функции f, то это будет
объекдинением сигнатур перегрузок (для вызывающего компнонента).

Поэтому компбинированную сигнатуру нужно объявлять вручную:
```typescript
  type Reserve = {
    (from: Date, to: Date, destination: string): Reservation
    (from: Date, destination: string): Reservation
    wasCalled: boolean   // Моделирование свойства функции
  }

  let reserve: Reserve = (
    from: Date,
    toOrDestination: Date | string,  // Результат комбинирования 2х перегрузок
    destination?: string
  ) => { 
    if (toOrDestination instanceof Date && destination !== undefined) {
      // something
    } else if (typeof toOrDestination === 'string') {
      // another
    }
  }
```

#### Перегрузка деклараций функции:
```typescript
  function createElement(tag: 'a'): HtmlAnchorElement
  function createElement(tag: 'canvas'): HtmlCanvasElement
  function createElement(tag: string): HtmlElement {
    // ...
  }
```

### Контекстная типизация

Автоматическое определение типа по контексту.

```typescript
  function times (
    f: (index: number) => void,
    n: number
  ) {
    for (let i = 0; i < n; i++) {
      f(i)
    }
  }

  times(n => console.log(n), 4)
```