# Параметры обобщенного типа 

__Параметр обобщенного (полиморфного) типа__ - замещающий тип, используемый 
для применения ограничения **на уровне типов** в нескольких местах.

Пример с параметром полиморфного типа:
```typescript
  type Filter = {
    <T>(array: T[], f: (item: T) => boolean): T[]
  }  

  type FilterBind<T> = {
    (array: T[], f: (item: T) => boolean): T[]
  }

  let filter: Filter = (array, f) => ...
  let stringFilter: FilterBind<string> = (array, f) => ...
```
Т.е. мы не знаем какой будет параметр T и просим определить этот параметр
автоматически при вызове.

P.S. T - это просто имя типа, его можно укзаывать любым (A, B, CustomType)

Скоращенные примеры:
```typescript
  type Filter = <T>(array: T[], f: (item: T) => boolean) => T[]
  type FilterBind<T> = (array: T[], f: (item: T) => boolean) => T[] 
```

Именованная сигнатура:
```typescript
  function filter<T>(array: T[], f: (item: T) => boolean): T[] {
    // ...
  } 
```


Пример вывода обобщенного типа при нескольких типах:
```typescript
  function map<T, U>(array: T[], f: (item: T) => U): U[] {
    let result = []
    for (let i=0; i < array.length; i++) {
      result[i] = f(array[i])
    }
    return result
  }

  map <string, boolean | string> (['a', 'b', 'c'], _ => _ === 'a')
```

## Псевдонимы обобщенных типов

```typescript
  type MyEvent<T> = {
    target: T
    type: string
  }

  type ButtonEvent = MyEvent<HTMLElemenButtonElement>

  let myEvent: MyEvent<HTMLElemenButtonElement | null> = {
    target: document.querySelector('#myButton'),
    type: 'click'
  }

  type TimedEvent<T> = {
    event: MyEvent<T>
    from: Date
    to: Date
  }
```

Так же можно использовать псевдоним обобщенного типа в сигнатуре функции. 
Когда TypeScript привяжет тип к T, он так же привяжет его и к MyEvent:
```typescript
  function triggerEvent<T>(event: MyEvent<T>): void {
    // ..
  }

  triggerEvent({ // T - Element | null (свойства подходят под сигнатуру)
    target: document.querySelector('#myButton'),
    type: 'mouseover'
  })
```

## Предустановка обобщенных типов

```typescript
  type MyEvent<T = HTMLElement> = {
    target: T,
    type: string
  }

  type MyEvent<
    Type extends string,
    T extends HTMLElement = HTMLElement
  > = {
    target: T,
    type: Type
  }

  let myEvent: MyEvent = {
    target: myElement,
    type: string
  }
```