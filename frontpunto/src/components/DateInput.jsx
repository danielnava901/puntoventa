import {useState} from "react";

const DateInput = ({ initialDate, name, onChange }) => {
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
        let secs = Math.floor(date.getTime() / 1000);
        if(name === "desde") {
            secs = new Date(date.setHours(0, 0, 0, 0)).getTime() / 1000;
        }

        if(name === "hasta") {
            secs = new Date(date.setHours(23, 59, 59, 999)).getTime() / 1000;
        }

        setSelectedDate(value);
        setSeconds(secs);

        if (onChange) {
            onChange({ date: value, seconds: secs });
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <input
                id={name}
                type="date"
                className="w-[250px] border px-2 py-1"
                value={selectedDate}
                onChange={handleChange}
            />
        </div>
    );
}

export default DateInput;