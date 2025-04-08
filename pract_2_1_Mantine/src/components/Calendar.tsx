import dayjs from 'dayjs';
import { useState } from 'react';
import { Calendar } from '@mantine/dates';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import classes from './Calendar.module.css';


export function DemoCalendar() {
  const [selected, setSelected] = useState<Date[]>([]);
  
  const handleSelect = (date: Date) => {
    const isSelected = selected.some((s) => dayjs(date).isSame(s, 'date'));
    if (isSelected) {
      setSelected((current) => current.filter((d) => !dayjs(d).isSame(date, 'date')));
    } else if (selected.length < 3) {
      setSelected((current) => [...current, date]);
    }
  };

  return (
    <div className={classes.calendarContainer}>
      <Calendar
        size="md"
        getDayProps={(date) => ({
          selected: selected.some((s) => dayjs(date).isSame(s, 'date')),
          onClick: () => handleSelect(date),
        })}
        styles={{
          calendarHeader: {
            marginBottom: 'var(--mantine-spacing-md)',
          },
          calendarHeaderControl: {
            color: 'var(--mantine-color-blue-6)',
            border: '1px solid var(--mantine-color-gray-3)',
            '&:hover': {
              backgroundColor: 'var(--mantine-color-blue-0)',
            },
          },
          calendarHeaderLevel: {
            color: 'var(--mantine-color-blue-6)',
            '&:hover': {
              backgroundColor: 'var(--mantine-color-blue-0)',
            },
          },
          day: {
            '&[data-selected]': {
              backgroundColor: 'var(--mantine-color-blue-6)',
              color: 'var(--mantine-color-white)',
            },
            '&[data-in-range]': {
              backgroundColor: 'var(--mantine-color-blue-0)',
            },
          },
        }}
        nextIcon={<IconChevronRight size={16} />}
        previousIcon={<IconChevronLeft size={16} />}
      />
    </div>
  );
}