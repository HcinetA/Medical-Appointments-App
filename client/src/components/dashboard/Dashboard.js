import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';
import interactionPlugin from '@fullcalendar/interaction';
import { Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRdvs } from '../../actions/rdv';

const Dashboard = ({ getRdvs, rdv: { rdvs, loading } }) => {
	useEffect(() => {
		getRdvs();
	}, [getRdvs]);
	var events = [];

	if (rdvs) {
		console.log(rdvs);
		events = rdvs.map((e) => ({
			title: e.patient.name,
			date: e.date,
			color: e.doctor.color, // override!
			url: `/app/${e._id}`,
		}));
	}
	return loading || rdvs === null ? (
		<Loader active />
	) : (
		<FullCalendar
			plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
			headerToolbar={{
				left: 'prev,next today',
				locale: 'fr',
				themeSystem: 'Lux',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
			}}
			initialView='dayGridMonth'
			nowIndicator={true}
			selectable={true}
			dayMaxEvents={true}
			events={events}
			height='720px'
			themeSystem='lux'
			locale={frLocale}
			timeZone='UTC'
		/>
	);
};

Dashboard.propTypes = {
	getRdvs: PropTypes.func.isRequired,
	rdv: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	rdv: state.rdv,
});
export default connect(mapStateToProps, {
	getRdvs,
})(Dashboard);
