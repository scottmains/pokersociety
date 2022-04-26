import { save } from 'autoprefixer/lib/value';
import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from './GlobalContext';

export default function Day({day, rowIdx}) {
    const [dayEvents, setDayEvents] = useState([]);

    const {
        setSelectedDay, 
        setShowEventModal, 
        filteredEvents, 
        setSelectedEvent
    } = useContext(GlobalContext);

    useEffect(() => {
        const events = filteredEvents.filter(
            (event) => 
                dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY")
        );
        setDayEvents(events)
    }, [filteredEvents, day]);

    
    
    function getCurrentDayClass(){
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") 
        ? "bg-green-600 text-white rounded-full w-7"
        : "";
    };
  return (
    <div className="border border-gray-200 flex flex-col">
        
        <header className="flex flex-col items-center">
            {rowIdx === 0 && (
                <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
            )}
            <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
                {day.format("DD")}
            </p>
        </header> 
        <div className="flex-1 cursor-pointer" onClick={() => {
            setSelectedDay(day);
            setShowEventModal(true);
        }}>
            {dayEvents.map((event, idx) => (
                <div
                key={idx}
                onClick={() => setSelectedEvent(event)}
                className={`bg-${event.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
                >
                    {event.title}
                </div>
            ))}
        </div>  
    </div>
  );
}
