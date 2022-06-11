// 1 - Шаблон для построения имитации Promise
type Executor = (
	resolve: Function,
	reject: Function
) => void

class Promise {
	constructor(f: Executor) {}
}


// 2 - Пример полной-укороченной реализации
type Executor<T, E extends Error> = (
	resolve: (result: T) => void,
	reject: (error: E) => void
) => void

class Promise<T, E extends Error> {
	constructor(f: Executor<T,E>) {}
	then<U, F extends Error>(g: (result: T) => Promise<U, F>): Promise<U, F> {...}
	catch<U, F extends Error>(g: (error: E) => Promise<U, F>): Promise<U, F> {...}
}


// Использование
let a: () => Promose<string, TypeError> = // ...
let b: (s: string) => Promose<number, never> = // ...
let c: () => Promose<boolean, RangeError> = // ...

a()
.then(b)
.catch(e => c())
.then(result => console.log('Done', result))
.catch(e => console.log('Error', e))


/*
* В JavaScript (а значит и в Typescript) THROW может выбросить ЧТО УГОДНО,
* а НЕ ТОЛЬКО Error, это значит, что мы можем задать тип unknown
*/ 
type Executor<T> = (
	resolve: (result: T) => void,
	reject: (error: unknown) => void
) => void

class Promise<T> {
	constructor(f: Executor<T>) {}
	then<U>(g: (result: T) => Promise<U, F>): Promise<U, F> {...}
	catch<U>(g: (error: unknown) => Promise<U>): Promise<U> {...}
}