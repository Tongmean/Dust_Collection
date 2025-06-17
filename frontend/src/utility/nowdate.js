import { useState, useEffect } from "react";
import { Form, Input } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const DateTimeComponent = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit", // Include seconds for real-time updates
        hour12: false,
      }).replace(",", " :");
      setDateTime(now);
    };

    updateDateTime(); // Set initial time
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="col-md">
      <Form.Item label="วัน/เดือน/ปี : เวลา Auto" name="nowDate">
        <Input type="text" value={dateTime} disabled /> {/* Pass value to Input */}
      </Form.Item>
    </div>
  );
};

export default DateTimeComponent;
