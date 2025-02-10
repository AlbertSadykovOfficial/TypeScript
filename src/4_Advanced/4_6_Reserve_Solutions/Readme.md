# Запасные решения

Иногда нет времени на идеальную типизацию и просто хочется, чтобы TS проверил
безопасность

Эти решения следует применять для быстрой проверки типов, кода или когда еще
не все данные известны (как при получении данных с API).

## Утверждения типов
Если есть тип B, и A <: B <: C, тогда можно сделать утверждение, что B является
A или C

```typescript
function formatInput (input: string) {}
function getUserInput(): string | number {}

let input = getUserInput()

// Чтобы не ругался TS, утвердим input как string
formatInput(input as string)

// или 
formatInput(<string>input)
```

Если 2 типа не родственны, можно утвердить any (пример: строка и массив).


## Ненулевые утверждения
Для типов, допускающих нулевые значения, в TS есть спец синтаксис, утверждающий,
что значения типа - это точно T, а не null или undefined. Его следует использовать,
когда мы точно уверены, что все корректно, чтобы не писать везде проверки на
существование if(_ !== null).

За это отвечает восклицательный знак: (!)

```typescript
type Dialig ={
  id?: string
}

document.getElementById(doalog.id!)!
element.parentNode!.removeChild(child)
```

Если много где используются ненулевые утверждения, значит следует делать рефакторинг кода.
Можно объединять несколько типов, например:
```typescript
type VisisbleDialig = {
  id: string
}
type DestroyedDialog = {}
type Dialog = VisibleDialog | DestroyedDialog
```

## Утверждения явного присваивания
Семантически TS не способен обнаружить прсиовение userID из следующего примера,
поэтому, чтобы не было ошибки, следует укзаать (!).

```typescript
let userId!: string // Без (!) будет ошибка, так как нет уверенности, что user будет заполнен
fetchUser()
userId.toUpperCase()

function fetchUser () {
  userId = globalCache.get('userID')
}
```