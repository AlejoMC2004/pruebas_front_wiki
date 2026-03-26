// app/api/calendar/route.js
// Endpoint que sirve el calendario en formato .ics para suscripción externa
// (Google Calendar, Outlook, Apple Calendar, etc.)

import { NextResponse } from 'next/server';
import { CALENDAR_EVENTS } from '@/lib/calendarEvents';

export async function GET() {
  // TODO: reemplazar CALENDAR_EVENTS con una consulta real a la base de datos

  const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const vevents = CALENDAR_EVENTS.map((event, idx) => {
    const { title, date, type, description = '' } = event;

    // DTSTART es el día del evento
    const start = new Date(date + 'T00:00:00');
    const dateStr = start.toISOString().replace(/[-:]/g, '').split('T')[0];

    // DTEND en eventos de día completo debe ser el día SIGUIENTE (estándar iCal RFC 5545)
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    const dateEndStr = end.toISOString().replace(/[-:]/g, '').split('T')[0];

    return [
      'BEGIN:VEVENT',
      `UID:${date}-${idx}@cvail.wiki`,
      `DTSTAMP:${timestamp}`,
      `DTSTART;VALUE=DATE:${dateStr}`,
      `DTEND;VALUE=DATE:${dateEndStr}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description || type}`,
      `CATEGORIES:${type.toUpperCase()}`,
      'STATUS:CONFIRMED',
      'TRANSP:TRANSPARENT',
      'END:VEVENT',
    ].join('\r\n');
  }).join('\r\n');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CVAIL Wiki//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:CVAIL - Eventos',
    'X-WR-TIMEZONE:America/Bogota',
    'X-WR-CALDESC:Calendario de eventos del grupo CVAIL',
    'REFRESH-INTERVAL;VALUE=DURATION:PT1H',
    'X-PUBLISHED-TTL:PT1H',
    vevents,
    'END:VCALENDAR',
  ].join('\r\n');

  return new NextResponse(icsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="cvail-calendar.ics"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
