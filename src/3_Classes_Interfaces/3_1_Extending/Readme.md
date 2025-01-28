# Классы и наследование


```typescript
	class Piece {
		protocted position: Position
		constructor (
			private readonly color: Color,  // === this.color
			file: File,
			rank: Rank
		) {
			this.position = new Position(file, rank)
		}
	}	
```

## Абстрактный класс

Абстрактный класс - класс, который нужен как шаблон или основа
для построеня других классов, в нем могут содрежаться свойства
и методы, которые необходимо реализовать

```typescript
abstract class Piece {
	constructor () {}
	moveTo(position: Position) {
		this.position = position
	}
	abstract canMoveTo (position: Position): boolean // Этот метод необходимо реализовать
}

new Piece ('white', 'E', 1) // Error: невозможно создать экземпляр абрактного класса

class King extends Piece {
	canMoveTo(position: Position) {
		...
	}
}
```


## Использование this в качетсве возвращаемого типа.
Может возникнуть ситуация, когда нужно возвращать ссылку на объект из метода,
часто это используется в цепочке вызовов (пример - метод add в Set). 

```typescript
class MySet {
	add (value: number): Set {
		...
		return this
	}
}
```

Тогда при наследовании возникнет проблема, дочерний класс будет в этом
методе ссылаться на родительский класс, что не хорошо, решением является
указание this в качестве аннотации возвращаемого типа. После этого, дочерний
класс при вызове метода будет ссылаться сам на себя.

```typescript
class MySet {
	add (value: number): this {
		...
	}
}
```
