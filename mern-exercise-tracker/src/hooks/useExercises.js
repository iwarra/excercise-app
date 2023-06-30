import { useEffect, useState } from 'react';
import axios from 'axios';
import SingleExercise from '../components/SingleExercise';
import useUser from './useUser';

const useExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const { username } = useUser();

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/')
      .then(res => {
        console.log('Fetched exercises: ', res.data);
        setExercises(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const deleteExercise = (id) => {
    axios.delete(`http://localhost:5000/exercises/${id}`)
      .then(res => console.log(res.data));

    setExercises(prevExercises => prevExercises.filter(el => el._id !== id));
  };

  const createExerciseList = () => {
    return exercises.map(currentExercise => (
      <SingleExercise
        exercise={currentExercise}
        deleteExercise={deleteExercise}
        key={currentExercise._id}
      />
    ));
  };

//adding and testing new logic
  const handleSubmit = e => {
    e.preventDefault();

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date
    };

    console.log('Created new exercise: ', exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data))
      .catch(error => console.log(error))

    window.location = '/';
  };

  const onChangeDescription = e => {
    setDescription(e.target.value);
  };

  const onChangeDuration = e => {
    setDuration(e.target.value);
  };

  const onChangeDate = date => {
    setDate(date);
  };




  return { createExerciseList, deleteExercise, handleSubmit, description, duration, date, onChangeDate, onChangeDuration, onChangeDescription };
};

export default useExercises;