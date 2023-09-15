import React, { useState } from 'react';
import { Pressable } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useDispatch } from 'react-redux';

const DateInput = ({children, mode, onSelect, disabled}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);


  return (
    <>
      <Pressable onPress={() => setOpen(true)} disabled={disabled}>{children}</Pressable>
      <DatePicker
        modal
        open={open}
        date={date}
        mode={mode}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          onSelect(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}

export default DateInput;