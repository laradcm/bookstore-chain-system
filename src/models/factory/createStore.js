//store object structure
const createStore = ( id, name, location ) =>
{
    const store = {};
    store.id = id;
    store.name = name;
    store.location = location;

    return store;
}

module.exports = createStore;


