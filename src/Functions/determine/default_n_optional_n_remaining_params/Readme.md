# Предуставновленные, Опциональные и Оставшиеся параметры, this


## Предуставновленные и Опциональные параметры
Логика работы предустановленных и опциональных параметров схожа в TS
с логикой работы в JS.

### Опциональный параметр
```typescript
  function log (message: string, userId?: string) {
    console.log(message, userId || 'Not Sign In')
  }
```

### Предуставновленный параметр
Предустановленный параметр является по-умолчанию опциональным

```typescript
  function log (message: string, userId = 'Not Sign In') {
    console.log(message, userId || 'Not Sign In')
  }
```

### Явные аннотации типов для параметров
```typescript
  type Context = {
    appId?: string
    userId?: string
  }

  function log (message: string, context: Context = {}) {
    console.log(message, context.userId || 'Not Sign In')
  }
```


## Оставшиеся параметры
В JavaScript есть массив arguments, который можно использовать,
не объявляя входные параметры функции, но такой метод TypeScript
не пропустит, он требует явного объявления оставшихся параметров.

Есть несколько способов передать оставшиеся параметры
```typescript
  fucntion sum (numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0)
  }
  sum([1,2,3])


  fucntion sum (...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0)
  }
  sum(1,2,3)
```

Оставшиеся параметры также моно комбинировать с опциональными параметрами.


## this
Значение this может отличаться в зависимости от того
как вызывается функция, поэтому некоторые разработчики
стараются использовтаь this только в классах, 
чтобы заставить TypeScript проводить проверку на использование
this вне классов, нужно доавить правило **no-invalid-this**
в TSLint

Также можно пререопределять this в функциях:
```typescript
  function fancyDate (this: Date) {
    return `${this.$getDate()}/${this.getDate()}/${this.getFullYear()}`
  }

  fancyDate.call(new Date)  
```
Чтобы типы this всегда были явно аннотированными в функциях, нужно
активировать настройку noimplicitThis в tsconfig.json
(при этом эта инструкция не будет действовать на классы и функции
в объектах)