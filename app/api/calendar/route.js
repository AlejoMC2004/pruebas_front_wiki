// app/api/calendar/route.js
// API endpoint that serves the calendar in .ics format
// Google Calendar can subscribe to this URL for automatic updates

import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Get events from your database or API
  const events = [
    { 
      date: "2026-03-05", 
      title: "Internal Seminar — Depth Estimation", 
      type: "seminar", 
      description: "Presentation of advances in depth estimation" 
    },
    { 
      date: "2026-03-12", 
      title: "VisionAgro Project Meeting", 
      type: "meeting", 
      description: "Quarterly project review" 
    },
    { 
      date: "2026-03-20", 
      title: "Deadline — ECCV 2025 submission", 
      type: "deadline", 
      description: "Paper submission deadline" 
    },
    { 
      date: "2026-04-01", 
      title: "Academic Visit — Prof. Martínez (UNAL)", 
      type: "visit", 
      description: "Talk on convolutional neural networks" 
    },
    { 
      date: "2026-04-15", 
      title: "Computer Vision Workshop", 
      type: "event", 
      description: "Workshop on advanced techniques" 
    },
  ];

  // Generate .ics content
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const vevents = events.map((event, idx) => {
    const { title, date, type, description = '' } = event;
    const eventDate = new Date(date + 'T00:00:00');
    const dateStr = eventDate.toISOString().replace(/[-:]/g, '').split('T')[0];
    
    return [
      'BEGIN:VEVENT',
      `UID:${date}-${idx}@cvail.wiki`,
      `DTSTAMP:${timestamp}`,
      `DTSTART;VALUE=DATE:${dateStr}`,
      `DTEND;VALUE=DATE:${dateStr}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description || type}`,
      `CATEGORIES:${type.toUpperCase()}`,
      'STATUS:CONFIRMED',
      'TRANSP:TRANSPARENT',
      'END:VEVENT'
    ].join('\r\n');
  }).join('\r\n');
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CVAIL Wiki//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:CVAIL - Events',
    'X-WR-TIMEZONE:America/Bogota',
    'X-WR-CALDESC:CVAIL group events calendar',
    'REFRESH-INTERVAL;VALUE=DURATION:PT1H',
    'X-PUBLISHED-TTL:PT1H',
    vevents,
    'END:VCALENDAR'
  ].join('\r\n');

  // Return response with appropriate headers
  return new NextResponse(icsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="cvail-calendar.ics"',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}
