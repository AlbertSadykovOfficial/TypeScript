import React from 'react'

/*
* Нужно использовтаь именно React.MouseEvent,
* а не станадртный Event DOM
*/
type Props = {
	isDisabled?: boolean
	size: 'Big' | 'Small'
	text: string
	onClick(event: React.MouseEvent<HTMLButtonElement>): void
}

export function Button (props: Props) {
	// Для массива пришлось юы писать: useState<number[]>([])
	const [toggled, setToggled] = React.useState(false)
	return 
		<button 
			className={ 'Size-' + prop.size }
			disabled={ props.isDisabled || false }
			onClick={ event => {
				setToggled(!toggled)
				props.onClick(event)
			}}
		>{props.text}</button>
}

let button = <FancyButton size='Big' text='Sign Up Now' onClick={ () => console.log('Clicked!') }>