# Async-потоки

## Отправители событий (emitters)
Отправители событий - паттерн проектирования, предназанченный взаимодействия
нескольких асинхронных узлов.

В большинстве языков отправители небезопасны, так как тип value зависит от
конкретного канала, для надежности нужно иметь возможноть перегрузки сигнатуры
функций и типов литероалов.

```typescript
interface Emitter {

	// Отправка
	emit (channel: string, value: unknown): void

	// Прослушка
	on(channel: string, f: (value: unknown) => void): void
}
```

Клиент Redis, представленный для Node.js является нетипобезопасным,
для практики напишем типобезопасную реализацию.

Пример создания безопасного Клиента Redis.
```typescript
type RedisClient = {
	on(event: 'ready', f: () => void): void
	on(event: 'error', f: (e: Error) => void): void
	on(event: 'reconnecting', f: (params: { attempt: number, delay: number}) => void): void
}
```

Применим паттерн выделения имен событий и аргументов:
```typescript
type Events = {
	ready: void
	error: Error
	reconnecting: { attempt: number, delay: number }
}

type RedisClient = {
	on<E extends keyof Events>( 
		event: E, 
		f: (arg: Events[E]) => void 
	):void
	emit<E extends keyof Events>( 
		event: E, 
		arg: Events[E]
	):void
}
```
