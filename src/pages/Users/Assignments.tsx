
const AssignmentsPage = () => {
  const assignments = [
    { title: 'Essay on Shakespeare', dueDate: '2023-12-31', status: 'Pending' },
    { title: 'Math Problem Set 3', dueDate: '2023-12-28', status: 'Completed' },
    // ... more assignments
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Assignments</h1>
      <ul className="space-y-4">
        {assignments.map((assignment, index) => (
          <li key={index} className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-xl font-semibold">{assignment.title}</h2>
            <p className="text-gray-600">Due Date: {assignment.dueDate}</p>
            <span className={`px-2 py-1 rounded-full text-white ${assignment.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
              {assignment.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentsPage;