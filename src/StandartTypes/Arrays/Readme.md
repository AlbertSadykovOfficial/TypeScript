# Массивы и кортежи

## Массивы
Массивы - разновидность объектов поддерживающих конкатетацию. передачу, поиск, срезы.

```typescript
  let a = []                    // any
  let a = [1, 2, 3]             // number[]
  let b = ['a', 'b']            // string[]
  let c: Array<string> = ['a']  // number[]
  let d = [1, 'a']              // (string | number)[]
```
### Примечание по Array any
Если тип массива при создании не задан, то он будет any, далее, при
добавлении в него значений каких-то определенных типов, тип массива будет
меняться - он будет динамически типизированным.
! НО, если мы вернем массив из функции (выйдем из диапазона), 
то он потеряет способность расширять принимаемые типы и останется неизменяемым

```typescript
  function buildArray () {
    let a = []                // any
    a.push(1)                 // number[]
    a.push('x')               // (string | number)[]
    return a
  }

  let myArray = buildArray()  // (string | number)[]
  myArray.push(true)          // Ошибка - аргумент типа true не может быть
                              // присвоен параметру типа string | number
```

## Кортежи
Кортежи - подтипы array - позволяют типищировать массивы фиксированной длины,
в которых значения каждого индекса имеют конкретные типы значений.
```typescript
  let a: [number] = [1]
  let b1: [number, number?][] = [
    [1],
    [1, 2],
    [1]
  ]
  let b2: ([number] | [number, number]) = [ ... ]
  let c: [string, boolean, ...string[]] = [1, false, 'a', 'b', 'c']

  let ro: readonly number[] = [1, 2, 3]
```

### Создание типов по кортежу:
```typescript
  type A = readonly string[]
  type B = ReadonlyArray<string>
  type C = Readonly<string[]>

  type D = readonly [number, string]
  type D = Readonly<[number, string]>
```

