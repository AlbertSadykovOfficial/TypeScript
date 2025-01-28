# Имитация финальныйх классов

final - ключевое слово, которое говорит, что класс не может
быть расширен, а метод не может быть переопределен.

В TypeScript нет встроенной реализации, но ее можно написать.
Для имитации можно использовать приватные конструкторы:


```typescript
class MessageQueue {
	private constructor(private messages: string[]): {}
	static create(messages: string[]) {
		return new MessageQueue(messages)
	}
}

new MessageQueue{} // Ошибка - конструктор класса является приватным
class BadQueue extends MessageQueue{} // Ошибка - невозможно расширить класс
MessageQueue.create([]) // MessageQueue
```