
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function dateFormat(date = Date.now(), tipo) {
	dayjs.locale('pt-br');

	if (typeof date === 'string') {
		let subtrairTimeZoneOffSet;
		if (date.endsWith('Z')) {
			subtrairTimeZoneOffSet = (new Date()).getTimezoneOffset() - 180;
			date = dayjs(date).add(subtrairTimeZoneOffSet, 'minutes').format();
		} else {
			subtrairTimeZoneOffSet = (new Date()).getTimezoneOffset();
			date = dayjs(date).add(subtrairTimeZoneOffSet, 'minutes').format();
		}
	}

	switch (tipo) {
		case 'timestamp-ext':
			return dayjs(date).format('dddd, D [de] MMMM [de] YYYY')
		case 'ext':
			return dayjs(date).format('D [de] MMMM [de] YYYY')
		case 'miniext':
			return dayjs(date).format('D [de] MMMM [de] YYYY')
		case 'date':
			return dayjs(date).format('YYYY-MM-DD')
		case 'timestamp':
			return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
		case 'date-br':
			return dayjs(date).format('DD/MM/YYYY')
		case 'timestamp-br':
			return dayjs(date).format('DD/MM/YYYY HH:mm:ss')
		case 'mesano':
			return dayjs(date).format('MMMM YYYY')
		case 'time':
			return dayjs(dayjs(date).add(1, 'hour')).format('HH:00')
		case 'day-month':
			return dayjs(date).format('DD/MM')
		case 'month-year':
			return dayjs(date).format('YYYY-MM')
		default:
			return new Date(date);
	}
}