# Типы HTML - элементов

В TypeScript есть встроенные типы HTML элементов:

1. HTMLAnchorElement - для элементов <a>
2. HTMLCanvasElement - для элементов <canvas>
3. HTMLTableElement - для элементов <table>
4. HTMLElement - для всех html элементов

Пример типизации HTML-элементов.
```typescript
	type CreateElement = {
		(tag: 'a'): HTMLAnchorElement,
		(tag: 'canvas'): HTMLCanvasElement,
		(tag: 'table'): HTMLTableElement,
		(tag: string): HTMLElement,
	}
```