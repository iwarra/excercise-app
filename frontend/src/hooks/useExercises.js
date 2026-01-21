import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SingleExercise from '../components/SingleExercise';
import { DataContext } from '../context/DataContext';

const API_BASE_URL =
	process.env.NODE_ENV === 'development'
		? process.env.REACT_APP_DEV_URL // Local development URL
		: process.env.REACT_APP_PROD_URL; // Production URL

const useExercises = () => {
	const { setUser, users, setUsers, exercise, setExercise, exercises, setExercises } =
		useContext(DataContext);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const exercisesResponse = await axios.get(`${API_BASE_URL}/exercises/`);
				setExercises(exercisesResponse.data);

				const usersResponse = await axios.get(`${API_BASE_URL}/users/`);
				if (usersResponse.data.length > 0) {
					setUsers(usersResponse.data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [setExercises, setUsers]);

	const deleteExercise = async (id) => {
		try {
			const response = await axios.delete(`${API_BASE_URL}/exercises/${id}`);
			console.log(response.data);

			setExercises((prevExercises) => prevExercises.filter((el) => el._id !== id));
		} catch (error) {
			console.log(error);
		}
	};

	const createExerciseList = () => {
		return exercises.map((currentExercise) => (
			<SingleExercise
				exercise={currentExercise}
				deleteExercise={deleteExercise}
				key={currentExercise._id}
			/>
		));
	};

	const handleSubmit = async (e, id) => {
		e.preventDefault();

		const exerciseObj = {
			userID: exercise.userID,
			username: exercise.username,
			description: exercise.description,
			duration: exercise.duration,
			date: exercise.date,
		};

		try {
			if (id) {
				await axios.post(`${API_BASE_URL}/exercises/update/${id}`, exerciseObj);
			} else {
				await axios.post(`${API_BASE_URL}/exercises/add`, exerciseObj);
			}

			//Reset after posting
			setExercise({
				userID: '',
				username: '',
				description: '',
				duration: 0,
				date: new Date(),
			});
			setUser({
				username: '',
				userID: '',
			});

			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	const onChangeDescription = (e) => {
		setExercise((prevExercise) => ({
			...prevExercise,
			description: e.target.value,
		}));
	};

	const onChangeDuration = (e) => {
		setExercise((prevExercise) => ({
			...prevExercise,
			duration: e.target.value,
		}));
	};

	const onChangeDate = (date) => {
		setExercise((prevExercise) => ({
			...prevExercise,
			date: date,
		}));
	};

	const onChangeUsername = (e) => {
		const username = e.target.value;
		const user = users.find((user) => user.username === username);

		setExercise((prevExercise) => ({
			...prevExercise,
			username: e.target.value,
			userID: user._id,
		}));
	};

	return {
		createExerciseList,
		deleteExercise,
		handleSubmit,
		exercises,
		users,
		onChangeUsername,
		onChangeDate,
		onChangeDuration,
		onChangeDescription,
	};
};

export default useExercises;
