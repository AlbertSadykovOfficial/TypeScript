# Обработка ошибок

Рассматриваемые методы:
1. Возврат null
2. Выбрасывание исключения
3. Возврат исключения
4. Options

В общем случае есть такие рекомендации:
1. Просто сообщить об ошибке - (null, Options)
2. Дать больше информации об ошибке - (выбразывание и возврат исключений)
3. Принудить явно обрабатывать каждое исключение (возврат исключений)
4. Хочется меньше кода для обработки ошибок (выбросить исключение)

## Возврат null
Это наиболее легковесный способ сообщить об ошибке, но мы теряем в
информативности

## Выбрасывание исключения
Чтобы дать больше информативности, можно выбросить определенное исключение

```typescript
function parse(bitrhday: string) : Date {
	let date = new Date(birthday)
	if (isValid(date)) {
		return date
	}

	throw new RangeError('Enter a valid date')
}

try {
	let date = parse(ask())
	console.log(date.toISOString())
} catch (e) {
	if (e instanceof RangeError) {
		console.error(e.message)
	} else {
		throw e
	}
}
```

При этом система типов никак не сообщает, что есть какие-то специальные
ошибки и что их нужно обрабатывать - это является недостатком.
Для решения данной проблемы можно использовать возврат исключений.


## Возврат исключений
Для того, чтобы явно укзать обработку исключений, следует указать исключения
как тип возвращаемых значений, тогда пользователь будет не только знать, что
есть такие исключения, но и будет вынужден их обработать.

```typescript
class InvalidDateFormatError extends RangeError {}
class DateIsInTheFutureError extends RangeError {}
function parse(bitrhday: string) : Date | InvalidDateFormatError | DateIsInTheFutureError {
	let date = new Date(birthday)
	if (!isValid(date)) {
		return new InvalidDateFormatError('Enter a valid date')
	}
	if (date.getDate() > Date.now()) {
		return new DateIsInTheFutureError('Date out of range')
	}

	return date
}

let result = parse(ask())

if (result instanceof InvalidDateFormatError) {
	console.error(result.message)
} else if (result instanceof DateIsInTheFutureError) {
	console.info(result.message)
} else {
	console.log(result.toISOString())
}
```


## Options
