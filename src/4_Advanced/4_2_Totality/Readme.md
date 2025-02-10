# Тотальность

Тотальность - проверка полноты охвата.

Позволяет убедиться, что мы проработали все случаи (модулю проверки)

```typescript
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
type Day = Weekday | 'Sat' | 'Sun'

// Error TS2366
// в функции отстутсвует конечный оператор возврата
function getNextDay(w: Weekday): Day {
  switch (w) {
    case 'Mon': return 'Tue'
  }
}
```