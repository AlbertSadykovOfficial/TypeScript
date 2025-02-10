# Имитация номинальный типов

Иногда полезно использовать номинальные типы, это как минимум помогает документированию.

```typescript
type OrderID = string
type UserID = string

function queryForUser(id: UserID) {}
```
По ошибке в queryForUser можно передать OrderID и TS не заметит разницу.
Как раз здесь и пригождаются номинальные типы.

Хоть TS не поддерживает их по-умолчанию, иможно их сэмулировать с помощью
фунции маркировки типов.
```typescript
type OrderID = string & { readonly brand: unique symbol }
type UserID = string & { readonly brand: unique symbol } 
type ID = OrderID | UserID

function OrderID(id: string) {
  return id as OrderID
}

let orderId = OrderID('8be4cq')
let userId = UserID('8be4cq')

function queryForUser(id: UserID) {}
queryForUser(userId)
queryForUser(orderId) // Ошибка TS2345
```