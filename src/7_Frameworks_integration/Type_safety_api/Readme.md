# Типобезопасные API

Для корректного функционированя всего приложения, нужно иметь
согласованность сообщейни между клиентом и сервером, сервером
и сервером, клиентом и клиентом.

Для решения этого существуют типобезопасные протоколы.

## Клиент
Пример:

```typescript
type Request = 
	| { entity: 'user', data: User }
	| { entity: 'location', data: Location }


// client.js
async function get<R extends Requests>(entity: R['entity']): Promise<R['data']> {
	let res = await fetch (/api/${entity})
	let json = await res.json()
	if (!json) {
		throw ReferenceError('Empty response')
	}
	return json
}

// app.ts

async function startApp () {
	let user = await get('user') // User
}
```

## Сервер

Если на сервере нет поддержки TypeScript, или используется не REST API или, 
сервер написан на Java или Swift?

Ответ: можно использовать типизированные, кодогенерированные API.

Например:
1. Swagger для REST API
2. Apollo и Relay для GraphQL
3. gRPC и Apache Thrift для RPC

Такие технологии позволят сделать синхронность между клиентом и сервером,
связывая их по типам и структуре.