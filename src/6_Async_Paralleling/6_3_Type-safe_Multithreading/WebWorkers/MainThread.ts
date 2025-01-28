import SafeEmitter from "./SafeEmitter"

let commandEmitter = new SafeEmitter<Commands>()
let eventEmitter = new SafeEmitter<Events>()

let worker = new Worker('WorkerScript.js')

// Прослушивание событий от работника
// И их переотправка посредством типобезопасного отправителя событий
worker.onmessage = event => eventEmitter.emit(event.data.type, ...event.data.data)

// Прослушивание команд, заданных этим потоком и отправка их работнику
commandEmitter.on('sendMessageToThread', data => {
	worker.postMessage({ type: 'sendMessageToThread', data })
}
commandEmitter.on('createThread', data => {
	worker.postMessage({ type: 'createdThread', data })
}

// Сделать что-лбо, когда оаюботник сообщает о создании нового потока
eventEmitter.emit('createdThread', (threadID, participants) => 
	console.log('Created a new chat thread', threadID, participants)
)

// Отправка команды работнику
commandEmitter.emit('createdThread', [123, 456])