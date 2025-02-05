# Типобезопасная многопоточность

# Web-workers
Веб-раюотники - широкоподдерживаемый способ осуществления многозадачностив браузере.
Они выполняются в фоне, отдельно от основного потока JS. Что позволяет избежать
перебоев в отрисовке интерфейса.

! Чтобы Веб-работники работали в TypeScript, нужно указать это в config:
```json
{
	"compilerOptions": {
		"lib": [ "webworker" ]
	}
}
```

Чтобы избежать кокурентного управленя общей памятью (как в C++, Java),
способом взаимодействия мужду главным потоком и Веб-работнкивоом является
передача сообщений.

```javascript
// MainThread.ts
let worker = new Worker('WorkerScript.js')

worker.postMessage('some data')
worker.onmessage = e => {
	console.log(e.data) // ACK
}

// WorkerScript.ts
onmessage = e => {
	console.log(e.data) // some data
	postMessage('ACK')
}
```

Добавим типобезопасноcть:
```typescript
// MainThread.ts
type Message = string
type ThreadID = number
type UserID = number
type Participants = UserID[]
type Commands = {
	sendMessageToThread: [ThreadID, Message]
	createThread: [Participants]
	addUserToThread: [ThreadID, UserID]
	removeUserFromThread: [ThreadID, UserID]
}

type Events = {
	receivedMessage: [ThreadID, UserID, Message]
	createdThread: [ThreadID, Participants]
	addedUserToThread: [ThreadID, UserID]
	removedUserFromThread: [ThreadID, UserID]
}

```

// Типобезопасная обертка для API EventEmitter (SafeEmitter.ts)
```typescript
import EventEmitter from 'events'

class SafeEmitter<Events extends Record<PropertyKey, unknown>> {
	private emitter = new EventEmitter
	emit<K extends keyof Events>(channel: K, ...data: Events[K]) {
		return this.emitter.emit(channel, ...data)
	}
	on<K extends keyof Events>(channel: K, listener: (..data: Events[K]) => void) {
		return this.emitter.on(channel, listener)
	}
}
```


Пример использования Типобезопасной обертки представлен в файлах Mainthread.ts
и WorkerScript.ts


## Типобезпасные протоколы

Простой протокол: запрос-ответ:

Определяем матрицу в главном потоке и запускае с все вычисления в работниках.
Цель - обернуть небезопасные отправку и получение сообщейний в безопасную через 
представление потребителю правильного типизированного API.
```typescript
type Matrix = number[][]
type MatrixProtocol = {
	determinant: {
		in: [Matrix]
		out: number
	}
	'dot-product': {
		in: [Matrix, Matrix]
		out: Matrix
	}
	invert: {
		in: [Matrix]
		out: Matrix
	}
}


// Определяем общий тип, неспецифичный для MatrixProtocol
type Protocol = {
	[command: string]: {
		in: unknown[]
		out: unknown
	}
}

// Входные параметры - путь к скрипту с конкретным протоколом
function createProtocol<P extends Protocol>(script: string) {
	return <K extends keyof P>(command: K) => 
		((...args: P[K]['in']) =>
			new Promise<P[K]['out']>((resolve, reject) => {
				let worker = new Worker(script)
				worker.onerror = reject
				worker.onmessage = event => resolve(event.data.data)
				worker.postMessage({ command, args })
			})
		)
}


let runWithMatrixProtocol = createProtocol<MatrixProtocol>('MatrixWorkerScript.js')
let parallelDeterminant = runWithMatrixProtocol('determinant')

parallelDeterminant([[1, 2], [3, 4]])
.then(determinant => console.log(determinant)) // -2
```

Рекомендуется всегда, когда нужно установить сообщение между двумя процессами,
использовать Типобезопасные протколы.