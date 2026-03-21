// lib/calendar.js
// Calendar utilities and Google Calendar export functions

/**
 * Generates a .ics (iCalendar) file for a single event
 * that can be imported to Google Calendar
 */
export function generateICS(event) {
  const { title, date, type, description = '', location = '' } = event;
  
  // iCalendar date format (YYYYMMDD)
  const eventDate = new Date(date + 'T00:00:00');
  const dateStr = eventDate.toISOString().replace(/[-:]/g, '').split('T')[0];
  const dtStart = `${dateStr}`;
  const dtEnd = `${dateStr}`;
  
  // Generate unique timestamp
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CVAIL Wiki//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${timestamp}@cvail.wiki`,
    `DTSTAMP:${timestamp}`,
    `DTSTART;VALUE=DATE:${dtStart}`,
    `DTEND;VALUE=DATE:${dtEnd}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description || type}`,
    `LOCATION:${location}`,
    `CATEGORIES:${type.toUpperCase()}`,
    'STATUS:CONFIRMED',
    'TRANSP:TRANSPARENT',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  
  return icsContent;
}

/**
 * Generates .ics file with multiple events
 */
export function generateMultipleICS(events) {
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const vevents = events.map((event, idx) => {
    const { title, date, type, description = '' } = event;
    const eventDate = new Date(date + 'T00:00:00');
    const dateStr = eventDate.toISOString().replace(/[-:]/g, '').split('T')[0];
    
    return [
      'BEGIN:VEVENT',
      `UID:${timestamp}-${idx}@cvail.wiki`,
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
    vevents,
    'END:VCALENDAR'
  ].join('\r\n');
  
  return icsContent;
}

/**
 * Downloads a .ics file
 */
export function downloadICS(icsContent, filename = 'event.ics') {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

/**
 * Gets the days of a month in a weeks matrix
 */
export function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday
  
  const days = [];
  const weeks = [];
  
  // Fill empty days at the beginning
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Add month days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }
  
  // Divide into weeks
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  
  return weeks;
}

/**
 * Gets events for a specific date
 */
export function getEventsForDate(events, year, month, day) {
  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return events.filter(event => event.date === dateStr);
}

/**
 * Copies subscription URL to clipboard
 */
export function copySubscriptionURL() {
  const baseURL = typeof window !== 'undefined' ? window.location.origin : '';
  const subscriptionURL = `${baseURL}/api/calendar`;
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(subscriptionURL)
      .then(() => subscriptionURL)
      .catch((err) => {
        console.error('Error copying:', err);
        return fallbackCopy(subscriptionURL);
      });
  } else {
    return fallbackCopy(subscriptionURL);
  }
}

/**
 * Fallback method for copying in older browsers
 */
function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.select();
  
  try {
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return Promise.resolve(text);
  } catch (err) {
    document.body.removeChild(textArea);
    return Promise.reject(err);
  }
}

/**
 * Gets the subscription URL
 */
export function getSubscriptionURL() {
  const baseURL = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseURL}/api/calendar`;
}

/**
 * Formats month name in English
 */
export function getMonthName(month) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
}
