# 

Классы структурно типизированы, что означает - не важно
какое имя класса, важно: какие поля он содержит

```typescript
class Zebra {
	trot () {
		// ..
	}
}

class Poodle {
	trot () {
		// ..
	}
}

function ambleAround (animal: Zebra) {
	animal.trot()
}

ambleAround(new Zebra)  // OK
ambleAround(new Poodle) // OK
ambleAround({ troot: function () {} }) // OK
``` 

Исключением являются классы с полями private или protected
```typescript
class A {
	private x = 1
}
function f(a: A) {}

f({ x: 1 }) // Error
```