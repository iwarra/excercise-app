import useUser from "../hooks/useUser";

function CreateUser() {
  const { username, handleSubmit, onChangeUsername } = useUser()
  
  return (
    <div>
        <h1 className="h3 mb-3">Create New User</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group"> 
            <label>Username:</label>
            <input  
                type="text"
                required
                className="form-control my-2"
                value={username}
                onChange={onChangeUsername}
                />
            <button type="submit" className="btn btn-primary mt-3">Create User</button>
          </div>
        </form>
      </div>
  );
}

export default CreateUser;