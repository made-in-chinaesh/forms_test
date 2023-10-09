import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	FormLabel,
	IconButton,
	InputAdornment,
	MenuItem,
	OutlinedInput,
	Radio,
	RadioGroup,
	Select,
	TextField,
} from '@mui/material'

import {
	Close,
	Mail as MailIcon,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Forms } from './helpers/form'

const selectOptions = [
	{ id: 1, value: 'BMW' },
	{ id: 2, value: 'Toyota' },
	{ id: 3, value: 'Bugati' },
	{ id: 4, value: 'Lamba' },
	{ id: 5, value: 'Sanata' },
]

const checkBoxLabels = [
	{ id: 1, label: 'Label 1' },
	{ id: 2, label: 'Label 2' },
	{ id: 3, label: 'Label 3' },
]

interface FormData {
	name: string
	email: string
	password: string
	description: string
	select: string
	checkbox: string
	radio: string
}

interface IKeyword {
	id: number
	value: string
}

const App = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [keywords, setKeywords] = useState<IKeyword[]>([])

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormData>()

	const handleClickShowPassword = () => setShowPassword(!showPassword)

	const addKeyword = () => {
		setKeywords((prev: any) => [
			...prev,
			{
				id: Date.now(),
				value: '',
			},
		])
	}
	const deleteKeyword = (id: number) =>
		setKeywords(keywords.filter(item => item.id !== id))

	const handleChangeKeyword = (id: number, value: string) =>
		setKeywords(
			keywords.map(item => {
				if (item.id === id) {
					return {
						...item,
						value,
					}
				}
				return item
			})
		)

	const onSubmit: SubmitHandler<FormData> = data => {
		const newData = {
			...data,
			keyword: keywords,
		}

		console.log(newData)
	}

	return (
		<form action='submit' onSubmit={handleSubmit(onSubmit)}>
			<FormControl className='formControll' error={!!errors?.name}>
				<FormLabel className='label'>Input Field</FormLabel>
				<OutlinedInput
					type='text'
					placeholder='Your name'
					{...register('name', Forms.Options.Name)}
				/>
				<FormHelperText>{errors?.name && errors.name.message}</FormHelperText>
			</FormControl>

			<FormControl className='formControll' error={!!errors?.email}>
				<FormLabel className='label'>Input Field</FormLabel>
				<OutlinedInput
					placeholder='Email'
					type='email'
					endAdornment={
						<InputAdornment position='end'>
							<MailIcon />
						</InputAdornment>
					}
					{...register('email', Forms.Options.Email)}
				/>
				<FormHelperText>{errors?.email && errors.email.message}</FormHelperText>
			</FormControl>

			<FormControl className='formControll' error={!!errors?.password}>
				<FormLabel className='label'>Input Field</FormLabel>
				<OutlinedInput
					placeholder='Password'
					type={showPassword ? 'text' : 'password'}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton onClick={handleClickShowPassword} className='btn'>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					}
					{...register('password', Forms.Options.Password)}
				/>
				<FormHelperText>
					{errors?.password && errors.password.message}
				</FormHelperText>
			</FormControl>

			<FormControl className='formControll' error={!!errors?.select}>
				<FormLabel className='label'>Select field</FormLabel>
				<Select {...register('select', { required: true })}>
					{selectOptions.map(item => (
						<MenuItem key={item.id} value={item.value}>
							{item.value}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<FormControl className='formControll' error={!!errors?.checkbox}>
				<FormLabel className='label'>Checkbox fields</FormLabel>
				<FormGroup row className='flex'>
					{checkBoxLabels.map(item => (
						<FormControlLabel
							key={item.id}
							label={item.label}
							control={<Checkbox />}
							value={item.label}
							{...register('checkbox', {
								required: true,
							})}
						/>
					))}
				</FormGroup>
			</FormControl>

			<FormControl className='formControll' error={!!errors?.description}>
				<FormLabel className='label'>Text Area</FormLabel>
				<TextField
					placeholder='Text area'
					multiline
					rows={5}
					{...register('description', Forms.Options.Description)}
				/>
				<FormHelperText>
					{errors?.description && errors.description.message}
				</FormHelperText>
			</FormControl>

			<FormControl className='formControll' error={!!errors?.radio}>
				<FormLabel className='label'>Radio fields</FormLabel>
				<RadioGroup row className='flex'>
					{checkBoxLabels.map(item => (
						<FormControlLabel
							key={item.id}
							value={item.label}
							label={item.label}
							control={<Radio />}
							{...register('radio', {
								required: true,
							})}
						/>
					))}
				</RadioGroup>
			</FormControl>

			<div className='keywords'>
				{keywords.map((item, index) => (
					<FormControl key={item.id} className='formControll'>
						<FormLabel>Who are your competitors</FormLabel>
						<OutlinedInput
							placeholder='Enter'
							value={item.value}
							onChange={e => handleChangeKeyword(item.id, e.target.value)}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										onClick={() => deleteKeyword(item.id)}
										className='btn'
									>
										<Close />
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				))}
				<Button variant='outlined' onClick={addKeyword}>
					Add keyword
				</Button>
			</div>

			<Button
				type='submit'
				variant='contained'
				onClick={handleSubmit(onSubmit)}
			>
				Submit
			</Button>
		</form>
	)
}

export default App
