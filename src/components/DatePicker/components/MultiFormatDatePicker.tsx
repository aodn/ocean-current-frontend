import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateFormat } from '@/types/date';
import { getDateFormatFlags } from '@/utils/date-utils/date';
import CustomInputMobile from './CustomInputMobile';
import CustomInput from './CustomInput';

interface MultiFormatDatePickerProps {
  dateFormat: DateFormat;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  isMobile?: boolean;
}
const MultiFormatDatePicker: React.FC<MultiFormatDatePickerProps> = ({
  dateFormat,
  selectedDate,
  onChange,
  isMobile = false,
}) => {
  const { isMonthFormat, isMonthOnlyFormat, isYearFormat } = getDateFormatFlags(dateFormat);

  if (isMonthFormat) {
    return (
      <DatePicker
        customInput={isMobile ? <CustomInputMobile /> : <CustomInput />}
        selected={selectedDate}
        onChange={onChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        showTwoColumnMonthYearPicker
      />
    );
  }

  if (isMonthOnlyFormat) {
    return (
      <DatePicker
        customInput={isMobile ? <CustomInputMobile /> : <CustomInput />}
        selected={selectedDate}
        onChange={onChange}
        dateFormat="MM"
        showYearDropdown
        showMonthYearPicker
        showTwoColumnMonthYearPicker
      />
    );
  }

  if (isYearFormat) {
    return (
      <DatePicker
        customInput={isMobile ? <CustomInputMobile /> : <CustomInput />}
        selected={selectedDate}
        onChange={onChange}
        dateFormat="yyyy"
        showYearPicker
      />
    );
  }

  return (
    <DatePicker
      customInput={isMobile ? <CustomInputMobile /> : <CustomInput />}
      selected={selectedDate}
      maxDate={new Date()}
      onChange={onChange}
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
    />
  );
};

export default MultiFormatDatePicker;
