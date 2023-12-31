import { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { ThemeContext } from "../context/ThemeContext";
import { SelectAUser } from "./SelectAUser";
import useUser from "../hooks/useUser";
import ConfirmationModal from "./ConfirmationModal";

const DeleteUser = () => {
  const { theme } = useContext(ThemeContext);
  const { selectedID, setSelectedID, setExercise } = useContext(DataContext)
  const { deleteUser } = useUser();
  const editLight = theme === "light";
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleDeleteUser = () => {
    deleteUser(selectedID)
    setConfirmationModalOpen(false)
    setSelectedID(null)
  };

  const handleValidation = () => {
    if (selectedID) {
      setHasError(false)
      setConfirmationModalOpen(true)
    } else {
      setHasError(true)
    }
  }

//State reset if we exit the component without saving the changes
  useEffect(() => {
    return  () => { 
      setExercise({
        userID:"",
        username:"",
        description: "",
        duration: 0,
        date: new Date()
      });
      setHasError(false);
    }
  }, [])

  //Resets the error state once the user is selected
  useEffect(() => {
    setHasError(false)
  }, [selectedID])

  return (
    <div>
      <h1 className={editLight ? "h3 mb-3 text-dark" : "h3 mb-3 text-light"}>Delete a user</h1>
      <SelectAUser></SelectAUser> 
      {hasError && <p style={{ color: 'red' }}>Please select a user.</p>}
      <button 
        className="btn btn-primary mt-3"
        onClick={handleValidation} 
      >
        Delete a user
      </button>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        message="Are you sure you want to delete this user and all of their exercises?"
        onConfirm={handleDeleteUser}
        showCancelButton={true}
      />
    </div>
  );
};

export default DeleteUser;
