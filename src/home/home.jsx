import React, { useState, useEffect } from 'react';
import './home.css';

export function Home({ userName }) {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    course: '',
    name: '',
    dueDate: '',
    score: '',
    complete: false,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const courseRes = await fetch('/api/courses');
        if (!courseRes.ok) throw new Error(`Courses fetch failed (${courseRes.status})`);
        const courseList = await courseRes.json();
        setCourses(courseList);
      } catch (err) {
        console.error('Failed to load courses', err);
      }
  
      try {
        const assignRes = await fetch('/api/assignments');
        if (!assignRes.ok) throw new Error(`Assignments fetch failed (${assignRes.status})`);
        const assignmentList = await assignRes.json();
        setAssignments(assignmentList);
      } catch (err) {
        console.error('Failed to load assignments', err);
      }
    }
  
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAssignment((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (newAssignment.name && newAssignment.course && newAssignment.dueDate) {
      const response = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAssignment),
      });

      const updated = await response.json();
      setAssignments(updated);
      setNewAssignment({ course: '', name: '', dueDate: '', score: '', complete: false });
    }
  };

  const handleAssignmentUpdate = async (id, field, value) => {
    const body = {
      [field]: field === 'complete' ? value.target.checked : value,
    };

    const response = await fetch(`/api/assignments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const updated = await response.json();
    setAssignments(updated);
  };

  const handleDeleteAssignments = async () => {
    const idsToDelete = assignments.filter((a) => a.checked).map((a) => a.id);

    const response = await fetch('/api/assignments', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: idsToDelete }),
    });

    const updated = await response.json();
    setAssignments(updated);
  };

  const toggleChecked = (id) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, checked: !a.checked } : a))
    );
  };

  const isPastDue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  const sortedAssignments = [...assignments].sort((a, b) => {
    if (a.complete !== b.complete) return a.complete ? 1 : -1;
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    if (dateA.getTime() !== dateB.getTime()) return dateA - dateB;
    return a.course.localeCompare(b.course);
  });

  return (
    <main className="container py-4">
      <div className="bg-success text-white px-4 py-3 rounded mb-4 d-flex justify-content-between align-items-center">
        <h1 className="m-0">Welcome, {userName}!</h1>
      </div>

      <section className="mb-5">
        <h2>Your Courses</h2>
        {courses.length === 0 ? (
          <p className="text-muted">No courses available.</p>
        ) : (
          <table className="table table-bordered">
            <thead className="table-success">
              <tr>
                <th>Course</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c, i) => (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td>{c.grade || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2>Assignments</h2>
        {assignments.length === 0 ? (
          <p className="text-muted">No assignments added.</p>
        ) : (
          <>
            <table className="table table-bordered">
              <thead className="table-success">
                <tr>
                  <th></th>
                  <th>Course</th>
                  <th>Name</th>
                  <th>Due Date</th>
                  <th>Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedAssignments.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <input type="checkbox" checked={a.checked || false} onChange={() => toggleChecked(a.id)} />
                    </td>
                    <td>{a.course}</td>
                    <td>{a.name}</td>
                    <td>{a.dueDate}</td>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        value={a.score || ''}
                        onChange={(e) => handleAssignmentUpdate(a.id, 'score', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={a.complete}
                        onChange={(e) => handleAssignmentUpdate(a.id, 'complete', e)}
                      />
                      <span className={`ms-2 ${!a.complete && isPastDue(a.dueDate) ? 'text-danger' : ''}`}>
                        {a.complete ? 'Complete' : 'Incomplete'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-grid mt-3">
              <button className="btn btn-danger" onClick={handleDeleteAssignments}>
                Remove Selected Assignments
              </button>
            </div>
          </>
        )}
      </section>

      <section className="mb-5 mt-5">
        <h2>Add Assignment</h2>
        <form onSubmit={handleAddAssignment}>
          <div className="row g-3 mb-3">
            <div className="col-md-3">
              <select
                className="form-select"
                name="course"
                value={newAssignment.course}
                onChange={handleChange}
                required
              >
                <option value="">Select Course</option>
                {courses.map((c, i) => (
                  <option key={i} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Assignment Name"
                value={newAssignment.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                type="date"
                name="dueDate"
                value={newAssignment.dueDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                className="form-control"
                type="text"
                name="score"
                placeholder="e.g. 95/100"
                value={newAssignment.score}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-1 d-grid">
              <button className="btn btn-success" type="submit">Add</button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
