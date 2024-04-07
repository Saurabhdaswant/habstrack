import useClickOutSide from "../hooks/useClickOutSide";

function DeleteHabit({ habits, updateHabits, habitId, toggleDeleteDialog }) {
  const handleDelete = () => {
    const filteredHabits = habits.filter((habit, _) => habit.id !== habitId);

    updateHabits(filteredHabits);
    toggleDeleteDialog();
  };

  let domNode = useClickOutSide(() => toggleDeleteDialog());

  return (
    <div className=" fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 ">
      <div ref={domNode} className="bg-white p-8 rounded-lg  ">
        <p className=" text-xl font-bold w-[60%] ">
          Are you sure you want to delete this Habit?
        </p>
        <p className="  text-gray-400 font-medium mt-2">
          This action cannot be undone
        </p>
        <div className="flex justify-between gap-x-4 mt-14 ">
          <button
            onClick={toggleDeleteDialog}
            type="submit"
            className=" w-full   font-semibold  bg-[#F0F0F0]  text-[#2E2E2E] px-14 rounded py-4 "
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            type="submit"
            className=" w-full   font-semibold  bg-[#2e2e2e] hover:bg-[#2e2e2eed] text-white px-14 rounded py-4 "
          >
            Confirm{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteHabit;
