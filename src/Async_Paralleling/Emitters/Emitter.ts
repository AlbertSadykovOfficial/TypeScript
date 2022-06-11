interface Emitter {

	// Отправка
	emit (channel: string, value: unknown): void

	// Прослушка
	on(channel: string, f: (value: unknown) => void): void
}