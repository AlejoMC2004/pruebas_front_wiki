// app/calendar/page.js
"use client";
import PageShell from "@/components/layout/PageShell";
import { THEME } from "@/styles/theme";
import { useState } from "react";
import styles from "./calendar.module.css";
import { 
  generateICS, 
  generateMultipleICS, 
  downloadICS,
  getMonthDays,
  getEventsForDate,
  getMonthName,
  copySubscriptionURL,
  getSubscriptionURL
} from "@/lib/calendar";
import { CALENDAR_EVENTS } from "@/lib/calendarEvents";

export default function CalendarPage() {
  // Toggle between list view and month calendar
  const [view, setView] = useState("list"); // "list" | "month"
  
  // State for subscription instructions
  const [showSubscribeInfo, setShowSubscribeInfo] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Month navigation
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Fuente única de eventos: lib/calendarEvents.js
  const events = CALENDAR_EVENTS;

  const typeColors = {
    seminar:  THEME.colors.teal,
    meeting:  THEME.colors.navy,
    deadline: "#e53e3e",
    visit:    "#805ad5",
    event:    THEME.colors.gold,
  };

  // Export functions
  const handleExportEvent = (event) => {
    const icsContent = generateICS(event);
    downloadICS(icsContent, `${event.title.slice(0, 20)}.ics`);
  };

  const handleExportAll = () => {
    const icsContent = generateMultipleICS(events);
    downloadICS(icsContent, 'cvail-calendar.ics');
  };

  // Function to copy subscription URL
  const handleCopySubscriptionURL = async () => {
    try {
      await copySubscriptionURL();
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error('Error copying URL:', err);
      alert('Could not copy URL. Please copy it manually.');
    }
  };

  // Month navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const weeks = getMonthDays(currentYear, currentMonth);

  return (
    <PageShell
      title="Calendar"
      subtitle="Group events, seminars, meetings and deadlines."
    >
      {/* Top controls */}
      <div className={styles.controls}>
        {/* View Toggle */}
        <div className={styles.toggleContainer}>
          <button
            onClick={() => setView("list")}
            className={`${styles.toggleBtn} ${view === "list" ? styles.toggleBtnActive : ""}`}
          >
            📋 List
          </button>
          <button
            onClick={() => setView("month")}
            className={`${styles.toggleBtn} ${view === "month" ? styles.toggleBtnActive : ""}`}
          >
            📅 Month
          </button>
        </div>

        {/* Export Options */}
        <div className={styles.exportGroup}>
          <button onClick={handleExportAll} className={styles.exportBtn}>
            📥 Download .ics
          </button>
          <button 
            onClick={() => setShowSubscribeInfo(!showSubscribeInfo)} 
            className={styles.subscribeBtn}
          >
            🔄 Subscribe {showSubscribeInfo ? '▼' : '▶'}
          </button>
        </div>
      </div>

      {/* Subscription Instructions */}
      {showSubscribeInfo && (
        <div className={styles.subscribeInfo}>
          <h3 className={styles.subscribeTitle}>🔄 Auto-sync subscription</h3>
          <p className={styles.subscribeDesc}>
            Use this URL to subscribe to the calendar. It will update automatically when we add new events.
          </p>
          
          <div className={styles.urlBox}>
            <code className={styles.urlCode}>
              {getSubscriptionURL()}
            </code>
            <button 
              onClick={handleCopySubscriptionURL} 
              className={styles.copyBtn}
            >
              {copySuccess ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>

          <div className={styles.instructions}>
            <h4>📍 How to subscribe:</h4>
            <div className={styles.instructionGrid}>
              <div className={styles.instructionCard}>
                <strong>Google Calendar:</strong>
                <ol>
                  <li>Open Google Calendar</li>
                  <li>Click <strong>+</strong> next to "Other calendars"</li>
                  <li>Select <strong>"From URL"</strong></li>
                  <li>Paste the copied URL</li>
                  <li>Click <strong>"Add calendar"</strong></li>
                </ol>
              </div>
              <div className={styles.instructionCard}>
                <strong>Apple Calendar:</strong>
                <ol>
                  <li>Open Calendar</li>
                  <li>File → <strong>New Calendar Subscription</strong></li>
                  <li>Paste the URL</li>
                  <li>Click <strong>"Subscribe"</strong></li>
                </ol>
              </div>
              <div className={styles.instructionCard}>
                <strong>Outlook:</strong>
                <ol>
                  <li>Open Outlook Calendar</li>
                  <li>Add calendar → <strong>From Internet</strong></li>
                  <li>Paste the URL</li>
                  <li>Click <strong>"OK"</strong></li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className={styles.list}>
          {events.map((ev, i) => {
            const color = typeColors[ev.type] || THEME.colors.muted;
            const d = new Date(ev.date + "T00:00:00");
            return (
              <div key={i} className={styles.row}>
                <div className={styles.dateBlock}>
                  <span className={styles.day}>
                    {d.toLocaleDateString("es-ES", { day: "2-digit" })}
                  </span>
                  <span className={styles.month}>
                    {d.toLocaleDateString("es-ES", { month: "short" }).toUpperCase()}
                  </span>
                </div>
                <div className={styles.indicator} style={{ background: color }} />
                <div className={styles.eventBody}>
                  <p className={styles.eventTitle}>{ev.title}</p>
                  <span className={styles.eventType} style={{ color }}>
                    {ev.type.charAt(0).toUpperCase() + ev.type.slice(1)}
                  </span>
                </div>
                <button
                  onClick={() => handleExportEvent(ev)}
                  className={styles.exportSmall}
                  title="Export this event"
                >
                  📥
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Month Calendar View */}
      {view === "month" && (
        <div className={styles.calendarView}>
          {/* Month Navigation */}
          <div className={styles.monthNav}>
            <button onClick={goToPreviousMonth} className={styles.navBtn}>
              ← Previous
            </button>
            <h2 className={styles.monthTitle}>
              {getMonthName(currentMonth)} {currentYear}
            </h2>
            <button onClick={goToToday} className={styles.todayBtn}>
              Today
            </button>
            <button onClick={goToNextMonth} className={styles.navBtn}>
              Next →
            </button>
          </div>

          {/* Calendar Grid */}
          <div className={styles.calendarGrid}>
            {/* Day headers */}
            <div className={styles.dayHeaders}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className={styles.dayHeader}>{day}</div>
              ))}
            </div>

            {/* Calendar days */}
            <div className={styles.monthGrid}>
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className={styles.week}>
                  {week.map((day, dayIdx) => {
                    if (!day) {
                      return <div key={dayIdx} className={styles.emptyDay} />;
                    }

                    const dayEvents = getEventsForDate(events, currentYear, currentMonth, day);
                    const isToday = 
                      day === new Date().getDate() && 
                      currentMonth === new Date().getMonth() && 
                      currentYear === new Date().getFullYear();

                    return (
                      <div 
                        key={dayIdx} 
                        className={`${styles.calendarDay} ${isToday ? styles.today : ''}`}
                      >
                        <div className={styles.dayNumber}>{day}</div>
                        <div className={styles.dayEvents}>
                          {dayEvents.map((ev, evIdx) => (
                            <div 
                              key={evIdx} 
                              className={styles.miniEvent}
                              style={{ borderLeft: `3px solid ${typeColors[ev.type]}` }}
                              title={ev.title}
                            >
                              {ev.title.length > 20 ? ev.title.slice(0, 20) + '...' : ev.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}

