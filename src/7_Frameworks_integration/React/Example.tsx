import React from "react";
import { Button } from "./Button"

type Props = {
	firstName: string,
	userId: string
}

type State = {
	isLoading: boolean
}

class SignupForm extends React.Component<Props, State> {
	state = {
		isLoading: false
	}

	render () {
		return
		<>
			<h2>Sign Up for a 7-day supply of our tasty toothpaste, {this.props.firstName}</h2>
			<Button
				isDisabled={this.state.isLoading}
				size='Big'
				text='Sign Up Now'
				onClick={this.SignUp}
			>
		</>
	}

	private signUp = async () => {
		this.setState({ isLoading: true })
		try {
			await fetch('/api/signup?userId=' + this.props.userId)
		} finally {
			this.setState({ isLoading: false })
		}
	}
}

// Можно создать и через new, но тогда React не сможет управлять 
// жизненным циклом за нас
let form = <SignupForm firstName='Albert' userId='13ab9g3' />