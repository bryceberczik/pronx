import express from 'express';
import { createCalendar, createEvent, deleteCalendar, getCalendar, getEventByIdWithCalendar, getEventsByCalendar, updateEvent, deleteEvent } from '../../controllers/calendarController';

const router = express.Router();

// GET CALENDAR
router.get('/', getCalendar);

// CREATE CALENDAR
router.post('/', createCalendar);

// DELETE CALENDAR
router.delete('/:id', deleteCalendar);

// GET ALL EVENTS
router.get('/:calendarId/events', getEventsByCalendar);

// GET SPECIFIC EVENT
router.get('/:calendarId/events/:id', getEventByIdWithCalendar);

// CREATE EVENT
router.post('/:calendarId/events/', createEvent);

// UPDATE EVENT
router.put('/:calendarId/events/:id', updateEvent);

// DELETE EVENT
router.delete('/:calendarId/events/:id', deleteEvent);

export { router as calenderRouter };