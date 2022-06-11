# Стандартные типы

__Тип__-  набор значений ((true, false), (0,1,2), (a,b,c)) 
    и применимых к ним операция ((!, &&,||), (+,-...), (.concat ...)

В TypeScript существуют встроенные в JavaScript примитиные типы, так же
есть несколько измененные и расширенные типы объекта и массива и специальные
типы (это я их так назвал, так как они несколько отличаются от остальных). 

## Псевдонимы, объединения, пересечения

### Псевдонимы
Псевдонимы - переменная типа. (Они имеют блочную видимость как let и const, а
так же нельзя объявить 2 одинаковых типа на одном уровне блока)
```typescript
  type Age = number

  type Person = {
    name: string,
    age: Age
  }
```

### Объединение и пересечение
Объединение - логическое ИЛИ
Пересечение - логическое И

```typescript
  type Cat = {name: string, purrs: boolean}
  type Dog = {name: string, barks: booleean, wags: boolean}
  type CatOrDogOrBoth = Cat | Dog
  type CatAndDog = Cat & Dog

  let b: CatAndDog = {
    name : 'Domino',
    barks: true,
    purrs: true,
    wags: true
  }
```

