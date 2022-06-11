# Модули

## import, export

Тут все как обычно, стоит только отметить такую вещь:
Значения и типы имеют разные пространства имен, это 
означает, что можно экспортировать Типы и Переменные 
с одинаковым именем:

```javascript
// a.ts
export let X = 3
export type X = {y: string}

// b.ts
import {X} from './g'

let a = X + 1		// Автоматическое определение как - переменная 
let b: X = {y: 'Z'}	// Автоматическое определение как - тип 
```

### Динамический импорт

```typescript
await import ('locale_us-en')
```

* Для использования динамического импорта в TypeScript нужно использовать
спеиальный параметр в compilerOptions (tsconfig.json)
```json
{
	"compilerOptions": {
		"module": "esnext"
	}
}
```

### Режимы модулей и скриптов

TypeScript разделяет файлы на 2 типа:
1. Скрипты
2. Модули

Разделяет он их на основе того, есть ли в них инструкции import или export,
если есть, то это - модуль, нет - скрипт.

Практически всегда в TypeScript применяется система модулей, но есть и 
случаи применения скриптов.

Случаи применения скриптов:
1. Быстрое создание прототипа кода бразуера, который собираемся компилировать
в систему буз модулей ({'module': 'none'}) в tsconfig. и включать в виде
сырых тегов <script> в HTML-файл.
2. Создание декларации типов
