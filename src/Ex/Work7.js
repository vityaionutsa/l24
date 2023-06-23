import React, { useState } from "react";
import moment from "moment";

function Work7() {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [events, setEvents] = useState([]);

  function handleDateClick(date) {
    setSelectedDate(date);
  }

  function handleEventAdd(newEvent) {
    setEvents([...events, newEvent]);
  }

  function handleEventUpdate(updatedEvent) {
    setEvents(events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  }

  function handleEventDelete(eventId) {
    setEvents(events.filter((event) => event.id !== eventId));
  }

  function getEventsForSelectedDate() {
    return events.filter((event) =>
      moment(event.date).isSame(selectedDate, "day")
    );
  }

  function renderCalendar() {
    const weekdays = moment.weekdaysShort();
    const firstDayOfMonth = moment(selectedDate).startOf("month");
    const lastDayOfMonth = moment(selectedDate).endOf("month");
    const daysInMonth = moment(selectedDate).daysInMonth();

    let blanks = [];
    for (let i = 0; i < firstDayOfMonth.day(); i++) {
      blanks.push(<td key={`blank-${i}`}></td>);
    }

    let days = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const date = moment(`${selectedDate.year()}-${selectedDate.month() + 1}-${d}`);
      days.push(
        <td key={date.format()} className="day" onClick={() => handleDateClick(date)}>
          {d}
        </td>
      );
    }

    const totalSlots = [...blanks, ...days];
    const rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    const calendarDays = rows.map((row, i) => (
      <tr key={`row-${i}`}>
        {row.map((cell) => cell)}
      </tr>
    ));

    return (
      <table className="calendar">
        <thead>
          <tr>
            {weekdays.map((weekday) => (
              <th key={weekday} className="weekday">
                {weekday}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarDays}
        </tbody>
      </table>
    );
  }

  function renderEvents() {
    const eventsForSelectedDate = getEventsForSelectedDate();
    return (
      <div className="events">
        <h3>{selectedDate.format("MMMM D, YYYY")}</h3>
        <ul>
          {eventsForSelectedDate.map((event) => (
            <li key={event.id}>
              <div>
                <input type="checkbox" checked={event.done} onChange={() => handleEventUpdate({...event, done: !event.done})} />
                <span>{event.title}</span>
              </div>
              <div>
                <button onClick={() => handleEventDelete(event.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
        </div>
);
}

function handlePrevMonthClick() {
setSelectedDate(moment(selectedDate).subtract(1, "month"));
}

function handleNextMonthClick() {
setSelectedDate(moment(selectedDate).add(1, "month"));
}

return (
<div className="organizer">
<div className="calendar-container">
<div className="calendar-header">
<button onClick={handlePrevMonthClick}>Prev</button>
<h2>{selectedDate.format("MMMM YYYY")}</h2>
<button onClick={handleNextMonthClick}>Next</button>
</div>
{renderCalendar()}
</div>
{renderEvents()}
<div className="add-event">
<h3>Add Event</h3>
<form onSubmit={(e) => {
e.preventDefault();
const formData = new FormData(e.target);
const newEvent = {
id: moment().format(),
date: formData.get("date"),
title: formData.get("title"),
done: false,
};
handleEventAdd(newEvent);
e.target.reset();
}}>
<div>
<label>Date:</label>
<input type="date" name="date" required />
</div>
<div>
<label>Title:</label>
<input type="text" name="title" required />
</div>
<div>
<button type="submit">Add</button>
</div>
</form>
</div>
</div>
);
}

export default Work7;
