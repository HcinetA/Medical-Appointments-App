import React, { Fragment, useState } from 'react';
import { Form, TextArea, Button, Segment } from 'semantic-ui-react';

const Newrdv = () => {
	const [formData, setFormData] = useState({
		patient: '',
		doctor: '',
		date: '',
		time: '',
		notes: '',
	});
	const { patient, doctor, date, time, notes } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();

		console.log(formData);
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>New rdv</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create an appointment
			</p>

			<Button positive icon='plus' content='New Patient' />

			<Segment raised>
				<Form onSubmit={(e) => onSubmit(e)}>
					<Form.Group widths='equal'>
						<Form.Field
							label='Select Patient'
							control='select'
							name='patient'
							value={patient}
							required
							onChange={(e) => onChange(e)}
						>
							<option value='amin'>Amin</option>
							<option value='john'>john</option>
						</Form.Field>

						<Form.Field
							label='Select Doctor'
							control='select'
							name='doctor'
							value={doctor}
							required
							onChange={(e) => onChange(e)}
						>
							<option value='Doc1'>Doc1</option>
							<option value='doc2'>Doc2</option>
						</Form.Field>
					</Form.Group>

					<Form.Group widths='equal'>
						<Form.Input
							label=' Select Date'
							type='date'
							name='date'
							value={date}
							required
							onChange={(e) => onChange(e)}
						/>

						<Form.Input
							label=' Select Time'
							type='time'
							name='time'
							value={time}
							required
							onChange={(e) => onChange(e)}
						/>
					</Form.Group>

					<Form.Field
						id='form-textarea-control-opinion'
						control={TextArea}
						label='Notes'
						name='notes'
						placeholder='Notes'
						value={notes}
						onChange={(e) => onChange(e)}
					/>

					<Button type='submit'>Submit</Button>
				</Form>
			</Segment>
		</Fragment>
	);
};

export default Newrdv;
