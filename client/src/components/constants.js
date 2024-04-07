const doitat = ["anytime", "morning", "afternoon", "evening"];
const weekDays = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
];
const colors = ["pinkSherbet", "mediumPurple", "tealDeer", "khaki", "babyBlue", "spiroDisco",]


function arraysHaveSameStrings(array1, array2) {
	if (array1.length !== array2.length) {
	  return false;
	}
  
	const set1 = new Set(array1);
	const set2 = new Set(array2);
  
	if (set1.size !== set2.size) {
	  return false;
	}
  
	for (const string of set1) {
	  if (!set2.has(string)) {
		return false;
	  }
	}
  
	return true;
  }

export { doitat, weekDays, colors ,arraysHaveSameStrings}