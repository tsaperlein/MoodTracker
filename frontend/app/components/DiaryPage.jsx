import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import TodayDiaryPage from './TodayDiaryPage';
import PreviousDiaryPage from './PreviousDiaryPage';
import CalendarModal from './CalendarModal';
import { getFormatedDate } from 'react-native-modern-datepicker';

export default function DiaryPage({ date, diaryImage, hour, text }) {
  const [open, setOpen] = useState(false);
  const [isToday, setIsToday] = useState(false);

  const today = new Date();
  const endDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD');

  useEffect(() => {
    if (date === endDate) {
      setIsToday(true);
    } else {
      setIsToday(false);
    }
  }, [date, endDate]);

  const handleChange = (propDate) => setDate(propDate);

  const handleModalVisibility = () => setOpen(!open);

  return (
    <View style={{ flex: 1, width: '100%' }}>
      {isToday ? (
        <TodayDiaryPage date={date} handleModalVisibility={handleModalVisibility} />
      ) : (
        <PreviousDiaryPage
          date={date}
          diaryImage={diaryImage || ''}
          hour={hour || ''}
          text={text || ''}
          handleModalVisibility={handleModalVisibility}
        />
      )}
      {open && (
        <CalendarModal
          date={date}
          endDate={endDate}
          open={open}
          handleModalVisibility={handleModalVisibility}
          handleChange={handleChange}
        />
      )}
    </View>
  );
}
