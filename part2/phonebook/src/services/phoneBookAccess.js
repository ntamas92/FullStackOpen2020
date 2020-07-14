import axios from "axios";

const uri = "/api/persons";

const getAll = () => {
  var responsePromise = axios.get(uri).then((x) => x.data);
  return attachErrorHandling(responsePromise);
};

const addPhoneEntry = (newEntry) => {
  var responsePromise = axios.post(uri, newEntry).then((x) => x.data);
  return attachErrorHandling(responsePromise);
};

const updatePhoneEntry = (entryId, updatedEntry) => {
  var responsePromise = axios.put(`${uri}/${entryId}`, updatedEntry).then((x) => x.data);
  return attachErrorHandling(responsePromise);
};

const removePhoneEntry = (entryId) => {
  var responsePromise = axios.delete(`${uri}/${entryId}`).then((x) => x.data);
  return attachErrorHandling(responsePromise);
};

const attachErrorHandling = (promise) => promise;

// promise.catch((error) =>
//     alert(`error occurred during data fetching: ${error}`)
//   );

export default { getAll, addPhoneEntry, updatePhoneEntry, removePhoneEntry };
