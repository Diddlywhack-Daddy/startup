import React, { useState, useEffect } from 'react';
import './courseSettings.css';
import { NavLink } from 'react-router-dom';

export function CourseSettings({ userName }) {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [assignmentForm, setAssignmentForm] = useState({ course: '', type: '', weight: '' });

  useEffect(() => {
    setCourses(JSON.parse(localStorage.getItem('courses')) || []);
    setAssignments(JSON.parse(localStorage.getItem('assignments')) || {});
  }, []);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }, [assignments]);

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (newCourse.trim()) {
      setCourses([...courses, { name: newCourse.trim(), grade: 'N/A' }]);
      setNewCourse('');
      alert('Course added (placeholder for DB)');
    }
  };

  const handleToggleCourse = (name) => {
    setSelectedCourses((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const handleDeleteSelectedCourses = () => {
    const updatedCourses = courses.filter((c) => !selectedCourses.includes(c.name));
    const updatedAssignments = { ...assignments };
    selectedCourses.forEach((name) => delete updatedAssignments[name]);
    setCourses(updatedCourses);
    setAssignments(updatedAssignments);
    setSelectedCourses([]);
    setShowDeletePopup(false);
    alert('Courses deleted (placeholder for DB)');
  };

  const handleAssignmentInput = (e) => {
    const { name, value } = e.target;
    setAssignmentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAssignment = (e) => {
    e.preventDefault();
    const { course, type, weight } = assignmentForm;
    if (!course || !type || !weight) return;
    const updated = {
      ...assignments,
      [course]: [...(assignments[course] || []), { type, weight: `${weight}%` }],
    };
    setAssignments(updated);
    setAssignmentForm({ course: '', type: '', weight: '' });
    alert('Assignment type added (placeholder for DB)');
  };

  const handleDeleteAssignment = (course, index) => {
    const updated = [...assignments[course]];
    updated.splice(index, 1);
    setAssignments({ ...assignments, [course]: updated });
    alert('Assignment deleted (placeholder for DB)');
  };

  return (
    <main className="container-fluid px-4 py-4">
      <header className="bg-success text-white px-4 py-3 mb-4 d-flex justify-content-between align-items-center">
        <h1 className="m-0">Class Settings</h1>
        <NavLink to="/home" className="btn btn-light text-success">Back to Home</NavLink>
      </header>

      <section className="mx-auto mb-5" style={{ maxWidth: '700px' }}>
        <h2>Add Class</h2>
        <form onSubmit={handleAddCourse}>
          <div className="mb-3">
            <label className="form-label">Class Name:</label>
            <input type="text" className="form-control" value={newCourse} onChange={(e) => setNewCourse(e.target.value)} required />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">Add Class</button>
            <button type="button" className="btn btn-outline-danger" onClick={() => setShowDeletePopup(true)}>
              Delete Course(s)
            </button>
          </div>
        </form>
      </section>

      <section className="mx-auto mb-5" style={{ maxWidth: '700px' }}>
        <h2>Your Courses</h2>
        {courses.length === 0 ? (
          <p className="text-muted">No courses added yet.</p>
        ) : (
          <table className="table table-bordered">
            <thead className="table-success">
              <tr>
                <th>Course Name</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, i) => (
                <tr key={i}>
                  <td>{course.name}</td>
                  <td>{course.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="text-start mx-auto mb-5" style={{ maxWidth: '700px' }}>
        <h2>Add Assignment Type</h2>
        <form onSubmit={handleAddAssignment}>
          <div className="mb-3">
            <label className="form-label">Course:</label>
            <select name="course" className="form-select" value={assignmentForm.course} onChange={handleAssignmentInput} required>
              <option value="">Select Course</option>
              {courses.map((c, i) => (
                <option key={i} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Assignment Type:</label>
            <input type="text" name="type" className="form-control" value={assignmentForm.type} onChange={handleAssignmentInput} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Weight (%):</label>
            <input type="number" name="weight" className="form-control" value={assignmentForm.weight} onChange={handleAssignmentInput} required />
          </div>
          <button type="submit" className="btn btn-success">Add Assignment Type</button>
        </form>
      </section>

      {Object.keys(assignments).map((course, i) => (
        <section key={i} className="mx-auto mb-5" style={{ maxWidth: '700px' }}>
          <h3 className="mb-3">{course} Assignment Types</h3>
          <table className="table table-bordered">
            <thead className="table-success">
              <tr>
                <th>Type</th>
                <th>Weight</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments[course].map((a, j) => (
                <tr key={j}>
                  <td>{a.type}</td>
                  <td>{a.weight}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteAssignment(course, j)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}

      {showDeletePopup && (
        <div className="modal d-block bg-dark bg-opacity-75">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
              <h4 className="mb-3">Select course(s) to delete</h4>
              {courses.map((course, idx) => (
                <div key={idx} className="form-check text-start">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`course-${idx}`}
                    checked={selectedCourses.includes(course.name)}
                    onChange={() => handleToggleCourse(course.name)}
                  />
                  <label htmlFor={`course-${idx}`} className="form-check-label">
                    {course.name}
                  </label>
                </div>
              ))}
              <div className="d-flex justify-content-end mt-4 gap-2">
                <button className="btn btn-secondary" onClick={() => setShowDeletePopup(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDeleteSelectedCourses}>Delete Selected</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
