// script adapted from https://gist.github.com/kmaida/6045266

export function convertTimestamp(timestamp) {
  var d = new Date(timestamp),	// Timestamp should be in  milliseconds
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
		ampm = 'AM',
		time;
			
	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh === 0) {
		h = 12;
	}
	
	// ie: 2013-02-18, 8:35 AM	
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
		
	return time;
}

export function sort(array, order_method) {
  // copy array by value because state should not be mutate
  // in the reducer!
  let old_array = array.slice()
  let new_array = []
  switch(order_method) {
    case "most recent":
      new_array = old_array.sort((a,b) => (b.timestamp - a.timestamp))
      break
    case "oldest":
      new_array = old_array.sort((a,b) => (a.timestamp - b.timestamp))
      break
    case "highest votes":
      new_array = old_array.sort((a,b) => (b.voteScore - a.voteScore))
      break
    case "lowest votes":
      new_array = old_array.sort((a,b) => (a.voteScore - b.voteScore))
      break
    default:
      new_array = old_array
    }

  return new_array
}
