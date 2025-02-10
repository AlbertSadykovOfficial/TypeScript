# Условные типы

```typescript

type IsString<T> = T extends string ? true : false

type A = IsString<string> // true
type B = IsString<number> // false
```

## Условное распределение
Условные типы подчиняются законом тождества (математическому). Это означает,
что выражение в левой части эквивалентно выражению в правой части.

```typescript
type ToArray<T> = T[]

type A = ToArray<number> // number []
type B = ToArray<number | string> // (number | string)[]
```
Пояснение:
```typescript
type typeA = (string | number) extends T ? A : B
type asloTypeA = (string extends T ? A : B) | (number extends T ? A : B)
```

Пример использования:
```typescript
type Without<T, U> = T extends U ? never : T

type A = Without<boolean | number | string, number> // boolean | string 
```
Как это работает:
```typescript
type Without<T, U> = T extends U ? never : T

// 1
type A = Without<boolean, number>
        | Without<number, number>
        | Without<string, number>

// 2
type A = (boolean extends number ? never : boolean)
        | (number extends number ? never : number)
        | (string extends number ? never : string)

// 3
type A = boolean | never | string

// 4
type A = boolean | string
```

## Ключевое слово infer
Условные типы имеют свой синтаксис для оъявления встроеных обобщенных типов:
ключевое слово infer.

```typescript
type SecondArg<F> = F extends (a: any, b: infer B) => any 
  ? B
  : never

type F = typeof Array['prototype']['slice']

type A = SecondArg<F> // number | undefined
```

## Встроенные условные типы

```typescript
// Exclude<T, U>
type A = Exclude<number | string, string> // number

// Extract<T, U>
type B = Extract<number | string, string> // string

// NonNullable<T>
type A = { a?: number | null }
type B = NonNullable<A['a']> // number

// Возрващаемый тип функции
// ReturnType<F>
type F = (a: number) => string
type B = ReturnType<F> // string

// Тип экземпляра конструктора класса
// InstanceType<F>
type A = {new(): B}
type B = {b: number}
type I = InstanceType<A> // { b: number }
```