import {useState} from "react";

const DateInput = ({ initialDate, onChange }) => {
    const formatDate = (dateStrOrDate) => {
        const date = new Date(dateStrOrDate);
        return date.toISOString().split("T")[0];
    };

    const [selectedDate, setSelectedDate] = useState(formatDate(initialDate));
    const [seconds, setSeconds] = useState(
        Math.floor(new Date(initialDate).getTime() / 1000)
    );

    const handleChange = (ev) => {
        const value = ev.target.value;
        const date = new Date(value);
        const secs = Math.floor(date.getTime() / 1000);

        setSelectedDate(value);
        setSeconds(secs);

        if (onChange) {
            onChange({ date: value, seconds: secs });
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="datePicker">Selecciona una fecha:</label>
            <input
                id="datePicker"
                type="date"
                className="w-[250px] border px-2 py-1"
                value={selectedDate}
                onChange={handleChange}
            />
        </div>
    );
}

export default DateInput;