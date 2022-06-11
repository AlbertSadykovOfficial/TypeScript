# Асинхронное программирование и параллельная обработка

## Callback

```typescript
function readFile(
	path: string,
	options: { encoding: string, flag?: string },
	callback: (err: Error | null, data: string | null) => void
): void
```

## Promise
Практика создания своего Promise в файле /Promise/Promise_Imitation.ts
текущего каталога.


## Async / Await
Механизм Async / Await поддерживается полностью.