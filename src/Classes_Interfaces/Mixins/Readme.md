# Примеси

Примесь - паттерн, позволяющий примешивать поведения и свойства в класс.

В JavaScript и TypeScript нет встроенных примесей, но их можно реализовать.

```typescript

// Класс-конструктор - конструктор - это нечто, созданное с new и 
// способное получать любое число аргументов любого типа
type ClassConstructor = new(...args: any[]) => {}

// Объявление примеси
function withEZDebug<C extends ClassConstructor>(Class: C) {
	// Т.к. Примесь - функция, принимающая и возвращающая
	// конструктор, то мы возвращаем анонимный конструктор 
	// класса
	return class extends Class {
		// Конструктор класса получает как минимум те же 
		// аргументы, что и передаваемый класс
		// (если в конструкторе нет логики, его можно опустить)
		constructor(...args: any[]) {
			// Т.к. анонимный класс расширяет лругой класс,
			// для корректной взаимосвязи нужно вызвать
			// конструктор
			super(...args)
		},

		method1 () {
			/// ...
		}
	}
}
```