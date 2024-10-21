import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyles.css'
import classes from '../pages/PropertyDetails.module.css'

export default function CalendarComponent({ handleDateChange, dateRange, price }) {
    const startDate = dateRange[0];
    const endDate = dateRange[1];
    const days = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24))

    return (
        <div className={classes.calendar_container}>
            <h2 className={classes.calendar_title}>Select Date Range</h2>
            <Calendar
                onChange={handleDateChange}
                value={dateRange}
                selectRange={true}
            />
            <div className={classes.selected_dates}>
                <h3>Selected Dates:</h3>
                <p>Start Date: {startDate?.toLocaleDateString() || 'N/A'}</p>
                <p>End Date: {endDate?.toLocaleDateString() || 'N/A'}</p>
            </div>
            <div className={classes.total_price}>
                <p>Total price: {days-1 < 0 ? 0: days-1} x ${price} = <strong>${(days-1 < 0 ? 0: days-1) * price}</strong></p>
            </div>
        </div>
    );
}
