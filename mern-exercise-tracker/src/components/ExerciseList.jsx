import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = ({ exercise, deleteExercise }) => (
  <tr>
    <td>{exercise.username}</td>
    <td>{exercise.description}</td>
    <td>{exercise.duration}</td>
    <td>{exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={`/edit/${exercise._id}`}>edit</Link> | { }
      <a  href="/" onClick={() => deleteExercise(exercise._id)}>
        delete
      </a>
    </td>
  </tr>
);

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/')
         .then(res => {
          console.log(res.data)
          setExercises(res.data)})
         .catch(error => console.log(error));
  }, []);

  const deleteExercise = (id) => {
    axios.delete(`http://localhost:5000/exercises/${id}`)
         .then(res => console.log(res.data));

    setExercises(prevExercises => prevExercises.filter(el => el._id !== id));
  };

  const exerciseList = () => {
    return exercises.map(currentExercise => (
      <Exercise
        exercise={currentExercise}
        deleteExercise={deleteExercise}
        key={currentExercise._id}
      />
    ));
  };

  return (
    <div>
      <h1 className="h3">Logged Exercises</h1>
      <table className="table">
        <thead className="table-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { exerciseList() }
        </tbody>
      </table>
    </div>
  );
};

export default ExercisesList;