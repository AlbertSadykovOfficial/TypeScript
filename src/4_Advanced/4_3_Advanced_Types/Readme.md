# Продвинутые типы объектов

## Операторы типов объектов

### Оператор key in

Подключение к типу

```typescript
type APIResponse = {
  user: {
    userId: string
    friendList: {
      count: number
      friends: {
        firstName: string,
        lastName: string
      }[]
    }
  }
}

type FriendList = APIResponse['user']['friendList']
type Friend = FriendList['friends'][number] // Тип отдельного друга

function renderFriendList(friendList: FriendList) {
  // ..
}
```

### Оператор keyof

Подключение к типу

```typescript
type APIResponse = {
  user: {
    userId: string
    friendList: {
      count: number
      friends: {
        firstName: string,
        lastName: string
      }[]
    }
  }
}

type ResponseKeys = keyof APIResponse // 'user'
type UserKeys = keyof APIResponse['user'] // 'userId' | 'friendList'
type FriendListKeys = keyof APIResponse['user']['friendList'] // 'count' | 'friends'

// Типобизопасная функция получения для поиска значения в аданом ключе объекта
function get<
  O extends object,
  K extends keyof O // Объединение типов ключей 'a' | 'b' | 'c'
>(
  o: O, // { a: number, b: string, c: boolean }
  k: K
): O[K] { // O[K] - тип, когда ищем K в 0, Если К = a, то get вернет number
  return o[k]
}

type ActivityLog = {
  lastEvent: Date
  events: {
    id: string
    timestamp: Date
    type: 'Read' | 'Write'
  }[]
}

let activityLog: ActivityLog = // ...
let lastEvent = get(activityLog, 'lastEvent') // Дата (Date)
```

### Тип Record

### Отображенные типы
```typescript

type Account  = {
  id: number
  isEmployee: boolean
  notes: string[]
}

// Сделать все поля опциональными
type OptionalAccount = {
  [K in keyof Account]: Account[k]
}

// Сделать cнова все поля обязательными
type OptionalAccount = {
  [K in keyof OptionalAccount]-?: Account[k]
}


// Сделать все поля только для чтения
type ReadOnlyAccount = {
  readonly [K in keyof Account]: Account[k]
}

// Сделать все поля записываемыми
type ReadableAccount = {
  -readonly [K in keyof ReadOnlyAccount]: Account[k]
}
```
### Встроенные отображенные типы

```typescript
Record<Keys, Values> // Объект с ключами типа Keys и значениями типа Values 
Partials<Object> // Помечает каждое поле в Object как опциональное 
Required<Object> // Помечает каждое поле в Object как обязательное
Readonly<Object> // Помечает каждое поле в Object как только для чтения
Pick<Object, Keys> // Возвращает подтип Object с заданными Keys 
```
### Паттерн Объект-кампаньон
Возможность объединять объекты и классы, имеющие одинаковое имя
(В TypeScript типы и значения имеют разные пространства имен, в паттерне объект-компаньон
это позволяет объявлять имя дважды)
(Позаимствован у Scala)

```typescript
// Currency.ts
type Currency = {
  unit: 'EUR' | 'RUB'
  value: number
}

let Currency = {
  from(value: number, unit = Currency.DEFAULT): Currency {
    return { unit, value }
  }
}

// index.ts
import { Currency } from './Currency'

let amountDue: Currency = {
  unit: 'RUB',
  value: 1000
}

let otherAmountDue = Currency.from(330, 'EUR')
```
