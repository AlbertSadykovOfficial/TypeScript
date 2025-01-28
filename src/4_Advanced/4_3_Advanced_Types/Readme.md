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

### Встроенные отображенные типы

### Паттерн Объект-кампаньон
