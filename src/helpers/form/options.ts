import { RegisterOptions } from 'react-hook-form'
import { emailRegex, passwordRegex } from './regex'

const required = 'Обязательное поле!'

export const Name: RegisterOptions = {
	required,
	minLength: {
		value: 3,
		message: 'Не менее 3 символов',
	},
}

export const Email: RegisterOptions = {
	required,
	pattern: {
		value: emailRegex,
		message: 'Неккоректный email',
	},
}

export const Password: RegisterOptions = {
	required,
	pattern: {
		value: passwordRegex,
		message: 'Пароль должен содержать 1 заглавную букву и 1 цифру',
	},
	maxLength: {
		value: 8,
		message: 'Не более 8 символов',
	},
}

export const Description: RegisterOptions = {
	required,
	maxLength: {
		value: 200,
		message: 'Не более 200 символов',
	},
}
