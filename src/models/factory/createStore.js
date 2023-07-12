//store factory for testing and seeds templates
const createStore = (name, location ) =>
{
    const store = {};
    store.name = name;
    store.location = location;

    return store;
}

module.exports = createStore;


