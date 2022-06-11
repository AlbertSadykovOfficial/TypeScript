import SafeEmitter from "./SafeEmitter"

let commandEmitter = new SafeEmitter<Commands>()
let eventEmitter = new SafeEmitter<Events>()

onmessage = command => {
	commandEmitter.emit(command.data.type, ...command.data.data)
}

// Прослушивание событий, созданных работником и отправка
eventEmitter.on('receivedMessage', data => {
	postMessage({type: 'receivedMessage', data})
}
eventEmitter.on('createThread', data => {
	postMessage({type: 'createdThread', data})
}

// Ответ на команду из главного потока
commandEmitter.on('sendMessageToThread', (threadID, message) => 
	console.log('${threadID}')
)

// Отправка собыття главному потоку
eventEmitter.emit('createdThread', 123, [456, 789])