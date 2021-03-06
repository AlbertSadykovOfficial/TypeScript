# Полиморфизм

Подобно функциям и типам, классы и интерфейсы имеют богатую 
поддержку параметров обобщенных типов, включая предустановки
и ограничения.

При этом область обобщенного типа можно расширить до вего класса
или интерфейса или сузить до конкретного метода.

```typescript
class MyMap<K, V> {
	constructor (initialKey: K, initialValue: V) {
		// ..
	}
	// Можно объявлять свои обобщенные типы поверх типов уровня класса
	merge<K1, V1>(map: MyMap<K1, V1>): MyMap<K | K1, V | V1> {
		// ..
	}
	// Статические методы не иммеют доступа к обобщенным типам класса,
	// у of нет доступа к K, V класса, поэтому он объявляет свои
	static of<K, V>(k: K, v: V): MyMap<K, V> {
		// ..
	}
}

interface MyMap<K, V> {
	get(key: K): V
	set(key: L, value: V): void
}

let a = new MyMap<string, number>('k', 1)
let b = new MyMap('k', true)
```