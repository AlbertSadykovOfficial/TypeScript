# Подвинутые функциональные типы 

## Улучшение выврда типов для кортежей

Объявляя кортеж, TS выводит его как можно более общим 
```typescript
let a = [1, true] // (number | boolean)[]
```

Для более строгого вывода можно использовать [as const], но это сделает
кортеж readonly, решение, использование вывода типов для оставшихся
параметров 
```typescript
function tuple<T extends unknown[]>(...ts: T) {
  return ts
}

let a = tuple(1, true) // [number, boolean]
```

## Пользовательская защита типов

Демонстрация примера ошибки:

(Особенность уточнения типа в том, что она работает только для типа переменной,
находящейся в текущей области видимости (В данном случае внутри функции))
```typescript
function isString(a: unknown): boolean {
  return typeof a === "string"
}

function parseInput(input: string | number) {
  let formattedInput: string
  if (isString(input)) {
    formattedInput = input.toUpperCase()
    // Ошибка свойства toUpperCase не существует в number
  }
}
```

В этом случае мы можем сообщить TS, что если boolean будет true, то переданный
нами аргумент в функцию является string:
```typescript
function isString(a: unknown): a is string {
  return typeof a === "string"
}
```

Пользовательские защиты типов ограничены одним параметром, но не ограничены
простыми типами
```typescript
type LegacyDialog = // ..
type Dialog = // ..

function isLegacyDialog(dialog: Dialog | LegacyDialog ): dialog is LegacyDialog {
  // ...
}
```