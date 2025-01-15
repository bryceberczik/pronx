import { Request, RequestHandler, Response } from "express";
import { Calendar, Event } from "../models/index";

export const getCalendar = async (_req: Request, res: Response) => {
  try {
    const calendar = await Calendar.findAll({
      include: [{ model: Event }]
    });
    res.json(calendar);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createCalendar: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingCalendar = await Calendar.findOne({
      where: { userId },
    });

    if (existingCalendar) {
      res.status(400).json({ message: "This user already has a calendar." });
      return;
    }

    const calendar = await Calendar.create({ userId });

    res.json(calendar);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCalendar = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const calendar = await Calendar.findByPk(id);

    if (!calendar) {
      res.status(404).json({ message: "No calendar found with this ID." });
      return;
    }

    await calendar.destroy();
    res.json({ message: "Calendar deleted." })
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventsByCalendar: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { calendarId } = req.params;
  try {
    const events = await Event.findAll({
      where: { calendarId },
    });

    if (events.length === 0) {
      res.status(404).json({ message: "No events found at this calendars ID." })
      return;
    }

    res.json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventByIdWithCalendar: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { calendarId, id } = req.params;

  try {
    const event = await Event.findOne({
      where: { id: id, calendarId },
    });

    if (!event) {
      res.status(404).json({ message: "Event not found under this calendar." });
      return;
    }

    res.json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createEvent: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { calendarId } = req.params;
  const { title, date } = req.body;
  try {
    const calendar = await Calendar.findByPk(calendarId);
    if (!calendar) {
      res.status(404).json({ message: "Calendar not found." });
      return;
    }
    const event = await Event.create({
      title,
      date,
      calendarId
    });
    res.json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { calendarId, id } = req.params;
  const { title, date } = req.body;

  try {
    const event = await Event.findOne({
      where: { id: id, calendarId },
    });

    if (!event) {
      res.status(404).json({ message: "Event not found under this calendar." });
      return;
    }

    event.title = title || event.title;
    event.date = date || event.date;
    await event.save();

    res.json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { calendarId, id } = req.params;

  try {
    const event = await Event.findOne({
      where: { id: id, calendarId },
    });

    if (!event) {
      res.status(404).json({ message: "Event not found." });
      return;
    }

    await event.destroy();
    res.json({ message: `Event deleted under ${calendarId} ID.` })
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};