import React, { Fragment, useState, useEffect } from 'react';
import {
	TextArea,
	Grid,
	Input,
	Segment,
	Form,
	Header,
	Button,
	Icon,
	Loader,
	Modal,
	Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

import { uptPatient } from '../../actions/patient';
import { getRdv, uptRdv } from '../../actions/rdv';
import { getDoctors } from '../../actions/doctor';

const Consultation = ({
	match,
	getDoctors,
	doctor: { doctors, dloading },
	uptRdv,

	getRdv,
	rdv: { rdv, loading },
	auth,
	history,
}) => {
	const [open2, setOpen2] = React.useState(false);

	const [formData, setFormData] = useState({
		acte: '',

		notes_acte: '',

		honoraire: '',
	});
	useEffect(() => {
		getDoctors();
	}, [getDoctors]);

	useEffect(() => {
		getRdv(match.params.id);
		setFormData({
			acte: rdv === null || !rdv.acte ? '' : rdv.acte,
			notes_acte: rdv === null || !rdv.notes_acte ? '' : rdv.notes_acte,
			honoraire: rdv === null || !rdv.honoraire ? '' : rdv.honoraire,
		});
		// eslint-disable-next-line
	}, [getRdv, match.params.id, rdv === null]);

	const { notes_acte, acte, honoraire } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		uptRdv(
			rdv._id,
			{
				notes_acte,
				acte,
				honoraire,
				doctor: auth.user._id,
				status: true,
			},
			history
		);
	};

	return loading || rdv === null ? (
		<Loader active />
	) : (
		<Fragment>
			<Link to={'/consultations'}>
				<Button icon labelPosition='left'>
					<Icon name='left arrow' />
					Retour à la liste de rendez-vous
				</Button>
			</Link>
			<h1 className='large text-primary'>Consultation</h1>

			<Segment raised>
				<Grid columns='equal' stackable>
					<Grid.Row>
						<Grid.Column>
							<Segment color='red'>
								{' '}
								<Header as='h3'>Consultation </Header>
								<Form onSubmit={(e) => onSubmit(e)}>
									<Form.Field
										id='form-textarea-control-opinion'
										control={TextArea}
										label='Acte'
										name='acte'
										placeholder='Acte'
										required
										value={acte}
										onChange={(e) => onChange(e)}
									/>

									<Form.Field
										id='form-textarea-control-opinion'
										control={TextArea}
										label='Notes'
										name='notes_acte'
										placeholder='Notes'
										value={notes_acte}
										onChange={(e) => onChange(e)}
									/>
									<Form.Field
										control={Input}
										label='Honoraire'
										placeholder='Honoraire'
										name='honoraire'
										required
										value={honoraire}
										pattern='[0-9]*'
										onChange={(e) => onChange(e)}
									/>
									<Button type='submit'>Submit</Button>
								</Form>
							</Segment>
						</Grid.Column>

						<Grid.Column>
							<Modal
								onClose={() => setOpen2(false)}
								onOpen={() => setOpen2(true)}
								open={open2}
								size='small'
								trigger={<Button positive icon='plus' content='Radio' />}
							>
								<Modal.Header>Radio</Modal.Header>
								<Modal.Content>
									<Image size='big ' centered src={rdv.image} />
								</Modal.Content>
							</Modal>

							<Segment color='yellow'>
								<Header as='h3'> Fiche Patient</Header>
								<Form>
									<Segment color='teal'>
										<Form.Group widths='equal'>
											<Form.Field
												control={Input}
												label='Nom du patient'
												placeholder='Name'
												name='name'
												readOnly
												value={rdv.patient.name}
												onChange={(e) => onChange(e)}
											/>
										</Form.Group>
										<Form.Group widths='equal'>
											<Form.Field
												control={Input}
												label='Travail'
												placeholder='Travail'
												name='travaille'
												readOnly
												value={rdv.patient.job}
											/>
											<Form.Field
												control={Input}
												label='Ville'
												placeholder='Ville'
												name='city'
												readOnly
												value={rdv.patient.city}
											/>
										</Form.Group>
									</Segment>
									<Segment color='blue'>
										<Header as='h5'>Maladie </Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											readOnly
											name='maladie'
											placeholder='Maladie'
											value={rdv.patient.maladie}
										/>
										<Header as='h5'>Allergie</Header>

										<Form.Group widths='equal'>
											<Form.Field
												id='form-textarea-control-opinion'
												control={TextArea}
												name='allergie'
												placeholder='Allergie'
												value={rdv.patient.allergie}
											/>
										</Form.Group>
										<Header as='h5'>Médication en cours </Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='medication'
											placeholder='Medication en cours'
											readOnly
											value={rdv.patient.medication}
										/>
										<Header as='h5'>Antécedant Médicaux </Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='antecedent'
											placeholder='Antécedant Médicaux'
											readOnly
											value={rdv.patient.antecedent}
										/>

										<Header as='h5'>Habitude</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='habitude'
											placeholder='Habitude'
											readOnly
											value={rdv.patient.habitude}
										/>
									</Segment>
									<Segment color='purple'>
										<Header as='h5'>Motif de Consultation</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='Motif'
											placeholder='Motif de Consultation'
											readOnly
											value={rdv.motif}
										/>

										<Header as='h5'>Diagnostic</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='diagnostic'
											placeholder='Diagnostic'
											value={rdv.diagnostic}
											readOnly
										/>
										<Header as='h5'>Analyses</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='analyses'
											placeholder='Analyses'
											value={rdv.analyses}
											readOnly
										/>

										<Header as='h5'>Notes</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='notes_consultation'
											placeholder='Notes'
											value={rdv.notes_consultation}
											readOnly
										/>
									</Segment>
								</Form>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</Fragment>
	);
};

Consultation.propTypes = {
	setAlert: PropTypes.func.isRequired,

	getDoctors: PropTypes.func.isRequired,
	rdv: PropTypes.object.isRequired,
	doctor: PropTypes.object.isRequired,
	uptRdv: PropTypes.func.isRequired,
	uptPatient: PropTypes.func.isRequired,
	getRdv: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	doctor: state.doctor,
	rdv: state.rdv,
	auth: state.auth,
});

export default connect(mapStateToProps, {
	setAlert,
	uptRdv,
	getDoctors,
	uptPatient,
	getRdv,
})(withRouter(Consultation));
