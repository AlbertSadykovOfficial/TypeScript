# Пространства имен

! Лучше стараться не использовать пространство имен, 
а придерживаться модулей, но у него есть свои плюсы

## Преимущества
1. Одним их преимущества является поддержка вложенности,
что позволяет избавиться от создания кучи каталогов
(как в случае с модулями)

```typescript
namespace Network {
	export namespace HTTP {
		export function get<T>(url: string): Promise<T>{
			// ...
		}
	}
	export namespace TCP {
		listenOn(port: number): Connection {
			// ...
		}
	}
	export namespace UDP {
		// ...
	}
}
```

2. Несколько пространств имен с одинаковыми именами сливаются 
в одно пространство имен (что дает возможность разбивать большие
пространства имен на отдельные файлы)

```typescript
// HTTP.ts
namespace Network {
	export namespace HTTP {

	}
}

// UDP.ts
namespace Network {
	export namespace UDP {
		
	}
}
```
(При этом нельзя допускать коллизии - для реализаций, но можно
допускать коллизии для деклараций (воспринимается как перегрузка))
```typescript
// HTTP.ts
namespace Network {
	export function get<T>(url: string): Promise<T>{
			// ...
	}

	export function post<T>(url: string): Promise<T>
}

// UDP.ts
namespace Network {
	// Ошибка: потворяется реализация функции
	export function get<T>(url: string): Promise<T>{
		// ...
	},

	// Все хорошо, это перегрзука декларации
	export function post<T>(url: string, algo: 'SHA1' : 'SHA256'): Promise<T>
}

3. Пространствам имен можно жавать псевдонимы

```typescript
import get = Network.HTTP.get
```


## Как выглядит скомпилированный вывод

Такой код:
```typescript
namespace Flowers {
	export function give (count: number) {
		return count + ' flowers'
	}
}
```

Преобразуется в такой:
```typescript
let Flowers
(function (Flowers) {
	function give(count) {
		return count + ' flowers'
	}
	Flowers.give = give
})(Flowers || (Flowers = {}))
```