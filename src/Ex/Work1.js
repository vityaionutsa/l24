import React, { useState } from "react";

const employees = [
  { name: "John", surname: "Doe", daysWorked: 20, rate: 10 },
  { name: "Jane", surname: "Doe", daysWorked: 15, rate: 12 },
  { name: "Bob", surname: "Smith", daysWorked: 25, rate: 8 },
];

const Work1 = () => {
  const [data, setData] = useState(employees);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const newData = [...data];
    newData[index][name] = value;
    setData(newData);
  };

  const getTotalSalary = () => {
    return data.reduce((total, employee) => {
      return total + employee.daysWorked * employee.rate;
    }, 0);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Days worked</th>
            <th>Rate</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee, index) => {
            return (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.surname}</td>
                <td>
                  <input
                    type="number"
                    value={employee.daysWorked}
                    name="daysWorked"
                    onChange={(event) => handleChange(event, index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={employee.rate}
                    name="rate"
                    onChange={(event) => handleChange(event, index)}
                  />
                </td>
                <td>{employee.daysWorked * employee.rate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>Total salary: {getTotalSalary()}</p>
    </div>
  );
};

export default Work1;
