import React, { Fragment, useEffect } from 'react';
import {
	Table,
	Button,
	Menu,
	Icon,
	Segment,
	Input,
	Loader,
} from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPatient, getPatients } from '../../actions/patient';
import { addRdv, getRdvs } from '../../actions/rdv';
import { getDoctors } from '../../actions/doctor';
const AppTable = ({
	getDoctors,
	doctor: { doctors },
	getPatients,
	patient: { patients },
	addPatient,
	getRdvs,
	rdv: { rdvs, loading },
	addRdv,
}) => {
	useEffect(() => {
		getDoctors();
	}, [getDoctors]);
	useEffect(() => {
		getPatients();
	}, [getPatients]);
	useEffect(() => {
		getRdvs();
	}, [getRdvs]);

	return loading || rdvs === null ? (
		<Loader active />
	) : (
		<Fragment>
			<h1 className='large text-primary'> Liste De RDVS </h1>
			<Segment basic textAlign='right'>
				<Input
					action={{ color: 'blue', content: 'Search' }}
					icon='search'
					iconPosition='left'
					placeholder='Patient Name'
				/>
			</Segment>{' '}
			<Table striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell> Name </Table.HeaderCell>{' '}
						<Table.HeaderCell> Date </Table.HeaderCell>{' '}
						<Table.HeaderCell> Doctor </Table.HeaderCell>{' '}
						<Table.HeaderCell> Status </Table.HeaderCell>{' '}
						<Table.HeaderCell> Options </Table.HeaderCell>{' '}
					</Table.Row>{' '}
				</Table.Header>
				<Table.Body>
					{' '}
					{rdvs.map((rdv) => (
						<Table.Row key={rdv.id} rdv={rdv}>
							<Table.Cell> {rdv.patient.name} </Table.Cell>{' '}
							<Table.Cell>
								<Moment format='YYYY/MM/DD'>{rdv.date}</Moment> | {rdv.time}{' '}
							</Table.Cell>{' '}
							<Table.Cell> DR. {rdv.doctor.firstName} </Table.Cell>{' '}
							<Table.Cell>
								{' '}
								{rdv.status ? (
									<Button positive circular icon='check' disabled />
								) : (
									<Button negative circular icon='x' disabled />
								)}
							</Table.Cell>{' '}
							<Table.Cell>
								<Link to={`/app/${rdv._id}`}>
									<Button primary> Manage </Button>{' '}
								</Link>{' '}
							</Table.Cell>{' '}
						</Table.Row>
					))}{' '}
				</Table.Body>{' '}
			</Table>{' '}
		</Fragment>
	);
};

AppTable.propTypes = {
	addPatient: PropTypes.func.isRequired,
	getDoctors: PropTypes.func.isRequired,
	doctor: PropTypes.object.isRequired,
	getPatients: PropTypes.func.isRequired,
	patient: PropTypes.object.isRequired,
	getRdvs: PropTypes.func.isRequired,
	rdv: PropTypes.object.isRequired,
	addRdv: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	doctor: state.doctor,
	rdv: state.rdv,
	patient: state.patient,
});
export default connect(mapStateToProps, {
	addPatient,
	getDoctors,
	getPatients,
	getRdvs,
	addRdv,
})(AppTable);
