# Паттерны проектирования

## Фабрика
Фабрика - способ создать объект на базе которого можно создать
объекты дргуого типа

```typescript
let Shoe = {
	create (type: 'balletFlat' | 'boot' | 'sneaker'): Shoe {
		switch (type) {
			case 'balletFlat': return new BalletFlat
			case 'boot': return new Boot
			case 'sneaker': return new Sneaker
		}
	}
}

Shoe.create('sneaker')
```

## Строитель

```typescript
class RequestBuilder {
	private data: object | null = null
	private method: 'get' | 'post' | null = null
	private url: string | null = null

	setMethod(method: 'get' | 'post'): this {
		this.method = method
		return this
	}
	setData(data:  object): this {
		this.data = data
		return this
	}
	setMethod(url: string): this {
		this.url = url
		return this
	}

	send () {
		// ..
	}
}

new RequestBuilder()
	.setUrl('/users')
	.setMethod('get')
	.setData({firstName: 'Anna'})
	.send()
```